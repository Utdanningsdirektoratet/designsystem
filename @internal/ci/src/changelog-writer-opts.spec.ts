import { describe, expect, it } from 'vitest';
import { writerOpts } from './changelog-writer-opts.js';

const { transform } = writerOpts;

/**
 * Minimal parsed-commit shape expected by conventional-changelog-writer's
 * transform function (matches what `conventional-commits-parser` emits).
 */
function parsedCommit(overrides: Record<string, unknown> = {}) {
  return {
    type: 'feat',
    scope: null,
    subject: 'add button',
    merge: null,
    header: 'feat: add button',
    body: null,
    footer: null,
    notes: [],
    references: [],
    mentions: [],
    revert: null,
    hash: 'abc1234567890abcdef1234567890abcdef123456',
    ...overrides,
  };
}

/** Minimal writer context (the second argument to transform). */
const context = {
  host: 'https://github.com',
  owner: 'Utdanningsdirektoratet',
  repository: 'designsystem',
};

describe('changelog writerOpts.transform', () => {
  it('passes through feat commits', () => {
    const result = transform(parsedCommit({ type: 'feat' }), context);
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🚀 Features');
  });

  it('passes through fix commits', () => {
    const result = transform(parsedCommit({ type: 'fix' }), context);
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🩹 Fixes');
  });

  it('passes through perf commits', () => {
    const result = transform(parsedCommit({ type: 'perf' }), context);
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🏎 Performance Improvements');
  });

  it('passes through revert commits', () => {
    const result = transform(parsedCommit({ type: 'revert' }), context);
    expect(result).toBeDefined();
    expect(result!['type']).toBe('⏪ Reverts');
  });

  it('filters out hidden types (chore, ci, docs, …)', () => {
    for (const type of [
      'chore',
      'ci',
      'docs',
      'style',
      'refactor',
      'test',
      'build',
    ]) {
      const result = transform(parsedCommit({ type }), context);
      expect(result).toBeUndefined();
    }
  });

  it('keeps commits with BREAKING CHANGE notes regardless of type', () => {
    const result = transform(
      parsedCommit({
        type: 'refactor',
        notes: [{ title: 'BREAKING CHANGE', text: 'removed API' }],
      }),
      context,
    );
    expect(result).toBeDefined();
    expect(result!['notes']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Breaking Changes',
          text: 'removed API',
        }),
      ]),
    );
  });

  it('preserves commit body, indented', () => {
    const result = transform(
      parsedCommit({
        body: 'This adds a size prop.\nThe default remains medium.',
      }),
      context,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toBe(
      '  This adds a size prop.\n  The default remains medium.',
    );
  });

  it('strips footer tokens from body', () => {
    const result = transform(
      parsedCommit({
        body: 'Adds an icon prop.\n\nReviewed-by: Someone\nRefs: #123',
      }),
      context,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toContain('Adds an icon prop.');
    expect(result!['body']).not.toContain('Reviewed-by');
    expect(result!['body']).not.toContain('Refs');
  });

  it('strips BREAKING CHANGE footer from body', () => {
    const result = transform(
      parsedCommit({
        body: 'Changes the default variant.\n\nBREAKING CHANGE: old API removed',
        notes: [{ title: 'BREAKING CHANGE', text: 'old API removed' }],
      }),
      context,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toContain('Changes the default variant.');
    expect(result!['body']).not.toContain('BREAKING CHANGE');
  });

  it('sets body to null when body is empty or only footers', () => {
    const result = transform(parsedCommit({ body: 'Refs: #123' }), context);
    expect(result).toBeDefined();
    expect(result!['body']).toBeNull();
  });

  it('shortens the commit hash', () => {
    const result = transform(parsedCommit({ hash: 'abc1234567890' }), context);
    expect(result!['shortHash']).toBe('abc1234');
  });
});
