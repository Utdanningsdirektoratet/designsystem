import type { API_PreparedIndexEntry } from 'storybook/internal/types';

export function isSidebarEntryVisible(
  entry: Pick<API_PreparedIndexEntry, 'type' | 'title'>,
  isProduction: boolean,
): boolean {
  // Filter navigation only: stories remain available to docs and direct URLs.
  return (
    !isProduction || entry.type !== 'story' || entry.title.startsWith('demo/')
  );
}
