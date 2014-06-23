$(document).ready(function(){
    var jsonData = {
        "name": "test",
        "language": "HTML",
        "children": [
            {
                "name": "test2",
                "risk": 10,
            },
            {
                "name": "test3",
                "risk": 3,
            },
            {
                "name": "test4",
                "risk": 2,
            },
            {
                "name": "test6",
                "risk": 9,
            },
            {
                "name": "test6",
                "risk": 2,
            }
        ]
    };
    var myFlower = new CodeFlower("#visualization", $(window).width(), $(window).height());
    myFlower.update(jsonData);
    var problemsToAdd = [];
    var problemsInput = [ { type: 'risk',
    message: 'using eval() is not safe',
    weight: 1,
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

    // Durch Probleme gehen
    for (var i = 0; i < problemsInput.length; ++i) {
        console.log(problemsInput[i]);
    };

    // console.log(problemsInput.length);
});
