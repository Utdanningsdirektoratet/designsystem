/**
 * Rules for Udir's deliberate differences from Digdir's Figma library: renamed components,
 * variant properties and variables, Udir's color restrictions, and components Udir has rebuilt.
 *
 * Color rules are used twice. `checkColors` checks Udir's library against them as it is, so a
 * binding left unconverted is reported even when Digdir has the same binding. The translations
 * then make the two libraries comparable, so that what remains in a comparison is what no rule
 * explains. See `@internal/figma/README.md`.
 */
import { readFileSync } from 'node:fs';
import {
  type Change,
  type ComponentData,
  type JsonObject,
  type NodeData,
  type SnapshotFile,
  type VariableCollectionData,
  diff,
  factsFrom,
  subjectOf,
} from './snapshots.ts';

export type ColorRule = {
  /** Every color binding in the component is fixed to this color. */
  fixed?: string;
  /** Or: each variant is fixed to the color named by its value of this variant property. */
  variantProperty?: string;
  /** The values `variantProperty` may have. */
  values?: string[];
  /** Further fixed colors allowed anywhere in the component, such as `danger` for errors. */
  alsoAllowed?: string[];
  /** Why the rule exists, with evidence such as the code that restricts the colors. */
  reason?: string;
};

export type Rules = {
  /** Udir component name → Digdir component name. */
  components?: Record<string, string>;
  /** Digdir component name → { Udir variant property → Digdir variant property }. */
  variantProperties?: Record<string, Record<string, string>>;
  /** Digdir component name → Digdir variant property → { Udir value → Digdir value }. */
  variantValues?: Record<string, Record<string, Record<string, string>>>;
  /**
   * Udir → Digdir names for parts of variable names and for mode names, such as the theme name
   * (`udir` → `starter-theme`) and color names (`support1` → `brand1`).
   */
  variableNames?: Record<string, string>;
  /** Udir component name → which colors it may use. */
  colors?: Record<string, ColorRule>;
  /** Udir component name → why Udir rebuilt it. Its differences are only counted. */
  restructured?: Record<string, string>;
  /** Free text, ignored. */
  notes?: string | string[];
};

const RULE_KEYS = [
  'components',
  'variantProperties',
  'variantValues',
  'variableNames',
  'colors',
  'restructured',
  'notes',
];

export type Violation = {
  component: string;
  variant: string;
  layer: string;
  problem: string;
};

// ---------------------------------------------------------------------------------------------
// Loading and validating

export function loadRules(file: string): Rules {
  const rules = JSON.parse(readFileSync(file, 'utf8')) as Rules;
  const unknown = Object.keys(rules).filter((key) => !RULE_KEYS.includes(key));
  if (unknown.length > 0) {
    throw new Error(
      `${file}: unknown sections ${unknown.join(', ')}; expected ${RULE_KEYS.join(', ')}`,
    );
  }
  for (const [name, rule] of Object.entries(rules.colors ?? {})) {
    if ((rule.fixed === undefined) === (rule.variantProperty === undefined)) {
      throw new Error(
        `${file}: the color rule for "${name}" needs either "fixed" or "variantProperty"`,
      );
    }
    if (rule.variantProperty !== undefined && !rule.values?.length) {
      throw new Error(
        `${file}: the color rule for "${name}" needs "values" with "variantProperty"`,
      );
    }
  }
  return rules;
}

