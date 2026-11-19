import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { getSource } from '../src/schema.ts';
import type { CategoryId, ImportMap } from '../src/schema.ts';
import type { FigmaNode } from './figma.ts';
import { resolveMapping } from './mapping.ts';

const exclusionsSchema = z.object({
  sections: z.array(z.object({ name: z.string(), reason: z.string() })),
  nodes: z.array(
    z.object({ id: z.string().regex(/^\d+:\d+$/), reason: z.string() }),
  ),
});
const exclusions = exclusionsSchema.parse(
  JSON.parse(
    readFileSync(new URL('./exclusions.json', import.meta.url), 'utf8'),
  ),
);
const excludedSections = new Set(exclusions.sections.map(({ name }) => name));
const excludedNodes = new Set(exclusions.nodes.map(({ id }) => id));

const axes: Record<string, string> = {
  Format: 'Format',
  'Color theme': 'Fargetema',
  Background: 'Bakgrunn',
  'Geometric shape': 'Geometrisk form',
  Character: 'Karakter',
};
// Figma's alt N labels map to the artwork's actual colors; unknown labels block approval.
const colorThemes: Record<string, string> = {
  'alt 1': 'grønn',
  'alt 2': 'blå',
  'alt 3': 'brun',
};
const values: Record<string, string> = {
  'Landscape (16:9)': 'Landskap (16:9)',
  'Portrait (4:5)': 'Portrett (4:5)',
  'Square (1:1)': 'Kvadrat (1:1)',
  True: 'Ja',
  False: 'Nei',
  true: 'Ja',
  false: 'Nei',
};

