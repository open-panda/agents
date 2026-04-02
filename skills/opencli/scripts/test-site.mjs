#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const site = process.argv[2]?.trim();

if (!site) {
  console.error('Usage: npm run test:site -- <site>');
  process.exit(1);
}

const repoRoot = path.resolve(new URL('..', import.meta.url).pathname);
const srcDir = path.join(repoRoot, 'src');

function runStep(label, command, args) {
  console.log(`\n==> ${label}`);
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function findSiteTests() {
  return walk(srcDir)
    .filter(filePath => filePath.endsWith('.test.ts'))
    .filter(filePath => {
      const normalized = toPosix(path.relative(repoRoot, filePath));
      return normalized.includes(`/clis/${site}/`) || normalized.includes(`/${site}.test.ts`);
    })
    .sort();
}

runStep('Typecheck', 'npm', ['run', 'typecheck']);
runStep('Targeted verify', 'npx', ['tsx', 'src/main.ts', 'verify', site]);

const testFiles = findSiteTests();
if (testFiles.length === 0) {
  console.log(`\nNo site-specific vitest files found for "${site}". Skipping full vitest run.`);
  process.exit(0);
}

runStep(
  `Site tests (${site})`,
  'npx',
  ['vitest', 'run', ...testFiles.map(filePath => path.relative(repoRoot, filePath))],
);