/** Names in the rules that don't exist in the snapshots, which would make a rule do nothing. */
export function validateRules(
  rules: Rules,
  udirFiles: SnapshotFile[],
  digdirFiles?: SnapshotFile[],
): string[] {
  const problems: string[] = [];
  const udir = componentsByName(udirFiles);
  const digdir = digdirFiles ? componentsByName(digdirFiles) : undefined;
  const inUdir = (section: string, name: string) => {
    if (!udir.has(name)) {
      problems.push(`${section}: no Udir component named "${name}"`);
    }
  };
  const inDigdir = (section: string, name: string) => {
    if (digdir && !digdir.has(name)) {
      problems.push(`${section}: no Digdir component named "${name}"`);
    }
  };
  for (const [udirName, digdirName] of Object.entries(rules.components ?? {})) {
    inUdir('components', udirName);
    inDigdir('components', digdirName);
  }
  for (const name of Object.keys(rules.variantProperties ?? {})) {
    inDigdir('variantProperties', name);
  }
  for (const name of Object.keys(rules.variantValues ?? {})) {
    inDigdir('variantValues', name);
  }
  for (const name of Object.keys(rules.restructured ?? {})) {
    inUdir('restructured', name);
  }
  for (const [name, rule] of Object.entries(rules.colors ?? {})) {
    inUdir('colors', name);
    if (rule.variantProperty === undefined) continue;
    const definition = udir.get(name)?.properties?.[rule.variantProperty] as
      | JsonObject
      | undefined;
    if (udir.has(name) && definition?.type !== 'VARIANT') {
      problems.push(
        `colors: "${name}" has no variant property "${rule.variantProperty}"`,
      );
    }
  }
  return problems;
}

// ---------------------------------------------------------------------------------------------
// Checking Udir's colors

/**
 * Bindings and explicit Color modes in Udir's library that break its color rules: in the
 * definitions of components with a rule, and in every instance of such a component, whichever
 * component the instance is used in. For an instance, its overrides and its own explicit Color
 * mode are checked against the rule of the component it's an instance of; the rest of it comes
 * from that component's definition, which is checked there.
 */
export function checkColors(
  udirFiles: SnapshotFile[],
  rules: Rules,
): Violation[] {
  const violations: Violation[] = [];
  for (const component of allComponents(udirFiles)) {
    const ownRule = rules.colors?.[component.name];
    for (const variant of variantsOf(component)) {
      const report = (layer: string, problem: string) =>
        violations.push({
          component: component.name,
          variant: variant.name,
          layer,
          problem,
        });
      let hostAllowed: Set<string> | undefined;
      if (ownRule) {
        const allowed = allowedColors(ownRule, variant.name);
        if (typeof allowed === 'string') {
          report('.', `the variant has ${allowed}`);
          continue;
        }
        hostAllowed = allowed;
      }
      walkLayers(variant.tree, (layer, node) => {
        // An instance of a component with a rule follows that rule, wherever it's used.
        let allowed = hostAllowed;
        let prefix = '';
        const label =
          node.type === 'INSTANCE' && typeof node.mainComponent === 'string'
            ? node.mainComponent
            : undefined;
        const main = label === undefined ? undefined : parseLabel(label);
        const instanceRule = main && rules.colors?.[main.name];
        if (main && instanceRule) {
          prefix = `in an instance of ${label}: `;
          const instanceAllowed = allowedColors(
            instanceRule,
            main.variant ?? '',
          );
          if (typeof instanceAllowed === 'string') {
            report(layer, `${prefix}the instance has ${instanceAllowed}`);
            return;
          }
          allowed = instanceAllowed;
          checkColorMode(node, allowed, (problem) =>
            report(layer, prefix + problem),
          );
        } else if (allowed) {
          checkBindings(node, allowed, (problem) => report(layer, problem));
          checkColorMode(node, allowed, (problem) => report(layer, problem));
        }
        const overrides = (node.overrides ?? {}) as Record<string, JsonObject>;
        for (const [overridePath, override] of Object.entries(overrides)) {
          const values = override.values as JsonObject | undefined;
          if (!values) continue;
          const where = `${layer} › override ${overridePath}`;
          // A nested instance, or a layer inside nested instances, follows the rule of the
          // nearest of those instances that has one; otherwise the rule of the instance or
          // component the override is made in.
          let overrideAllowed = allowed;
          let overridePrefix = prefix;
          const candidates = [
            values.mainComponent,
            ...(Array.isArray(values.ownerComponents)
              ? values.ownerComponents
              : []),
          ].filter((label) => typeof label === 'string');
          const ownerLabel = candidates.find(
            (label) => rules.colors?.[parseLabel(label).name] !== undefined,
          );
          const owner =
            ownerLabel === undefined ? undefined : parseLabel(ownerLabel);
          const ownerRule = owner && rules.colors?.[owner.name];
          if (owner && ownerRule) {
            overridePrefix = `in an instance of ${ownerLabel}: `;
            const ownerAllowed = allowedColors(ownerRule, owner.variant ?? '');
            if (typeof ownerAllowed === 'string') {
              report(
                where,
                `${overridePrefix}the instance has ${ownerAllowed}`,
              );
              continue;
            }
            overrideAllowed = ownerAllowed;
          }
          if (!overrideAllowed) continue;
          const reportHere = (problem: string) =>
            report(where, overridePrefix + problem);
          checkBindings(values, overrideAllowed, reportHere);
          checkColorMode(values, overrideAllowed, reportHere);
        }
      });
    }
  }
  return violations;
}

