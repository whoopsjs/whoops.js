$(document).ready(function(){
    var problemsInput;;

    // load file containing the problems and parse it from JSON
    $.ajax({
        url:    'problems.js',
        success: function(result) {
            // problemsInput = eval(result);
            problemsInput = $.parseJSON(result);
        },
        async:   false
    });

    // go through problems and set the problem-weight propers
    for (var i = 0; i < problemsInput.length; ++i) {
        problemsInput[i].problemWeight = problemsInput[i].weight;
    };

    // add the first node
    var problemsToAdd = {
        "message": "root",
        "problemWeight": 1
    };

    // add problems
    problemsToAdd.children = problemsInput;

    // draw visualization
    var myFlower = new CodeFlower("#visualization", $(window).width(), $(window).height());
    myFlower.update(problemsToAdd);

});
