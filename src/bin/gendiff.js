#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import getDiff from '../index.js';

const packageJson = JSON.parse(readFileSync('../../package.json'));
const version = packageJson.version || 0;
const description = packageJson.description || '';

const program = new Command();
program
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format [type]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .description(description, {
    filepath1: 'path to the first file',
    filepath2: 'path to the second file',
  })
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);
