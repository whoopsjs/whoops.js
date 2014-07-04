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
        expressionHandler(node.expression);
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

function expressionHandler(expression) {
  switch (expression.type) {
    case 'ArrayExpression':
      for (var i = 0; i < expression.elements.length; i++) {
        if (expression.elements[i] !== null) {
          expressionHandler(expression.elements[i]);
        }
      };
      expression.evaluate = function() {
        var a = [];
        for (var i = 0; i < expression.elements.length; i++) {
          if (expression.elements[i] !== null) {
            a.push(expression.elements[i].evaluate());
          } else {
            a.push(expression.elements[i]);
          }
        }
        return a;
      };
      expression.isUserControlled = function() {
        for (var i = expression.elements.length - 1; i >= 0; i--) {
          if(expression.elements[i] !== null && expression.elements[i].isUserControlled()) {
            return true;
          }
        }
        return false;
      };
      break;
    case 'BinaryExpression':
      expressionHandler(expression.right);
      expressionHandler(expression.left);
      expression.evaluate = function() {
        var left = expression.left.evaluate();
        var right = expression.right.evaluate();
        if (typeof left === 'string') {
          left = '\'' + left + '\'';
        }
        if (typeof right === 'string') {
          right = '\'' + right + '\'';
        }
        var result = eval(left + ' ' + expression.operator + ' ' + right);
        return result;
      };
      expression.isUserControlled = function() {
        return left.isUserControlled() || right.isUserControlled();
      };
      break;
    case 'CallExpression':
      for (var i = 0; i < expression.arguments.length; i++) {
        expressionHandler(expression.arguments[i]);
      };
      expression.evaluate = function() {
        return undefined; // TODO implement
      };
      expression.isUserControlled = function() {
        return true; // TODO implement
      };
      break;
    case 'Identifier':
      expression.evaluate = function() {
        return expression.name; // TODO something like return context[expression.name]
      };
      expression.isUserControlled = function() {
        return false;
      };
      break;
    case 'Literal':
      expression.evaluate = function() {
        return expression.value;
      };
      expression.isUserControlled = function() {
        return false;
      };
      break;
    default:
      expression.evaluate = function() {
        return undefined;
      };
      expression.isUserControlled = function() {
        // we don't know, so to be sure we say yes
        return true;
      };
      break;
  }
}
