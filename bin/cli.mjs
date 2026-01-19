#!/usr/bin/env node

import { consola } from 'consola';
import boxen from 'boxen';
import chalk from 'chalk';
import { bootstrap, parseArgs, printHelp, runInteractive } from '../dist/index.mjs';

const pkg = {
  name: 'dbtlr-bootstrap',
  version: '0.1.0',
};

async function main() {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);

  // Show version
  if (parsed.version) {
    console.log(pkg.version);
    process.exit(0);
  }

  // Show help
  if (parsed.help) {
    printHelp();
    process.exit(0);
  }

  // Welcome message
  console.log(
    boxen(chalk.bold.cyan(`${pkg.name} v${pkg.version}`), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
    })
  );

  try {
    let config = parsed.config;

    // Run interactive mode if requested or if no project name provided
    if (parsed.interactive || !config.projectName) {
      config = await runInteractive(config);
    }

    // Bootstrap the project
    await bootstrap({
      config,
      verbose: parsed.verbose,
    });
  } catch (error) {
    consola.error('Bootstrap failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  consola.error('Unexpected error:', error);
  process.exit(1);
});
