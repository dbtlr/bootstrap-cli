#!/usr/bin/env node

// Production entry point - uses built code from dist/
import { main } from '../dist/index.mjs';

main(process.argv.slice(2));
