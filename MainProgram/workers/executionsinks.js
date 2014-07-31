var walk = require('acorn/util/walk');

module.exports = function(tree) {
  function p(node, message) {
    tree.data.problems.push({
      'type': 'risk',
      'message': message,
      'weight': 1,
      'position': {
        'start': node.start,
        'end': node.end
      }
    });
  }
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function(node, state, c) {
      // {type: 'CallExpression', callee.name: 'eval', arguments[0]: isUserControlledValue}
      if (node.callee.name === 'eval'
          && isUserControlledValue(node.arguments[0])) {
        p(node, 'Using a user controlled value as first argument for eval() is not safe.');
      // {type: 'CallExpression', callee.name: 'setTimeout', arguments[0]: isUserControlledValue}
      // {type: 'CallExpression', callee.name: 'setInterval', arguments[0]: isUserControlledValue}
      // {type: 'CallExpression', callee.name: 'setImmediate', arguments[0]: isUserControlledValue}
      } else if ((node.callee.name === 'setTimeout'
                  || node.callee.name === 'setInterval'
                  || node.callee.name === 'setImmediate')
                 && evaluatesToType(node.arguments[0], 'string')
                 && isUserControlledValue(node.arguments[0])) {
        p(node, 'Using a user controlled string as first argument for ' + node.callee.name + '() is not safe.');
      // Identifier: {type: 'CallExpression', callee.name: 'Function', arguments[arguments.length - 1]: isUserControlledValue}
      } else if (node.callee.name === 'Function'
                 && isUserControlledValue(node.arguments[node.arguments.length - 1])) {
        p(node, 'Using a user controlled value as last argument for Function() is not safe.');
      // Identifier: {type: 'CallExpression', callee.name: 'execScript', arguments[0]: isUserControlledValue, arguments[1]: 'JScript'}
      } else if (node.callee.name === 'execScript'
                 && evaluatesTo(node.arguments[1], 'JScript')
                 && isUserControlledValue(node.arguments[0])) {
        p(node, 'Using a user controlled value as first argument for execScript() with \'JScript\' as second argument is not safe.');
      // Identifier: {type: 'CallExpression', callee.type: 'MemberExpression', callee.object.name: 'crypto', callee.property.name: 'generateCRMFRequest', arguments[0]: 'CN=0', arguments[1]: 0, arguments[2]: 0, arguments[3]: null, arguments[4]: isUserControlledValue, arguments[5]: 384, arguments[6]: null, arguments[7]: 'rsa-dual-use'}
      } else if (node.callee.type === 'MemberExpression'
                 && node.callee.object.name === 'crypto'
                 && node.callee.property.name === 'generateCRMFRequest'
                 && evaluatesTo(node.arguments[0], 'CN=0')
                 && evaluatesTo(node.arguments[1], 0)
                 && evaluatesTo(node.arguments[2], 0)
                 && evaluatesTo(node.arguments[3], null)
                 && evaluatesTo(node.arguments[5], 384)
                 && evaluatesTo(node.arguments[6], null)
                 && evaluatesTo(node.arguments[7], 'rsa-dual-use')
                 && isUserControlledValue(node.arguments[4])) {
        p(node, 'Using a user controlled value as fifth argument for crypto.generateCRMFRequest() with \'CN=0\' as first, 0 as second and third, null as fourth and seventh, 384 as sixth and \'rsa-dual-use\' as eighth argument is not safe.');
      }
    },
    AssignmentExpression: function(node, state, c) {
      if (node.left.type === 'MemberExpression') {
        // Identifier: {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'src', right: isUserControlledValue}
        // Identifier: {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'text', right: isUserControlledValue}
        // Identifier: {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'textContent', right: isUserControlledValue}
        // Identifier: {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLScriptElement, left.property.name: 'innerText', right: isUserControlledValue}
        if ((node.left.property.name === 'src'
             || node.left.property.name === 'text'
             || node.left.property.name === 'textContent'
             || node.left.property.name === 'innerText')
            && isHTMLScriptElement(node.left)
            && isUserControlledValue(node.right)) {
          p(node, 'Assigning a user controlled value to HTMLScriptElement.' + node.left.property.name + ' is not safe.');
        // Identifier: {type: 'AssignmentExpression', left.type: 'MemberExpression', left.object: isHTMLElement, left.property.name: 'on*', right: isUserControlledValue}
        } else if (node.left.property.name.substring(0, 2) === 'on'
                   && isHTMLElement(node.left)
                   && isUserControlledValue(node.right)) {
          p(node, 'Assigning a user controlled value to HTMLElement.' + node.left.property.name + ' is not safe.');
        }
      }
    }
  });
};

function isUserControlledValue(node) {
  if (typeof node.isUserControlled === 'function') {
    return node.isUserControlled();
  }
  return true; // we don't know, so to be sure we say yes
}

function isHTMLScriptElement(node) {
  return true; // we don't know, so to be sure we say yes
}

function isHTMLElement(node) {
  return true; // we don't know, so to be sure we say yes
}

function evaluatesTo(expression, expected) {
  if (typeof expression.evaluate === 'function') {
    var value = expression.evaluate();
    return value === undefined || value === expected;
  }
  return true; // we don't know, so to be sure we say yes
}

function evaluatesToType(expression, type) {
  if (typeof expression.evaluate === 'function') {
    var value = expression.evaluate();
    return value === undefined || typeof value === type;
  }
  return true; // we don't know, so to be sure we say yes
}