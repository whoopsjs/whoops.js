var walk = require('acorn/util/walk');

module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if (node.callee.name === 'eval') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using eval() is not safe",
          "weight": 1,
          "position":
          {
            "start": node.start,
            "end": node.end
          }
        });
      } else if(node.callee.name === 'setTimeout') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using setTimeout() is not safe",
          "weight": 1,
          "position":
          {
            "start": node.start,
            "end": node.end
          }
        });
      } else if(node.callee.name === 'setInterval') {
        tree.data.problems.push({
          "type": "risk",
          "message": "using setInterval() is not safe",
          "weight": 1,
          "position":
          {
            "start": node.start,
            "end": node.end
          }
        });
      };
    }
  });
};

/* NOTES

Function:
*.FunctionExpression
Params: *.FunctionExpression.params.name
Body: *.FunctionExpression.body

*/