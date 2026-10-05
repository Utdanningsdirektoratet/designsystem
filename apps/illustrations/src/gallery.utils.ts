import type { IllustrationFamily, IllustrationVariant } from './metadata';

const familyCollator = new Intl.Collator('nb', { numeric: true });

/** Presentation only: keep canonical names and asset identifiers unchanged. */
export function familyDisplayName(name: string): string {
  const readable = name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  return readable.charAt(0).toLocaleUpperCase('nb') + readable.slice(1);
}

export function normalizeFamilySearch(value: string): string {
  return value.toLocaleLowerCase('nb').replace(/[\s-]+/g, '');
}

export function matchesFamilySearch(name: string, query: string): boolean {
  const search = normalizeFamilySearch(query);
  return [name, familyDisplayName(name)].some((value) =>
    normalizeFamilySearch(value).includes(search),
  );
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
