var acorn = require('acorn'),
  walk = require('acorn/util/walk.js'),
  fs = require('fs');

var ast;

module.exports = function (filename, cb) {

  fs.readFile(filename, 'utf8', function (err, input) {
    if (err) {
      cb(err);
      return;
    }
    var options = {
      strictSemicolons: true
    };
    ast = acorn.parse(input, options);
    var functions = {

      WhileStatement: function (node, state, c) {
        fillNode(node, state);
        c(node.body, state);
        fillNode(node, state);
      },

      ForInStatement: function (node, state, c) {
        fillNode(node, state);
        c(node.body, state);
        fillNode(node, state);
      },

      ForStatement: function (node, state, c) {
        fillNode(node, state);
        c(node.body, state);
        fillNode(node, state);
      },

      IfStatement: function (node, state, c) {
        fillNode(node, state);
        c(node.consequent, state);
        var consequentEnd = state.previous;
        state.previous = [];
        fillNode(node, state);
        if (node.alternate !== null) {
          c(node.alternate, state);
        }
        state.previous = state.previous.concat(consequentEnd);
      },

      ExpressionStatement: function (node, state, c) {
        fillNode(node, state);
      },

      VariableDeclaration: function (node, state, c) {
        fillNode(node, state);
      },

      FunctionDeclaration: function(node, state, c) {
        var previous = state.previous;
        state.previous = [];
        c(node.body, state);
        state.previous = previous;
        fillNode(node, state);
      }
    };
    walk.recursive(ast, {}, functions);
    cb(null, ast);
  });
};

function fillNode(node, state) {
  node.previous = node.previous || [];
  node.next = node.next || [];
  state.previous = state.previous || [];

  state.previous.forEach(function (previous) {
    if (previous !== undefined) {
      node.previous.push(previous);
    }
  });
  state.previous = [node];

  node.previous.forEach(function (previous) {
    previous.next = previous.next || [];
    if (previous.next.indexOf(node) === -1) {
      previous.next.push(node);
    }
  });

}
