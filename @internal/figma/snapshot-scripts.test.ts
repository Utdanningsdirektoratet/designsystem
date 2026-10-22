/**
 * Runs the development plugin, with the extractor, against a minimal stand-in for the Figma
 * Plugin API, saves the bundle like the documented workflow does, and checks the results with
 * `compare-snapshots.ts`.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import { expect, test } from 'vitest';
import { pluginCode } from './plugin/plugin-code.ts';

const compareScript = path.join(import.meta.dirname, 'compare-snapshots.ts');

type MockNode = {
  id?: string;
  name: string;
  type: string;
  parent?: MockNode | null;
  children?: MockNode[];
  [field: string]: unknown;
};

type LibraryOptions = {
  /** Variable bound to the first overridden `Text` layer's left padding. */
  paddingVariable: 'size/3' | 'space/3';
  /** Text of the second overridden `Text` layer. */
  secondText: string;
  /** Put the card's title before its icon. */
  titleFirst: boolean;
  /** Make reading the Patterns page fail. */
  brokenPatternsPage?: boolean;
  /** Value of the `Visible` property on the icon instance nested in the card's button. */
  iconVisible?: boolean;
  /** Put the frame with the second `_Header` before the first. */
  headersReversed?: boolean;
  /** Which `_Header` the card's header instance uses. */
  cardHeader?: 'A' | 'B';
  /** Put a component on the second of two separator pages named `---`. */
  separatorComponent?: boolean;
  /** Add an override on the card's button whose layer can't be looked up. */
  unreadableOverride?: boolean;
  /** The color the card icon's fill variable resolves to, as two themes would. */
  iconColor?: 'blue' | 'grey';
  /** Which `_Header` the header nested in the card's button uses. */
  nestedHeader?: 'A' | 'B';
  /** Delete `space/3` from its collection; Figma still returns it by id. */
  spaceVariableDeleted?: boolean;
  /** The Color mode set explicitly on the card component. */
  cardColorMode?: 'accent' | 'neutral';
  /** Put a component named Card on the Patterns page too. */
  patternsCard?: boolean;
  /** Reverse the order of the pages. */
  pagesReversed?: boolean;
};

type PluginMessage = { type: string; [key: string]: unknown };

const alias = (id: string) => ({ type: 'VARIABLE_ALIAS', id });

function frame(name: string, extra: Record<string, unknown> = {}): MockNode {
  return {
    name,
    type: 'FRAME',
    layoutMode: 'HORIZONTAL',
    layoutSizingHorizontal: 'HUG',
    layoutSizingVertical: 'HUG',
    paddingLeft: 12,
    fills: [],
    strokes: [],
    effects: [],
    ...extra,
  };
}

