import * as fs from 'node:fs';
import * as path from 'node:path';

/** The stability tier of a component or hook. */
export type Tier = 'alpha' | 'beta' | 'stable';

const root = import.meta.dirname;

/**
 * Extracts the local module names from `from './...'` statements in a TypeScript
 * barrel file. Works with both `export * from './name'` and named
 * `export { ... } from './name'` syntax.
 */
export function extractLocalExports(relPath: string): string[] {
  const content = fs.readFileSync(path.join(root, relPath), 'utf-8');
  return [...content.matchAll(/from '\.\/([^']+)'/g)].map((m) => m[1]);
}

// ---------------------------------------------------------------------------
// Parse tier membership from the barrel files.
// These barrel files are the single source of truth — everything else derives
// from them (vite build entries, Storybook story tags, etc.).
// ---------------------------------------------------------------------------

const rawBeta = extractLocalExports('src/components/beta.ts');

export const tiers = {
  stable: {
    components: extractLocalExports('src/components/stable.ts'),
    hooks: extractLocalExports('src/hooks/stable.ts'),
    utilities: extractLocalExports('src/utilities/stable.ts'),
  },
  beta: {
    /** Non-typography beta components (e.g. 'alert', 'badge') */
    components: rawBeta.filter((n) => !n.startsWith('typography/')),
    /** Typography sub-components without the 'typography/' prefix (e.g. 'heading') */
    typographyComponents: rawBeta
      .filter((n) => n.startsWith('typography/'))
      .map((n) => n.replace('typography/', '')),
    hooks: extractLocalExports('src/hooks/beta.ts'),
    utilities: extractLocalExports('src/utilities/beta.ts'),
  },
  alpha: {
    components: extractLocalExports('src/components/alpha.ts'),
    hooks: extractLocalExports('src/hooks/alpha.ts'),
    /**
     * Utility items in alpha, keyed by group-prefixed path (e.g. 'form/navigation').
     * Derived from src/utilities/alpha.ts — the single source of truth.
     */
    utilities: extractLocalExports('src/utilities/alpha.ts'),
  },
};

// ---------------------------------------------------------------------------
// Tier map (name → tier), used by createTierIndexers and vite.config.ts.
//
// Keys for regular components:  'avatar', 'button', …
// Keys for typography:          'typography/heading', …
// Keys for hooks:               'useCheckboxGroup', …
// Keys for utility groups:      'utilities/form', 'utilities/datavis', …
// ---------------------------------------------------------------------------

export function buildTierMap(): Map<string, Tier> {
  const map = new Map<string, Tier>();

  const add = (names: string[], tier: Tier, prefix = '') => {
    for (const name of names) map.set(`${prefix}${name}`, tier);
  };

  add(tiers.stable.components, 'stable');
  add(tiers.stable.hooks, 'stable');
  add(tiers.beta.components, 'beta');
  add(tiers.beta.typographyComponents, 'beta', 'typography/');
  add(tiers.beta.hooks, 'beta');
  add(tiers.alpha.components, 'alpha');
  add(tiers.alpha.hooks, 'alpha');

  // For utility story tagging, use the group-level key (e.g. 'utilities/form')
  // since stories live at the group level. When a group has items across tiers,
  // use the most experimental tier so the tag reflects the least-mature content.
  const tierPriority: Record<Tier, number> = { alpha: 0, beta: 1, stable: 2 };
  const addUtilityGroups = (names: string[], tier: Tier) => {
    for (const name of names) {
      const groupKey = `utilities/${name.split('/')[0]}`;
      const current = map.get(groupKey);
      if (current === undefined || tierPriority[tier] < tierPriority[current]) {
        map.set(groupKey, tier);
      }
    }
  };

  addUtilityGroups(tiers.stable.utilities, 'stable');
  addUtilityGroups(tiers.beta.utilities, 'beta');
  addUtilityGroups(tiers.alpha.utilities, 'alpha');

  return map;
}

// ---------------------------------------------------------------------------
// Storybook story-tier resolver — no Storybook dep, just string matching.
// Used by createTierIndexers in tiers.config.ts.
// ---------------------------------------------------------------------------

/** Determines the tier for a story file based on its path. */
export function resolveStoryTier(
  id: string,
  tierMap: Map<string, Tier>,
): Tier | null {
  // Typography sub-components: .../components/typography/<name>/...
  const typoMatch = id.match(/\/components\/typography\/([^/]+)\//);
  if (typoMatch) return tierMap.get(`typography/${typoMatch[1]}`) ?? null;

  // Regular components: .../components/<name>/...  (skip 'typography' itself)
  const compMatch = id.match(/\/components\/([^/]+)\//);
  if (compMatch && compMatch[1] !== 'typography') {
    return tierMap.get(compMatch[1]) ?? null;
  }

  // Hooks: .../hooks/<name>/...
  const hookMatch = id.match(/\/hooks\/([^/]+)\//);
  if (hookMatch) return tierMap.get(hookMatch[1]) ?? null;

  // Utility groups (form, datavis, …): .../utilities/<group>/...
  const utilityGroupMatch = id.match(/\/utilities\/([^/]+)\//);
  if (utilityGroupMatch) {
    return tierMap.get(`utilities/${utilityGroupMatch[1]}`) ?? null;
  }

  return null;
}
