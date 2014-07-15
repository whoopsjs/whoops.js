var walk = require('acorn/util/walk');
var monitoredTags = new Array('input');
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

//Tests whether or not a node poses a risk
function dangerousNode(node){
  return node.callee.name === 'prompt' || 
         (node.callee.property.name === 'createElement' || 
         node.callee.property.name === 'getElementsByTagName')
         && contains(monitoredTags,node.arguments[0].value);
}

module.exports = function (tree) {
  var inputs = new Array(); //saving all the names of our inputs in the Form {Name, Type}
  var assignments = new Array(); //Contains all new assigned monitored values {Name, dangerous (boolean), ending symbol}
  walk.recursive(tree.data.cfg, {}, {
    //We will have to go to the VariableDeclarators over the VariableDeclarations for some reason.
    VariableDeclaration: function (node, state, c) {
      var declarator = node.declarations;
      for(var i = 0; i < declarator.length; i++){
        var subnode = declarator[i].init;
        //prompts,created Elements and Elements gotten are monitored
        if(subnode.type === 'CallExpression'
          && (subnode.callee.name === 'prompt' || 
          dangerousNode(subnode)))
          {
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
              assignments.push(new Array(name, true, node.end));
            }          
            else if(!contains(inputs, nameType)){
              inputs.push(nameType);
              assignments.push(new Array(name, true, node.end));
            }
        }
      }
    }
  });
  
  walk.recursive(tree.data.cfg, {}, {
    //We test all assigned values for changes 
    AssignmentExpression: function (node, state, c){
      if(node.operator === '='){
        //Is new assignment a risk?
        var dangerous;
        //Does Assignment use functions?
        if(node.right.type === 'CallExpression'){
          dangerous = dangerousNode(node.right);
        }
        else{
          dangerous = false;
        }
        //Is monitored Value newly assigned?
        var name = node.left.name;
        var endSign = node.end;
        if (containsName(inputs,name)){   
          assignments.push(new Array(name, dangerous, endSign));
        }
        //Defined variable gets dangerous value
        else if(dangerous){
          inputs.push(new Array(name, node.right.callee.name));
          assignments.push(new Array(name, true, endSign));
          console.log('derp');
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
          //Last assignment will be used.
          var nowDangerous = false;
          for(var i = 0; i < assignments.length; i++){
            if(assignments[i][0] === name){
              //Assignment before the appending?
              if(assignments[i][2] < node.end){
                nowDangerous = assignments[i][1];
              }
            }
          }
          //Push warning if dangerous value is appended
          if(nowDangerous){
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