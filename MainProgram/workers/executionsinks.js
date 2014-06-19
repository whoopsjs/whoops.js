var walk = require('acorn/util/walk');

module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if (node.callee.name === 'eval') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using eval() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      } else if (node.callee.name === 'setTimeout') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using setTimeout() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      } else if (node.callee.name === 'setInterval') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using setInterval() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      } else if (node.callee.name === 'setImmediate') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using setImmediate() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      } else if (node.callee.name === 'execScript') {
        // TODO seconds argument === 'JScript'
        tree.data.problems.push({
          "type": "risk",
          "message": "using execScript() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      } else if (node.callee.type === 'MemberExpression'
                 && node.callee.object.name === 'crypto'
                 && node.callee.property.name === 'generateCRMFRequest') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using crypto.generateCRMFRequest() is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
      }
    },
    AssignmentExpression: function (node, state, c) {
      if (node.left.type === 'MemberExpression'
          && isScriptDOMElement(node.left.object)
          && node.left.property.name === 'src') {
        tree.data.problems.push({
          "type": "risk",
          "message": "assigning a user controlled value to ScriptElement.src is not safe",
          "weight": 1,
          "position": {
            "start": node.start,
            "end": node.end
          }
        });
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

function isADOMElement(node) {
  // TODO implement
  return true;
}

/* NOTES

Function:
*.FunctionExpression
Params: *.FunctionExpression.params.name
Body: *.FunctionExpression.body

*/