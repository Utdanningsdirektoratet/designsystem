/**
 * Verifies and compares snapshots made with `extract-snapshot.js`, optionally with the rules in a
 * rules file (`rules.ts`). Run without arguments for usage. See `@internal/figma/README.md`.
 *
 * A snapshot directory holds one library's snapshot: either the plugin's `snapshot.json` bundle or
 * separately saved `use_figma` results. Every part's checksum is verified before it is used, so a
 * file that was changed while being saved is reported instead of compared.
 */
import {
  type Rules,
  type Violation,
  checkColors,
  compareWithRules,
  componentOfKey,
  loadRules,
  translateDigdir,
  translateUdir,
  validateRules,
} from './rules.ts';
import {
  type Change,
  type SnapshotFile,
  compareChanges,
  diff,
  factsFrom,
  groupBy,
  loadFacts,
  loadFiles,
  loadSnapshot,
  subjectOf,
  withoutIgnored,
} from './snapshots.ts';
import { type Suggestions, suggestRules } from './suggest.ts';

// ---------------------------------------------------------------------------------------------
// Output

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

function printViolations(violations: Violation[]): void {
  console.log(`\n## Breaks Udir's color rules (${violations.length})`);
  for (const [component, group] of groupBy(
    violations,
    (violation) => violation.component,
  )) {
    console.log(`\n### ${component}\n`);
    for (const { variant, layer, problem } of group) {
      console.log(`- ${variant ? `[${variant}] ` : ''}${layer}: ${problem}`);
    }
  }
}

function printRestructured(changes: Change[]): void {
  console.log(
    `\n## Rebuilt in Udir (${changes.length} facts, listed by component only)\n`,
  );
  for (const [component, group] of groupBy(changes, (change) =>
    componentOfKey(change.key),
  )) {
    console.log(`- ${component}: ${group.length} differing facts`);
  }
}

function printSuggestions(suggestions: Suggestions): void {
  const block = (title: string, value: unknown, note: string) => {
    console.log(`\n## ${title}\n\n${note}\n`);
    console.log('```json');
    console.log(JSON.stringify(value, null, 2));
    console.log('```');
  };
  console.log('# Suggested rules');
  block(
    'components',
    suggestions.components,
    'Components in one library only whose names differ only in case, spaces or punctuation.',
  );
  block(
    'variantProperties',
    suggestions.variantProperties,
    'One variant property in each library only, in components whose variants share no names.',
  );
  block(
    'variantValues',
    suggestions.variantValues,
    'Variant values paired by case or size synonyms (`large` and `lg`).',
  );
  block(
    'colors',
    suggestions.colors,
    'Components where Digdir follows the Color mode and Udir binds fixed colors only.',
  );
  block(
    'restructured',
    suggestions.restructured,
    'Components with slot properties that Digdir doesn’t have.',
  );
  console.log(
    `\n## Variants that couldn't be paired (${suggestions.unpairedVariants.length})\n`,
  );
  for (const {
    component,
    onlyInUdir,
    onlyInDigdir,
  } of suggestions.unpairedVariants) {
    console.log(
      `- ${component}: only in Udir ${onlyInUdir.join(', ') || '–'}; only in Digdir ${onlyInDigdir.join(', ') || '–'}`,
    );
  }
  console.log(
    `\n## Partly converted to fixed colors (${suggestions.partlyConverted.length})\n`,
  );
  console.log(
    'Udir binds some layers to fixed colors that Digdir lets follow the Color mode, but not all. Decide per component whether the rest are deliberate.\n',
  );
  for (const {
    component,
    modeDriven,
    fixed,
    examples,
  } of suggestions.partlyConverted) {
    const fixedText = Object.entries(fixed)
      .map(([color, count]) => `${count} ${color}`)
      .join(', ');
    console.log(
      `- ${component}: ${modeDriven} follow the Color mode, fixed: ${fixedText}`,
    );
    for (const example of examples) console.log(`  - ${example}`);
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
  let rulesFile: string | undefined;
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') json = true;
    else if (arg === '--summary') summary = true;
    else if (arg === '--ignore') ignore.push(argv[++index]);
    else if (arg === '--rules') rulesFile = argv[++index];
    else if (arg === '--digdir' || arg === '--udir') {
      named.set(arg.slice(2), [argv[++index], argv[++index]]);
    } else positional.push(arg);
  }
  return { positional, ignore, named, json, summary, rulesFile };
}

