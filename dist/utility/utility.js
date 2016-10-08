#! /usr/bin/env node
"use strict";
const program = require('commander');
const fs = require('fs');
const Commands = require('../shared/commands');
// Global defines.
program
    .version('1.4.0');
// Analyze commands.
program
    .command('analyze [selectors...]')
    .description('analyzes stored JSON people file (or downloads) and selects the data by [selectors] (optional selectors, e.g., "name_slug=barack-obama").')
    .action((selectors) => {
    var fileName = 'people.json';
    if (!fs.existsSync(fileName)) {
        console.log();
        console.log('Obtaining data...');
        Commands.downloadAndSavePeople(fileName).then(() => {
            Commands.analyze(fileName, selectors).catch(console.error);
        });
    }
    else {
        Commands.analyze(fileName, selectors).catch(console.error);
    }
});
// Clean commands.
program
    .command('clean [fileName]')
    .description('deletes file at path <fileName>.')
    .action((fileName) => {
    fs.unlinkSync(fileName);
});
// Get commands.
program
    .command('get <type> <dest>')
    .description('gets <type> (statements/people) as JSON and save to <dest> (file path).')
    .action((type, dest) => {
    if (type === 'people') {
        Commands.downloadAndSavePeople(dest).catch(console.error);
    }
    else if (type === 'statements') {
        Commands.downloadAndSaveStatements(dest).catch(console.error);
    }
    else {
        throw 'Unknown type.';
    }
});
// Global directives.
program.parse(process.argv);
//# sourceMappingURL=utility.js.map