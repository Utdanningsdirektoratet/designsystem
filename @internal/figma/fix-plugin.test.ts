/**
 * Runs the fix plugin against a minimal stand-in for the Figma Plugin API: a page with one
 * component and an instance of it, bound to variables that are partly deleted. Also checks the
 * plan `fix-plan.ts` makes from Digdir's variables.
 */
import { runInNewContext } from 'node:vm';
import { expect, test } from 'vitest';
import { planVariableFixes } from './fix-plan.ts';
import { fixPluginCode } from './fix-plugin/build.ts';
import type { SnapshotFile, VariableCollectionData } from './snapshots.ts';

type Alias = { type: 'VARIABLE_ALIAS'; id: string };
type Paint = { type: string; boundVariables?: { color?: Alias } };
type MockVariable = {
  id: string;
  name: string;
  variableCollectionId: string;
  remote: boolean;
  codeSyntax: Record<string, string>;
  scopes: string[];
  setVariableCodeSyntax(platform: string, value: string): void;
};
type MockNode = {
  id: string;
  name: string;
  type: string;
  parent: MockNode | null;
  children: MockNode[];
  /** Own values and bindings; for a layer inside an instance, its overrides. */
  own: Record<string, unknown>;
  bound: Record<string, Alias | null>;
  /** The layer in the main component that a layer inside an instance follows. */
  source?: MockNode;
  [key: string]: unknown;
};

const alias = (id: string): Alias => ({ type: 'VARIABLE_ALIAS', id });

