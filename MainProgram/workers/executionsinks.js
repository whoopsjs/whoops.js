var walk = require('acorn/util/walk');

module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if (node.callee.name === 'eval') {
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using eval() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      } else if (node.callee.name === 'setTimeout') {
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using setTimeout() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      } else if (node.callee.name === 'setInterval') {
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using setInterval() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      } else if (node.callee.name === 'setImmediate') {
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using setImmediate() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      } else if (node.callee.name === 'execScript') {
        // TODO seconds argument === 'JScript'
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using execScript() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      } else if (node.callee.type === 'MemberExpression'
                 && node.callee.object.name === 'crypto'
                 && node.callee.property.name === 'generateCRMFRequest') {
        tree.data.problems.push({
          'type': 'risk',
          'message': 'using crypto.generateCRMFRequest() is not safe',
          'weight': 1,
          'position': {
            'start': node.start,
            'end': node.end
          }
        });
      }
    },
    AssignmentExpression: function (node, state, c) {
      if (node.left.type === 'MemberExpression'
          && isUserControlledValue(node.right.object)) {
        if (isScriptDOMElement(node.left.object)
            && (node.left.property.name === 'src'
                || node.left.property.name === 'text'
                || node.left.property.name === 'textContent'
                || node.left.property.name === 'innerText')) {
          tree.data.problems.push({
            'type': 'risk',
            'message': 'assigning a user controlled value to ScriptElement.' + node.left.property.name + ' is not safe',
            'weight': 1,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        } else if (isAnyDOMElement(node.left.object)
                   && (node.left.property.name.substring(0, 2) === 'on')) {
          tree.data.problems.push({
            'type': 'risk',
            'message': 'assigning a user controlled value to DOMNode.' + node.left.property.name + ' is not safe',
            'weight': 1,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
      }
    }
  });
};

function isUserControlledValue(node) {
  // TODO implement
  return true;
}

function isScriptDOMElement(node) {
  // TODO implement
  return true;
}

function isAnyDOMElement(node) {
  // TODO implement
  return true;
}

/* NOTES

Function:
*.FunctionExpression
Params: *.FunctionExpression.params.name
Body: *.FunctionExpression.body

*/