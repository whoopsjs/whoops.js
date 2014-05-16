var esprima = require('esprima'),
    pd = require('pretty-data').pd,
    fs = require('fs');

// console.log(esprima);

fs.readFile('testfile.js', 'utf8', function(err, input) {
    options = {

    };
    var result = esprima.parse(input, options);
    console.log(pd.json(result));
});
