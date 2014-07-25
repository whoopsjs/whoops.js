var walk = require('acorn/util/walk');
var monitoredTags = new Array('input');
var inputs = new Array(); //saving all the names of our inputs in the Form {Variablename, Type, name, id}
var assignments = new Array(); //Contains all new assigned monitored values {Name, dangerous (boolean), value, starting symbol, ending symbol}
var evilFunctions = new Array();//Contains all functions with evil content

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
//create stands for whether or nota value is created or only accessed
function dangerousNode(node){
  //node is a prompt
  if(node.callee.name === 'prompt'){
    return true;
  }
  //We either set or get an element of a dangerous type
  else if((node.callee.property.name === 'createElement' 
         || node.callee.property.name === 'getElementsByTagName')
         && contains(monitoredTags,node.arguments[0].value)){
    return true;
  }
  //Also Dangerous to create a textNode of a dangerous Value
  else if(node.callee.property.name === 'createTextNode'
          || node.callee.property.name === 'createElement'
          || node.callee.property.name === 'createAttribute'){
    if(node.arguments[0].type === 'MemberExpression'){
      var memNode = node.arguments[0];
          while(memNode.object.type === 'MemberExpression'){
          memNode = memNode.object;
        }
      if(containsName(inputs,memNode.object.name)){ //e.g. saves inputs[i].value as inputs
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  //We get a dangerous Element of a certain Name, 
  //only needs to contain one dangerous Element
  else if(node.callee.property.name === 'getElementsByName'){
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i][2] === node.arguments[0].value) {
        return true;
      }
    }
    return false;
  }
  //We get a dangerous Element of a certain ID
  else if(node.callee.property.name === 'getElementByID'){
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i][3] === node.arguments[0].value) {
        return true;
      }
    }
    return false;
  }
  else{
    return false;
  }
}

