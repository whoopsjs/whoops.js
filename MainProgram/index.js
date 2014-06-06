var program = require('commander'),
  cfg = require('controlFlowGraph'),
  fs = require('fs'),
  async = require('async');

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
        async.applyEach(workers, graph, function () {
          console.log('all workers have been completed');
        });
      }
    });
  });


program.parse(process.argv);
if (program.args.length < 1)
  program.help();
