/**
 * Verifies and compares snapshots made with `extract-snapshot.js`. See `@internal/figma/README.md`.
 *
 *   node @internal/figma/compare-snapshots.ts verify <snapshot-dir>...
 *   node @internal/figma/compare-snapshots.ts diff <from-dir> <to-dir> [--ignore <prefix>]... [--json]
 *   node @internal/figma/compare-snapshots.ts changes --digdir <old> <new> --udir <old> <new>
 *     [--ignore <prefix>]... [--json]
 *
 * A snapshot directory holds one library's snapshot: either the plugin's `snapshot.json` bundle or
 * separately saved `use_figma` results. Every part's checksum is verified before it is used, so a
 * file that was changed while being saved is reported instead of compared.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

/** The shapes `extract-snapshot.js` produces for the `variables` and `components` parts. */
type VariableCollectionData = {
  name: string;
  modes: string[];
  defaultMode?: string;
  hiddenFromPublishing?: boolean;
  variables: VariableData[];
};
type VariableData = {
  name: string;
  type: string;
  scopes: string[];
  codeSyntax?: JsonObject;
  hiddenFromPublishing?: boolean;
  values: JsonObject;
};
type ComponentData = {
  name: string;
  type: string;
  /** Frames, sections and groups between the component and its page. */
  container?: string;
  properties?: JsonObject;
  variants?: { name: string; tree: NodeData }[];
  tree?: NodeData;
};
type NodeData = { name: string; type: string; children?: NodeData[] } & {
  [field: string]: Json | NodeData[] | undefined;
};

