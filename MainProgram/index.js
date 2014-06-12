var program = require('commander');
var cfg = require('../ControlFlowGraph');
var fs = require('fs');
var async = require('async');
var util = require('util');

var workers = [];

if (fs.existsSync('./workers')) {
  fs.readdirSync('./workers').forEach(function (file) {
    workers.push(require('./workers/' + file));
  });
}

program
  .option('-g, --show-graph', 'Print the full control flow graph');

program
  .command('*')
  .description('inspect the input file')
  .action(function (input) {
    console.log('Defence against the dark arts: ' + input);
    cfg(input, function (err, cfg) {
      if (err) {
        console.error(err);
      } else {
        var tree = {
          meta: {
            version: 1
          },
          data: {
            cfg: cfg,
            problems: []
          }
        }
        //async.applyEachSeries(workers, tree, function () {});
        for (var i = workers.length - 1; i >= 0; i--) {
          workers[i].call(null, tree);
        };
        console.log("All workers have finished.");
        console.log("Problems:")
        console.log(util.inspect(tree.data.problems, {showHidden: false, depth: null}));
        if (program.showGraph) {
          console.log("Graph:")
          console.log(util.inspect(tree.data.cfg, {showHidden: false, depth: null}));
        };
      }
    });
  });


program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
