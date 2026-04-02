/**
 * Utility functions for browser operations
 */

/**
 * Wrap JS code for CDP Runtime.evaluate:
 * - Already an IIFE `(...)()` → send as-is
 * - Arrow/function literal → wrap as IIFE `(code)()`
 * - `new Promise(...)` or raw expression → send as-is (expression)
 */
export function wrapForEval(js: string): string {
  if (typeof js !== 'string') return 'undefined';
  const code = js.trim();
  if (!code) return 'undefined';

  // Already an IIFE: `(async () => { ... })()` or `(function() {...})()`
  if (/^\([\s\S]*\)\s*\(.*\)\s*$/.test(code)) return code;

  // Arrow function: `() => ...` or `async () => ...`
  if (/^(async\s+)?(\([^)]*\)|[A-Za-z_]\w*)\s*=>/.test(code)) return `(${code})()`;

  // Function declaration: `function ...` or `async function ...`
  if (/^(async\s+)?function[\s(]/.test(code)) return `(${code})()`;

  // Everything else: bare expression, `new Promise(...)`, etc. → evaluate directly
  return code;
}