function library() {
  const collections = [
    { id: 'c-semantic', name: 'Semantic', variableIds: [] as string[] },
    { id: 'c-theme', name: 'Theme', variableIds: [] as string[] },
    { id: 'c-size', name: 'Size', variableIds: [] as string[] },
  ];
  const variables = new Map<string, MockVariable>();
  const variable = (
    id: string,
    collectionId: string,
    name: string,
    deleted = false,
  ) => {
    const created: MockVariable = {
      id,
      name,
      variableCollectionId: collectionId,
      remote: false,
      codeSyntax: {},
      scopes: ['ALL_SCOPES'],
      setVariableCodeSyntax(platform, value) {
        created.codeSyntax = { ...created.codeSyntax, [platform]: value };
      },
    };
    variables.set(id, created);
    if (!deleted) {
      collections.find((c) => c.id === collectionId)?.variableIds.push(id);
    }
  };
  variable('size-5', 'c-semantic', 'size/5');
  variable('accent-bg', 'c-semantic', 'color/accent/background-default');
  variable('medium', 'c-theme', 'font-weight/medium');
  variable('semibold', 'c-theme', 'font-weight/semibold');
  variable('font-size-4', 'c-size', 'font-size/4');
  // Deleted: Figma still finds them by id, but their collection no longer lists them.
  variable('old-spacing-5', 'c-semantic', 'spacing/5', true);
  variable('old-spacing-9', 'c-semantic', 'spacing/9', true);
  variable('old-highlight', 'c-semantic', 'border-width/highlight', true);
  variable(
    'old-accent-bg',
    'c-semantic',
    'color/accent/background-default',
    true,
  );
  variable('old-medium', 'c-theme', 'font-weight/medium', true);
  variable('old-font-size-4', 'c-size', 'font-size/4', true);

  let nextId = 0;
  const loadedFamilies = new Set<string>();
  const overrides: { node: string; field: string }[] = [];

  const node = (
    name: string,
    type: string,
    own: Record<string, unknown> = {},
    bound: Record<string, Alias | null> = {},
    children: MockNode[] = [],
  ): MockNode => {
    const created = {
      id: `n${nextId++}`,
      name,
      type,
      parent: null,
      children,
      own,
      bound,
    } as MockNode;
    for (const child of children) child.parent = created;
    const value = (field: string): unknown =>
      field in created.own ? created.own[field] : created.source?.[field];
    for (const field of [
      'strokeTopWeight',
      'paddingLeft',
      'itemSpacing',
      'fills',
    ]) {
      Object.defineProperty(created, field, {
        get: () => value(field),
        set: (next) => {
          created.own[field] = next;
          if (created.source) overrides.push({ node: name, field });
        },
      });
    }
    Object.defineProperty(created, 'boundVariables', {
      get() {
        const inherited = (created.source?.boundVariables ?? {}) as Record<
          string,
          unknown
        >;
        const result: Record<string, unknown> = { ...inherited };
        for (const [field, bound] of Object.entries(created.bound)) {
          if (bound === null) delete result[field];
          else result[field] = type === 'TEXT' ? [bound] : bound;
        }
        const fills = value('fills') as Paint[] | undefined;
        const paintAliases = (fills ?? []).flatMap((paint) =>
          paint.boundVariables?.color ? [paint.boundVariables.color] : [],
        );
        if (paintAliases.length > 0) result.fills = paintAliases;
        return result;
      },
    });
    created.setBoundVariable = (
      field: string,
      variable: MockVariable | null,
    ) => {
      created.bound[field] = variable ? alias(variable.id) : null;
      // Whether Figma keeps the value when a variable is unbound isn't known, so assume the
      // worst: the value is reset, and the plugin has to set it back.
      if (!variable) created.own[field] = 0;
      if (created.source) overrides.push({ node: name, field });
    };
    created.getStyledTextSegments = () => {
      const aliases = created.boundVariables as Record<string, Alias[]>;
      return [
        {
          start: 0,
          end: 4,
          fontName: { family: 'Inter', style: 'Medium' },
          boundVariables: Object.fromEntries(
            Object.entries(aliases).map(([field, list]) => [field, list[0]]),
          ),
        },
      ];
    };
    created.setRangeBoundVariable = (
      _start: number,
      _end: number,
      field: string,
      variable: MockVariable,
    ) => {
      if (!loadedFamilies.has('Inter')) {
        throw new Error('Cannot write to node with unloaded font "Inter"');
      }
      created.bound[field] = alias(variable.id);
      if (created.source) overrides.push({ node: name, field });
    };
    return created;
  };

  const box = node(
    'Box',
    'FRAME',
    {
      strokeTopWeight: 2,
      fills: [
        { type: 'SOLID', boundVariables: { color: alias('old-accent-bg') } },
      ],
    },
    { strokeTopWeight: alias('old-highlight') },
  );
  const label = node('label', 'TEXT', {}, { fontStyle: alias('old-medium') });
  const paragraph = node(
    'Paragraph',
    'TEXT',
    {},
    { fontStyle: alias('old-medium'), fontSize: alias('old-font-size-4') },
  );
  const odd = node(
    'Odd',
    'FRAME',
    { paddingLeft: 36 },
    {
      paddingLeft: alias('old-spacing-9'),
    },
  );
  const textfield = node('Textfield', 'COMPONENT', {}, {}, [
    node(
      'label and description',
      'FRAME',
      { itemSpacing: 20 },
      {
        itemSpacing: alias('old-spacing-5'),
      },
      [label],
    ),
    paragraph,
    box,
    odd,
  ]);

  // An instance: `Box` inherits everything; `Note` has its own override bound to a deleted
  // variable.
  const instanceBox = node('Box', 'FRAME');
  instanceBox.source = box;
  const note = node(
    'Note',
    'FRAME',
    { itemSpacing: 20 },
    {
      itemSpacing: alias('old-spacing-5'),
    },
  );
  note.source = node('Note', 'FRAME', { itemSpacing: 8 });
  const instance = node('Textfield', 'INSTANCE', {}, {}, [instanceBox, note]);

  // The instance is on a page before its main component's, as on Udir's example pages.
  const examples = node('Examples', 'PAGE', {}, {}, [instance]);
  const page = node('Components', 'PAGE', {}, {}, [textfield]);
  const descendants = (parent: MockNode): MockNode[] =>
    parent.children.flatMap((child) => [child, ...descendants(child)]);
  for (const pageNode of [examples, page]) {
    pageNode.loadAsync = async () => {};
    pageNode.findAll = (predicate: (n: MockNode) => boolean) =>
      descendants(pageNode).filter(predicate);
  }

  const messages: { type: string; [key: string]: unknown }[] = [];
  const ui = {
    onmessage: undefined as
      | ((message: { type: string }) => Promise<void>)
      | undefined,
    postMessage: (message: { type: string }) => messages.push(message),
  };
  const figma = {
    root: { children: [examples, page] },
    showUI: () => {},
    ui,
    commitUndo: () => {},
    listAvailableFontsAsync: async () => [
      { fontName: { family: 'Inter', style: 'Medium' } },
      { fontName: { family: 'Inter', style: 'Semi Bold' } },
    ],
    loadFontAsync: async (font: { family: string }) => {
      loadedFamilies.add(font.family);
    },
    variables: {
      getLocalVariableCollectionsAsync: async () => collections,
      getVariableByIdAsync: async (id: string) => variables.get(id) ?? null,
      getVariableCollectionByIdAsync: async (id: string) =>
        collections.find((c) => c.id === id) ?? null,
      setBoundVariableForPaint: (
        paint: Paint,
        _field: string,
        variable: MockVariable,
      ): Paint => ({ ...paint, boundVariables: { color: alias(variable.id) } }),
    },
  };

  return {
    figma,
    messages,
    variables,
    overrides,
    nodes: { box, label, paragraph, odd, textfield, instanceBox, note },
  };
}

const PLAN = JSON.stringify({
  variables: [
    {
      label: 'Size/font-size/4',
      codeSyntax: 'var(--ds-font-size-4)',
      scopes: ['FONT_SIZE'],
    },
  ],
  skipped: [],
});

type Report = {
  changes: { kind: string; where: string; from: string; to: string }[];
  unhandled: { where: string; problem: string }[];
};

async function run(type: 'preview' | 'apply', lib = library()) {
  runInNewContext(fixPluginCode(PLAN), { figma: lib.figma, __html__: '' });
  await lib.figma.ui.onmessage?.({ type });
  const done = lib.messages.find((message) => message.type === 'done');
  expect(done, JSON.stringify(lib.messages)).toBeDefined();
  return { lib, report: done?.report as Report };
}

