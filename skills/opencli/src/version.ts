/**
 * Single source of truth for package version.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgJsonPath = path.resolve(__dirname, '..', 'package.json');

export const PKG_VERSION: string = (() => {
  try {
    return JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8')).version;
  } catch {
    return '0.0.0';
  }
})();