type SnapshotFile = {
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
type Facts = Map<string, string>;

type Change = { key: string; before?: string; after?: string };

/** Keep identical to `SNAPSHOT_SCHEMA` in `extract-snapshot.js`. */
const SNAPSHOT_SCHEMA = 4;

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

function checksum(value: unknown): string {
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

function loadSnapshot(dir: string): {
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

function loadFacts(dir: string): Facts {
  const { files, errors } = loadSnapshot(dir);
  if (errors.length > 0) {
    throw new Error(`Invalid snapshot ${dir}:\n  ${errors.join('\n  ')}`);
  }
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
function componentName(label: string): string {
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
function groupBy<T>(items: T[], key: (item: T) => string): Map<string, T[]> {
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

function diff(from: Facts, to: Facts): Map<string, Change> {
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

function withoutIgnored<T>(
  map: Map<string, T>,
  ignore: string[],
): Map<string, T> {
  return new Map(
    [...map].filter(
      ([key]) => !ignore.some((prefix) => key.startsWith(prefix)),
    ),
  );
}

type ChangeComparison = {
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

function compareChanges(
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

// ---------------------------------------------------------------------------------------------
// Output

/** The variable, collection, component or variant a fact belongs to, without the layer path. */
function subjectOf(key: string): string {
  return key.split(' :: ')[0].split(' @ ')[0];
}

function describe(change: Change): string {
  const field = change.key
    .slice(subjectOf(change.key).length)
    .replace(/^ (@|::) /, '');
  if (change.before === undefined) return `${field}: added ${change.after}`;
  if (change.after === undefined)
    return `${field}: removed (was ${change.before})`;
  return `${field}: ${change.before} → ${change.after}`;
}

function printChanges(
  title: string,
  changes: Change[],
  summary: boolean,
): void {
  if (summary) {
    printSummary(title, changes);
    return;
  }
  console.log(`\n## ${title} (${changes.length})`);
  for (const [subject, group] of [
    ...groupBy(changes, (change) => subjectOf(change.key)),
  ].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
    console.log(`\n### ${subject}\n`);
    for (const change of group) {
      console.log(`- ${describe(change)}`);
    }
  }
}

/**
 * One table row per component or variable collection, and which variants exist in only one
 * snapshot. Component rows count facts; variable rows count variables, since a variable has
 * several facts (type, scopes, code syntax, a value per mode). Renamed variants make a whole
 * variant tree show up as removed and added, which the variant columns make visible.
 */
function printSummary(title: string, changes: Change[]): void {
  const entityOf = (key: string) => {
    const subject = subjectOf(key);
    return subject.startsWith('variable ')
      ? `variables in ${subject.slice('variable '.length).split('/')[0]}`
      : subject.replace(/ \[[^\]]*\]$/, '');
  };
  const variantOf = (key: string) =>
    key.endsWith(' @ . :: type')
      ? /\[([^\]]*)\]$/.exec(subjectOf(key))?.[1]
      : undefined;
  const cell = (text: string) => text.replaceAll('|', '\\|');
  const list = (items: string[]) =>
    items.length <= 3
      ? items.map(cell).join('; ')
      : `${items.slice(0, 3).map(cell).join('; ')} (+${items.length - 3} more)`;

  console.log(`\n## ${title} (${changes.length} facts)\n`);
  console.log(
    '| Component or variables | Counted | Only in first | Only in second | Changed | Variants only in first | Variants only in second |',
  );
  console.log('| --- | --- | --- | --- | --- | --- | --- |');
  const rows = [...groupBy(changes, (change) => entityOf(change.key))].sort(
    ([, a], [, b]) => b.length - a.length,
  );
  for (const [entity, group] of rows) {
    const removed = group.filter((change) => change.after === undefined);
    const added = group.filter((change) => change.before === undefined);
    let counts: [number, number, number];
    if (entity.startsWith('variables in ')) {
      // Every variable has a `type` fact, so it marks variables that exist on one side only.
      const variablesIn = (items: Change[]) =>
        new Set(
          items
            .filter((change) => change.key.endsWith(' :: type'))
            .map((change) => subjectOf(change.key)),
        );
      const onlyFirst = variablesIn(removed);
      const onlySecond = variablesIn(added);
      const changed = new Set(
        group
          .map((change) => subjectOf(change.key))
          .filter(
            (subject) => !onlyFirst.has(subject) && !onlySecond.has(subject),
          ),
      );
      counts = [onlyFirst.size, onlySecond.size, changed.size];
    } else {
      counts = [
        removed.length,
        added.length,
        group.length - removed.length - added.length,
      ];
    }
    const variants = (items: Change[]) =>
      items.flatMap((change) => variantOf(change.key) ?? []);
    const unit = entity.startsWith('variables in ') ? 'variables' : 'facts';
    console.log(
      `| ${cell(entity)} | ${unit} | ${counts.join(' | ')} | ${list(variants(removed))} | ${list(variants(added))} |`,
    );
  }
}

// ---------------------------------------------------------------------------------------------
// Command line

function parseArgs(argv: string[]) {
  const positional: string[] = [];
  const ignore: string[] = [];
  const named = new Map<string, string[]>();
  let json = false;
  let summary = false;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') json = true;
    else if (arg === '--summary') summary = true;
    else if (arg === '--ignore') ignore.push(argv[++index]);
    else if (arg === '--digdir' || arg === '--udir') {
      named.set(arg.slice(2), [argv[++index], argv[++index]]);
    } else positional.push(arg);
  }
  return { positional, ignore, named, json, summary };
}

function usage(): never {
  console.error(
    [
      'Usage:',
      '  node @internal/figma/compare-snapshots.ts verify <snapshot-dir>...',
      '  node @internal/figma/compare-snapshots.ts diff <from-dir> <to-dir> [--ignore <prefix>]... [--summary | --json]',
      '  node @internal/figma/compare-snapshots.ts changes --digdir <old> <new> --udir <old> <new> [--ignore <prefix>]... [--summary | --json]',
    ].join('\n'),
  );
  process.exit(2);
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2);
  const { positional, ignore, named, json, summary } = parseArgs(rest);

  if (command === 'verify') {
    if (positional.length === 0) usage();
    let failed = false;
    for (const dir of positional) {
      const { files, errors } = loadSnapshot(dir);
      for (const error of errors) console.error(error);
      failed ||= errors.length > 0;
      console.log(
        `${dir}: ${files.length} valid file(s), ${errors.length} problem(s)`,
      );
    }
    process.exit(failed ? 1 : 0);
  }

  if (command === 'diff') {
    if (positional.length !== 2) usage();
    const [fromDir, toDir] = positional;
    const changes = withoutIgnored(
      diff(loadFacts(fromDir), loadFacts(toDir)),
      ignore,
    );
    if (json) {
      console.log(JSON.stringify([...changes.values()], null, 2));
      return;
    }
    console.log(`# Differences from ${fromDir} to ${toDir}`);
    printChanges('Differences', [...changes.values()], summary);
    return;
  }

  if (command === 'changes') {
    const digdir = named.get('digdir');
    const udir = named.get('udir');
    if (!digdir || !udir) usage();
    const udirNew = loadFacts(udir[1]);
    const result = compareChanges(
      withoutIgnored(diff(loadFacts(digdir[0]), loadFacts(digdir[1])), ignore),
      withoutIgnored(diff(loadFacts(udir[0]), udirNew), ignore),
      udirNew,
    );
    if (json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    console.log(
      `# Digdir ${digdir[0]} → ${digdir[1]} compared with Udir ${udir[0]} → ${udir[1]}`,
    );
    printChanges('Digdir changes Udir has not made', result.missing, summary);
    console.log(`\n## Changed differently (${result.different.length})\n`);
    for (const { digdir: d, udir: u } of result.different) {
      console.log(
        `- ${d.key}\n  - Digdir: ${describe(d)}\n  - Udir: ${describe(u)}`,
      );
    }
    printChanges('Changes only Udir made', result.udirOnly, summary);
    console.log(
      `\n## Summary\n\n- Applied: ${result.applied.length}\n- Already matching: ${result.alreadyMatching.length}`,
    );
    return;
  }

  usage();
}

try {
  main();
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
