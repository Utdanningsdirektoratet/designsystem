/**
 * Checks and comparisons with rules, on small hand-built snapshots of a "Digdir" and a "Udir"
 * library. `udirLibrary()` follows the rules in `RULES` exactly; tests change one thing at a time.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { expect, test } from 'vitest';
import {
  type Rules,
  checkColors,
  compareWithRules,
  validateRules,
} from './rules.ts';
import {
  type ComponentData,
  type NodeData,
  type SnapshotFile,
  type VariableCollectionData,
  SNAPSHOT_SCHEMA,
  checksum,
} from './snapshots.ts';

const compareScript = path.join(import.meta.dirname, 'compare-snapshots.ts');

const RULES: Rules = {
  components: { IconButton: 'Icon button' },
  variantValues: { Heading: { size: { large: 'lg', medium: 'md' } } },
  variableNames: { support1: 'brand1' },
  colors: {
    Link: { fixed: 'neutral' },
    Button: { variantProperty: 'color', values: ['neutral', 'danger'] },
  },
  restructured: { Card: 'Rebuilt with slots' },
};

type Library = {
  variables: VariableCollectionData[];
  components: ComponentData[];
};

const paint = (variable: string) => ({
  type: 'SOLID',
  colorVariable: variable,
});

function layer(name: string, extra: Record<string, unknown> = {}): NodeData {
  return { name, type: 'FRAME', ...extra } as NodeData;
}

const variantProperty = (options: string[]) => ({
  type: 'VARIANT',
  default: options[0],
  options,
});

function digdirLibrary(): Library {
  const button = (variant: string) => ({
    name: `variant=${variant}`,
    tree: layer('Button', {
      fills: [paint('Color/base-default')],
      children: [
        layer('Label', { fills: [paint('Color/base-contrast-default')] }),
      ],
    }),
  });
  return {
    variables: [
      {
        name: 'Semantic',
        modes: ['Semantic'],
        variables: [
          {
            name: 'color/brand1/base-default',
            type: 'COLOR',
            scopes: ['ALL_SCOPES'],
            values: { Semantic: '#123456' },
          },
        ],
      },
    ],
    components: [
      {
        name: 'Link',
        type: 'COMPONENT',
        tree: layer('Link', {
          fills: [paint('Color/text-default')],
          children: [
            layer('Underline', { strokes: [paint('Color/border-default')] }),
          ],
        }),
      },
      {
        name: 'Button',
        type: 'COMPONENT_SET',
        properties: { variant: variantProperty(['primary', 'secondary']) },
        variants: [button('primary'), button('secondary')],
      },
      {
        name: 'Icon button',
        type: 'COMPONENT_SET',
        properties: { size: variantProperty(['md']) },
        variants: [
          { name: 'size=md', tree: layer('Icon button', { paddingLeft: 8 }) },
        ],
      },
      {
        name: 'Heading',
        type: 'COMPONENT_SET',
        properties: { size: variantProperty(['lg', 'md']) },
        variants: [
          { name: 'size=lg', tree: layer('Heading', { paddingTop: 8 }) },
          { name: 'size=md', tree: layer('Heading', { paddingTop: 4 }) },
        ],
      },
      {
        name: 'Card',
        type: 'COMPONENT',
        tree: layer('Card', { children: [layer('Header')] }),
      },
    ],
  };
}

function udirLibrary(): Library {
  const button = (color: string, variant: string) => ({
    name: `color=${color}, variant=${variant}`,
    tree: layer('Button', {
      fills: [paint(`Semantic/color/${color}/base-default`)],
      children: [
        layer('Label', {
          fills: [paint(`Semantic/color/${color}/base-contrast-default`)],
        }),
      ],
    }),
  });
  return {
    variables: [
      {
        name: 'Semantic',
        modes: ['Semantic'],
        variables: [
          {
            name: 'color/support1/base-default',
            type: 'COLOR',
            scopes: ['ALL_SCOPES'],
            values: { Semantic: '#123456' },
          },
        ],
      },
    ],
    components: [
      {
        name: 'Link',
        type: 'COMPONENT',
        tree: layer('Link', {
          fills: [paint('Semantic/color/neutral/text-default')],
          children: [
            layer('Underline', {
              strokes: [paint('Semantic/color/neutral/border-default')],
            }),
          ],
        }),
      },
      {
        name: 'Button',
        type: 'COMPONENT_SET',
        properties: {
          color: variantProperty(['neutral', 'danger']),
          variant: variantProperty(['primary', 'secondary']),
        },
        variants: [
          button('danger', 'primary'),
          button('danger', 'secondary'),
          button('neutral', 'primary'),
          button('neutral', 'secondary'),
        ],
      },
      {
        name: 'IconButton',
        type: 'COMPONENT_SET',
        properties: { size: variantProperty(['md']) },
        variants: [
          { name: 'size=md', tree: layer('Icon button', { paddingLeft: 8 }) },
        ],
      },
      {
        name: 'Heading',
        type: 'COMPONENT_SET',
        properties: { size: variantProperty(['large', 'medium']) },
        variants: [
          { name: 'size=large', tree: layer('Heading', { paddingTop: 8 }) },
          { name: 'size=medium', tree: layer('Heading', { paddingTop: 4 }) },
        ],
      },
      {
        name: 'Card',
        type: 'COMPONENT',
        tree: layer('Card', {
          children: [
            layer('Slot', { type: 'SLOT' }),
            layer('Button', {
              type: 'INSTANCE',
              mainComponent: 'Button [color=neutral, variant=primary]',
              overrides: {
                '.': {
                  fields: ['fills'],
                  values: {
                    fills: [paint('Semantic/color/neutral/base-hover')],
                  },
                },
              },
            }),
            // A ruled Button inside an instance of a component without a rule, with an override
            // on a text layer inside a Paragraph instance in the Button. There's no override
            // record for the Button itself; only `ownerComponents` says the text is in it.
            layer('_Container', {
              type: 'INSTANCE',
              mainComponent: '_Container',
              overrides: {
                'Footer > Button > Paragraph > Text': {
                  fields: ['fills'],
                  values: {
                    ownerComponents: [
                      'Paragraph [size=md]',
                      'Button [color=neutral, variant=secondary]',
                    ],
                    fills: [
                      paint('Semantic/color/neutral/base-contrast-default'),
                    ],
                  },
                },
              },
            }),
          ],
        }),
      },
    ],
  };
}

function files({ variables, components }: Library): SnapshotFile[] {
  const part = (name: string, options: object, data: unknown) =>
    ({
      schema: SNAPSHOT_SCHEMA,
      file: 'Library',
      part: name,
      options,
      data,
      checksum: checksum(data),
    }) as SnapshotFile;
  return [
    part('variables', { part: 'variables' }, variables),
    part('components', { part: 'components', page: 'Components' }, components),
  ];
}

function snapshotDir(library: Library): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'figma-rules-'));
  writeFileSync(
    path.join(dir, 'snapshot.json'),
    JSON.stringify({
      schema: SNAPSHOT_SCHEMA,
      kind: 'bundle',
      file: 'Library',
      files: files(library),
      errors: [],
    }),
  );
  return dir;
}

function component(library: Library, name: string): ComponentData {
  const found = library.components.find((candidate) => candidate.name === name);
  if (!found) throw new Error(`No component ${name}`);
  return found;
}

test('a library following the rules has no violations and no unexplained differences', () => {
  const result = compareWithRules(
    files(digdirLibrary()),
    files(udirLibrary()),
    RULES,
  );
  expect(result.violations).toEqual([]);
  expect(result.differences).toEqual([]);
  expect(result.restructured.length).toBeGreaterThan(0);
});

test('a difference no rule explains remains', () => {
  const udir = udirLibrary();
  const [variant] = component(udir, 'IconButton').variants ?? [];
  variant.tree.paddingLeft = 12;
  const { differences } = compareWithRules(
    files(digdirLibrary()),
    files(udir),
    RULES,
  );
  expect(differences.map((change) => change.key)).toEqual([
    'component Icon button [size=md] @ . :: paddingLeft',
  ]);
});

test('a binding left following the Color mode in a fixed-color component is a violation, even where Digdir has the same binding', () => {
  const udir = udirLibrary();
  const underline = component(udir, 'Link').tree?.children?.[0];
  if (underline) underline.strokes = [paint('Color/border-default')];
  const result = compareWithRules(files(digdirLibrary()), files(udir), RULES);
  expect(result.violations).toEqual([
    {
      component: 'Link',
      variant: '',
      layer: 'Underline',
      problem:
        'strokes is bound to Color/border-default, which follows the Color mode instead of a fixed color',
    },
  ]);
  expect(result.differences.map((change) => change.key)).toEqual([
    'component Link @ Underline :: strokes',
  ]);
});

test('a binding to another color than the variant selects is a violation', () => {
  const udir = udirLibrary();
  const neutral = component(udir, 'Button').variants?.find(
    (variant) => variant.name === 'color=neutral, variant=primary',
  );
  if (neutral)
    neutral.tree.fills = [paint('Semantic/color/danger/base-default')];
  expect(checkColors(files(udir), RULES)).toEqual([
    {
      component: 'Button',
      variant: 'color=neutral, variant=primary',
      layer: '.',
      problem:
        'fills is bound to Semantic/color/danger/base-default; the rule allows neutral',
    },
  ]);
});

test('a variant with a color the rule does not list is a violation', () => {
  const udir = udirLibrary();
  const [first] = component(udir, 'Button').variants ?? [];
  first.name = 'color=accent, variant=primary';
  expect(checkColors(files(udir), RULES)).toEqual([
    {
      component: 'Button',
      variant: 'color=accent, variant=primary',
      layer: '.',
      problem: "the variant has color=accent, which the rule doesn't list",
    },
  ]);
});

test('a Color mode the rule does not allow is a violation', () => {
  const udir = udirLibrary();
  const underline = component(udir, 'Link').tree?.children?.[0];
  if (underline) underline.variableModes = { Color: 'accent' };
  expect(checkColors(files(udir), RULES)).toEqual([
    {
      component: 'Link',
      variant: '',
      layer: 'Underline',
      problem: 'the Color mode is set to accent; the rule allows neutral',
    },
  ]);
});

test('an override breaking the rule of a ruled component is a violation inside a component without a rule', () => {
  const udir = udirLibrary();
  const instance = component(udir, 'Card').tree?.children?.[1];
  if (instance) {
    instance.overrides = {
      '.': {
        fields: ['fills'],
        values: { fills: [paint('Color/base-hover')] },
      },
    };
  }
  expect(checkColors(files(udir), RULES)).toEqual([
    {
      component: 'Card',
      variant: '',
      layer: 'Button › override .',
      problem:
        'in an instance of Button [color=neutral, variant=primary]: fills is bound to Color/base-hover, which follows the Color mode instead of a fixed color',
    },
  ]);
});

test('an override deep inside a ruled instance nested in an instance without a rule follows the nearest rule', () => {
  const udir = udirLibrary();
  const container = component(udir, 'Card').tree?.children?.[2];
  const overrides = container?.overrides as
    | Record<string, { values: NodeData }>
    | undefined;
  const text = overrides?.['Footer > Button > Paragraph > Text'];
  if (text) {
    text.values.fills = [paint('Semantic/color/danger/base-contrast-default')];
  }
  expect(checkColors(files(udir), RULES)).toEqual([
    {
      component: 'Card',
      variant: '',
      layer: '_Container › override Footer > Button > Paragraph > Text',
      problem:
        'in an instance of Button [color=neutral, variant=secondary]: fills is bound to Semantic/color/danger/base-contrast-default; the rule allows neutral',
    },
  ]);
});

test('labels of the instances an override sits in are compared after renames and color defaults', () => {
  const owners = (iconButton: string, button: string) => ({
    name: 'Section',
    type: 'COMPONENT',
    tree: layer('Section', {
      children: [
        layer('_Container', {
          type: 'INSTANCE',
          mainComponent: '_Container',
          overrides: {
            'Footer > Icon button > Button > Label': {
              fields: ['characters'],
              values: {
                characters: 'Lagre',
                ownerComponents: [button, iconButton],
              },
            },
          },
        }),
      ],
    }),
  });
  const digdir = digdirLibrary();
  digdir.components.push(
    owners('Icon button [size=md]', 'Button [variant=secondary]'),
  );
  const udir = udirLibrary();
  udir.components.push(
    owners('IconButton [size=md]', 'Button [color=neutral, variant=secondary]'),
  );
  expect(
    compareWithRules(files(digdir), files(udir), RULES).differences,
  ).toEqual([]);
});

test('rules naming components the snapshots do not have are reported', () => {
  const rules: Rules = {
    ...RULES,
    components: { IconBtn: 'Icon button' },
    colors: { Button: { variantProperty: 'tone', values: ['neutral'] } },
  };
  expect(
    validateRules(rules, files(udirLibrary()), files(digdirLibrary())),
  ).toEqual([
    'components: no Udir component named "IconBtn"',
    'colors: "Button" has no variant property "tone"',
  ]);
});

test('a Digdir change lines up with the same change in a component Udir renamed', () => {
  const digdirOld = digdirLibrary();
  const digdirNew = digdirLibrary();
  const udirOld = udirLibrary();
  const udirNew = udirLibrary();
  for (const library of [digdirNew, udirNew]) {
    const name = library === digdirNew ? 'Icon button' : 'IconButton';
    const [variant] = component(library, name).variants ?? [];
    variant.tree.paddingLeft = 12;
  }
  const rulesFile = path.join(
    mkdtempSync(path.join(tmpdir(), 'figma-rules-')),
    'rules.json',
  );
  writeFileSync(rulesFile, JSON.stringify(RULES));
  const output = execFileSync(
    process.execPath,
    [
      compareScript,
      'changes',
      '--digdir',
      snapshotDir(digdirOld),
      snapshotDir(digdirNew),
      '--udir',
      snapshotDir(udirOld),
      snapshotDir(udirNew),
      '--rules',
      rulesFile,
      '--json',
    ],
    { encoding: 'utf8' },
  );
  const result = JSON.parse(output) as Record<string, unknown[]>;
  expect(result.applied).toHaveLength(1);
  expect(result.missing).toEqual([]);
  expect(result.udirOnly).toEqual([]);
});