/**
 * The colors a variant of a component with this rule may use, or a description of why the
 * variant itself breaks the rule.
 */
function allowedColors(rule: ColorRule, variant: string): Set<string> | string {
  const allowed = new Set(rule.alsoAllowed ?? []);
  if (rule.fixed !== undefined) {
    allowed.add(rule.fixed);
  } else if (rule.variantProperty !== undefined) {
    const value = parseVariant(variant).get(rule.variantProperty);
    if (value === undefined || !rule.values?.includes(value)) {
      return `${rule.variantProperty}=${value ?? '(none)'}, which the rule doesn't list`;
    }
    allowed.add(value);
  }
  return allowed;
}

function checkBindings(
  object: Record<string, unknown>,
  allowed: Set<string>,
  report: (problem: string) => void,
): void {
  for (const { field, label } of colorBindings(object)) {
    const color = colorOfBinding(label);
    if (color?.kind === 'mode') {
      report(
        `${field} is bound to ${label}, which follows the Color mode instead of a fixed color`,
      );
    } else if (color && !allowed.has(color.color)) {
      report(
        `${field} is bound to ${label}; the rule allows ${[...allowed].join(', ')}`,
      );
    }
  }
}

function checkColorMode(
  object: Record<string, unknown>,
  allowed: Set<string>,
  report: (problem: string) => void,
): void {
  const mode = (object.variableModes as JsonObject | undefined)?.Color;
  if (typeof mode === 'string' && !allowed.has(mode)) {
    report(
      `the Color mode is set to ${mode}; the rule allows ${[...allowed].join(', ')}`,
    );
  }
}

// ---------------------------------------------------------------------------------------------
// Comparing with rules

export type RuledComparison = {
  violations: Violation[];
  /** Differences in components the rules mark as rebuilt in Udir. */
  restructured: Change[];
  differences: Change[];
};

/** Compares Digdir's and Udir's libraries with the rules applied. */
export function compareWithRules(
  digdirFiles: SnapshotFile[],
  udirFiles: SnapshotFile[],
  rules: Rules,
): RuledComparison {
  const udir = translateUdir(udirFiles, rules);
  const digdir = translateDigdir(digdirFiles, udir, rules);
  const changes = [...diff(factsFrom(digdir), factsFrom(udir)).values()];
  const rebuilt = restructuredNames(rules);
  return {
    violations: checkColors(udirFiles, rules),
    restructured: changes.filter((change) =>
      rebuilt.has(componentOfKey(change.key)),
    ),
    differences: changes.filter(
      (change) => !rebuilt.has(componentOfKey(change.key)),
    ),
  };
}

/** Digdir names of the components the rules mark as rebuilt in Udir. */
export function restructuredNames(rules: Rules): Set<string> {
  return new Set(
    Object.keys(rules.restructured ?? {}).map(
      (name) => rules.components?.[name] ?? name,
    ),
  );
}

