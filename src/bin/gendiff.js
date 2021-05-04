#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import getDiff from '../index.js';

const program = new Command();
program
  .version('0.3.18', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format [type]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .description('get difference between two files', {
    filepath1: 'path to the first file',
    filepath2: 'path to the second file',
  })
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);
