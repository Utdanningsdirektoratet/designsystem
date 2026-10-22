/**
 * Candidates for rules that the current rules don't cover yet, found by comparing Digdir's and
 * Udir's snapshots. They are suggestions only: each must be confirmed before it goes into the
 * rules file. See `@internal/figma/README.md`.
 */
import {
  type ColorRule,
  type Rules,
  allComponents,
  colorBindings,
  colorOfBinding,
  componentsByName,
  parseVariant,
  translateDigdir,
  translateUdir,
  variantsOf,
  walkLayers,
} from './rules.ts';
import type { ComponentData, JsonObject, SnapshotFile } from './snapshots.ts';

/** Udir's and Digdir's color names; a variant property with only these values selects a color. */
const COLOR_NAMES = new Set([
  'accent',
  'neutral',
  'support1',
  'support2',
  'brand1',
  'brand2',
  'brand3',
  'info',
  'success',
  'warning',
  'danger',
]);

/** Abbreviated and spelled-out variant values that mean the same, such as `lg` and `large`. */
const SIZE_SYNONYMS: Record<string, string> = {
  '2xsmall': '2xs',
  xsmall: 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  xlarge: 'xl',
  '2xlarge': '2xl',
};

export type Suggestions = {
  components: Record<string, string>;
  variantProperties: Record<string, Record<string, string>>;
  variantValues: Record<string, Record<string, Record<string, string>>>;
  /** Variant properties and values in one library only, with no pairing found. */
  unpairedVariants: {
    component: string;
    onlyInUdir: string[];
    onlyInDigdir: string[];
  }[];
  colors: Record<string, ColorRule>;
  /** Components where some, but not all, mode-driven bindings were replaced with fixed colors. */
  partlyConverted: {
    component: string;
    modeDriven: number;
    fixed: Record<string, number>;
    examples: string[];
  }[];
  restructured: Record<string, string>;
};

export function suggestRules(
  digdirFiles: SnapshotFile[],
  udirFiles: SnapshotFile[],
  rules: Rules,
): Suggestions {
  const suggestions: Suggestions = {
    components: {},
    variantProperties: {},
    variantValues: {},
    unpairedVariants: [],
    colors: {},
    partlyConverted: [],
    restructured: {},
  };
  const udir = componentsByName(translateUdir(udirFiles, rules));
  const digdir = componentsByName(
    translateDigdir(digdirFiles, translateUdir(udirFiles, rules), rules),
  );

  // Components in one library only, with names that differ only in case, spaces or punctuation.
  const normalize = (name: string) =>
    name
      .split('/')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  const onlyInDigdir = new Map(
    [...digdir.keys()]
      .filter((name) => !udir.has(name))
      .map((name) => [normalize(name), name]),
  );
  for (const name of udir.keys()) {
    if (digdir.has(name)) continue;
    const match = onlyInDigdir.get(normalize(name));
    if (match !== undefined) suggestions.components[name] = match;
  }
  const digdirNameOf = (udirName: string) =>
    suggestions.components[udirName] ?? udirName;

  // Components in both whose variants don't line up.
  for (const [udirName, udirComponent] of udir) {
    const digdirComponent = digdir.get(digdirNameOf(udirName));
    if (!digdirComponent?.variants || !udirComponent.variants) continue;
    const digdirVariants = new Set(digdirComponent.variants.map((v) => v.name));
    if (udirComponent.variants.some((v) => digdirVariants.has(v.name))) {
      continue;
    }
    suggestVariantNames(
      digdirComponent.name,
      variantOptions(udirComponent),
      variantOptions(digdirComponent),
      suggestions,
    );
  }

  // Colors, from the snapshots as they are, since the rules use Udir's own names.
  const rawUdir = componentsByName(udirFiles);
  const rawDigdir = componentsByName(digdirFiles);
  const renamed = { ...suggestions.components, ...rules.components };
  for (const [udirName, udirComponent] of rawUdir) {
    if (rules.colors?.[udirName]) continue;
    const digdirComponent = rawDigdir.get(renamed[udirName] ?? udirName);
    if (!digdirComponent) continue;
    suggestColors(udirName, udirComponent, digdirComponent, suggestions);
  }

  // Components rebuilt with Figma slots, which Digdir's library doesn't use.
  for (const component of allComponents(udirFiles)) {
    if (rules.restructured?.[component.name]) continue;
    const slots = Object.entries(component.properties ?? {})
      .filter(([, definition]) => (definition as JsonObject).type === 'SLOT')
      .map(([name]) => name);
    if (slots.length === 0) continue;
    const counterpart = rawDigdir.get(
      renamed[component.name] ?? component.name,
    );
    const digdirSlots = Object.values(counterpart?.properties ?? {}).some(
      (definition) => (definition as JsonObject).type === 'SLOT',
    );
    if (!digdirSlots) {
      suggestions.restructured[component.name] =
        `Uses slots (${slots.join(', ')})${counterpart ? '' : '; not in Digdir'}`;
    }
  }
  return suggestions;
}

