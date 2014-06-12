var util = require('util');

module.exports = function (graph) {
    console.log(util.inspect(graph, {showHidden: false, depth: null}));
};
