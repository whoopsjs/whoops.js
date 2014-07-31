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

//gets the latest object of a List by the Name
function getLastName(a, obj){
	for(var i = a.length-1; i >= 0; i--){
		if (a[i][0] === obj) {
			return a;
		}
	}
	return [];
}

//Gets the assigned value for an assignment
function getAssignedValue(node){
	if(node.type === 'CallExpression'){
		if(node.callee.name === undefined){
			return node.callee.name;
		}
		else if(node.callee.property !== undefined){
			return node.callee.property.name;
		}
	}
	else if(node.type === 'Literal'){
		return node.right.value;
	}
	else if(node.type === 'BinaryExpression'){
		return getAssignedValue(node.left) 
		+ node.right.operator 
		+ getAssignedValue(node.right);
	}
	else{
		return [];
	}
}

//Tests whether or not a node poses a risk
function dangerousNode(node){
  return node.callee.name === 'prompt' || 
         (node.callee.property.name === 'createElement' || 
         (node.callee.property.name === 'getElementsByTagName')
         && contains(monitoredTags,node.arguments[0].value));
}

module.exports = function (tree) {
  var inputs = new Array(); //saving all the names of our inputs in the Form {Name, Type}
  var assignments = new Array(); //Contains all new assigned monitored values {Name, dangerous (boolean), value, starting symbol, ending symbol}
	var evilFunctions = new Array();
	
	//called when a warning happens
	function pushWarning(name, start, end){
		tree.data.problems.push({
			'type': 'warning',
			'message': 'To put the user defined variable ' + name + ' into the DOM tree is a risk',
			'weight': 5,
			'position': {
			'start': start,
			'end': end
			}
		});
	}
	
  walk.recursive(tree.data.cfg, {}, {
    //We will have to go to the VariableDeclarators over the VariableDeclarations for some reason.
    VariableDeclaration: function (node, state, c) {
      var declarator = node.declarations;
      for(var i = 0; i < declarator.length; i++){
        var subnode = declarator[i].init;
        //prompts,created Elements and Elements gotten are monitored
        if(subnode.type === 'CallExpression'
          && dangerousNode(subnode))
          {
            var name = declarator[i].id.name; //Variable Name
            var type = subnode.arguments[0].value; //Variable type (e.g. 'input', 'span', 'button' etc.)
            var nameType = new Array(name, type);
            //If we get Elements by Tag Name, then we only need to monitor the value,
            //if it actually returns something.
            if(subnode.callee.name !== 'prompt' 
              && subnode.callee.property.name === 'getElementsByTagName' 
              && !contains(inputs, nameType)
              && containsType(inputs,type)){           
              //Push element into List if not already existant.              
              inputs.push(nameType);             
              assignments.push(new Array(name, true, getAssignedValue(subnode), node.start, node.end));
            }          
            else if(!contains(inputs, nameType)){
              inputs.push(nameType);
              assignments.push(new Array(name, true, getAssignedValue(subnode), node.start, node.end));
            }
        }
      }
    }
	});
	
	walk.recursive(tree.data.cfg, {}, {
    //We test all assigned values for changes 
    AssignmentExpression: function (node, state, c){
			//Continue with inner stuff if function is declared;
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
        if (containsName(inputs,node.left.name)){   
          assignments.push(new Array(node.left.name, dangerous, getAssignedValue(node.right) ,node.start, node.end));
        }
				//Variable takes value of another dangerous one
				else if(node.right.type == 'Identifier' 
				&& containsName(inputs, node.right.value)){
					assignments.push(new Array(node.left.name, getLastName(assignments, node.right.value)[1], node.right.value ,node.start, node.end));
				}
        //Defined variable gets dangerous value
        else if(dangerous){
          inputs.push(new Array(node.left.name, node.right.callee.name));
          assignments.push(new Array(node.left.name, true, getAssignedValue(node.right) ,node.start, node.end));
        }
      }
			//Continue search if in FunctionExpression
			if(node.right.type === 'FunctionExpression'){
				c(node.right.body,state);
			}
    }
  });
	
	//Walk all Functions to look if evil values are behind Functions.
	walk.recursive(tree.data.cfg, {}, {
    FunctionDeclaration: function (node, state, c) {
			for(var i = 0; i < assignments.length; i++){
				if(assignments[i][3] >= node.start 
				&& assignments[i][4] <= node.end
				&& assignments[i][1]){
					evilFunctions.push(node.id.name);
				}
			}
		}
	});

  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      //Every appended Object will (for now) throw an error, even if the container isn't added to the body.
      if(node.arguments[0].callee !== undefined 
        && node.callee.property.name === 'appendChild'){
        //Go into lowest CallExpression in chain until you reach a document call
        var subNode = node;
        while(subNode.arguments[0] !== undefined && 
				subNode.arguments[0].type === 'CallExpression' &&
				!(subNode.callee.object !== undefined && 
				subNode.callee.object.name === 'document')){
          subNode = subNode.arguments[0];
        }
        //Go through the different chain design to find variable name.
        if(subNode.callee.object !== undefined && 
				subNode.callee.object.name === 'document'){
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
					else if(subNode.arguments[0].type === 'CallExpression'){
						name = subNode.arguments[0].callee.name;
					}
          //Last assignment will be used.
          var nowDangerous = false;
          for(var i = 0; i < assignments.length; i++){
            if(assignments[i][0] === name){
              //Assignment before the appending?
              if(assignments[i][4] <= node.end){
                nowDangerous = assignments[i][1];
              }
            }
          }
          //Push warning if dangerous value is appended
          if(nowDangerous
					|| contains(evilFunctions,name)){
						pushWarning(name, node.start, node.end)
          }
        }
      }
    }
  });    //graph.domio = 'success';
};