/** The component a fact key belongs to, without variant, page or position qualifiers. */
export function componentOfKey(key: string): string {
  const subject = subjectOf(key);
  if (!subject.startsWith('component ')) return '';
  return subject
    .slice('component '.length)
    .replace(/ \[[^\]]*\]$/, '')
    .replace(/ #\d+$/, '')
    .replace(/ \((page|in) .*\)$/, '');
}

/**
 * Udir's snapshot with Digdir's names: components, variant properties and values, and variable
 * and mode names. Colors are left as they are; `translateDigdir` makes Digdir's match them.
 */
export function translateUdir(
  files: SnapshotFile[],
  rules: Rules,
): SnapshotFile[] {
  const result = structuredClone(files);
  for (const file of result) {
    if (file.part === 'variables') {
      for (const collection of file.data as VariableCollectionData[]) {
        translateCollection(collection, rules);
      }
    } else if (file.part === 'components') {
      for (const component of file.data as ComponentData[]) {
        const name = rules.components?.[component.name] ?? component.name;
        component.name = name;
        component.properties = translateProperties(
          name,
          component.properties ?? {},
          rules,
        );
        for (const variant of component.variants ?? []) {
          variant.name = translateVariant(name, variant.name, rules);
        }
        for (const variant of variantsOf(component)) {
          translateNames(variant.tree, rules);
        }
      }
    }
  }
  return result;
}

/**
 * Digdir's snapshot with Udir's color decisions applied: in a component with a color rule,
 * bindings that follow the Color mode are bound to the rule's color instead, and a component
 * whose colors depend on a variant property gets one copy of each variant per color.
 * `udirFiles` must already be translated with `translateUdir`.
 */
export function translateDigdir(
  digdirFiles: SnapshotFile[],
  udirFiles: SnapshotFile[],
  rules: Rules,
): SnapshotFile[] {
  const result = structuredClone(digdirFiles);
  const udir = componentsByName(udirFiles);
  const colorRules = new Map(
    Object.entries(rules.colors ?? {}).map(([udirName, rule]) => [
      rules.components?.[udirName] ?? udirName,
      rule,
    ]),
  );
  /** Digdir name → [variant property, value instances get]. */
  const instanceDefaults = new Map<string, [string, string]>();
  for (const [name, rule] of colorRules) {
    if (rule.variantProperty === undefined) continue;
    const definition = udir.get(name)?.properties?.[rule.variantProperty] as
      | JsonObject
      | undefined;
    const value =
      typeof definition?.default === 'string'
        ? definition.default
        : (rule.values?.[0] ?? '');
    instanceDefaults.set(name, [rule.variantProperty, value]);
  }

  for (const file of result) {
    if (file.part !== 'components') continue;
    for (const component of file.data as ComponentData[]) {
      const rule = colorRules.get(component.name);
      if (rule?.fixed !== undefined) {
        for (const variant of variantsOf(component)) {
          recolor(variant.tree, mapName(rule.fixed, rules));
        }
      } else if (rule?.variantProperty !== undefined) {
        const property = rule.variantProperty;
        const definition = udir.get(component.name)?.properties?.[property];
        component.properties = {
          ...component.properties,
          [property]: definition ?? {
            type: 'VARIANT',
            default: rule.values?.[0] ?? null,
            options: rule.values ?? [],
          },
        };
        const variants = component.variants ?? [
          { name: '', tree: component.tree as NodeData },
        ];
        component.variants = (rule.values ?? []).flatMap((value) =>
          variants.map((variant) => {
            const parts = parseVariant(variant.name);
            parts.set(property, value);
            const tree = structuredClone(variant.tree);
            recolor(tree, mapName(value, rules));
            return { name: formatVariant(parts), tree };
          }),
        );
        delete component.tree;
      }
      for (const variant of variantsOf(component)) {
        addInstanceDefaults(variant.tree, instanceDefaults);
      }
    }
  }
  return result;
}

