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

//Tests our inputs Array for a specific Name
function containsName(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i][0] === obj) {
      return true;
    }
  }
  return false;
}

//Tests our inputs Array for a specific Type
function containsType(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i][1] === obj) {
      return true;
    }
  }
  return false;
}

module.exports = function (tree) {
  var inputs = new Array(); //saving all the names of our inputs in the Form {Name, Type}
  var monitoredTags = new Array('input');
  walk.recursive(tree.data.cfg, {}, {
    //We will have to go to the VariableDeclarators over the VariableDeclarations for some reason.
    VariableDeclaration: function (node, state, c) {
      var declarator = node.declarations;
      for(var i = 0; i < declarator.length; i++){
        var subnode = declarator[i].init;
        //prompts,created Elements and Elements gotten are monitored
        if(subnode.type === 'CallExpression'
          && (subnode.callee.name === 'prompt' || 
          ((subnode.callee.property.name === 'createElement' || 
          subnode.callee.property.name === 'getElementsByTagName')
          && contains(monitoredTags,subnode.arguments[0].value)))
          ){
            var name = declarator[i].id.name; //Variable Name
            var type = subnode.arguments[0].value; //Variable type (e.g. 'input', 'span', 'button' etc.)
            var nameType = new Array(name, type);
            //If we get Elements by Tag Name, then we only need to monitor the value,
            //if it actually returns something.
            if(subnode.callee.name != 'prompt' 
              &&subnode.callee.property.name === 'getElementsByTagName' 
              && !contains(inputs, nameType)
              && containsType(inputs,type)){           
              //Push element into List if not already existant.              
              inputs.push(nameType);
            }          
            else if(!contains(inputs, nameType)){
              inputs.push(nameType);
            }
        }
      }
    }
  });

  //Works more or less
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      //Every appended Object will (for now) throw an error, even if the container isn't added to the body.
      if(node.arguments[0].callee != undefined 
        && node.callee.property.name === 'appendChild'){
        //Go into lowest CallExpression in chain
        var subNode = node;
        while(subNode.arguments[0].type === 'CallExpression'){
          subNode = subNode.arguments[0];
        }
        //Go through the different chain design to find variable name.
        if(subNode.callee.object.name === 'document'){
          var name;
          //Name is very early within chain.
          if(subNode.arguments[0].type === 'Identifier'){
            name = subNode.arguments[0].name;
          }
          //Name comes very late and is within a chain of CallExpressions and MemberExpressions.
          else if(subNode.arguments[0].type === 'MemberExpression'){
            var memNode =  subNode.arguments[0];
            while(memNode.object.type == 'MemberExpression'){
              memNode = memNode.object;
            }
            name = memNode.object.name;
          }
          //Test the identified variable Name with the monitored variable Names.
          if(containsName(inputs,name)){
            tree.data.problems.push({
              'type': 'warning',
              'message': 'To put the user defined variable ' + name + ' into the DOM tree is a risk',
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