# Claude.md - Project Documentation

## Project Overview

`dbtlr-bootstrap` is a fast, modern CLI tool for bootstrapping new applications with best-in-class tooling. This project prioritizes performance, developer experience, and modern JavaScript/TypeScript tooling.

## Technology Stack

This project uses a carefully selected stack of modern, high-performance tools:

### Core Technologies

- **TypeScript**: Strict type safety with comprehensive compiler options
- **Node.js**: Runtime environment (ESM modules)
- **pnpm**: Fast, disk-efficient package manager

### Build & Development

- **tsdown**: Ultra-fast TypeScript bundler and builder
  - Used instead of tsc for faster builds
  - Supports declaration files (.d.ts) generation
  - Handles both CommonJS and ESM outputs

### Code Quality

- **oxlint**: Blazing fast linter from the oxc project
  - 50-100x faster than ESLint
  - Type-aware linting capabilities
  - Smart defaults for TypeScript and JavaScript
  - Configuration: `oxlintrc.json`

- **Prettier**: Code formatter
  - Configured with single quotes as requested
  - Consistent code style across the project
  - Note: oxfmt was requested but is not available as an npm package yet
  - Configuration: `.prettierrc.json`

### Testing

- **vitest**: Fast, Vite-powered test framework
  - Native ESM support
  - TypeScript support out of the box
  - Fast watch mode
  - Built-in coverage with v8
  - UI mode available with `@vitest/ui`
  - Configuration: `vitest.config.ts`

### CLI Libraries

- **consola**: Elegant console logger with proper formatting
- **enquirer**: Interactive command-line prompts
- **ora**: Elegant terminal spinners
- **listr2**: Terminal task list manager
- **boxen**: Create boxes in terminal output
- **chalk**: Terminal string styling
- **cli-table3**: Pretty unicode tables for CLI

### Utilities

- **zod**: TypeScript-first schema validation
- **c12**: Configuration loader with multiple format support
- **pathe**: Universal path utilities
- **std-env**: Runtime environment detection
- **debug**: Debugging utility

## Package Manager: pnpm

### Why pnpm?

1. **Disk Efficiency**: Uses a content-addressable store, saving significant disk space
2. **Speed**: Faster than npm and yarn for most operations
3. **Strict**: Better at catching dependency issues
4. **Monorepo Support**: Excellent workspace support

### Essential pnpm Commands

```bash
# Install dependencies
pnpm install

# Add a dependency
pnpm add <package>

# Add a dev dependency
pnpm add -D <package>

# Remove a dependency
pnpm remove <package>

# Update dependencies
pnpm update

# Run a script
pnpm run <script>
# or shorthand for common scripts
pnpm test
pnpm build

# List outdated dependencies
pnpm outdated

# Why a dependency is installed
pnpm why <package>

# Clean install (removes node_modules first)
pnpm install --frozen-lockfile
```

### pnpm Workspace Features

```bash
# Run command in all workspace packages
pnpm -r <command>

# Filter by package name
pnpm --filter <package-name> <command>
```

## Quality Gateway

The project enforces a strict quality gateway that must pass before code can be merged. The gateway runs in the following order:

### 1. Type Checking (`pnpm run typecheck`)
- Runs TypeScript compiler in no-emit mode
- Ensures all types are correct
- Catches type errors early

### 2. Formatting Check (`pnpm run format:check`)
- Validates code formatting with Prettier
- Ensures consistent code style
- Single quotes, semicolons, trailing commas

### 3. Linting (`pnpm run lint`)
- Runs oxlint with type-aware rules
- Checks for code quality issues
- Enforces best practices
- Extremely fast execution

### 4. Testing (`pnpm run test`)
- Runs all vitest tests
- Ensures functionality is intact
- Must have passing tests

### Running the Quality Gateway

```bash
# Run the complete quality gateway
pnpm run quality

# Run individual steps
pnpm run typecheck
pnpm run format:check
pnpm run lint
pnpm run test
```