function variantOptions(component: ComponentData): Map<string, string[]> {
  const result = new Map<string, string[]>();
  for (const [name, definition] of Object.entries(component.properties ?? {})) {
    const { type, options } = definition as JsonObject;
    if (type === 'VARIANT' && Array.isArray(options)) {
      result.set(
        name,
        options.filter((option) => typeof option === 'string'),
      );
    }
  }
  return result;
}

function suggestVariantNames(
  component: string,
  udir: Map<string, string[]>,
  digdir: Map<string, string[]>,
  suggestions: Suggestions,
): void {
  const onlyInUdir = [...udir.keys()].filter((name) => !digdir.has(name));
  const onlyInDigdir = [...digdir.keys()].filter((name) => !udir.has(name));
  const unpairedUdir: string[] = [];
  const unpairedDigdir: string[] = [];

  // One property only in each library, with the same values: a renamed property.
  const colorProperty = (name: string) =>
    (udir.get(name) ?? []).every((value) => COLOR_NAMES.has(value));
  const renamable = onlyInUdir.filter((name) => !colorProperty(name));
  if (renamable.length === 1 && onlyInDigdir.length === 1) {
    const [from] = renamable;
    const [to] = onlyInDigdir;
    suggestions.variantProperties[component] = { [from]: to };
    udir.set(to, udir.get(from) ?? []);
  } else {
    unpairedUdir.push(...renamable.map((name) => `property ${name}`));
    unpairedDigdir.push(...onlyInDigdir.map((name) => `property ${name}`));
  }

  // Values of the same property, paired by size synonyms or case.
  for (const [name, digdirValues] of digdir) {
    const udirValues = udir.get(name);
    if (!udirValues) continue;
    const normalize = (value: string) =>
      SIZE_SYNONYMS[value.toLowerCase()] ?? value.toLowerCase();
    const byNormal = new Map(
      digdirValues.map((value) => [normalize(value), value]),
    );
    const pairs: Record<string, string> = {};
    for (const value of udirValues) {
      if (digdirValues.includes(value)) continue;
      const match = byNormal.get(normalize(value));
      if (match !== undefined) pairs[value] = match;
      else unpairedUdir.push(`${name}=${value}`);
    }
    for (const value of digdirValues) {
      if (
        !udirValues.includes(value) &&
        !Object.values(pairs).includes(value)
      ) {
        unpairedDigdir.push(`${name}=${value}`);
      }
    }
    if (Object.keys(pairs).length > 0) {
      suggestions.variantValues[component] = {
        ...suggestions.variantValues[component],
        [name]: pairs,
      };
    }
  }
  if (unpairedUdir.length > 0 || unpairedDigdir.length > 0) {
    suggestions.unpairedVariants.push({
      component,
      onlyInUdir: unpairedUdir,
      onlyInDigdir: unpairedDigdir,
    });
  }
}

