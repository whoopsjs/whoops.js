var program = require('commander');
var cfg = require('../ControlFlowGraph');
var fs = require('fs');
var async = require('async');
var util = require('util');
var open = require("open");

var workers = [];

if (fs.existsSync('./workers')) {
  fs.readdirSync('./workers').forEach(function (file) {
    workers.push(require('./workers/' + file));
  });
}

program
  .option('-g, --show-graph', 'Print the full control flow graph')
  .option('-v, --visualize', 'Visualize the results');

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
        if (program.visualize) {
          console.log("Opening Visualization...");

          // Create web server
          var connect     = require('connect'),
              serveStatic = require('serve-static');

          // set port number
          var portNumber = 3000;

          // create server
          var app = connect();

          // set directory to deliver
          app.use(serveStatic(__dirname.replace('MainProgram', 'GraphVisualization')));

          // set portnumber to listen to
          app.listen(portNumber);

          // write problems to file
          fs.writeFile(__dirname.replace('MainProgram', 'GraphVisualization/problems.js'), JSON.stringify(tree.data.problems), function(err) {
            if(err) {
                console.log(err);
            }
          });

          // open browser window with visualization
          open('http://localhost:' + portNumber);
        };
      }
    });
  });


program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
