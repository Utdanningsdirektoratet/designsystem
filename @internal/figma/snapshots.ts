/**
 * Reading, verifying and flattening snapshots made with `extract-snapshot.js`, shared by
 * `compare-snapshots.ts`, `rules.ts` and `suggest.ts`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };

/** The shapes `extract-snapshot.js` produces for the `variables` and `components` parts. */
export type VariableCollectionData = {
  name: string;
  modes: string[];
  defaultMode?: string;
  hiddenFromPublishing?: boolean;
  variables: VariableData[];
};
export type VariableData = {
  name: string;
  type: string;
  scopes: string[];
  codeSyntax?: JsonObject;
  hiddenFromPublishing?: boolean;
  values: JsonObject;
};
export type ComponentData = {
  name: string;
  type: string;
  /** Frames, sections and groups between the component and its page. */
  container?: string;
  properties?: JsonObject;
  variants?: { name: string; tree: NodeData }[];
  tree?: NodeData;
};
export type NodeData = { name: string; type: string; children?: NodeData[] } & {
  [field: string]: Json | NodeData[] | undefined;
};

export type SnapshotFile = {
  schema: number;
  file: string;
  part: string;
  options: JsonObject;
  data: Json;
  checksum: string;
};

/** One file holding every part, as saved by the development plugin. */
type SnapshotBundle = {
  schema: number;
  kind: 'bundle';
  file: string;
  files: SnapshotFile[];
  /** Pages the plugin could not extract. */
  errors: { page: string; message: string }[];
};

/** Every compared fact, keyed by `<subject> :: <field>`, with the value as stable JSON. */
export type Facts = Map<string, string>;

export type Change = { key: string; before?: string; after?: string };

/** Keep identical to `SNAPSHOT_SCHEMA` in `extract-snapshot.js`. */
export const SNAPSHOT_SCHEMA = 4;

// ---------------------------------------------------------------------------------------------
// Checksum. Keep identical to `extract-snapshot.js`.

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map((item) => (item === undefined ? 'null' : stableStringify(item))).join(',')}]`;
  }
  const object = value as Record<string, unknown>;
  const keys = Object.keys(object)
    .filter((key) => object[key] !== undefined)
    .sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(',')}}`;
}

export function checksum(value: unknown): string {
  const text = stableStringify(value);
  let first = 0x811c9dc5;
  let second = 0x050c5d1f;
  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);
    first = Math.imul(first ^ code, 0x01000193) >>> 0;
    second = Math.imul(second ^ code, 0x01000193) >>> 0;
  }
  return (
    first.toString(16).padStart(8, '0') + second.toString(16).padStart(8, '0')
  );
}

// ---------------------------------------------------------------------------------------------
// Loading

function jsonFiles(dir: string): string[] {
  return readdirSync(dir)
    .sort()
    .flatMap((entry) => {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) return jsonFiles(full);
      return entry.endsWith('.json') ? [full] : [];
    });
}

export function loadSnapshot(dir: string): {
  files: SnapshotFile[];
  errors: string[];
} {
  const files: SnapshotFile[] = [];
  const errors: string[] = [];
  const schemaError = (label: string, schema: number) =>
    `${label}: made with snapshot schema ${String(schema)}, but this script reads schema ${SNAPSHOT_SCHEMA}; extract it again with the current extractor`;
  const addPart = (label: string, part: SnapshotFile) => {
    if (part.schema !== SNAPSHOT_SCHEMA) {
      errors.push(schemaError(label, part.schema));
      return;
    }
    const actual = checksum(part.data);
    if (actual !== part.checksum) {
      errors.push(
        `${label}: checksum mismatch (saved ${part.checksum}, data gives ${actual}); extract and save it again`,
      );
      return;
    }
    files.push(part);
  };

  for (const file of jsonFiles(dir)) {
    let parsed: SnapshotFile | SnapshotBundle;
    try {
      parsed = JSON.parse(readFileSync(file, 'utf8')) as
        | SnapshotFile
        | SnapshotBundle;
    } catch (error) {
      errors.push(`${file}: not valid JSON (${(error as Error).message})`);
      continue;
    }
    if ('kind' in parsed && parsed.kind === 'bundle') {
      if (parsed.schema !== SNAPSHOT_SCHEMA) {
        errors.push(schemaError(file, parsed.schema));
        continue;
      }
      parsed.files.forEach((part, index) =>
        addPart(`${file} part ${index + 1} (${part.part})`, part),
      );
      // An incomplete snapshot would report the missing pages as removed components.
      for (const { page, message } of parsed.errors) {
        errors.push(`${file}: page "${page}" was not extracted: ${message}`);
      }
    } else {
      addPart(file, parsed as SnapshotFile);
    }
  }
  if (files.length === 0 && errors.length === 0) {
    errors.push(`${dir}: no snapshot files`);
  }
  return { files, errors };
}

