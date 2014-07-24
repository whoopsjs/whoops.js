var program = require('commander');
var cfg = require('../ControlFlowGraph');
var fs = require('fs');
var async = require('async');
var util = require('util');
var open = require("open");


//Load workers
var workers = [];

if (fs.existsSync('./workers')) {
  fs.readdirSync('./workers').forEach(function (file) {
    workers.push(require('./workers/' + file));
  });
}


function applyWorkers(controlFlowGraph) {
  var tree = {
    meta: {
      version: 1
    },
    data: {
      cfg: controlFlowGraph,
      problems: []
    }
  }
  for (var i = workers.length - 1; i >= 0; i--) {
    workers[i].call(null, tree);
  };
  console.log("All workers have finished.");
  return tree;
}


program
  .option('-g, --show-graph', 'Print the full control flow graph');
// .option('-v, --visualize', 'Visualize the results');

program
  .command('inspect <file>')
  .description('inspect the input file')
  .action(function (file) {
    console.log('Defence against the dark arts: ' + file);
    cfg(file, function (err, result) {
      if (err) {
        console.error(err);
      } else {

        var tree = applyWorkers(result);

        console.log("Problems:")
        console.log(util.inspect(tree.data.problems, {
          showHidden: false,
          depth: null,
          colors: true
        }));

        if (program.showGraph) {
          console.log("Graph:")
          console.log(util.inspect(tree.data.cfg, {
            showHidden: false,
            depth: null,
            colors: true
          }));
        }
      }
    });
  });

program
  .command('visualize <file>')
  .description('open a visualization of the inspected file in a browser')
  .action(function (file) {

    cfg(file, function (err, result) {
      if (err) {
        console.error(err);
      } else {

        var tree = applyWorkers(result);
        console.log("Opening Visualization...");

        // Create web server
        var express = require('express'),
          serveStatic = require('serve-static');

        // set port number
        var portNumber = 3000;

        // create server
        var app = express();

        // set directory to deliver
        app.use(serveStatic(__dirname.replace('MainProgram', 'GraphVisualization') + '/dist'));

        // Allow cross origin requests
        app.use(function (req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');
          res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
          res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
          return next();
        });

        // Serve problems.json
        app.get('/problems.json', function (req, res, next) {
          fs.readFile(file, 'utf8', function (err, data) {
            // set ControlFlowGraph to null to prevent circular errors
            tree.data.cfg = null;
            tree.source = data;
            res.json(200, tree);
          });
        });

        // Serve code
        // app.get('/code', function (req, res, next) {
        //   fs.readFile(file, 'utf8', function (err, data) {
        //     res.send(200, data);
        //   });
        // });

        // set portnumber to listen to
        app.listen(portNumber);

        // open('http://localhost:' + portNumber);
      }
    });
  });

program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
