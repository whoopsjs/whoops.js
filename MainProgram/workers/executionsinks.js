module.exports = function (graph) {
  graph.executionsinks = "success";
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

*/