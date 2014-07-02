var walk = require('acorn/util/walk');
//still not working, but puts all input values into an array
//inefficient, but will do for now.
function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

module.exports = function (tree) {
  var inputs = new Array(); //saving all the names of our inputs
  inputs.push('input1');
  walk.recursive(tree.data.cfg, {}, {  
    //We will have to go to the VariableDeclarators over the VariableDeclarations for some reason.
    VariableDeclaration: function (node, state, c) {
      var declarator = node.declarations;
      for(var i = 0; i < declarator.length; i++){
        var subnode = declarator[i].init;
        if(subnode.type === 'CallExpression'
          && subnode.callee.name === 'prompt'){
            inputs.push(declarator[i].id.name);
        }
      }
    }
  });
  
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if(node.callee.type === 'MemberExpression'
        && node.callee.object.name === 'document'){
        console.log(node.arguments[0]);
        if(node.callee.property.name === 'createTextNode'
          &&  contains(inputs,node.arguments[0].name)){
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
  });    //graph.domio = 'success';
};