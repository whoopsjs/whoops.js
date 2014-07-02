var walk = require('acorn/util/walk');
//working in testing.js
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

  //Works more or less
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      //We look into the LOWEST CallExpression here for now.
      var callNode = node;
      while(callNode.arguments[0].type === 'CallExpression'){
        callNode = node.arguments[0];
      }
      if(callNode.callee.type === 'MemberExpression'
        && callNode.callee.object.name === 'document'){
        if(callNode.callee.property.name === 'createTextNode'
          &&  contains(inputs,callNode.arguments[0].name)){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'To put a user defined variable into the DOM tree is a risk',
            'weight': 5,
            'position': {
              'start': callNode.start,
              'end': callNode.end
            }
          });
        }
        if(callNode.callee.property.name === 'createAttribute'
          &&  contains(inputs,callNode.arguments[0].name)){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'To put a user defined variable into the DOM tree is a risk',
            'weight': 5,
            'position': {
              'start': callNode.start,
              'end': callNode.end
            }
          });
        }
        if(callNode.callee.property.name === 'createComment'
          &&  contains(inputs,callNode.arguments[0].name)){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'To put a user defined variable into the DOM tree is a risk',
            'weight': 5,
            'position': {
              'start': callNode.start,
              'end': callNode.end
            }
          });
        }
        if(callNode.callee.property.name === 'createElementS'
          &&  contains(inputs,callNode.arguments[0].name)){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'To put a user defined variable into the DOM tree is a risk',
            'weight': 5,
            'position': {
              'start': callNode.start,
              'end': callNode.end
            }
          });
        }
      }
    }
  });    //graph.domio = 'success';
};