// ---------------------------------------------------------------------------------------------
// Translation helpers

function translateCollection(
  collection: VariableCollectionData,
  rules: Rules,
): void {
  collection.modes = collection.modes.map((mode) => mapName(mode, rules));
  if (collection.defaultMode !== undefined) {
    collection.defaultMode = mapName(collection.defaultMode, rules);
  }
  for (const variable of collection.variables) {
    variable.name = mapPath(variable.name, rules);
    const values: JsonObject = {};
    for (const [mode, value] of Object.entries(variable.values)) {
      const alias = (value as JsonObject | null)?.alias;
      values[mapName(mode, rules)] =
        typeof alias === 'string'
          ? { alias: mapVariableLabel(alias, rules) }
          : value;
    }
    variable.values = values;
  }
}

function translateProperties(
  component: string,
  properties: JsonObject,
  rules: Rules,
): JsonObject {
  const result: JsonObject = {};
  for (const [key, value] of Object.entries(properties)) {
    const definition = { ...(value as JsonObject) };
    const name = rules.variantProperties?.[component]?.[key] ?? key;
    if (definition.type === 'VARIANT') {
      const values = rules.variantValues?.[component]?.[name] ?? {};
      if (typeof definition.default === 'string') {
        definition.default = values[definition.default] ?? definition.default;
      }
      if (Array.isArray(definition.options)) {
        definition.options = definition.options.map((option) =>
          typeof option === 'string' ? (values[option] ?? option) : option,
        );
      }
    } else if (
      definition.type === 'INSTANCE_SWAP' &&
      typeof definition.default === 'string'
    ) {
      definition.default = translateLabel(definition.default, rules);
    }
    result[name] = definition;
  }
  return result;
}

/** Renames component labels, instance properties and variable references throughout a tree. */
function translateNames(value: unknown, rules: Rules): void {
  if (Array.isArray(value)) {
    for (const item of value) translateNames(item, rules);
    return;
  }
  if (value === null || typeof value !== 'object') return;
  const object = value as Record<string, unknown>;
  const main =
    typeof object.mainComponent === 'string'
      ? translateLabel(object.mainComponent, rules)
      : undefined;
  for (const [key, item] of Object.entries(object)) {
    if (key === 'mainComponent' && main !== undefined) {
      object[key] = main;
    } else if (key === 'ownerComponents') {
      object[key] = mapStrings(item, (label) => translateLabel(label, rules));
    } else if (key === 'colorVariable' && typeof item === 'string') {
      object[key] = mapVariableLabel(item, rules);
    } else if (key === 'boundVariables') {
      object[key] = mapStrings(item, (label) => mapVariableLabel(label, rules));
    } else if (key === 'variableModes' && item && typeof item === 'object') {
      object[key] = Object.fromEntries(
        Object.entries(item).map(([collection, mode]) => [
          collection,
          typeof mode === 'string' ? mapName(mode, rules) : mode,
        ]),
      );
    } else if (
      key === 'componentProperties' &&
      item &&
      typeof item === 'object'
    ) {
      object[key] = translateInstanceProperties(
        main ? parseLabel(main).name : '',
        item as Record<string, unknown>,
        rules,
      );
    } else {
      translateNames(item, rules);
    }
  }
}

function translateInstanceProperties(
  component: string,
  properties: Record<string, unknown>,
  rules: Rules,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(properties)) {
    const name = rules.variantProperties?.[component]?.[key] ?? key;
    let translated = value;
    if (typeof value === 'string') {
      translated =
        rules.variantValues?.[component]?.[name]?.[value] ??
        (value.includes(' [') || rules.components?.[value] !== undefined
          ? translateLabel(value, rules)
          : value);
    }
    result[name] = translated;
  }
  return result;
}

