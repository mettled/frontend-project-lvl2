#!/usr/bin/env node
import gendiff from '..';

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'object')
  .action((firstConfig, secondConfig, cmdObj) => {
    console.log(gendiff(firstConfig, secondConfig, cmdObj.format));
  });

program.parse(process.argv);