test('a preview lists the changes and leaves the file unchanged', async () => {
  const { lib, report } = await run('preview');
  expect(report.changes.map((change) => change.kind)).toContain('rebound');
  expect(lib.nodes.label.bound.fontStyle).toEqual(alias('old-medium'));
  expect(lib.nodes.textfield.children[0].bound.itemSpacing).toEqual(
    alias('old-spacing-5'),
  );
  expect(lib.nodes.box.bound.strokeTopWeight).toEqual(alias('old-highlight'));
  expect(lib.variables.get('font-size-4')?.codeSyntax).toEqual({});
});

test('applying rebinds layers bound to deleted variables to their replacements', async () => {
  const { lib } = await run('apply');
  const { nodes } = lib;
  expect(nodes.textfield.children[0].bound.itemSpacing).toEqual(
    alias('size-5'),
  );
  expect(nodes.label.bound.fontStyle).toEqual(alias('semibold'));
  expect(nodes.paragraph.bound.fontStyle).toEqual(alias('medium'));
  expect(nodes.paragraph.bound.fontSize).toEqual(alias('font-size-4'));
  expect((nodes.box.fills as Paint[])[0].boundVariables?.color).toEqual(
    alias('accent-bg'),
  );
});

test('applying unbinds the deleted highlight border width and keeps its value', async () => {
  const { lib } = await run('apply');
  expect(lib.nodes.box.bound.strokeTopWeight).toBeNull();
  expect(lib.nodes.box.strokeTopWeight).toBe(2);
});

test('applying sets the code syntax and scopes in the plan', async () => {
  const { lib } = await run('apply');
  const fontSize = lib.variables.get('font-size-4');
  expect(fontSize?.codeSyntax).toEqual({ WEB: 'var(--ds-font-size-4)' });
  expect(fontSize?.scopes).toEqual(['FONT_SIZE']);
});

test('layers inside instances keep following their main component unless they had an override', async () => {
  const { lib } = await run('apply');
  expect(lib.overrides.filter((o) => o.node === 'Box')).toEqual([]);
  expect(lib.nodes.instanceBox.boundVariables).toEqual(
    expect.objectContaining({ fills: [alias('accent-bg')] }),
  );
  expect(lib.nodes.note.bound.itemSpacing).toEqual(alias('size-5'));
});

test('a deleted variable without a replacement is reported and left bound', async () => {
  const { lib, report } = await run('apply');
  expect(lib.nodes.odd.bound.paddingLeft).toEqual(alias('old-spacing-9'));
  expect(report.unhandled).toEqual([
    {
      where: 'Components › Textfield > Odd :: paddingLeft',
      problem:
        'bound to the deleted Semantic/spacing/9, which has no replacement',
    },
  ]);
});

test('the plan uses Udir color names in code syntax and copies Digdir scopes, including hidden ones', () => {
  const variables = (collections: VariableCollectionData[]): SnapshotFile[] => [
    {
      schema: 0,
      file: 'Library',
      part: 'variables',
      options: {},
      data: collections,
      checksum: '',
    },
  ];
  const variable = (
    name: string,
    scopes: string[],
    web?: string,
  ): VariableCollectionData['variables'][number] => ({
    name,
    type: 'COLOR',
    scopes,
    codeSyntax: web ? { WEB: web } : undefined,
    values: {},
  });
  const collection = (
    name: string,
    vars: VariableCollectionData['variables'],
  ): VariableCollectionData => ({ name, modes: ['Mode'], variables: vars });

  const digdir = variables([
    collection('Semantic', [
      variable(
        'color/brand1/base-default',
        ['ALL_FILLS'],
        'var(--ds-color-brand1-base-default)',
      ),
      variable(
        'color/brand1/base-hover',
        ['ALL_FILLS'],
        'var(--ds-color-brand1-base-hover)',
      ),
    ]),
    collection('Color scheme', [variable('starter-theme/brand1/1', [])]),
  ]);
  const udir = variables([
    collection('Semantic', [
      variable('color/support1/base-default', ['ALL_FILLS']),
      variable('color/support1/base-hover', ['ALL_FILLS']),
    ]),
    collection('Color scheme', [variable('udir/support1/1', ['ALL_SCOPES'])]),
  ]);
  const plan = planVariableFixes(
    digdir,
    udir,
    ':root { --ds-color-support1-base-default: #123; }',
    { udir: 'starter-theme', support1: 'brand1' },
  );
  expect(plan.variables).toEqual([
    {
      label: 'Semantic/color/support1/base-default',
      codeSyntax: 'var(--ds-color-support1-base-default)',
    },
    { label: 'Color scheme/udir/support1/1', scopes: [] },
  ]);
  expect(plan.skipped).toContainEqual({
    label: 'Semantic/color/support1/base-hover',
    reason: "--ds-color-support1-base-hover is not in Udir's theme CSS",
  });
});
