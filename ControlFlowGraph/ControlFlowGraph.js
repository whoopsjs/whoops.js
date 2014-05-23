var acorn = require('acorn'),
    walk  = require('acorn/util/walk.js'),
    fs    = require('fs'),
    pd    = require('pretty-data').pd;

fs.readFile('testfile.js', 'utf8', function(err, input) {
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
            //node.next = node.body.body[0].id;

            fillNode(node, state, nodes);
        },
        // IfStatement: function(node, state, c) {
        //
        // },
        ExpressionStatement: function(node, state, c){
            fillNode(node, state, nodes);
        },
        VariableDeclaration: function(node, state, c){
            fillNode(node, state, nodes);
        }
    };
    walk.recursive(ast, {}, functions);

    console.log(nodes);
});

function fillNode(node, state, nodes) {
    node.previous = node.previous || [];
    node.next = node.next || [];
    node.id = node.id || nodes.length;
    nodes[node.id] = node;

    if (state.previous !== undefined) {
        node.previous.push(state.previous);
    }
    state.previous = node.id;

    node.previous.forEach(function(id){
        // console.log(nodes[id].next);
        if (nodes[id].next.indexOf(node.id) === -1){
            nodes[id].next.push(node.id);
        }
    });

}
