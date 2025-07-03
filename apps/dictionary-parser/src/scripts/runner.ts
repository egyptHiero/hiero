import { execSync } from 'node:child_process';

const args = process.argv
  .slice(2)
  .map((arg) => `--args="${arg}"`)
  .join(' ');

execSync(`nx serve dictionary-parser ${args}`, {
  stdio: 'inherit',
  env: { ...process.env, 'NX_TUI': 'false' },
});
