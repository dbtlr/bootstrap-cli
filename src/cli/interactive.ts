import Enquirer from 'enquirer';
import { BootstrapConfig } from '../types';

const { prompt } = Enquirer;

export async function runInteractive(
  initialConfig: Partial<BootstrapConfig> = {}
): Promise<BootstrapConfig> {
  const answers = await prompt<{
    projectName: string;
    projectPath: string;
    packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
    typescript: boolean;
    linter: 'oxlint' | 'eslint' | 'none';
    formatter: 'prettier' | 'none';
    testing: 'vitest' | 'jest' | 'none';
    git: boolean;
  }>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      initial: initialConfig.projectName || '',
      validate: (value: string) => (value.length > 0 ? true : 'Project name is required'),
    },
    {
      type: 'input',
      name: 'projectPath',
      message: 'Project path:',
      initial: (answers: { projectName: string }) =>
        initialConfig.projectPath || `./${answers.projectName}`,
    },
    {
      type: 'select',
      name: 'packageManager',
      message: 'Package manager:',
      initial: initialConfig.packageManager || 'pnpm',
      choices: ['pnpm', 'npm', 'yarn', 'bun'],
    } as never,
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Use TypeScript?',
      initial: initialConfig.typescript ?? true,
    },
    {
      type: 'select',
      name: 'linter',
      message: 'Linter:',
      initial: initialConfig.linter || 'oxlint',
      choices: ['oxlint', 'eslint', 'none'],
    } as never,
    {
      type: 'select',
      name: 'formatter',
      message: 'Formatter:',
      initial: initialConfig.formatter || 'oxfmt',
      choices: ['oxfmt', 'prettier', 'none'],
    } as never,
    {
      type: 'select',
      name: 'testing',
      message: 'Testing framework:',
      initial: initialConfig.testing || 'vitest',
      choices: ['vitest', 'jest', 'none'],
    } as never,
    {
      type: 'confirm',
      name: 'git',
      message: 'Initialize git repository?',
      initial: initialConfig.git ?? true,
    },
  ]);

  return answers;
}
