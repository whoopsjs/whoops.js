This small tool will help you to find dangerous parts within your Javascript code.

# Getting Started
1. Download and install [node.js](http://nodejs.org/download/)

2. Download components from project

3. Move files to preferred path

4. Change directory to installation path

    `cd /path/to/project`


5. Install needed packages
    ```
    cd ControlFlowGraph
    npm install
    cd ..
    cd MainProgram
    npm install
    cd ..
    cd GraphVisualization
    npm install
    bower install
    grunt build
    ```

## Test Your File

`node index.js /path/to/your.js [options]`

## Commands
```
inspect <file>      inspect the input file
visualize <file>    open a visualization of the inspected file in a browser
```

## Options
```
-h, --help          output usage information
-g, --show-graph    Print the full control flow graph
```

# Contributing
Take a look at our wiki. Especially this page: [Contributing](https://github.com/whoopsjs/whoops.js/wiki/Contributing)
