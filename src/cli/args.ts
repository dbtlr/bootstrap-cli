import { BootstrapConfig } from '../types';

export interface ParsedArgs {
  config: Partial<BootstrapConfig>;
  interactive: boolean;
  verbose: boolean;
  help: boolean;
  version: boolean;
}

export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    config: {},
    interactive: false,
    verbose: false,
    help: false,
    version: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '-h':
      case '--help':
        result.help = true;
        break;

      case '-v':
      case '--version':
        result.version = true;
        break;

      case '-i':
      case '--interactive':
        result.interactive = true;
        break;

      case '--verbose':
        result.verbose = true;
        break;

      case '-n':
      case '--name':
        if (i + 1 < args.length) {
          result.config.projectName = args[++i];
        }
        break;

      case '-p':
      case '--path':
        if (i + 1 < args.length) {
          result.config.projectPath = args[++i];
        }
        break;

      case '--pm':
      case '--package-manager':
        if (i + 1 < args.length) {
          const pm = args[++i];
          if (pm === 'pnpm' || pm === 'npm' || pm === 'yarn' || pm === 'bun') {
            result.config.packageManager = pm;
          }
        }
        break;

      case '--no-git':
        result.config.git = false;
        break;

      case '--no-ts':
      case '--no-typescript':
        result.config.typescript = false;
        break;

      default:
        // If it's a positional argument and we don't have a project name yet
        if (arg && !arg.startsWith('-') && !result.config.projectName) {
          result.config.projectName = arg;
        }
        break;
    }
  }

  return result;
}

export function printHelp(): void {
  console.log(`
dbtlr-bootstrap - Fast CLI tool for bootstrapping new applications

USAGE:
  dbtlr-bootstrap [options] [project-name]

OPTIONS:
  -h, --help                 Show this help message
  -v, --version              Show version number
  -i, --interactive          Run in interactive mode
  --verbose                  Show detailed output
  -n, --name <name>          Project name
  -p, --path <path>          Project path (defaults to ./<name>)
  --pm, --package-manager    Package manager (pnpm, npm, yarn, bun)
  --no-git                   Skip git initialization
  --no-ts, --no-typescript   Skip TypeScript setup

EXAMPLES:
  # Interactive mode
  dbtlr-bootstrap --interactive

  # Quick setup with name
  dbtlr-bootstrap my-project

  # Custom configuration
  dbtlr-bootstrap my-project --pm npm --no-git
`);
}