/** The verified parts of a snapshot directory; throws if any part is invalid. */
export function loadFiles(dir: string): SnapshotFile[] {
  const { files, errors } = loadSnapshot(dir);
  if (errors.length > 0) {
    throw new Error(`Invalid snapshot ${dir}:\n  ${errors.join('\n  ')}`);
  }
  return files;
}

export function loadFacts(dir: string): Facts {
  return factsFrom(loadFiles(dir));
}

/** Flattens snapshot parts into facts. */
export function factsFrom(files: SnapshotFile[]): Facts {
  const facts: Facts = new Map();
  const components: { page: string; component: ComponentData }[] = [];
  for (const file of files) {
    if (file.part === 'variables') {
      for (const collection of file.data as VariableCollectionData[]) {
        addVariableFacts(facts, collection);
      }
    } else if (file.part === 'components') {
      const page =
        // Trimmed: libraries differ in trailing spaces in page names such as `❖  Checkbox `.
        typeof file.options.page === 'string' ? file.options.page.trim() : '';
      for (const component of file.data as ComponentData[]) {
        components.push({ page, component });
      }
    }
  }

  // Names are the only identity shared between files, so qualify a name only as far as needed:
  // with the page when it's used on several pages, and with the containing frames when it's
  // used more than once on one page. That keeps a component's key stable when the files are
  // split differently, or when the library's pages are reorganised.
  const byName = groupBy(components, ({ component }) => component.name);
  // Needed before any facts are added: instances refer to components defined anywhere.
  const ambiguousNames = new Set(
    [...byName]
      .filter(([, entries]) => entries.length > 1)
      .map(([name]) => name),
  );
  for (const [name, entries] of byName) {
    const severalPages = new Set(entries.map(({ page }) => page)).size > 1;
    for (const [page, onPage] of groupBy(entries, ({ page }) => page)) {
      const byContainer = groupBy(
        onPage,
        ({ component }) => component.container ?? '',
      );
      for (const [container, sameContainer] of byContainer) {
        const qualifiers = [
          severalPages ? `page ${page}` : undefined,
          onPage.length > 1 ? `in ${container || 'page'}` : undefined,
        ].filter((qualifier) => qualifier !== undefined);
        const base =
          qualifiers.length > 0 ? `${name} (${qualifiers.join(', ')})` : name;
        if (sameContainer.length > 1) {
          console.error(
            `Warning: ${sameContainer.length} components named "${name}" in the same place (${base}); they are matched by order, so check them by hand.`,
          );
        }
        sameContainer.forEach(({ component }, index) => {
          const label = index === 0 ? base : `${base} #${index + 1}`;
          addComponentFacts(facts, label, component, ambiguousNames);
        });
      }
    }
  }
  return facts;
}

// ---------------------------------------------------------------------------------------------
// Flattening

