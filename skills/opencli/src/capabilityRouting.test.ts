import { describe, expect, it } from 'vitest';
import { Strategy, type CliCommand } from './registry.js';
import { shouldUseBrowserSession } from './capabilityRouting.js';

function makeCmd(partial: Partial<CliCommand>): CliCommand {
  return {
    site: 'test',
    name: 'command',
    description: '',
    args: [],
    ...partial,
  };
}

describe('shouldUseBrowserSession', () => {
  it('skips browser session for public fetch-only pipelines', () => {
    expect(shouldUseBrowserSession(makeCmd({
      browser: true,
      strategy: Strategy.PUBLIC,
      pipeline: [{ fetch: 'https://example.com/api' }, { select: 'items' }],
    }))).toBe(false);
  });

  it('keeps browser session for public pipelines with browser-only steps', () => {
    expect(shouldUseBrowserSession(makeCmd({
      browser: true,
      strategy: Strategy.PUBLIC,
      pipeline: [{ navigate: 'https://example.com' }, { evaluate: '() => []' }],
    }))).toBe(true);
  });

  it('keeps browser session for non-public strategies', () => {
    expect(shouldUseBrowserSession(makeCmd({
      browser: true,
      strategy: Strategy.COOKIE,
      pipeline: [{ fetch: 'https://example.com/api' }],
    }))).toBe(true);
  });

  it('keeps browser session for function adapters', () => {
    expect(shouldUseBrowserSession(makeCmd({
      browser: true,
      strategy: Strategy.PUBLIC,
      func: async () => [],
    }))).toBe(true);
  });
});
