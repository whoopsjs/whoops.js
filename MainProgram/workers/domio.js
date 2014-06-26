var walk = require('acorn/util/walk');

module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if(node.declarations.type === 'VariableDeclarator'
        && node.callee.name === 'prompt'){
        if(node.callee.type === 'MemberExpression'
          && node.object.name === 'document'){
          if(node.callee.property.name === 'createTextNode'){
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