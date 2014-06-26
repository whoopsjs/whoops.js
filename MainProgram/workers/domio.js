var walk = require('acorn/util/walk');
//still not working, the path trough the tree is not correct. Doesn't find the end.
module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    VariableDeclarator: function (node, state, c) {
      if(node.init.type === 'CallExpression'
        && node.callee.name === 'prompt'){
        var input = node.id.name;
        if(node.callee.type === 'MemberExpression'
          && node.object.name === 'document'){
          if(node.callee.property.name === 'createTextNode'
            && node.arguments.name === input){
            tree.data.problems.push({
              'type': 'warning',
              'message': 'To put a user defined variable into the DOM tree is a risk',
              'weight': 5,
              'position': {
                'start': node.start,
                'end': node.end
              }
            });
          }
        }
      }
    }
  });    //graph.domio = 'success';
};