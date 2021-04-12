#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();
program
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.', {
      filepath1: 'path to the first file',
      filepath2: 'path to the second file'
    });

program.parse(process.argv);