/** In a Digdir tree, bindings that follow the Color mode are bound to a fixed color instead. */
function recolor(value: unknown, color: string): void {
  if (Array.isArray(value)) {
    for (const item of value) recolor(item, color);
    return;
  }
  if (value === null || typeof value !== 'object') return;
  const object = value as Record<string, unknown>;
  for (const [key, item] of Object.entries(object)) {
    const fix = (label: string) =>
      colorOfBinding(label)?.kind === 'mode'
        ? label.replace(/^Color\//, `Semantic/color/${color}/`)
        : label;
    if (key === 'colorVariable' && typeof item === 'string') {
      object[key] = fix(item);
    } else if (key === 'boundVariables') {
      object[key] = mapStrings(item, fix);
    } else {
      recolor(item, color);
    }
  }
}

/** Instances of components with a color variant property get the value Udir's instances use. */
function addInstanceDefaults(
  value: unknown,
  defaults: Map<string, [string, string]>,
): void {
  if (Array.isArray(value)) {
    for (const item of value) addInstanceDefaults(item, defaults);
    return;
  }
  if (value === null || typeof value !== 'object') return;
  const object = value as Record<string, unknown>;
  if (typeof object.mainComponent === 'string') {
    const added = withInstanceDefault(object.mainComponent, defaults);
    if (added) {
      object.mainComponent = added.label;
      const properties = (object.componentProperties ?? {}) as Record<
        string,
        unknown
      >;
      object.componentProperties = {
        ...properties,
        [added.property]: added.value,
      };
    }
  }
  if (Array.isArray(object.ownerComponents)) {
    object.ownerComponents = object.ownerComponents.map((label) =>
      typeof label === 'string'
        ? (withInstanceDefault(label, defaults)?.label ?? label)
        : label,
    );
  }
  for (const item of Object.values(object)) addInstanceDefaults(item, defaults);
}

/** A component label with the color variant value added, if its component gets one. */
function withInstanceDefault(
  componentLabel: string,
  defaults: Map<string, [string, string]>,
): { label: string; property: string; value: string } | undefined {
  const label = parseLabel(componentLabel);
  const entry = defaults.get(label.name);
  if (!entry || label.variant === undefined) return undefined;
  const [property, value] = entry;
  const parts = parseVariant(label.variant);
  if (parts.has(property)) return undefined;
  parts.set(property, value);
  return {
    label: formatLabel({ ...label, variant: formatVariant(parts) }),
    property,
    value,
  };
}

// ---------------------------------------------------------------------------------------------
// Names and labels

function mapName(name: string, rules: Rules): string {
  return rules.variableNames?.[name] ?? name;
}

function mapPath(path: string, rules: Rules): string {
  return path
    .split('/')
    .map((segment) => mapName(segment, rules))
    .join('/');
}

/** `Collection/a/b (remote)`: maps each part of the variable's name, keeping the suffix. */
function mapVariableLabel(label: string, rules: Rules): string {
  const match = /^(.*?)( \((?:remote|deleted)\))?$/.exec(label);
  const [, name, suffix] = match ?? [label, label, ''];
  const [collection, ...rest] = name.split('/');
  return (
    [collection, mapPath(rest.join('/'), rules)].join('/') + (suffix ?? '')
  );
}

function mapStrings(value: unknown, map: (text: string) => string): unknown {
  if (typeof value === 'string') return map(value);
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, map));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, mapStrings(item, map)]),
    );
  }
  return value;
}

type Label = { name: string; variant?: string; remote: boolean };

/** Parses a `mainComponent` label such as `Button [variant=primary] (remote)`. */
function parseLabel(label: string): Label {
  const match = /^(.*?)(?: \[([^\]]*)\])?( \(remote\))?$/.exec(label);
  return {
    name: match?.[1] ?? label,
    variant: match?.[2],
    remote: match?.[3] !== undefined,
  };
}

function formatLabel({ name, variant, remote }: Label): string {
  return (
    name +
    (variant !== undefined ? ` [${variant}]` : '') +
    (remote ? ' (remote)' : '')
  );
}