function addVariableFacts(
  facts: Facts,
  collection: VariableCollectionData,
): void {
  const subject = `collection ${collection.name}`;
  setFact(facts, subject, 'modes', collection.modes);
  setFact(facts, subject, 'defaultMode', collection.defaultMode);
  setFact(
    facts,
    subject,
    'hiddenFromPublishing',
    collection.hiddenFromPublishing,
  );
  for (const variable of collection.variables) {
    const variableSubject = `variable ${collection.name}/${variable.name}`;
    setFact(facts, variableSubject, 'type', variable.type);
    setFact(facts, variableSubject, 'scopes', variable.scopes);
    setFact(facts, variableSubject, 'codeSyntax', variable.codeSyntax);
    setFact(
      facts,
      variableSubject,
      'hiddenFromPublishing',
      variable.hiddenFromPublishing,
    );
    for (const mode of Object.keys(variable.values)) {
      setFact(facts, variableSubject, `value[${mode}]`, variable.values[mode]);
    }
  }
}

function addComponentFacts(
  facts: Facts,
  name: string,
  component: ComponentData,
  ambiguousNames: Set<string>,
): void {
  const subject = `component ${name}`;
  setFact(facts, subject, 'type', component.type);
  const properties = component.properties ?? {};
  for (const property of Object.keys(properties)) {
    setFact(facts, subject, `property ${property}`, properties[property]);
  }
  if (component.variants) {
    for (const variant of component.variants) {
      addNodeFacts(
        facts,
        `${subject} [${variant.name}]`,
        '.',
        variant.tree,
        ambiguousNames,
      );
    }
  } else if (component.tree) {
    addNodeFacts(facts, subject, '.', component.tree, ambiguousNames);
  }
}

function addNodeFacts(
  facts: Facts,
  subject: string,
  nodePath: string,
  node: NodeData,
  ambiguousNames: Set<string>,
): void {
  // `@` separates the component (or variant) from the layer path, so reports can group by it.
  const nodeSubject = `${subject} @ ${nodePath}`;
  for (const field of Object.keys(node)) {
    if (field === 'name' || field === 'children') continue;
    // Where the main component lives only identifies it when its name is ambiguous; otherwise
    // reorganising the library's frames would show up as changes to every instance.
    if (
      field === 'mainComponentContainer' &&
      !(
        typeof node.mainComponent === 'string' &&
        ambiguousNames.has(componentName(node.mainComponent))
      )
    ) {
      continue;
    }
    const value = node[field] as Json;
    if (
      field === 'boundVariables' ||
      field === 'variableModes' ||
      field === 'componentProperties' ||
      field === 'overrides'
    ) {
      const entries = value as JsonObject;
      for (const key of Object.keys(entries)) {
        const entry =
          field === 'overrides'
            ? overrideWithoutUnneededContainer(
                entries[key] as JsonObject,
                ambiguousNames,
              )
            : entries[key];
        setFact(facts, nodeSubject, `${field}[${key}]`, entry);
      }
    } else {
      setFact(facts, nodeSubject, field, value);
    }
  }
  const children = node.children ?? [];
  const nameCounts = new Map<string, number>();
  const segments = children.map((child) => {
    // Same numbering as `pathSegment` in `extract-snapshot.js`.
    const count = (nameCounts.get(child.name) ?? 0) + 1;
    nameCounts.set(child.name, count);
    return count === 1 ? child.name : `${child.name} #${count}`;
  });
  // Layer order is part of the structure: reordering auto layout children changes the result.
  if (segments.length > 0) setFact(facts, nodeSubject, 'children', segments);
  children.forEach((child, index) => {
    const segment = segments[index];
    addNodeFacts(
      facts,
      subject,
      nodePath === '.' ? segment : `${nodePath} > ${segment}`,
      child,
      ambiguousNames,
    );
  });
}

/** The component name in a `mainComponent` label such as `Button [variant=primary] (remote)`. */
export function componentName(label: string): string {
  return label.replace(/ \(remote\)$/, '').replace(/ \[[^\]]*\]$/, '');
}