function mockFigma(options: LibraryOptions) {
  const mixed = Symbol('mixed');
  const nodes = new Map<string, MockNode>();
  let nextId = 1;
  const register = (node: MockNode, parent: MockNode | null): MockNode => {
    node.id = `${nextId++}:1`;
    node.parent = parent;
    nodes.set(node.id, node);
    for (const child of node.children ?? []) register(child, node);
    return node;
  };

  // Two variables with the same value, so only the binding tells them apart.
  const variableIds = ['size/3', 'space/3'];
  const collection = {
    id: 'C1',
    name: 'Semantic',
    modes: [{ modeId: 'm1', name: 'Semantic' }],
    defaultModeId: 'm1',
    variableIds: options.spaceVariableDeleted ? ['size/3'] : variableIds,
  };
  const colorCollection = {
    id: 'C2',
    name: 'Color',
    modes: [
      { modeId: 'accent-mode', name: 'accent' },
      { modeId: 'neutral-mode', name: 'neutral' },
    ],
    defaultModeId: 'accent-mode',
    variableIds: [],
  };
  const collections = [collection, colorCollection];
  const variables = new Map(
    variableIds.map((id) => [
      id,
      {
        id,
        name: id,
        variableCollectionId: 'C1',
        resolvedType: 'FLOAT',
        scopes: ['GAP'],
        codeSyntax: {},
        valuesByMode: { m1: 12 },
        remote: false,
      },
    ]),
  );

  const iconComponent: MockNode = {
    ...frame('Icon'),
    type: 'COMPONENT',
    componentPropertyDefinitions: {
      'Visible#1:2': { type: 'BOOLEAN', defaultValue: true },
    },
  };
  const shapeComponent: MockNode = {
    ...frame('Shape'),
    type: 'COMPONENT',
    componentPropertyDefinitions: {},
  };
  const iconInstance = (visible: boolean): MockNode => ({
    ...frame('Icon'),
    type: 'INSTANCE',
    getMainComponentAsync: async () => iconComponent,
    componentProperties: { 'Visible#1:2': { type: 'BOOLEAN', value: visible } },
    overrides: [],
    children: [
      frame('Glyph'),
      {
        ...frame('Shape'),
        type: 'INSTANCE',
        getMainComponentAsync: async () => shapeComponent,
        componentProperties: {},
        overrides: [],
        children: [frame('Path')],
      },
    ],
  });
  const buttonChildren = (iconVisible: boolean, nestedHeader: 'A' | 'B') => [
    frame('Text', { boundVariables: { paddingLeft: alias('size/3') } }),
    frame('Text', { type: 'TEXT', characters: 'Knapp' }),
    iconInstance(iconVisible),
    {
      ...frame('Header'),
      type: 'INSTANCE',
      // The two `_Header`s are defined further down; this only runs during extraction.
      getMainComponentAsync: async () =>
        nestedHeader === 'B' ? headerB : headerA,
      componentProperties: {},
      overrides: [],
    },
  ];
  const button: MockNode = {
    ...frame('Button'),
    type: 'COMPONENT',
    componentPropertyDefinitions: {},
    children: buttonChildren(true, 'A'),
  };
  const instance: MockNode = {
    ...frame('Button'),
    type: 'INSTANCE',
    getMainComponentAsync: async () => button,
    componentProperties: {},
    overrides: [],
    children: buttonChildren(
      options.iconVisible ?? true,
      options.nestedHeader ?? 'A',
    ),
  };
  const [firstText, secondText, nestedIcon, nestedHeader] =
    instance.children ?? [];
  firstText.boundVariables = {
    paddingLeft: alias(options.paddingVariable),
  };
  secondText.characters = options.secondText;

  // Two different components named `_Header` on one page, in different frames.
  const header = (paddingLeft: number): MockNode => ({
    ...frame('_Header', { paddingLeft }),
    type: 'COMPONENT',
    componentPropertyDefinitions: {},
  });
  const headerA = header(8);
  const headerB = header(16);
  const sectionA = frame('Section A', { children: [headerA] });
  const sectionB = frame('Section B', { children: [headerB] });
  const headerInstance: MockNode = {
    ...frame('Header'),
    type: 'INSTANCE',
    getMainComponentAsync: async () =>
      options.cardHeader === 'B' ? headerB : headerA,
    componentProperties: {},
    overrides: [],
  };

  const icon = frame('Icon', {
    fills: [
      {
        type: 'SOLID',
        color:
          options.iconColor === 'grey'
            ? { r: 0.19, g: 0.19, b: 0.19 }
            : { r: 0, g: 0.38, b: 0.73 },
        opacity: 1,
        boundVariables: { color: alias('size/3') },
      },
    ],
  });
  const title = frame('Title');
  const card: MockNode = {
    ...frame('Card'),
    explicitVariableModes: {
      C2: `${options.cardColorMode ?? 'accent'}-mode`,
    },
    type: 'COMPONENT',
    componentPropertyDefinitions: {},
    children: options.titleFirst
      ? [title, icon, instance, headerInstance]
      : [icon, title, instance, headerInstance],
  };

  const page: MockNode = { name: 'Components', type: 'PAGE', children: [] };
  register(page, null);
  page.children = [
    register(button, page),
    register(iconComponent, page),
    register(card, page),
    ...(options.headersReversed
      ? [sectionB, sectionA]
      : [sectionA, sectionB]
    ).map((section) => register(section, page)),
  ];
  instance.overrides = [
    { id: firstText.id, overriddenFields: ['paddingLeft'] },
    { id: secondText.id, overriddenFields: ['characters'] },
    { id: nestedIcon.id, overriddenFields: ['componentProperties'] },
    { id: nestedIcon.children?.[0].id, overriddenFields: ['fills'] },
    {
      id: nestedIcon.children?.[1].children?.[0].id,
      overriddenFields: ['fills'],
    },
    { id: nestedHeader.id, overriddenFields: ['mainComponent'] },
    ...(options.unreadableOverride
      ? [{ id: 'I999:1;1:1', overriddenFields: ['characters'] }]
      : []),
  ];

  // Optionally a different component with the same name as the card, on another page.
  const patterns: MockNode = { name: 'Patterns', type: 'PAGE', children: [] };
  register(patterns, null);
  patterns.children = options.patternsCard
    ? [
        register(
          {
            ...frame('Card', { paddingLeft: 24 }),
            type: 'COMPONENT',
            componentPropertyDefinitions: {},
          },
          patterns,
        ),
      ]
    : [];

  // Separator pages, which often share a name.
  const separator = (children: MockNode[]): MockNode => {
    const node: MockNode = { name: '---', type: 'PAGE', children: [] };
    register(node, null);
    node.children = children.map((child) => register(child, node));
    return node;
  };
  const firstSeparator = separator([]);
  const secondSeparator = separator(
    options.separatorComponent
      ? [
          {
            ...frame('Note'),
            type: 'COMPONENT',
            componentPropertyDefinitions: {},
          },
        ]
      : [],
  );
  const pages = [page, firstSeparator, patterns, secondSeparator];
  if (options.pagesReversed) pages.reverse();

  const findAll = (node: MockNode, types: string[]): MockNode[] =>
    (node.children ?? []).flatMap((child) => [
      ...(types.includes(child.type) ? [child] : []),
      ...findAll(child, types),
    ]);
  for (const pageNode of pages) {
    pageNode.findAllWithCriteria = ({ types }: { types: string[] }) => {
      if (pageNode === patterns && options.brokenPatternsPage) {
        throw new Error('The page could not be loaded');
      }
      return findAll(pageNode, types);
    };
  }

  let currentPage = page;
  const ui = {
    messages: [] as PluginMessage[],
    onmessage: undefined as
      | ((message: PluginMessage) => Promise<void>)
      | undefined,
    postMessage(message: PluginMessage) {
      ui.messages.push(message);
    },
  };

  return {
    mixed,
    root: { name: 'Library', children: pages },
    get currentPage() {
      return currentPage;
    },
    setCurrentPageAsync: async (next: MockNode) => {
      currentPage = next;
    },
    getNodeByIdAsync: async (id: string) => nodes.get(id) ?? null,
    getStyleByIdAsync: async () => null,
    variables: {
      getLocalVariableCollectionsAsync: async () => collections,
      getVariableByIdAsync: async (id: string) => variables.get(id) ?? null,
      getVariableCollectionByIdAsync: async (id: string) =>
        collections.find((candidate) => candidate.id === id) ?? null,
    },
    showUI: () => {},
    ui,
  };
}

