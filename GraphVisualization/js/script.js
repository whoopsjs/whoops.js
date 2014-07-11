var arrayOfLines;
$(document).ready(function(){
    // variable to save analyzed code
    var analyzedCode;

    // variable to keep lines as array
    // var arrayOfLines;

    $.ajax({
        url: "code.txt",
        type: "GET",
        cache: false,
        async: false,
        success:function(data) {
            // Split text to lines
            arrayOfLines = data.split(/\r?\n/);

            // put data in
            $('#sourcecode').html('<pre class="brush: js">'+data+'</pre>');

            // start highlighting
            SyntaxHighlighter.all();

            analyzedCode = data;
        }
    });


    // load file containing the problems and parse it from JSON
    $.getJSON( "problems.js", function(result) {
        // go through problems and prepare them
        for (var i = 0; i < result.data.problems.length; ++i) {
            // set the problem-weight propers
            result.data.problems[i].problemWeight = result.data.problems[i].weight;

            // set line number
            // TODO
            result.data.problems[i].lineNumber = getLineNumberForStartPosition(result.data.problems[i].position.start);
        };

        // add the first node
        var problemsToAdd = {
            "message": "root",
            "problemWeight": 1
        };

        // add problems
        problemsToAdd.children = result.data.problems;

        // draw visualization
        var myFlower = new CodeFlower("#visualization", 500, 500);
        myFlower.update(problemsToAdd);
    })
    .fail(function() {
        alert( "error" );
    });

    // Function to get line number for string
    function getLineNumberForStartPosition(start) {
        // console.log("start: " + start);
        var characterCountEndThisLine, characterCountEndNextLine;
        // var charactersPassed = 0;
        // for (i=0;i < arrayOfLines.length-1;i++) {
        //     characterCountEndThisLine = charactersPassed + arrayOfLines[i].length;
        //     characterCountEndNextLine = charactersPassed + arrayOfLines[i+1].length;

        //     if (characterCountEndNextLine > start) {
        //         console.log("this: " + characterCountEndThisLine);
        //         console.log("next: " + characterCountEndNextLine);
        //         return i+1;
        //     } else {
        //         charactersPassed = charactersPassed +  characterCountEndThisLine;
        //     }
        // }
        // return 1;
        var i = 0;
        while (start > 0) {
            start = start - arrayOfLines[i].length;
            i++;
        }
        return i;
    }
});
