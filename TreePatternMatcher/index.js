module.exports = {
  expressions: function (cfg, pattern, iterator) {
    expressionWalker(cfg.body, function(node) {
      if (compare(node, pattern)) {
        iterator(node);
      }
    });
  }
};

var compare = function(node, pattern) {
  if (node === pattern) {
      return true;
  }
  if ((node instanceof String && pattern instanceof String) ||
     (node instanceof Number && pattern instanceof Number)) {
      return node.toString() === pattern.toString();
  }
  if (!(node instanceof Object && pattern instanceof Object)) {
      return false;
  }
  for (var p in pattern) {
    if (pattern.hasOwnProperty(p)) {
      if(!node.hasOwnProperty(p) || typeof pattern[p] !== typeof node[p] || !compare(node[p], pattern[p])) {
        return false;
      }
    }
  }
  return true;
}

var expressionWalker = function(body, iterator) {
  for (var node in body) {
    iterator(node);
    // TODO find every sub expressions body and walk over it with expressionWalker(subexpressionsbody, pattern, iterator);
  };
}