import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findPackageDir, readPackageName } from './package-json.ts';

/** See `fixtures/README.md` for the layout these paths refer to. */
const fixtures = join(import.meta.dirname, '..', 'fixtures');

describe('findPackageDir', () => {
  it('finds the package owning a file that does not exist', () => {
    expect(
      findPackageDir(join(fixtures, 'package-a', 'src', 'button.ts')),
    ).toBe(join(fixtures, 'package-a'));
  });

  it('returns the directory itself when it holds the manifest', () => {
    expect(findPackageDir(join(fixtures, 'package-b'))).toBe(
      join(fixtures, 'package-b'),
    );
  });

  it('skips directories without a manifest on the way up', () => {
    expect(findPackageDir(join(fixtures, 'package-b', 'src', 'nested'))).toBe(
      join(fixtures, 'package-b'),
    );
  });
});

describe('readPackageName', () => {
  it('reads the declared name', () => {
    expect(readPackageName(join(fixtures, 'package-a'))).toBe(
      '@fixture/package-a',
    );
  });

  it('returns null when the manifest declares no name', () => {
    expect(readPackageName(join(fixtures, 'unnamed'))).toBeNull();
  });

  it('throws with the offending path when the manifest is unparseable', () => {
    // Written to a temp directory rather than committed as a fixture: a broken
    // JSON file in the repo would fail `pnpm fmt:check`.
    const dir = mkdtempSync(join(tmpdir(), 'oxlint-plugin-'));
    writeFileSync(join(dir, 'package.json'), '{ not json');

    expect(() => readPackageName(dir)).toThrow(join(dir, 'package.json'));
  });
});