module.exports = function (tree) {
	//called when a warning happens
	function pushWarning(type, name, start, end){
		tree.data.problems.push({
			'type': type,
			'message': 'To put the user defined variable ' + name + ' into the DOM tree is a risk',
			'weight': 5,
			'position': {
			'start': start,
			'end': end
			}
		});
	}
	
	//called when a function is used that might be risky
	function pushRisk(name, start, end){
		tree.data.problems.push({
			'type': 'warning',
			'message': 'To put the user defined variable ' + name + ' into the DOM tree might be a risk',
			'weight': 3,
			'position': {
			'start': start,
			'end': end
			}
		});
	}
	
  //First big walk creates our lists.
  walk.recursive(tree.data.cfg, {}, {
    //We will have to go to the VariableDeclarators over the VariableDeclarations for some reason.
    VariableDeclaration: function (node, state, c) {
      var declarator = node.declarations;
      for(var i = 0; i < declarator.length; i++){
        var subnode = declarator[i].init;
        //prompts,created Elements and Elements gotten are monitored
        if(subnode.type === 'CallExpression'
          && dangerousNode(subnode)){
            var name = declarator[i].id.name; //Variable Name
            var type;
            if(subnode.arguments[0].type === 'Literal'){
              type = subnode.arguments[0].value; //Variable type (e.g. 'input', 'span', 'button' etc.)
            }
            else if(subnode.arguments[0].type === 'MemberExpression'){
              var memNode = subnode.arguments[0];
              while(memNode.object.type === 'MemberExpression'){
                memNode = memNode.object;
              }
              type = memNode.object.name; //e.g. saves inputs[i].value as inputs
            }
            var nameType = new Array(name, type, [], []);
            //If we get Elements by Tag Name, then we only need to monitor the value,
            //if it actually returns something.
            if(!containsName(inputs, name)){
              inputs.push(nameType);
              assignments.push(new Array(name, true, getAssignedValue(subnode), node.start, node.end));
            }
        }
      }
    },
    //Test for setAttribute
    CallExpression: function (node, state, c){
      if(node.callee.type === 'MemberExpression')
      {
        if(node.callee.property.name === 'setAttribute')
        {
          //Name is applied
          if(node.arguments[0].value === 'name')
          {
            for (var i = 0; i < inputs.length; i++){
              if(inputs[i][0] === node.callee.object.name){
                inputs[i][2] = node.arguments[1].value;
              }
            }
          }
          //ID is applied
          else if(node.arguments[0].value === 'id')
          {
            for (var i = 0; i < inputs.length; i++){
              if(inputs[i][0] === node.callee.object.name){
                inputs[i][3] = node.arguments[1].value;
              }
            }
          }
        }
      }
    },
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
        //get Attribute Name
        var name
        if(node.left.type === 'MemberExpression'){
          name = node.left.object.name;
        }
        else{
          name = node.left.name;
        }
        //Is monitored Value newly assigned?
        if (containsName(inputs,name)){  
          //Name or ID of input is Assigned
          if(node.right.type === 'Literal'){
            if(node.left.property !== undefined
            && node.left.property.name === 'name'){
              for (var i = 0; i < inputs.length; i++){
                if(inputs[i][0] === name){
                  inputs[i][2] = node.right.value;
                }
              }
            }
            else if(node.left.property !== undefined
            && node.left.property.name === 'id'){
              for (var i = 0; i < inputs.length; i++){
                if(inputs[i][0] === name){
                  inputs[i][3] = node.right.value;
                }
              }
            }          
          }
          //Only if it's a true assignemnt of the entire Variable
          if(name === node.left.name){
            assignments.push(new Array(name, dangerous, getAssignedValue(node.right) ,node.start, node.end));
          }
        }
				//Variable takes value of another dangerous one
				else if(node.right.type == 'Identifier' 
				&& containsName(inputs, node.right.value)){
					assignments.push(new Array(node.left.name, getLastName(assignments, node.right.value)[1], node.right.value ,node.start, node.end));
				}
        //Defined variable gets dangerous value
        else if(dangerous){
          inputs.push(new Array(node.left.name, node.right.callee.name, [], []));
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
  
  //Final walk to give out all risks and warnings
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      //Every appended Object will (for now) throw an error, even if the container isn't added to the body.
      if((node.callee.property !== undefined 
        && node.callee.property.name === 'appendChild') || 
		(node.callee.property !== undefined && node.callee.property.name === 'createElement')){
        //Go into lowest CallExpression in chain until you reach a document call
        var subNode = node;
        while(subNode.arguments[0] !== undefined 
          && subNode.arguments[0].type === 'CallExpression' 
          && !(subNode.callee.object !== undefined 
          && subNode.callee.object.name === 'document')){
          subNode = subNode.arguments[0];
        }      
        //Go through the different chain design to find variable name.
        //Go to deepest Object
        var objectNode = subNode.callee.object;
        while(objectNode.object !== undefined){
          objectNode = objectNode.object;
        }
        if(objectNode.name === 'document'
          || containsName(inputs, subNode.arguments[0].name)){
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
		  else if(subNode.arguments[0].type === 'Literal'){
				for (var i = 0; i < inputs.length; i++) {
					if (inputs[i][1] === subNode.arguments[0].value) {
						name = inputs[i][0];
					}
				}
		  }
		  
          //If value to be appanded come from a function, then take the function name.
					else if(subNode.arguments[0].type === 'CallExpression'){
            var nameNode = subNode.arguments[0];
            if(subNode.arguments[0].callee.name !== undefined){
              name = subNode.arguments[0].callee.name;
            }
            else{
              while(nameNode.arguments[0].type === 'CallExpression'){
                nameNode = nameNode.arguments[0];
              }
              name =  nameNode.callee.object.name + '.' 
              + nameNode.callee.property.name + '("' + nameNode.arguments[0].value + '")';
            }
					}
          //Last assignment will be used.
          var nowDangerous = dangerousNode(subNode);
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
            || contains(evilFunctions,name)
            || (subNode.arguments[0].type === 'CallExpression')
            && dangerousNode(subNode.arguments[0])){
						pushWarning('risk', name, node.start, node.end);
          }
		  //Push warning for function that might be risky
		  else if(name !== undefined){
			pushRisk(name, node.start, node.end)
		  }
        }
      }
    }
  });    //graph.domio = 'success';
};