function slug(value: string) {
  return value
    .replaceAll('ø', 'o')
    .replaceAll('æ', 'ae')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The property types an illustration's appearance can come from. */
const SUPPORTED_PROPERTY_TYPES = [
  'VARIANT',
  'BOOLEAN',
  'TEXT',
  'INSTANCE_SWAP',
];

/** Something that blocks adding the named nodes to the import map automatically. */
interface Issue {
  nodeIds: string[];
  message: string;
}

interface PropertyDefinition {
  key: string;
  displayKey: string;
  definition: NonNullable<FigmaNode['componentPropertyDefinitions']>[string];
}

const issue = (nodeIds: string | string[], message: string): Issue => ({
  nodeIds: [nodeIds].flat(),
  message,
});

// Only exact Figma VARIANT assignments are accepted, not illustration-name guesses.
function assignments(node: FigmaNode) {
  const pairs = node.name.split(', ').map((part) => {
    const match = /^([^=]+)=(.+)$/.exec(part);
    if (!match) throw new Error(`Invalid VARIANT assignments on ${node.id}.`);
    return [match[1], match[2]] as const;
  });
  if (new Set(pairs.map(([key]) => key)).size !== pairs.length)
    throw new Error(`Invalid VARIANT assignments on ${node.id}.`);
  return Object.fromEntries(pairs);
}

/**
 * The nodes of a page in document order, without excluded sections and nodes. `art` marks the
 * nodes inside a component or instance, which are part of an illustration's artwork.
 */
function collectEntries(
  node: FigmaNode,
  art = false,
): { node: FigmaNode; art: boolean }[] {
  if (
    (node.type === 'SECTION' && excludedSections.has(node.name)) ||
    excludedNodes.has(node.id)
  )
    return [];
  const childArt = art || ['COMPONENT', 'INSTANCE'].includes(node.type);
  return [
    { node, art },
    ...(node.children ?? []).flatMap((child) =>
      collectEntries(child, childArt),
    ),
  ];
}

// Derives the full import mapping for a category's Figma page. Issues list anything ambiguous.
export function planMapping(
  root: FigmaNode,
  referenceComponents: Record<string, { name: string }>,
  categoryId: CategoryId,
) {
  const entries = collectEntries(root);
  // Figma omits children below the requested depth, so illustrations nested deeper are invisible.
  const warnings = entries
    .filter(
      ({ node, art }) =>
        !art &&
        ['FRAME', 'SECTION', 'GROUP', 'COMPONENT_SET'].includes(node.type) &&
        node.children === undefined,
    )
    .map(
      ({ node }) =>
        `${node.type} ${node.id} "${node.name}" has no children in the fetched depth; anything inside is not seen.`,
    );
  const allSets = entries.filter(
    ({ node, art }) => node.type === 'COMPONENT_SET' && !art,
  );
  // An observed template has only hidden guides in every component and linked instance.
  // Do not classify missing/truncated children as empty: require explicit hidden-child evidence.
  const emptyTemplates = new Set(
    allSets
      .filter(({ node }) => {
        const bases = node.children ?? [];
        const linked = entries.filter(
          ({ node: candidate, art }) =>
            !art &&
            candidate.type === 'INSTANCE' &&
            bases.some((base) => base.id === candidate.componentId),
        );
        return (
          bases.length > 0 &&
          [...bases, ...linked.map(({ node: candidate }) => candidate)].every(
            (candidate) =>
              candidate.children &&
              candidate.children.length > 0 &&
              candidate.children.every((child) => child.visible === false),
          )
        );
      })
      .map(({ node }) => node.id),
  );
  const sets = allSets.filter(({ node }) => !emptyTemplates.has(node.id));
  const components = new Map(
    sets.flatMap(({ node }) =>
      (node.children ?? [])
        .filter((child) => child.type === 'COMPONENT')
        .map((child) => [child.id, child] as const),
    ),
  );
  const sourceNames = new Map([
    ...entries.map(({ node }) => [node.id, node.name] as const),
    ...Object.entries(referenceComponents).map(
      ([id, component]) => [id, component.name] as const,
    ),
  ]);

  /** The value of one appearance property of a variant, and what blocks it. */
  function planProperty(
    node: FigmaNode,
    exact: Record<string, string>,
    { key, displayKey, definition }: PropertyDefinition,
    label: string,
    collides: boolean,
  ) {
    const override = node.componentProperties?.[key];
    const raw =
      override?.value ??
      (definition.type === 'VARIANT' ? exact[key] : definition.defaultValue);
    const isVariant = definition.type === 'VARIANT';
    const readable =
      definition.type === 'INSTANCE_SWAP'
        ? sourceNames.get(String(raw))
        : undefined;
    const swapResolved = !!readable && readable.length <= 120;
    // Preserve unresolved short references in the candidate only; approval is blocked.
    const text =
      definition.type === 'INSTANCE_SWAP' && swapResolved
        ? readable.replaceAll('=', ': ')
        : String(raw);
    const messages = [
      isVariant &&
        (typeof raw !== 'string' ||
          !definition.variantOptions?.includes(raw) ||
          (override && raw !== exact[key])) &&
        `Invalid/conflicting VARIANT evidence: ${node.id} ${key}.`,
      (!SUPPORTED_PROPERTY_TYPES.includes(definition.type) ||
        raw === undefined) &&
        `Unsupported/missing appearance property: ${node.id} ${key}.`,
      definition.type === 'INSTANCE_SWAP' &&
        !swapResolved &&
        `Unresolved readable INSTANCE_SWAP label: ${node.id} ${key} = ${String(raw)}.`,
      axes[displayKey] === undefined &&
        `Unknown property name: ${node.id} "${displayKey}".`,
      collides && `Appearance label collision: ${node.id} ${label}.`,
      label === 'Fargetema'
        ? colorThemes[text] === undefined &&
          `Unmapped Fargetema value: ${node.id} ${text}.`
        : isVariant &&
          values[text] === undefined &&
          `Unknown value: ${node.id} ${displayKey} = "${text}".`,
    ];
    return {
      value:
        label === 'Fargetema'
          ? (colorThemes[text] ?? text)
          : (values[text] ?? text),
      issues: messages
        .filter((message) => typeof message === 'string')
        .map((message) => issue(node.id, message)),
    };
  }

  /** A component, or an instance of one, as a variant of its family, and what blocks it. */
  function planVariant(
    node: FigmaNode,
    definitions: NonNullable<FigmaNode['componentPropertyDefinitions']>,
    familySlug: string,
  ) {
    const base =
      node.type === 'INSTANCE' ? components.get(node.componentId!)! : node;
    const exact = assignments(base);
    const defined = Object.entries(definitions)
      .map(([key, definition]) => ({
        key,
        definition,
        displayKey: key.replace(/#\d+:\d+$/, ''),
      }))
      .filter(({ displayKey }) => !displayKey.startsWith('_'));
    const labels = defined.map(
      ({ displayKey }) => axes[displayKey] ?? displayKey,
    );
    const planned = defined.map((property, index) =>
      planProperty(
        node,
        exact,
        property,
        labels[index],
        labels.slice(0, index).includes(labels[index]),
      ),
    );
    const properties = Object.fromEntries(
      planned.map(({ value }, index) => [labels[index], value]),
    );
    return {
      variant: {
        id: `${familySlug}-${node.id.replace(':', '-')}`,
        nodeId: node.id,
        name: Object.entries(properties)
          .map(([key, property]) => `${key}: ${property}`)
          .join(', '),
        properties,
        ...(node.type === 'INSTANCE' ? { componentId: node.componentId } : {}),
      },
      issues: [
        ...planned.flatMap(({ issues }) => issues),
        ...Object.keys(exact)
          .filter((key) => definitions[key]?.type !== 'VARIANT')
          .map((key) =>
            issue(node.id, `Unrepresented VARIANT axis: ${node.id} ${key}.`),
          ),
        ...Object.keys(node.componentProperties ?? {})
          .filter((key) => !definitions[key] && !key.startsWith('_'))
          .map((key) =>
            issue(
              node.id,
              `Unrepresented appearance override: ${node.id} ${key}.`,
            ),
          ),
      ],
    };
  }

  /** A component set as a family, with its components and their linked instances as variants. */
  function planFamily(set: FigmaNode) {
    const familySlug = `${getSource(categoryId).idPrefix}${slug(set.name)}`;
    const definitions = set.componentPropertyDefinitions ?? {};
    const children = (set.children ?? []).filter(
      (child) => !excludedNodes.has(child.id),
    );
    const bases = children.filter((child) => child.type === 'COMPONENT');
    const instances = entries
      .filter(
        ({ node, art }) =>
          !art &&
          node.type === 'INSTANCE' &&
          bases.some((base) => base.id === node.componentId),
      )
      .map(({ node }) => node);
    const variants = [...bases, ...instances].map((node) =>
      planVariant(node, definitions, familySlug),
    );
    const bySignature = Map.groupBy(variants, ({ variant }) =>
      JSON.stringify(
        Object.entries(variant.properties).toSorted(([a], [b]) =>
          a.localeCompare(b),
        ),
      ),
    );
    return {
      family: {
        id: `${familySlug}-${set.id.replace(':', '-')}`,
        categoryId,
        nodeId: set.id,
        name: set.name,
        variants: variants.map(({ variant }) => variant),
      },
      issues: [
        ...(Object.keys(definitions).length
          ? []
          : [issue(set.id, `Missing family property definitions: ${set.id}.`)]),
        ...(!bases.length || bases.length !== children.length
          ? [issue(set.id, `Unexpected family children: ${set.id}.`)]
          : []),
        ...variants.flatMap(({ issues }) => issues),
        ...[...bySignature.values()]
          .filter((group) => group.length > 1)
          .map((group) => {
            const nodeIds = group.map(({ variant }) => variant.nodeId);
            return issue(
              nodeIds,
              `Repeated property signatures in ${set.name}: ${nodeIds.join(', ')}.`,
            );
          }),
      ],
    };
  }

  const planned = sets.map(({ node }) => planFamily(node));
  const families: ImportMap['families'] = planned.map(({ family }) => family);
  const mapping: ImportMap = { schemaVersion: 2, state: 'reviewed', families };
  // Exercise the same ancestry, bounds, uniqueness and page checks as sync.
  resolveMapping(
    mapping,
    root,
    { schemaVersion: 1, families: {} },
    false,
    categoryId,
  );
  return {
    families,
    issues: planned.flatMap(({ issues }) => issues),
    warnings,
  };
}