type ColorCounts = { modeDriven: number; fixed: Map<string, number> };

/** Color bindings on layers and in overrides, as `checkColors` sees them. */
function colorCounts(
  variants: { name: string; tree: ComponentData['tree'] }[],
  examples?: string[],
): ColorCounts {
  const counts: ColorCounts = { modeDriven: 0, fixed: new Map() };
  const count = (
    object: Record<string, unknown>,
    variant: string,
    layer: string,
  ) => {
    for (const { field, label } of colorBindings(object)) {
      const color = colorOfBinding(label);
      if (color?.kind === 'mode') {
        counts.modeDriven++;
        if (examples && examples.length < 5) {
          examples.push(
            `${variant ? `[${variant}] ` : ''}${layer}: ${field} → ${label}`,
          );
        }
      } else if (color) {
        counts.fixed.set(color.color, (counts.fixed.get(color.color) ?? 0) + 1);
      }
    }
  };
  for (const variant of variants) {
    if (!variant.tree) continue;
    walkLayers(variant.tree, (layer, node) => {
      count(node, variant.name, layer);
      const overrides = (node.overrides ?? {}) as Record<string, JsonObject>;
      for (const [path, override] of Object.entries(overrides)) {
        const values = override.values as JsonObject | undefined;
        if (values) count(values, variant.name, `${layer} › override ${path}`);
      }
    });
  }
  return counts;
}

/** The share of color bindings that are fixed, which doesn't depend on the number of variants. */
function fixedShare({ modeDriven, fixed }: ColorCounts): number {
  const fixedTotal = [...fixed.values()].reduce((sum, n) => sum + n, 0);
  return fixedTotal / Math.max(1, fixedTotal + modeDriven);
}

function suggestColors(
  udirName: string,
  udir: ComponentData,
  digdir: ComponentData,
  suggestions: Suggestions,
): void {
  const digdirCounts = colorCounts(variantsOf(digdir));
  if (digdirCounts.modeDriven === 0) return;
  const digdirFixed = [...digdirCounts.fixed.keys()];
  const examples: string[] = [];
  const udirCounts = colorCounts(variantsOf(udir), examples);
  if (udirCounts.fixed.size === 0) return;

  if (udirCounts.modeDriven > 0) {
    // Some bindings converted to fixed colors, some not.
    const newColor = [...udirCounts.fixed.keys()].some(
      (color) => !digdirFixed.includes(color),
    );
    if (newColor || fixedShare(udirCounts) > fixedShare(digdirCounts)) {
      suggestions.partlyConverted.push({
        component: udirName,
        modeDriven: udirCounts.modeDriven,
        fixed: Object.fromEntries(udirCounts.fixed),
        examples,
      });
    }
    return;
  }

  // A variant property selecting the color: each variant uses only its own color.
  for (const [property, values] of variantOptions(udir)) {
    if (!values.every((value) => COLOR_NAMES.has(value))) continue;
    const consistent = variantsOf(udir).every((variant) => {
      const own = parseVariant(variant.name).get(property);
      const counts = colorCounts([variant]);
      return [...counts.fixed.keys()].every(
        (color) => color === own || digdirFixed.includes(color),
      );
    });
    if (consistent) {
      suggestions.colors[udirName] = {
        variantProperty: property,
        values,
        ...(digdirFixed.length > 0 ? { alsoAllowed: digdirFixed } : {}),
      };
      return;
    }
  }

  // Everything fixed where Digdir follows the Color mode: the most used color replaced it.
  const [[fixed]] = [...udirCounts.fixed].sort(([, a], [, b]) => b - a);
  const alsoAllowed = [...udirCounts.fixed.keys()].filter(
    (color) => color !== fixed,
  );
  suggestions.colors[udirName] = {
    fixed,
    ...(alsoAllowed.length > 0 ? { alsoAllowed } : {}),
  };
}
