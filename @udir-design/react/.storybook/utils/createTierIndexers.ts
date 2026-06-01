import type { Indexer } from 'storybook/internal/types';
import { buildTierMap, resolveStoryTier } from '../../tiers.js';

// ---------------------------------------------------------------------------
// Storybook indexer: inject the correct tier tag into the story index.
//
// Story source files only carry non-tier tags (e.g. 'udir', 'digdir').
// When a component moves tiers, only its barrel file needs updating — this
// indexer wrapper keeps the sidebar tags in sync automatically.
// ---------------------------------------------------------------------------

/**
 * For use as `experimental_indexers` in `.storybook/main.ts`.
 *
 * Wraps every existing Storybook indexer so that the story index (sidebar)
 * reflects the tier from the barrel files. Stable components get no tier tag;
 * beta/alpha components get their tier prepended.
 */
export async function createTierIndexers(
  existingIndexers: Indexer[] | undefined,
): Promise<Indexer[]> {
  const tierMap = buildTierMap();

  return (existingIndexers ?? []).map((indexer) => ({
    ...indexer,
    createIndex: async (fileName, opts) => {
      const entries = await indexer.createIndex(fileName, opts);
      const tier = resolveStoryTier(fileName, tierMap);
      if (tier == null) return entries;

      return entries.map((entry) => {
        // Strip any existing tier tags. The barrel file is the source of truth,
        // so we override whatever the story file declares.
        const withoutTierTags = (entry.tags ?? []).filter(
          (t) => !['alpha', 'beta'].includes(t),
        );
        return {
          ...entry,
          tags:
            tier === 'stable' ? withoutTierTags : [tier, ...withoutTierTags],
        };
      });
    },
  }));
}
