import { consola } from 'consola';
import { Listr } from 'listr2';
import { resolve } from 'pathe';
import { BootstrapConfigSchema, BootstrapOptions } from './types';
import { loadConfig } from './config';

export async function bootstrap(options: BootstrapOptions = {}): Promise<void> {
  // Load configuration from c12
  const loadedConfig = await loadConfig();

  // Merge configurations: CLI args > loaded config > defaults
  const mergedConfig = {
    ...loadedConfig,
    ...options.config,
  };

  // Validate configuration
  const config = BootstrapConfigSchema.parse(mergedConfig);

  const projectPath = resolve(config.projectPath || `./${config.projectName}`);

  consola.info(`Bootstrapping project: ${config.projectName}`);
  consola.info(`Location: ${projectPath}`);

  const tasks = new Listr([
    {
      title: 'Creating project directory',
      task: async () => {
        // TODO: Implement directory creation
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
    },
    {
      title: 'Initializing package manager',
      task: async () => {
        // TODO: Implement package manager initialization
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => true,
    },
    {
      title: 'Setting up TypeScript',
      task: async () => {
        // TODO: Implement TypeScript setup
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => config.typescript,
    },
    {
      title: `Setting up ${config.linter}`,
      task: async () => {
        // TODO: Implement linter setup
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => config.linter !== 'none',
    },
    {
      title: `Setting up ${config.formatter}`,
      task: async () => {
        // TODO: Implement formatter setup
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => config.formatter !== 'none',
    },
    {
      title: `Setting up ${config.testing}`,
      task: async () => {
        // TODO: Implement testing framework setup
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => config.testing !== 'none',
    },
    {
      title: 'Initializing git repository',
      task: async () => {
        // TODO: Implement git initialization
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      enabled: () => config.git,
    },
  ]);

  try {
    await tasks.run();
    consola.success('Project bootstrapped successfully!');
  } catch (error) {
    consola.error('Failed to bootstrap project:', error);
    throw error;
  }
}
