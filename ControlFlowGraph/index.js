var acorn = require('acorn'),
  walk = require('acorn/util/walk.js'),
  fs = require('fs'),
  S = require('string');

var ast;

module.exports = function (input, cb) {

  var options = {
    strictSemicolons: true
  };
  var lines = S(input).lines();
  try {
    ast = acorn.parse(lines.join('\n'), options);
  } catch (error){
    return cb(error);
  }
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

    FunctionDeclaration: function (node, state, c) {
      var previous = state.previous;
      state.previous = [];
      c(node.body, state);
      state.previous = previous;
      fillNode(node, state);
    }
  };
  walk.recursive(ast, {}, functions);
  cb(null, ast);
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
  case 'BinaryExpression':
    expressionHandler(expression.right);
    expressionHandler(expression.left);
    expression.evaluate = function () {
      var left = expression.left.evaluate();
      var right = expression.right.evaluate();
      if (left === undefined || right === undefined) {
        return undefined;
      }
      if (typeof left === 'string') {
        left = '\'' + left + '\'';
      }
      if (typeof right === 'string') {
        right = '\'' + right + '\'';
      }
      return eval(left + ' ' + expression.operator + ' ' + right);
    };
    expression.isUserControlled = function () {
      return left.isUserControlled() || right.isUserControlled();
    };
    break;
  case 'Literal':
    expression.evaluate = function () {
      return expression.value;
    };
    expression.isUserControlled = function () {
      return false;
    };
    break;
  case 'UnaryExpression':
    expressionHandler(expression.argument);
    expression.evaluate = function () {
      var result = expression.argument.evaluate();
      if (result === undefined) {
        return undefined;
      }
      if (typeof result === 'string') {
        result = '\'' + result + '\'';
      }
      if (expression.prefix) {
        result = expression.operator + ' ' + result;
      } else {
        result += ' ' + expression.operator;
      }
      return eval(result);
    };
    expression.isUserControlled = function () {
      return expression.argument.isUserControlled();
    };
    break;
  default:
    expression.evaluate = function () {
      return undefined;
    };
    expression.isUserControlled = function () {
      return true; // we don't know, so to be sure we say yes
    };
    break;
  }
}