/**
 * An override of a nested instance records where its main component lives, like an instance in
 * the tree does. Keep that only when the component's name is ambiguous, for the same reason.
 */
function overrideWithoutUnneededContainer(
  override: JsonObject,
  ambiguousNames: Set<string>,
): JsonObject {
  const values = override.values as JsonObject | undefined;
  if (
    !values ||
    values.mainComponentContainer === undefined ||
    (typeof values.mainComponent === 'string' &&
      ambiguousNames.has(componentName(values.mainComponent)))
  ) {
    return override;
  }
  const { mainComponentContainer: _, ...rest } = values;
  return { ...override, values: rest };
}

/** Groups items by key, keeping the order in which keys and items first appear. */
export function groupBy<T>(
  items: T[],
  key: (item: T) => string,
): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const groupKey = key(item);
    const group = groups.get(groupKey);
    if (group) group.push(item);
    else groups.set(groupKey, [item]);
  }
  return groups;
}

function setFact(
  facts: Facts,
  subject: string,
  field: string,
  value: Json | undefined,
): void {
  if (value === undefined) return;
  facts.set(
    `${subject} :: ${field}`,
    stableStringify(withoutResolvedColors(value)),
  );
}

/**
 * A paint bound to a color variable also records the color the variable resolves to in the
 * file's theme. Only the binding is compared: Udir's and Digdir's themes differ on purpose.
 */
function withoutResolvedColors(value: Json): Json {
  if (Array.isArray(value)) return value.map(withoutResolvedColors);
  if (value === null || typeof value !== 'object') return value;
  const result: JsonObject = {};
  for (const [key, item] of Object.entries(value)) {
    if (key === 'color' && 'colorVariable' in value) continue;
    result[key] = withoutResolvedColors(item);
  }
  return result;
}

// ---------------------------------------------------------------------------------------------
// Comparing

export function diff(from: Facts, to: Facts): Map<string, Change> {
  const changes = new Map<string, Change>();
  for (const [key, before] of from) {
    const after = to.get(key);
    if (after !== before) changes.set(key, { key, before, after });
  }
  for (const [key, after] of to) {
    if (!from.has(key)) changes.set(key, { key, after });
  }
  return changes;
}

export function withoutIgnored<T>(
  map: Map<string, T>,
  ignore: string[],
): Map<string, T> {
  return new Map(
    [...map].filter(
      ([key]) => !ignore.some((prefix) => key.startsWith(prefix)),
    ),
  );
}

export type ChangeComparison = {
  /** Digdir and Udir made the same change. */
  applied: Change[];
  /** Digdir changed it, Udir didn't, and the two libraries now differ. */
  missing: Change[];
  /** Both changed it, to different values. */
  different: { digdir: Change; udir: Change }[];
  /** Digdir changed it and Udir already had Digdir's new value. */
  alreadyMatching: Change[];
  /** Only Udir changed it. */
  udirOnly: Change[];
};

export function compareChanges(
  digdirChanges: Map<string, Change>,
  udirChanges: Map<string, Change>,
  udirNew: Facts,
): ChangeComparison {
  const result: ChangeComparison = {
    applied: [],
    missing: [],
    different: [],
    alreadyMatching: [],
    udirOnly: [],
  };
  for (const [key, digdir] of digdirChanges) {
    const udir = udirChanges.get(key);
    if (udir) {
      if (udir.after === digdir.after) result.applied.push(digdir);
      else result.different.push({ digdir, udir });
    } else if (udirNew.get(key) === digdir.after) {
      result.alreadyMatching.push(digdir);
    } else {
      result.missing.push(digdir);
    }
  }
  for (const [key, udir] of udirChanges) {
    if (!digdirChanges.has(key)) result.udirOnly.push(udir);
  }
  return result;
}

/** The variable, collection, component or variant a fact belongs to, without the layer path. */
export function subjectOf(key: string): string {
  return key.split(' :: ')[0].split(' @ ')[0];
}
