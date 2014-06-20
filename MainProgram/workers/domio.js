var walk = require('acorn/util/walk');

module.exports = function (tree) {
  walk.recursive(tree.data.cfg, {}, {
    CallExpression: function (node, state, c) {
      if(node.callee.type === 'MemberExpression'
        && node.callee.name === 'document'){
        if(node.callee.property.name === 'getElementById'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'getElementByName'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'getElementByTagName'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'documentElement'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'images'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'domain'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'body'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Output',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createAttribute'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createComment'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createDocumentFragment'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createElement'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createTextNode'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createTextNode'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
            'weight': 5,
            'position': {
              'start': node.start,
              'end': node.end
            }
          });
        }
        if(node.callee.property.name === 'createTextNode'){
          tree.data.problems.push({
            'type': 'warning',
            'message': 'Input',
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