function translateLabel(label: string, rules: Rules): string {
  const parsed = parseLabel(label);
  const name = rules.components?.[parsed.name] ?? parsed.name;
  return formatLabel({
    ...parsed,
    name,
    variant:
      parsed.variant !== undefined
        ? translateVariant(name, parsed.variant, rules)
        : undefined,
  });
}

function translateVariant(
  component: string,
  variant: string,
  rules: Rules,
): string {
  const parts = new Map<string, string>();
  for (const [key, value] of parseVariant(variant)) {
    const name = rules.variantProperties?.[component]?.[key] ?? key;
    parts.set(name, rules.variantValues?.[component]?.[name]?.[value] ?? value);
  }
  return formatVariant(parts);
}

/** `size=lg, variant=default` → Map. */
export function parseVariant(name: string): Map<string, string> {
  const parts = new Map<string, string>();
  if (name === '') return parts;
  for (const part of name.split(', ')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    parts.set(part.slice(0, index), part.slice(index + 1));
  }
  return parts;
}

/** Sorted like the extractor's `canonicalVariantName`, so translated names match. */
function formatVariant(parts: Map<string, string>): string {
  return [...parts]
    .map(([key, value]) => `${key}=${value}`)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .join(', ');
}

// ---------------------------------------------------------------------------------------------
// Snapshot helpers

export function allComponents(files: SnapshotFile[]): ComponentData[] {
  return files
    .filter((file) => file.part === 'components')
    .flatMap((file) => file.data as ComponentData[]);
}

/** The first component with each name. */
export function componentsByName(
  files: SnapshotFile[],
): Map<string, ComponentData> {
  const result = new Map<string, ComponentData>();
  for (const component of allComponents(files)) {
    if (!result.has(component.name)) result.set(component.name, component);
  }
  return result;
}

export function variantsOf(
  component: ComponentData,
): { name: string; tree: NodeData }[] {
  if (component.variants) return component.variants;
  return component.tree ? [{ name: '', tree: component.tree }] : [];
}

/** Visits every layer with its path, numbered like the comparison's fact keys. */
export function walkLayers(
  node: NodeData,
  visit: (path: string, node: NodeData) => void,
  path = '.',
): void {
  visit(path, node);
  const counts = new Map<string, number>();
  for (const child of node.children ?? []) {
    const count = (counts.get(child.name) ?? 0) + 1;
    counts.set(child.name, count);
    const segment = count === 1 ? child.name : `${child.name} #${count}`;
    walkLayers(child, visit, path === '.' ? segment : `${path} > ${segment}`);
  }
}

/** Color bindings directly on a layer or override: paints and bound variables. */
export function* colorBindings(
  object: Record<string, unknown>,
): Generator<{ field: string; label: string }> {
  for (const field of ['fills', 'strokes']) {
    const paints = object[field];
    if (!Array.isArray(paints)) continue;
    for (const paint of paints) {
      const label = (paint as JsonObject | null)?.colorVariable;
      if (typeof label === 'string') yield { field, label };
    }
  }
  const bound = object.boundVariables;
  if (bound && typeof bound === 'object') {
    for (const [field, label] of Object.entries(bound)) {
      if (typeof label === 'string') yield { field, label };
    }
  }
}

export type BindingColor = { kind: 'mode' } | { kind: 'fixed'; color: string };

/**
 * Whether a binding follows the Color mode or is fixed to a palette color; undefined for other
 * bindings, including the focus colors (`Semantic/color/focus/…`), which aren't a palette.
 */
export function colorOfBinding(label: string): BindingColor | undefined {
  const name = label.replace(/ \((remote|deleted)\)$/, '');
  if (name.startsWith('Color/')) return { kind: 'mode' };
  const color = /^Semantic\/color\/([^/]+)\//.exec(name)?.[1];
  return color === undefined || color === 'focus'
    ? undefined
    : { kind: 'fixed', color };
}
