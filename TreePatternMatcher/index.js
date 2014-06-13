module.exports = function (cfg, pattern, iterator) {
  walker(cfg.body, pattern, iterator);
};

var match = function(node, pattern) {
  return node == pattern; // TODO sub objects etc.
}

var walker = function(body, pattern, iterator) {
  for (var i = 0, n = body.length; i < n; ++i) {
    var node = body[i];
    if (match(node, pattern)) {
      iterator(node);
    }
    // TODO find every sub body and walk over it with walker(subbody, pattern, iterator);
  };
}