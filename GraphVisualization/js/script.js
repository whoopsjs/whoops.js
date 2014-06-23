$(document).ready(function(){


    var problemsInput = [ { type: 'risk',
        message: 'using eval() is not safe',
        weight: 10,
        position: { start: 961, end: 1014 } },
      { type: 'risk',
        message: 'using setTimeout() is not safe',
        weight: 1,
        position: { start: 1708, end: 1773 } },
      { type: 'risk',
        message: 'using setInterval() is not safe',
        weight: 1,
        position: { start: 2007, end: 2073 } },
      { type: 'risk',
        message: 'using setImmediate() is not safe',
        weight: 1,
        position: { start: 2310, end: 2371 } },
      { type: 'risk',
        message: 'using execScript() is not safe',
        weight: 1,
        position: { start: 2611, end: 2681 } },
      { type: 'risk',
        message: 'using crypto.generateCRMFRequest() is not safe',
        weight: 1,
        position: { start: 3068, end: 3190 } },
      { type: 'risk',
        message: 'assigning a user controlled value to ScriptElement.src is not safe',
        weight: 1,
        position: { start: 3515, end: 3557 } },
      { type: 'risk',
        message: 'assigning a user controlled value to ScriptElement.text is not safe',
        weight: 1,
        position: { start: 3899, end: 3970 } },
      { type: 'risk',
        message: 'assigning a user controlled value to ScriptElement.textContent is not safe',
        weight: 1,
        position: { start: 4335, end: 4413 } },
      { type: 'risk',
        message: 'assigning a user controlled value to ScriptElement.innerText is not safe',
        weight: 1,
        position: { start: 4777, end: 4853 } } ];

    // Durch Probleme gehen und weight korrekt für Verarbeitung setzen
    for (var i = 0; i < problemsInput.length; ++i) {
        problemsInput[i].problemWeight = problemsInput[i].weight;
    };


    var problemsToAdd = {
        "message": "testfile.js",
        "language": "Javascript",
    };

    // Probleme einfügen
    problemsToAdd.children = problemsInput;

    // Graphen zeichnen
    var myFlower = new CodeFlower("#visualization", $(window).width(), $(window).height());
    myFlower.update(problemsToAdd);

});
