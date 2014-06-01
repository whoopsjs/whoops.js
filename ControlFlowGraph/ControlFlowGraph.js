var acorn = require('acorn'),
    walk = require('acorn/util/walk.js'),
    fs = require('fs'),
    pd = require('pretty-data').pd;

fs.readFile('testfile.js', 'utf8', function (err, input) {
    var options = {
        strictSemicolons: true
    };
    var ast = acorn.parse(input, options);
    var nodes = [];
    // console.log(pd.json(ast));
    var functions = {
        WhileStatement: function (node, state, c) {
            fillNode(node, state, nodes);
            c(node.body, state);
            fillNode(node, state, nodes);
        },
        IfStatement: function (node, state, c) {
            fillNode(node, state, nodes);
            c(node.consequent, state);
            var consequentEnd = state.previous;
            state.previous = [];
            fillNode(node, state, nodes);
            if (node.alternate !== null) {
                c(node.alternate, state);
            }
            state.previous = state.previous.concat(consequentEnd);
        },
        ExpressionStatement: function (node, state, c) {
            fillNode(node, state, nodes);
        },
        VariableDeclaration: function (node, state, c) {
            fillNode(node, state, nodes);
        }
    };
    walk.recursive(ast, {}, functions);

    console.log(nodes);
    // console.log(pd.json(ast));
});

function fillNode(node, state, nodes) {
    node.previous = node.previous || [];
    node.next = node.next || [];
    state.previous = state.previous || [];

    node.id = node.id || nodes.length;
    if (node.id == nodes.length) {
        nodes.push(node);
    }

    state.previous.forEach(function (previous) {
        if (previous !== undefined) {
            node.previous.push(previous);
        }
    });
    state.previous = [node.id];

    node.previous.forEach(function (id) {
        // console.log(nodes[id].next);
        if (nodes[id].next.indexOf(node.id) === -1) {
            nodes[id].next.push(node.id);
        }
    });

}
