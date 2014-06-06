var program = require('commander');

program
  .option('-I, --input <file>', 'Input File');

program.parse(process.argv);
if (!program.input)
  program.help();
