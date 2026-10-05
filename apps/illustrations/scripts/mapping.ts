import { catalogSchema, getSource, importMapSchema } from '../src/schema.ts';
import type { CategoryId, IllustrationCatalog } from '../src/schema.ts';
import type { FigmaNode } from './figma.ts';

export function resolveMapping(
  value: unknown,
  root: FigmaNode,
  previous: IllustrationCatalog,
  allowRemovals: boolean,
  categoryId: CategoryId,
) {
  if (root.id !== getSource(categoryId).pageNodeId || root.type !== 'CANVAS')
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
    if (nodes.has(node.id))
      throw new Error(`Duplicate hierarchy node ${node.id}.`);
    nodes.set(node.id, { node, ancestors });
    const next = new Set(ancestors).add(node.id);
    for (const child of node.children ?? []) visit(child, next);
  }
  visit(root, new Set());
  const families = scoped.map((family) => {
    if (!nodes.has(family.nodeId))
      throw new Error(`Missing family root ${family.nodeId}.`);
    return {
      ...family,
      variants: family.variants.map((variant) => {
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
        return {
          id: variant.id,
          nodeId: variant.nodeId,
          name: variant.name,
          properties: variant.properties,
          width: bounds.width,
          height: bounds.height,
          svg: `${variant.id}.svg`,
        };
      }),
    };
  });
  const catalog = catalogSchema.parse({
    schemaVersion: 2,
    state: 'imported',
    families: [
      ...previous.families.filter((family) => family.categoryId !== categoryId),
      ...families,
    ],
  });
  const newFamilies = new Map(families.map((family) => [family.id, family]));
  const newVariants = new Map(
    families.flatMap((family) =>
      family.variants.map(
        (variant) => [variant.id, { variant, familyId: family.id }] as const,
      ),
    ),
  );
  for (const family of previous.families.filter(
    (item) => item.categoryId === categoryId,
  )) {
    const replacement = newFamilies.get(family.id);
    if (!replacement && !allowRemovals)
      throw new Error(
        `Removing family ${family.id} requires --allow-removals.`,
      );
    if (replacement && replacement.nodeId !== family.nodeId)
      throw new Error(`Stable family ID ${family.id} cannot be reassigned.`);
    for (const variant of family.variants) {
      const next = newVariants.get(variant.id);
      if (!next && !allowRemovals)
        throw new Error(
          `Removing variant ${variant.id} requires --allow-removals.`,
        );
      if (
        next &&
        (next.variant.nodeId !== variant.nodeId || next.familyId !== family.id)
      )
        throw new Error(
          `Stable variant ID ${variant.id} cannot be reassigned.`,
        );
    }
  }
  return catalog;
}
