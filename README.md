# dbtlr-bootstrap

A blazing-fast CLI tool for bootstrapping new applications with modern, best-in-class tooling.

## Features

- **Interactive & CLI modes**: Use prompts or pass arguments directly
- **Modern tooling**: TypeScript, pnpm, oxlint, vitest, and more
- **Fast**: Powered by oxlint (50-100x faster than ESLint) and tsdown
- **Configurable**: Use c12 for flexible configuration
- **Type-safe**: Full TypeScript support with Zod validation
- **Quality-focused**: Built-in quality gateway with CI/CD integration

## Installation

```bash
# Using pnpm (recommended)
pnpm add -g dbtlr-bootstrap

# Using npm
npm install -g dbtlr-bootstrap

# Using yarn
yarn global add dbtlr-bootstrap
```

## Usage

### Interactive Mode

```bash
dbtlr-bootstrap --interactive
```

This will guide you through setting up your new project with prompts.

### CLI Mode

```bash
# Quick start with project name
dbtlr-bootstrap my-awesome-project

# Full customization
dbtlr-bootstrap my-project --pm pnpm --no-git
```

### Options

```
-h, --help                 Show help message
-v, --version              Show version number
-i, --interactive          Run in interactive mode
--verbose                  Show detailed output
-n, --name <name>          Project name
-p, --path <path>          Project path (defaults to ./<name>)
--pm, --package-manager    Package manager (pnpm, npm, yarn, bun)
--no-git                   Skip git initialization
--no-ts, --no-typescript   Skip TypeScript setup
```

## Development

This project uses pnpm for package management. See [Claude.md](./Claude.md) for detailed documentation about the stack and development workflow.

### Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run in development mode (watch)
pnpm run dev
```

### Quality Gateway

The project enforces a strict quality gateway:

```bash
# Run the complete quality gateway
pnpm run quality

# Individual steps (run in this order)
pnpm run typecheck      # TypeScript type checking
pnpm run format:check   # oxfmt formatting check
pnpm run lint           # oxlint (type-aware)
pnpm run test           # vitest tests
```

All pull requests must pass the quality gateway in CI/CD.

### Testing

```bash
# Run tests
pnpm test

# Watch mode
pnpm run test:watch

# With UI
pnpm run test:ui

# With coverage
pnpm run test:coverage
```

## Technology Stack

- **TypeScript**: Strict type safety
- **pnpm**: Fast, efficient package manager
- **tsdown**: Ultra-fast TypeScript bundler
- **oxlint**: Blazing fast linter (50-100x faster than ESLint)
- **oxfmt**: Blazing fast formatter (configured with single quotes)
- **vitest**: Fast, modern test framework
- **consola**: Beautiful console logging
- **enquirer**: Interactive CLI prompts
- **listr2**: Task list manager
- **zod**: TypeScript-first schema validation
- **c12**: Configuration loader

See [Claude.md](./Claude.md) for detailed information about the stack and architectural decisions.

## Configuration

You can create a `bootstrap.config.ts` (or `.js`, `.json`, `.mjs`) file in your project root:

```typescript
export default {
  packageManager: 'pnpm',
  typescript: true,
  linter: 'oxlint',
  formatter: 'prettier',
  testing: 'vitest',
  git: true,
};
```

## License

MIT