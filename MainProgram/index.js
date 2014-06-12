var program = require('commander'),
  cfg = require('../ControlFlowGraph'),
  fs = require('fs'),
  async = require('async'),
  util = require('util');

var workers = [];

if (fs.existsSync('./workers')) {
  fs.readdirSync('./workers').forEach(function (file) {
    workers.push(require('./workers/' + file));
  });
}

program
  .command('*')
  .description('inspect the input file')
  .action(function (input) {
    cfg(input, function (err, graph) {
      if (err)
        console.error(err);
      else {
        for (var i = workers.length - 1; i >= 0; i--) {
          workers[i].call(null, graph);
        };
        //async.applyEachSeries(workers, graph, function () {});
        console.log('all workers have been completed - graph:');
        console.log(util.inspect(graph, {showHidden: false, depth: null}));
      }
    });
  });


program.parse(process.argv);
if (program.args.length < 1)
  program.help();