function usage(): never {
  const command = 'node @internal/figma/compare-snapshots.ts';
  console.error(
    [
      'Usage:',
      `  ${command} verify <snapshot-dir>...`,
      `  ${command} diff <from-dir> <to-dir> [--ignore <prefix>]... [--summary | --json]`,
      `  ${command} check <udir-dir> --rules <file> [--json]`,
      `  ${command} compare <digdir-dir> <udir-dir> --rules <file> [--ignore <prefix>]... [--summary | --json]`,
      `  ${command} suggest <digdir-dir> <udir-dir> [--rules <file>] [--json]`,
      `  ${command} changes --digdir <old> <new> --udir <old> <new> [--rules <file>] [--ignore <prefix>]... [--summary | --json]`,
    ].join('\n'),
  );
  process.exit(2);
}

/** Loads the rules and stops if they name components the snapshots don't have. */
function rulesFor(
  rulesFile: string,
  udirFiles: SnapshotFile[],
  digdirFiles?: SnapshotFile[],
): Rules {
  const rules = loadRules(rulesFile);
  const problems = validateRules(rules, udirFiles, digdirFiles);
  if (problems.length > 0) {
    throw new Error(`${rulesFile}:\n  ${problems.join('\n  ')}`);
  }
  return rules;
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2);
  const { positional, ignore, named, json, summary, rulesFile } =
    parseArgs(rest);

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

  if (command === 'check') {
    if (positional.length !== 1 || !rulesFile) usage();
    const udirFiles = loadFiles(positional[0]);
    const violations = checkColors(udirFiles, rulesFor(rulesFile, udirFiles));
    if (json) console.log(JSON.stringify(violations, null, 2));
    else printViolations(violations);
    process.exit(violations.length > 0 ? 1 : 0);
  }

  if (command === 'compare') {
    if (positional.length !== 2 || !rulesFile) usage();
    const [digdirDir, udirDir] = positional;
    const digdirFiles = loadFiles(digdirDir);
    const udirFiles = loadFiles(udirDir);
    const result = compareWithRules(
      digdirFiles,
      udirFiles,
      rulesFor(rulesFile, udirFiles, digdirFiles),
    );
    const differences = [
      ...withoutIgnored(
        new Map(result.differences.map((change) => [change.key, change])),
        ignore,
      ).values(),
    ];
    if (json) {
      console.log(JSON.stringify({ ...result, differences }, null, 2));
      return;
    }
    console.log(
      `# Digdir ${digdirDir} compared with Udir ${udirDir}, with ${rulesFile}`,
    );
    printViolations(result.violations);
    printRestructured(result.restructured);
    printChanges('Differences no rule explains', differences, summary);
    return;
  }

  if (command === 'suggest') {
    if (positional.length !== 2) usage();
    const [digdirDir, udirDir] = positional;
    const digdirFiles = loadFiles(digdirDir);
    const udirFiles = loadFiles(udirDir);
    const rules = rulesFile ? rulesFor(rulesFile, udirFiles, digdirFiles) : {};
    const suggestions = suggestRules(digdirFiles, udirFiles, rules);
    if (json) console.log(JSON.stringify(suggestions, null, 2));
    else printSuggestions(suggestions);
    return;
  }

  if (command === 'changes') {
    const digdir = named.get('digdir');
    const udir = named.get('udir');
    if (!digdir || !udir) usage();
    const [digdirOld, digdirNew, udirOld, udirNew] = [...digdir, ...udir].map(
      (dir) => loadFiles(dir),
    );
    const rules = rulesFile ? rulesFor(rulesFile, udirNew, digdirNew) : {};
    const udirOldTranslated = translateUdir(udirOld, rules);
    const udirNewTranslated = translateUdir(udirNew, rules);
    const udirNewFacts = factsFrom(udirNewTranslated);
    const result = compareChanges(
      withoutIgnored(
        diff(
          factsFrom(translateDigdir(digdirOld, udirNewTranslated, rules)),
          factsFrom(translateDigdir(digdirNew, udirNewTranslated, rules)),
        ),
        ignore,
      ),
      withoutIgnored(diff(factsFrom(udirOldTranslated), udirNewFacts), ignore),
      udirNewFacts,
    );
    const violations = rulesFile ? checkColors(udirNew, rules) : [];
    if (json) {
      console.log(JSON.stringify({ ...result, violations }, null, 2));
      return;
    }
    console.log(
      `# Digdir ${digdir[0]} → ${digdir[1]} compared with Udir ${udir[0]} → ${udir[1]}`,
    );
    if (rulesFile) printViolations(violations);
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
