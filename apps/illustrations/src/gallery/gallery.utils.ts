import type { IllustrationFamily, IllustrationVariant } from '../metadata';

const familyCollator = new Intl.Collator('nb', { numeric: true });

/** Presentation only: keep canonical names and asset identifiers unchanged. */
export function familyDisplayName(name: string): string {
  const readable = name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  return readable.charAt(0).toLocaleUpperCase('nb') + readable.slice(1);
}

const propertyLabels: Record<string, string> = {
  'Geometrisk form': 'Organisk form',
};

/** Presentation only: canonical property keys and values stay unchanged. */
export function propertyDisplayLabel(key: string): string {
  return propertyLabels[key] ?? key;
}

export function propertyValueDisplayLabel(value: string): string {
  return value.charAt(0).toLocaleUpperCase('nb') + value.slice(1);
}

/** The text before and after the selected option, so it can be rendered as its own element. */
export function searchSummaryParts(
  count: number,
  categoryLabel: string,
): { before: string; after: string } {
  return {
    before: count === 0 ? 'Ingen treff for' : `Viser ${count} treff for`,
    after: `i ${categoryLabel}`,
  };
}

/** Status text for the results; `filter` is the selected option, empty when none applies. */
export function resultsSummary(
  count: number,
  filter: string,
  categoryLabel: string,
): string {
  if (filter) {
    const { before, after } = searchSummaryParts(count, categoryLabel);
    return `${before} «${filter}» ${after}`;
  }
  if (count === 0) return `Ingen illustrasjoner i ${categoryLabel}`;
  return `Viser ${count} ${count === 1 ? 'illustrasjon' : 'illustrasjoner'} i ${categoryLabel}`;
}

/** The first part of a name, so `aktivitet-3a` is found under "aktivitet". */
export function namePrefix(name: string): string {
  return (name.split(/[-\s]/)[0] ?? '').toLocaleLowerCase('nb');
}

/** The filter options a family can be found under: its name prefix and its tags. */
export function familyFilterOptions(family: IllustrationFamily): string[] {
  return [...new Set([namePrefix(family.name), ...(family.tags ?? [])])].filter(
    Boolean,
  );
}

export function matchesFilter(
  family: IllustrationFamily,
  option: string,
): boolean {
  return !option || familyFilterOptions(family).includes(option);
}

/** Filter hits per category, skipping `excludeCategoryId` (if given) and categories without hits. */
export function countMatchesByCategory(
  families: IllustrationFamily[],
  option: string,
  excludeCategoryId?: string,
): { categoryId: string; count: number }[] {
  if (!option) return [];
  const counts = new Map<string, number>();
  for (const item of families) {
    if (item.categoryId === excludeCategoryId || item.variants.length === 0)
      continue;
    if (!matchesFilter(item, option)) continue;
    counts.set(item.categoryId, (counts.get(item.categoryId) ?? 0) + 1);
  }
  return [...counts].map(([categoryId, count]) => ({ categoryId, count }));
}

/** Return a new array; never reorder the source catalog or its variants. */
export function sortFamilies(
  families: IllustrationFamily[],
): IllustrationFamily[] {
  return [...families].sort((a, b) =>
    familyCollator.compare(
      familyDisplayName(a.name),
      familyDisplayName(b.name),
    ),
  );
}

export function propertyOptions(family: IllustrationFamily) {
  const options = new Map<string, Set<string>>();
  for (const variant of family.variants) {
    for (const [key, value] of Object.entries(variant.properties)) {
      if (!options.has(key)) options.set(key, new Set());
      options.get(key)?.add(value);
    }
  }
  return [...options].map(([key, values]) => ({ key, values: [...values] }));
}

/** Only known, complete Ja/Nei axes can be represented by a checkbox. */
export function isBinaryProperty(
  family: IllustrationFamily,
  key: string,
  values: string[],
): boolean {
  return (
    (key === 'Geometrisk form' || key === 'Bakgrunn') &&
    values.length === 2 &&
    values.includes('Ja') &&
    values.includes('Nei') &&
    family.variants.every((variant) =>
      ['Ja', 'Nei'].includes(variant.properties[key]),
    )
  );
}

/** Only select exported variants. Prefer preserving other properties; ties use catalog order. */
export function selectProperty(
  family: IllustrationFamily,
  current: IllustrationVariant,
  key: string,
  value: string,
): IllustrationVariant {
  let selected = current;
  let bestScore = -1;
  for (const variant of family.variants) {
    if (variant.properties[key] !== value) continue;
    const score = Object.entries(current.properties).filter(
      ([otherKey, otherValue]) =>
        otherKey !== key && variant.properties[otherKey] === otherValue,
    ).length;
    if (score > bestScore) {
      selected = variant;
      bestScore = score;
    }
  }
  return selected;
}

export function needsVariantChooser(family: IllustrationFamily): boolean {
  const keys = propertyOptions(family).map(({ key }) => key);
  const signatures = new Set<string>();
  return family.variants.some((variant) => {
    if (keys.some((key) => !(key in variant.properties))) return true;
    const signature = JSON.stringify(
      keys.map((key) => variant.properties[key]),
    );
    if (signatures.has(signature)) return true;
    signatures.add(signature);
    return false;
  });
}

/** `base` is Vite's BASE_URL, so the app can be deployed under a subpath. */
export function illustrationAssetUrl(
  variant: IllustrationVariant,
  format: 'svg' | 'png',
  base: string = import.meta.env.BASE_URL,
): string {
  const filename = format === 'svg' ? variant.svg : `${variant.id}.png`;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}illustrations-assets/${format}/${encodeURIComponent(filename)}`;
}
