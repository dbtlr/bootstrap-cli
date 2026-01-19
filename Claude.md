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

- **tsx**: TypeScript execute - run TypeScript directly without building
  - Used for development mode (`pnpm start`)
  - Instant execution - no build step required
  - Full ESM and TypeScript support
  - Significantly faster development iteration

- **tsdown**: Ultra-fast TypeScript bundler and builder
  - Used for production builds
  - Supports declaration files (.d.ts) generation
  - Handles both CommonJS and ESM outputs
  - Optimized output for distribution

### Code Quality

- **oxlint**: Blazing fast linter from the oxc project
  - 50-100x faster than ESLint
  - Type-aware linting capabilities
  - Smart defaults for TypeScript and JavaScript
  - Configuration: `oxlintrc.json`

- **oxfmt**: Blazing fast formatter from the oxc project
  - Part of the high-performance oxc toolchain
  - Configured with single quotes as requested
  - Extremely fast formatting (50-100x faster than Prettier)
  - Consistent code style across the project
  - Configuration: `.oxfmtrc.json`

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
- Validates code formatting with oxfmt
- Ensures consistent code style
- Single quotes, semicolons, trailing commas
- Extremely fast execution

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
├── .oxfmtrc.json          # oxfmt configuration
└── package.json           # Package manifest
```

## Scripts Reference

```json
{
  "start": "Run CLI in development mode (tsx - no build required)",
  "cli": "Alias for start",
  "build": "Build the project with tsdown for production",
  "dev": "Build in watch mode (continuous building)",
  "typecheck": "Type check without emitting files",
  "format": "Format code with oxfmt",
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

### No-Build Development (Recommended)

This project uses **tsx** for instant TypeScript execution during development - no build step required!

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run CLI in development mode**:
   ```bash
   pnpm start -- --help              # Run CLI with tsx (no build!)
   pnpm start -- my-project          # Test creating a project
   pnpm start -- --interactive       # Test interactive mode
   ```

3. **Make changes**: Edit files in `src/` - changes are reflected immediately on next run

4. **Write tests**: Add tests in `test/`

5. **Run quality checks**:
   ```bash
   pnpm run typecheck    # Check types
   pnpm run format       # Format code
   pnpm run lint         # Lint code
   pnpm run test         # Run tests
   pnpm run quality      # Run all checks
   ```

### Production Build

When ready to publish or test the production bundle:

1. **Build the project**:
   ```bash
   pnpm run build        # Creates dist/ with optimized code
   ```

2. **Test production CLI**:
   ```bash
   node bin/cli.mjs --help  # Uses built code from dist/
   ```

3. **Publish**:
   ```bash
   pnpm publish          # Runs quality checks + build automatically
   ```

## Development vs Production

| Mode | Command | Uses | Best For |
|------|---------|------|----------|
| **Development** | `pnpm start` | tsx + TypeScript source | Fast iteration, debugging |
| **Production** | `node bin/cli.mjs` | Compiled dist/ bundle | Published package, final testing |
| **Watch** | `pnpm dev` | tsdown watch mode | Testing bundled output |

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

### oxfmt (.oxfmtrc.json)
- Single quotes (as requested)
- Semicolons enabled
- Trailing commas (ES5)
- 100 character line width
- 2-space indentation
- Extremely fast formatting (part of oxc toolchain)

### vitest (vitest.config.ts)
- Node environment
- Global test APIs
- V8 coverage provider
- HTML, JSON, and text coverage reports

## Notable Package Choices

### Why tsx for Development?
- **No build step required**: Run TypeScript directly
- **Instant execution**: Changes are available immediately on next run
- **Full TypeScript support**: All features work, including ESM
- **Faster iteration**: No waiting for builds during development
- **Production still optimized**: tsdown handles production builds

This two-tier approach (tsx for dev, tsdown for prod) provides the best of both worlds:
- Fast development with instant feedback
- Optimized, bundled output for distribution

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

1. **oxlint-tsgolint**: Package mentioned in requirements not found
   - Using oxlint with type-aware configuration instead
   - Please clarify if this was a typo or specific requirement

## Future Considerations

- Consider adding oxc-transform for code transformations
- Evaluate oxc parser for custom tooling
- Monitor oxc ecosystem for new tools and updates
