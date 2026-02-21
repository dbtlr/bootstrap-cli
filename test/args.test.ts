import { describe, it, expect } from 'vitest';
import { parseArgs } from '../src/cli/args';

describe('parseArgs', () => {
  it('should parse project name from positional argument', () => {
    const result = parseArgs(['my-project']);
    expect(result.config.projectName).toBe('my-project');
  });

  it('should parse project name from --name flag', () => {
    const result = parseArgs(['--name', 'test-project']);
    expect(result.config.projectName).toBe('test-project');
  });

  it('should parse interactive flag', () => {
    const result = parseArgs(['--interactive']);
    expect(result.interactive).toBe(true);
  });

  it('should parse help flag', () => {
    const result = parseArgs(['--help']);
    expect(result.help).toBe(true);
  });

  it('should parse version flag', () => {
    const result = parseArgs(['-v']);
    expect(result.version).toBe(true);
  });

  it('should parse package manager', () => {
    const result = parseArgs(['--pm', 'npm']);
    expect(result.config.packageManager).toBe('npm');
  });

  it('should parse no-git flag', () => {
    const result = parseArgs(['--no-git']);
    expect(result.config.git).toBe(false);
  });

  it('should parse no-typescript flag', () => {
    const result = parseArgs(['--no-ts']);
    expect(result.config.typescript).toBe(false);
  });

  it('should parse multiple flags', () => {
    const result = parseArgs(['my-project', '--pm', 'pnpm', '--no-git', '--verbose']);
    expect(result.config.projectName).toBe('my-project');
    expect(result.config.packageManager).toBe('pnpm');
    expect(result.config.git).toBe(false);
    expect(result.verbose).toBe(true);
  });
});
