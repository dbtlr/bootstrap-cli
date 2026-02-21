import { loadConfig as loadC12Config } from 'c12';
import { BootstrapConfig } from './types';

export async function loadConfig(): Promise<Partial<BootstrapConfig>> {
  const { config } = await loadC12Config<Partial<BootstrapConfig>>({
    name: 'bootstrap',
    defaults: {
      packageManager: 'pnpm',
      typescript: true,
      linter: 'oxlint',
      formatter: 'prettier',
      testing: 'vitest',
      git: true,
    },
    configFile: 'bootstrap.config',
  });

  return config || {};
}
