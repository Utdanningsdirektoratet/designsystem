import * as R from 'ramda';
import {
  catalogSchema,
  figmaSnapshotSchema,
  importMapSchema,
} from '../src/schema.ts';
import type { CategoryId, FigmaSnapshot, ImportMap } from '../src/schema.ts';
import type { FigmaNode } from './figma.ts';

type SnapshotFamily = FigmaSnapshot['families'][string];

// Descriptions are comma-separated tags, optionally prefixed with "Tags:".
export function parseTags(description: string) {
  const tags = description
    .replace(/^\s*tags:/i, '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set(tags)];
}

/**
 * Checks one category of the reviewed mapping against the live Figma page, and returns the snapshot
 * with that category's frame sizes and tags read again. Other categories are kept as they are.
 */
export function resolveMapping(
  value: unknown,
  root: FigmaNode,
  previous: FigmaSnapshot,
  allowRemovals: boolean,
  categoryId: CategoryId,
  descriptions: Record<string, string> = {},
): FigmaSnapshot {
  if (root.type !== 'CANVAS')
    throw new Error('Mapping must be bounded within the intended Figma page.');
  const mapping = importMapSchema.parse(value);
  // Only this category's reviewed families are resolved; other categories pass through untouched.
  const scoped = mapping.families.filter(
    (family) => family.categoryId === categoryId,
  );
  if (!scoped.length)
    throw new Error(`The reviewed mapping has no ${categoryId} families.`);
  const nodes = new Map<string, { node: FigmaNode; ancestors: Set<string> }>();
  function visit(node: FigmaNode, ancestors: Set<string>) {
    nodes.set(node.id, { node, ancestors });
    const next = new Set(ancestors).add(node.id);
    for (const child of node.children ?? []) visit(child, next);
  }
  visit(root, new Set());
  const resolved = scoped.map((family): [string, SnapshotFamily] => {
    if (!nodes.has(family.nodeId))
      throw new Error(`Missing family root ${family.nodeId}.`);
    const tags = parseTags(descriptions[family.nodeId] ?? '');
    const variants = family.variants.map((variant) => {
      const entry = nodes.get(variant.nodeId);
      const component = variant.componentId
        ? nodes.get(variant.componentId)
        : undefined;
      const linkedInstance =
        variant.componentId !== undefined &&
        entry?.node.type === 'INSTANCE' &&
        entry.node.componentId === variant.componentId &&
        nodes.get(family.nodeId)?.node.type === 'COMPONENT_SET' &&
        component?.node.type === 'COMPONENT' &&
        component.ancestors.has(family.nodeId);
      if (variant.componentId !== undefined && !linkedInstance)
        throw new Error(
          `Invalid source component reference for ${variant.nodeId}.`,
        );
      if (
        !entry ||
        !(
          entry.ancestors.has(family.nodeId) ||
          variant.nodeId === family.nodeId ||
          linkedInstance
        )
      )
        throw new Error(
          `Export node ${variant.nodeId} is not in family ${family.id}.`,
        );
      if (
        !['FRAME', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET'].includes(
          entry.node.type,
        )
      )
        throw new Error(
          `Export node ${variant.nodeId} must be an intentional frame/component, not a nested vector.`,
        );
      const bounds = entry.node.absoluteBoundingBox;
      if (!bounds)
        throw new Error(`Missing frame bounds for ${variant.nodeId}.`);
      return [
        variant.id,
        {
          nodeId: variant.nodeId,
          width: bounds.width,
          height: bounds.height,
        },
      ] as const;
    });
    return [
      family.id,
      {
        categoryId: family.categoryId,
        nodeId: family.nodeId,
        ...(tags.length ? { tags } : {}),
        variants: Object.fromEntries(variants),
      },
    ];
  });

  const problems = identityProblems(
    previous,
    new Map(resolved),
    categoryId,
    allowRemovals,
  );
  if (problems.length) throw new Error(problems.join('\n'));
  // Catches duplicate IDs, export nodes and filenames, and frames that round to nothing.
  joinCatalog(
    { ...mapping, families: scoped },
    { schemaVersion: 1, families: Object.fromEntries(resolved) },
  );

  // Families follow the import map, so the two files can be read side by side.
  const order = new Map(mapping.families.map(({ id }, index) => [id, index]));
  const kept = Object.entries(previous.families).filter(
    ([, family]) => family.categoryId !== categoryId,
  );
  return figmaSnapshotSchema.parse({
    schemaVersion: 1,
    families: Object.fromEntries(
      R.sortBy(([id]) => order.get(id) ?? Infinity, [...kept, ...resolved]),
    ),
  });
}

/**
 * Compares the category's previous snapshot with the resolved one. An ID keeps pointing at the same
 * Figma node and family once synced, and is only dropped with `allowRemovals`.
 */
function identityProblems(
  previous: FigmaSnapshot,
  next: Map<string, SnapshotFamily>,
  categoryId: CategoryId,
  allowRemovals: boolean,
) {
  const nextVariants = new Map(
    [...next].flatMap(([familyId, family]) =>
      Object.entries(family.variants).map(
        ([id, { nodeId }]) => [id, { familyId, nodeId }] as const,
      ),
    ),
  );
  return Object.entries(previous.families).flatMap(([familyId, family]) => {
    const replacement = next.get(familyId);
    if (family.categoryId !== categoryId)
      return replacement
        ? [`Stable family ID ${familyId} cannot be reassigned.`]
        : [];
    const familyProblems = !replacement
      ? allowRemovals
        ? []
        : [`Removing family ${familyId} requires --allow-removals.`]
      : replacement.nodeId !== family.nodeId
        ? [`Stable family ID ${familyId} cannot be reassigned.`]
        : [];
    // Also checked when the family itself is removed, so its variants cannot move to another one.
    const variantProblems = Object.entries(family.variants).flatMap(
      ([variantId, variant]) => {
        const moved = nextVariants.get(variantId);
        if (!moved)
          return allowRemovals
            ? []
            : [`Removing variant ${variantId} requires --allow-removals.`];
        return moved.nodeId !== variant.nodeId || moved.familyId !== familyId
          ? [`Stable variant ID ${variantId} cannot be reassigned.`]
          : [];
      },
    );
    return [...familyProblems, ...variantProblems];
  });
}

/**
 * Combines the reviewed mapping with the Figma snapshot into the catalog that the app and the deploy
 * read. Fails when the import map was changed without running sync:figma afterwards.
 */
export function joinCatalog(mapping: ImportMap, snapshot: FigmaSnapshot) {
  const recorded = new Map(Object.entries(snapshot.families));
  const mappedFamilies = new Set(mapping.families.map(({ id }) => id));
  const unmappedFamilies = [...recorded.keys()].filter(
    (id) => !mappedFamilies.has(id),
  );
  if (unmappedFamilies.length)
    throw new Error(
      `The Figma snapshot has families that import-map.json no longer lists: ${unmappedFamilies.join(', ')}. Run sync:figma --allow-removals.`,
    );
  const families = mapping.families.map((family) => {
    const figma = recorded.get(family.id);
    const outdated = `Run sync:figma --category=${family.categoryId}.`;
    if (
      figma?.categoryId !== family.categoryId ||
      figma.nodeId !== family.nodeId
    )
      throw new Error(
        `The Figma snapshot has no ${family.categoryId} family ${family.id} at node ${family.nodeId}. ${outdated}`,
      );
    const sizes = new Map(Object.entries(figma.variants));
    const mappedVariants = new Set(family.variants.map(({ id }) => id));
    const unmappedVariants = [...sizes.keys()].filter(
      (id) => !mappedVariants.has(id),
    );
    if (unmappedVariants.length)
      throw new Error(
        `The Figma snapshot has variants that import-map.json no longer lists: ${unmappedVariants.join(', ')}. Run sync:figma --category=${family.categoryId} --allow-removals.`,
      );
    return {
      id: family.id,
      categoryId: family.categoryId,
      nodeId: family.nodeId,
      name: family.name,
      ...(figma.tags ? { tags: figma.tags } : {}),
      variants: family.variants.map((variant) => {
        const size = sizes.get(variant.id);
        if (size?.nodeId !== variant.nodeId)
          throw new Error(
            `The Figma snapshot has no variant ${variant.id} at node ${variant.nodeId}. ${outdated}`,
          );
        return {
          id: variant.id,
          nodeId: variant.nodeId,
          name: variant.name,
          width: size.width,
          height: size.height,
          properties: variant.properties,
          svg: `${variant.id}.svg`,
        };
      }),
    };
  });
  return catalogSchema.parse({
    schemaVersion: 3,
    families,
  });
}
