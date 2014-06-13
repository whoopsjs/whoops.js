//var tpm = require('../TreePatternMatcher');

module.exports = function (tree) {
  /*tpm(tree.data.cfg, {
    "type": "ExpressionStatement",
    "expression":
    {
      "type": "CallExpression",
      "callee":
      {
        "type": "Identifier",
        "name": "eval"
      }
    }
  }, function(node) {
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
  });*/
};

/* NOTES

Eval:
Name: *.ExpressionStatement.CallStatement.callee.name
Args: *.ExpressionStatement.CallStatement.arguments.name

Function:
*.FunctionExpression
Params: *.FunctionExpression.params.name
Body: *.FunctionExpression.body

setTimeout:
*.CallExpression.callee.name
Func (that will be executet): *.CallExpression.arguments.CallExpression.name
Time: *.CallExpression.arguments.Literal.value

setInterval:
*.CallExpression.callee.name
Func (that will be executet): *.CallExpression.arguments.Literal.name
Time: *.CallExpression.arguments.Literal.value

"body":
[
  {
    "type": "ExpressionStatement",
    "expression":
    {
      "type": "CallExpression",
      "callee":
      {
        "type": "Identifier",
        "name": "eval"
      }
    }
  }
]

*/