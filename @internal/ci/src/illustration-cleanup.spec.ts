import { describe, expect, it } from 'vitest';
import { planCleanup } from './illustration-cleanup.js';

const now = new Date('2026-11-17T12:00:00Z');
const daysAgo = (days: number) => new Date(now.getTime() - days * 86_400_000);
const live = '8a6a1a30f47fc500-r2';
const plan = (overrides: Partial<Parameters<typeof planCleanup>[0]>) =>
  planCleanup({
    live,
    versions: [],
    sourceRevisions: [],
    currentRevision: 'r2',
    now,
    graceDays: 7,
    ...overrides,
  });

describe('planCleanup', () => {
  it('never deletes the live version, and unretires it when it is live again', () => {
    expect(plan({ versions: [{ name: live }] })).toEqual([]);
    expect(
      plan({ versions: [{ name: live, retiredAt: daysAgo(30) }] }),
    ).toEqual([{ type: 'unretire', version: live }]);
  });

  it('retires other versions the first time it sees them, including single-category ones', () => {
    expect(
      plan({
        versions: [
          { name: '12cbecadca6ef661-r1' },
          { name: 'd8320a5b6f0c7bd9-r1-voksen-og-generell' },
        ],
      }),
    ).toEqual([
      { type: 'retire', version: '12cbecadca6ef661-r1' },
      { type: 'retire', version: 'd8320a5b6f0c7bd9-r1-voksen-og-generell' },
    ]);
  });

  it('deletes versions only after they have been retired for the whole grace period', () => {
    expect(
      plan({
        versions: [
          { name: '12cbecadca6ef661-r1', retiredAt: daysAgo(7) },
          { name: 'b479d12e73e190a0-r1', retiredAt: daysAgo(7.01) },
        ],
      }),
    ).toEqual([{ type: 'delete-version', version: 'b479d12e73e190a0-r1' }]);
  });

  it('leaves folders that are not artwork versions alone', () => {
    expect(
      plan({
        versions: [
          { name: 'source' },
          { name: 'measure-azcopy-20261116', retiredAt: daysAgo(30) },
          { name: '8A6A1A30F47FC500-r1' },
        ],
      }),
    ).toEqual([]);
  });

  it('deletes raw SVGs for other artwork revisions only', () => {
    expect(plan({ sourceRevisions: ['r1', 'r2', 'notes'] })).toEqual([
      { type: 'delete-source', revision: 'r1' },
    ]);
  });

  it("keeps the live version's raw SVGs when a test run uses a newer artwork revision", () => {
    expect(
      plan({
        live: '8a6a1a30f47fc500-r1',
        currentRevision: 'r2',
        sourceRevisions: ['r0', 'r1', 'r2'],
      }),
    ).toEqual([{ type: 'delete-source', revision: 'r0' }]);
  });

  it('refuses a live pointer that names no artwork version', () => {
    expect(() =>
      plan({ live: '', versions: [{ name: '12cbecadca6ef661-r1' }] }),
    ).toThrow(/names no artwork version/);
  });
});