## GitHub Actions

The quality gateway is automatically enforced on:
- All pull requests to main/develop branches
- All pushes to main/develop branches

The workflow:
1. Checks out code
2. Sets up Node.js and pnpm
3. Installs dependencies with caching
4. Runs typecheck → format check → lint → tests → build

See `.github/workflows/quality.yml` for configuration.

## Project Structure

```
bootstrap-cli/
├── src/                    # Source code
│   ├── index.ts           # Main exports
│   ├── types.ts           # Type definitions and schemas
│   ├── bootstrap.ts       # Core bootstrap logic
│   ├── config.ts          # Configuration loader (c12)
│   └── cli/               # CLI-specific code
│       ├── args.ts        # Argument parsing
│       └── interactive.ts # Interactive prompts
├── bin/                   # CLI entry points
│   └── cli.mjs            # Main CLI executable
├── test/                  # Test files
│   └── *.test.ts          # Vitest tests
├── dist/                  # Build output (gitignored)
├── .github/               # GitHub configuration
│   └── workflows/         # GitHub Actions
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest configuration
├── oxlintrc.json          # oxlint configuration
├── .prettierrc.json       # Prettier configuration
└── package.json           # Package manifest
```

## Scripts Reference

```json
{
  "build": "Build the project with tsdown",
  "dev": "Build in watch mode",
  "typecheck": "Type check without emitting files",
  "format": "Format code with Prettier",
  "format:check": "Check if code is formatted",
  "lint": "Lint code with oxlint",
  "test": "Run tests once",
  "test:watch": "Run tests in watch mode",
  "test:ui": "Run tests with UI",
  "test:coverage": "Run tests with coverage",
  "quality": "Run complete quality gateway"
}
```

## Development Workflow

1. **Start development**:
   ```bash
   pnpm install
   pnpm run dev  # Watch mode
   ```

2. **Make changes**: Edit files in `src/`

3. **Write tests**: Add tests in `test/`

4. **Check quality**:
   ```bash
   pnpm run quality
   ```

5. **Commit**: Quality gateway must pass

## Configuration Notes

### TypeScript (tsconfig.json)
- Strict mode enabled
- ESNext module resolution
- Bundler module resolution for maximum compatibility
- Source maps and declaration maps enabled
- Comprehensive strict checks (unused locals, parameters, etc.)

### oxlint (oxlintrc.json)
- TypeScript-specific rules enabled
- ESLint compatibility rules
- Import organization rules
- Unicorn rules for modern JS practices
- Node.js environment configured

### Prettier (.prettierrc.json)
- Single quotes (as requested)
- Semicolons enabled
- Trailing commas (ES5)
- 100 character line width
- 2-space indentation

### vitest (vitest.config.ts)
- Node environment
- Global test APIs
- V8 coverage provider
- HTML, JSON, and text coverage reports

## Notable Package Choices

### Why Not ESLint?
- oxlint is 50-100x faster
- Sufficient rule coverage for most projects
- Type-aware linting available
- Part of the high-performance oxc toolchain

### Why Not tsc for Building?
- tsdown is significantly faster
- Still generates declaration files
- Better for CLI applications
- Simplified build process

### Why Not Jest?
- vitest is faster and more modern
- Better TypeScript support out of the box
- ESM-first design
- Vite ecosystem benefits

## Known Limitations

1. **oxfmt**: Not available as npm package
   - Using Prettier as alternative
   - Monitor oxc project for oxfmt release

2. **oxlint-tsgolint**: Package mentioned in requirements not found
   - Using oxlint with type-aware configuration instead
   - Please clarify if this was a typo or specific requirement

## Future Considerations

- Add oxfmt when available in npm registry
- Consider adding oxc-transform for code transformations
- Evaluate oxc parser for custom tooling
- Monitor oxc ecosystem for new tools
