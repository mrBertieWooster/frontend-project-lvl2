#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();
program.
    option('-h, --help', 'output usage information')

program.version('0.0.1', '-V, --version', 'output the version number');
program.parse(process.argv);
