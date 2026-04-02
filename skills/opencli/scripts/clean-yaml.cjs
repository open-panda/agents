/**
 * Clean YAML files from dist/clis/ before copying fresh ones.
 */
const { readdirSync, rmSync, existsSync, statSync } = require('fs');
const path = require('path');

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (statSync(fp).isDirectory()) {
      walk(fp);
    } else if (/\.ya?ml$/.test(f)) {
      rmSync(fp);
    }
  }
}

walk('dist/clis');
