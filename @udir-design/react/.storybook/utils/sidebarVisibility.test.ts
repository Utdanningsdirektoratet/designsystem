import { describe, expect, it } from 'vitest';
import { isSidebarEntryVisible } from './sidebarVisibility';

describe('sidebar visibility', () => {
  it('hides story entries only in production', () => {
    expect(
      isSidebarEntryVisible(
        { type: 'story', title: 'components/Button' },
        true,
      ),
    ).toBe(false);
    expect(
      isSidebarEntryVisible(
        { type: 'story', title: 'components/Button' },
        false,
      ),
    ).toBe(true);
  });

  it('keeps documentation entries visible in both environments', () => {
    expect(
      isSidebarEntryVisible({ type: 'docs', title: 'components/Button' }, true),
    ).toBe(true);
    expect(
      isSidebarEntryVisible(
        { type: 'docs', title: 'components/Button' },
        false,
      ),
    ).toBe(true);
  });

  it('keeps Demosider stories visible in production and development', () => {
    for (const title of [
      'demo/Article Demo',
      'demo/Form Demo',
      'demo/Nested/Example',
    ]) {
      expect(isSidebarEntryVisible({ type: 'story', title }, true)).toBe(true);
      expect(isSidebarEntryVisible({ type: 'story', title }, false)).toBe(true);
    }
  });

  it('does not exempt stories outside the demo section', () => {
    expect(
      isSidebarEntryVisible(
        { type: 'story', title: 'components/DemoBanner' },
        true,
      ),
    ).toBe(false);
    expect(
      isSidebarEntryVisible(
        { type: 'story', title: 'demo-other/Example' },
        true,
      ),
    ).toBe(false);
  });
});
