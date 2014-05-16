var acorn = require('acorn'),
    walk  = require('acorn/util/walk.js'),
    fs    = require('fs'),
    pd    = require('pretty-data').pd;

fs.readFile('testfile.js', 'utf8', function(err, input) {
    var options = {
        strictSemicolons: true
    };
    var result = acorn.parse(input, options);
    console.log(pd.json(result));

    var variables = {};
    var visitors = {
        ExpressionStatement: function(node){
            // console.log(pd.json(node));
            switch (node.expression.type) {
            case 'CallExpression':
                break;
            case 'AssignmentExpression':
                var value = node.expression.right.value || variables[node.expression.right.name];
                var name = node.expression.left.name;
                if (name in variables){
                    variables[name] = value;
                }
                else {
                    console.warn('Assignment to undeclared variable ' + name + ' at ' + node.start);
                }
                break;
            }
        },
        VariableDeclaration: function(node) {
            node.declarations.forEach(function(declaration){
                var name = declaration.id.name;
                var value = declaration.init.value;
                variables[name] = value;
            });
        }
    };
    walk.simple(result, visitors);
    console.log(variables);
});