/** Runs the built plugin, presses "Extract snapshot" and saves the bundle as `snapshot.json`. */
async function snapshot(options: LibraryOptions): Promise<string> {
  const figma = mockFigma(options);
  // Runs the generated plugin code the way Figma does: as a script with these globals.
  runInNewContext(pluginCode(), { figma, __html__: '' });
  await figma.ui.onmessage?.({ type: 'extract' });
  const done = figma.ui.messages.find((message) => message.type === 'done');
  expect(done, JSON.stringify(figma.ui.messages)).toBeDefined();
  const dir = mkdtempSync(path.join(tmpdir(), 'figma-plugin-snapshot-'));
  writeFileSync(path.join(dir, 'snapshot.json'), JSON.stringify(done?.bundle));
  return dir;
}

function diffKeys(from: string, to: string): string[] {
  const output = execFileSync(
    process.execPath,
    [compareScript, 'diff', from, to, '--json'],
    { encoding: 'utf8' },
  );
  return (JSON.parse(output) as { key: string }[]).map((change) => change.key);
}

const base: LibraryOptions = {
  paddingVariable: 'size/3',
  secondText: 'Lagre',
  titleFirst: false,
};

test('identical libraries have no differences', async () => {
  expect(diffKeys(await snapshot(base), await snapshot(base))).toEqual([]);
});

test('an override rebound to a variable with the same value is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, paddingVariable: 'space/3' }),
  );
  expect(keys).toEqual(['component Card @ Button :: overrides[Text]']);
});

test('overrides on same-named layers are kept apart', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, secondText: 'Avbryt' }),
  );
  expect(keys).toEqual(['component Card @ Button :: overrides[Text #2]']);
});

test('reordered layers are a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, titleFirst: true }),
  );
  expect(keys).toEqual(['component Card @ . :: children']);
});

test('same-named components on different pages keep their identity when pages are reordered', async () => {
  const keys = diffKeys(
    await snapshot({ ...base, patternsCard: true }),
    await snapshot({ ...base, patternsCard: true, pagesReversed: true }),
  );
  expect(keys).toEqual([]);
});

