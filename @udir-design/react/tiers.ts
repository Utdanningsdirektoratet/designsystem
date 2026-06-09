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

/** A component that lives inside a named group folder, e.g. typography/heading. */
export type ComponentGroup = { group: string; name: string };

/**
 * Splits an array of barrel export names into flat components and
 * sub-components (entries that contain a '/', e.g. 'typography/heading').
 */
function parseComponents(names: string[]): {
  components: string[];
  groupedComponents: ComponentGroup[];
} {
  const components: string[] = [];
  const groupedComponents: ComponentGroup[] = [];
  for (const n of names) {
    const slash = n.indexOf('/');
    if (slash === -1) {
      components.push(n);
    } else {
      groupedComponents.push({
        group: n.slice(0, slash),
        name: n.slice(slash + 1),
      });
    }
  }
  return { components, groupedComponents };
}

// ---------------------------------------------------------------------------
// Parse tier membership from the barrel files — the single source of truth.
// ---------------------------------------------------------------------------

export const tiers = {
  stable: {
    ...parseComponents(extractLocalExports('src/components/stable.ts')),
    hooks: extractLocalExports('src/hooks/stable.ts'),
    utilities: extractLocalExports('src/utilities/stable.ts'),
  },
  beta: {
    ...parseComponents(extractLocalExports('src/components/beta.ts')),
    hooks: extractLocalExports('src/hooks/beta.ts'),
    utilities: extractLocalExports('src/utilities/beta.ts'),
  },
  alpha: {
    ...parseComponents(extractLocalExports('src/components/alpha.ts')),
    hooks: extractLocalExports('src/hooks/alpha.ts'),
    utilities: extractLocalExports('src/utilities/alpha.ts'),
  },
};

// ---------------------------------------------------------------------------
// Tier map (name → tier), used by createTierIndexers in tiers.config.ts.
//
// Keys for regular components:    'avatar', 'button', …
// Keys for grouped components:    'typography/heading', 'logo/symbol', …
// Keys for hooks:                 'useCheckboxGroup', …
// Keys for utility groups:        'utilities/form', 'utilities/datavis', …
// ---------------------------------------------------------------------------

export function buildTierMap(): Map<string, Tier> {
  const map = new Map<string, Tier>();

  const add = (names: string[], tier: Tier, prefix = '') => {
    for (const name of names) map.set(`${prefix}${name}`, tier);
  };

  add(tiers.stable.components, 'stable');
  add(tiers.stable.hooks, 'stable');
  for (const { group, name } of tiers.stable.groupedComponents)
    map.set(`${group}/${name}`, 'stable');
  add(tiers.beta.components, 'beta');
  add(tiers.beta.hooks, 'beta');
  for (const { group, name } of tiers.beta.groupedComponents)
    map.set(`${group}/${name}`, 'beta');
  add(tiers.alpha.components, 'alpha');
  add(tiers.alpha.hooks, 'alpha');
  for (const { group, name } of tiers.alpha.groupedComponents)
    map.set(`${group}/${name}`, 'alpha');

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
  // Sub-components: .../components/<group>/<name>/...
  // Check this before the flat component match; use tier-map presence to
  // distinguish a known group (e.g. typography/heading) from a regular
  // component that happens to have a file two levels deep.
  const subCompMatch = id.match(/\/components\/([^/]+)\/([^/]+)\//);
  if (subCompMatch) {
    const key = `${subCompMatch[1]}/${subCompMatch[2]}`;
    if (tierMap.has(key)) return tierMap.get(key) ?? null;
  }

  // Regular components: .../components/<name>/...
  const compMatch = id.match(/\/components\/([^/]+)\//);
  if (compMatch) {
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
