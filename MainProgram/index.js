var program = require('commander');
var cfg = require('../ControlFlowGraph');
var fs = require('fs');
var async = require('async');
var util = require('util');
var open = require("open");

// set port number
var portNumber = 3000;


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
  };
  for (var i = workers.length - 1; i >= 0; i--) {
    workers[i].call(null, tree);
  };
  console.log("All workers have finished.");
  return tree;
}

function createServer(portNumber) {
  // Create web server
  var express = require('express'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser');

  // create server
  var app = express();

  // set directory to deliver
  app.use(serveStatic(__dirname.replace('MainProgram', 'GraphVisualization') + '/dist'));
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded());

  // Allow cross origin requests
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
    return next();
  });

  app.listen(portNumber);
  return app;
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

        console.log("Problems:");
        console.log(util.inspect(tree.data.problems, {
          showHidden: false,
          depth: null,
          colors: true
        }));

        if (program.showGraph) {
          console.log("Graph:");
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
    fs.readFile(file, 'utf8', function (err, input) {

      cfg(input, function (err, result) {
        if (err) {
          console.error(err);
        } else {

          var tree = applyWorkers(result);
          console.log("Opening Visualization...");

          var app = createServer(portNumber);

          // Serve problems.json
          app.get('/problems.json', function (req, res, next) {
            // set ControlFlowGraph to null to prevent circular errors
            tree.data.cfg = null;
            tree.source = input;
            res.json(200, tree);
          });

          // set portnumber to listen to
          // app.listen(portNumber);

          open('http://localhost:' + portNumber + '/#/visualize');
        }
      });
    });
  });

program
  .command('serve')
  .description('Start a server for remote file uploading and analyzing')
  .action(function () {
    var app = createServer(portNumber);

    app.post('/problems.json', function (req, res, next) {
      cfg(req.body.source, function (err, result) {

        if (err) {
          res.json({
            error: err
          });
          return next();
        }

        var tree = applyWorkers(result);
        tree.data.cfg = null;
        tree.source = req.body.source;
        res.json(200, tree);
      });
    });
  });

program.parse(process.argv);
if (program.args.length < 1) {
  program.help();
}