test('a snapshot with a page that could not be extracted fails verification', async () => {
  const dir = await snapshot({ ...base, brokenPatternsPage: true });
  const result = spawnSync(process.execPath, [compareScript, 'verify', dir], {
    encoding: 'utf8',
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain(
    'page "Patterns" was not extracted: The page could not be loaded',
  );
});

test('a change to a nested instance property inside an override is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, iconVisible: false }),
  );
  expect(keys).toEqual(['component Card @ Button :: overrides[Icon]']);
});

test('same-named components in different frames keep their identity when reordered', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, headersReversed: true }),
  );
  expect(keys).toEqual([]);
});

test('an instance switching between same-named components is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, cardHeader: 'B' }),
  );
  expect(keys).toEqual(['component Card @ Header :: mainComponentContainer']);
});

test('the plugin extracts every page when several pages share a name', async () => {
  const dir = await snapshot({ ...base, separatorComponent: true });
  const result = spawnSync(process.execPath, [compareScript, 'verify', dir], {
    encoding: 'utf8',
  });
  expect(result.stderr).toBe('');
  expect(result.status).toBe(0);
  const bundle = JSON.parse(
    readFileSync(path.join(dir, 'snapshot.json'), 'utf8'),
  ) as { files: { options: { page?: string }; data: { name: string }[] }[] };
  const separatorPart = bundle.files.find(
    (part) => part.options.page === '---',
  );
  expect(separatorPart?.data.map((component) => component.name)).toEqual([
    'Note',
  ]);
});

test('an override whose layer cannot be read is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, unreadableOverride: true }),
  );
  expect(keys).toEqual(['component Card @ Button :: unreadableOverrides']);
});

test('the color a bound fill resolves to in the theme is not a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, iconColor: 'grey' }),
  );
  expect(keys).toEqual([]);
});

test('a nested instance swapped between same-named components is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, nestedHeader: 'B' }),
  );
  expect(keys).toEqual(['component Card @ Button :: overrides[Header]']);
});

test('a binding to a variable deleted from its collection is a difference', async () => {
  const options = { ...base, paddingVariable: 'space/3' } as const;
  const output = execFileSync(
    process.execPath,
    [
      compareScript,
      'diff',
      await snapshot(options),
      await snapshot({ ...options, spaceVariableDeleted: true }),
      '--json',
    ],
    { encoding: 'utf8' },
  );
  const override = (
    JSON.parse(output) as { key: string; after?: string }[]
  ).find(
    (change) => change.key === 'component Card @ Button :: overrides[Text]',
  );
  expect(override?.after).toContain('"Semantic/space/3 (deleted)"');
});

test('a second export in the same plugin session sees variables deleted in between', async () => {
  const figma = mockFigma({ ...base, paddingVariable: 'space/3' });
  runInNewContext(pluginCode(), { figma, __html__: '' });
  const exportBundle = async () => {
    figma.ui.messages.length = 0;
    await figma.ui.onmessage?.({ type: 'extract' });
    const done = figma.ui.messages.find((message) => message.type === 'done');
    return JSON.stringify(done?.bundle);
  };

  expect(await exportBundle()).not.toContain('(deleted)');
  const [collection] = await figma.variables.getLocalVariableCollectionsAsync();
  collection.variableIds = ['size/3'];
  expect(await exportBundle()).toContain('"Semantic/space/3 (deleted)"');
});

test('a change of the Color mode set on a component is a difference', async () => {
  const keys = diffKeys(
    await snapshot(base),
    await snapshot({ ...base, cardColorMode: 'neutral' }),
  );
  expect(keys).toEqual(['component Card @ . :: variableModes[Color]']);
});

test('an override inside nested instances records the instances it sits in, nearest first', async () => {
  const dir = await snapshot(base);
  const bundle = JSON.parse(
    readFileSync(path.join(dir, 'snapshot.json'), 'utf8'),
  ) as {
    files: {
      options: { page?: string };
      data: { name: string; tree: { children: MockNode[] } }[];
    }[];
  };
  const card = bundle.files
    .find((file) => file.options.page === 'Components')
    ?.data.find((component) => component.name === 'Card');
  const button = card?.tree.children.find((child) => child.name === 'Button');
  const overrides = button?.overrides as Record<
    string,
    { values: Record<string, unknown> }
  >;
  expect(overrides['Icon > Shape > Path'].values.ownerComponents).toEqual([
    'Shape',
    'Icon',
  ]);
  expect(overrides['Icon > Glyph'].values.ownerComponents).toEqual(['Icon']);
  expect(overrides.Icon.values.ownerComponents).toBeUndefined();
});
