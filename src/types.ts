import { z } from 'zod';

export const BootstrapConfigSchema = z.object({
  projectName: z.string().min(1),
  projectPath: z.string().optional(),
  packageManager: z.enum(['pnpm', 'npm', 'yarn', 'bun']).default('pnpm'),
  typescript: z.boolean().default(true),
  linter: z.enum(['oxlint', 'eslint', 'none']).default('oxlint'),
  formatter: z.enum(['prettier', 'none']).default('prettier'),
  testing: z.enum(['vitest', 'jest', 'none']).default('vitest'),
  git: z.boolean().default(true),
});

export type BootstrapConfig = z.infer<typeof BootstrapConfigSchema>;

export interface BootstrapOptions {
  config?: Partial<BootstrapConfig>;
  interactive?: boolean;
  verbose?: boolean;
}
