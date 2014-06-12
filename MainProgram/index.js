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
  .option('-g, --show-graph', 'Print the full graph');

program
  .command('*')
  .description('inspect the input file')
  .action(function (input) {
    console.log('Defence against the dark arts: ' + input);
    cfg(input, function (err, graph) {
      if (err) {
        console.error(err);
      } else {
        //async.applyEachSeries(workers, graph, function () {});
        for (var i = workers.length - 1; i >= 0; i--) {
          workers[i].call(null, graph);
        };
        console.log("All workers have finished.");
        if (program.showGraph) {
          console.log("Graph:")
          console.log(util.inspect(graph, {showHidden: false, depth: null}));
        };
      }
    });
  });


program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
