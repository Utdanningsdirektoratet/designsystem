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
  Season: 'Season',
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
  Summer: 'Summer',
  Winter: 'Winter',
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

// Only exact Figma VARIANT assignments are accepted, not illustration-name guesses.
function assignments(node: FigmaNode) {
  const result: Record<string, string> = {};
  for (const part of node.name.split(', ')) {
    const match = /^([^=]+)=(.+)$/.exec(part);
    if (!match || result[match[1]] !== undefined)
      throw new Error(`Invalid VARIANT assignments on ${node.id}.`);
    result[match[1]] = match[2];
  }
  return result;
}

// Derives the full import mapping for a category's Figma page. Issues list anything ambiguous.
export function planMapping(
  root: FigmaNode,
  referenceComponents: Record<string, { name: string }>,
  categoryId: CategoryId,
) {
  const entries: { node: FigmaNode; art: boolean }[] = [];
  const warnings: string[] = [];
  function visit(node: FigmaNode, art = false) {
    if (
      (node.type === 'SECTION' && excludedSections.has(node.name)) ||
      excludedNodes.has(node.id)
    )
      return;
    // Figma omits children below the requested depth, so illustrations nested deeper are invisible.
    if (
      !art &&
      ['FRAME', 'SECTION', 'GROUP', 'COMPONENT_SET'].includes(node.type) &&
      node.children === undefined
    )
      warnings.push(
        `${node.type} ${node.id} "${node.name}" has no children in the fetched depth; anything inside is not seen.`,
      );
    entries.push({ node, art });
    for (const child of node.children ?? [])
      visit(child, art || ['COMPONENT', 'INSTANCE'].includes(node.type));
  }
  visit(root);
  const issues: { nodeIds: string[]; message: string }[] = [];
  const report = (nodeIds: string | string[], message: string) =>
    issues.push({ nodeIds: [nodeIds].flat(), message });
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
  const components = new Map<string, FigmaNode>();
  for (const { node } of sets)
    for (const child of node.children ?? [])
      if (child.type === 'COMPONENT') components.set(child.id, child);
  const sourceNames = new Map(entries.map(({ node }) => [node.id, node.name]));
  for (const [id, component] of Object.entries(referenceComponents))
    sourceNames.set(id, component.name);
  const families: ImportMap['families'] = sets.map(({ node: set }) => {
    const familySlug = `${getSource(categoryId).idPrefix}${slug(set.name)}`;
    const definitions = set.componentPropertyDefinitions ?? {};
    if (!Object.keys(definitions).length)
      report(set.id, `Missing family property definitions: ${set.id}.`);
    const children = (set.children ?? []).filter(
      (child) => !excludedNodes.has(child.id),
    );
    const bases = children.filter((child) => child.type === 'COMPONENT');
    if (!bases.length || bases.length !== children.length)
      report(set.id, `Unexpected family children: ${set.id}.`);
    const instances = entries
      .filter(
        ({ node, art }) =>
          !art &&
          node.type === 'INSTANCE' &&
          bases.some((base) => base.id === node.componentId),
      )
      .map(({ node }) => node);
    const variants = [...bases, ...instances].map((node) => {
      const base =
        node.type === 'INSTANCE' ? components.get(node.componentId!)! : node;
      const exact = assignments(base);
      const properties: Record<string, string> = {};
      for (const [key, definition] of Object.entries(definitions)) {
        const displayKey = key.replace(/#\d+:\d+$/, '');
        if (displayKey.startsWith('_')) continue;
        const override = node.componentProperties?.[key];
        let property =
          override?.value ??
          (definition.type === 'VARIANT'
            ? exact[key]
            : definition.defaultValue);
        if (
          definition.type === 'VARIANT' &&
          (typeof property !== 'string' ||
            !definition.variantOptions?.includes(property) ||
            (override && property !== exact[key]))
        )
          report(
            node.id,
            `Invalid/conflicting VARIANT evidence: ${node.id} ${key}.`,
          );
        if (
          !['VARIANT', 'BOOLEAN', 'TEXT', 'INSTANCE_SWAP'].includes(
            definition.type,
          ) ||
          property === undefined
        )
          report(
            node.id,
            `Unsupported/missing appearance property: ${node.id} ${key}.`,
          );
        if (definition.type === 'INSTANCE_SWAP') {
          const readable = sourceNames.get(String(property));
          if (!readable || readable.length > 120)
            report(
              node.id,
              `Unresolved readable INSTANCE_SWAP label: ${node.id} ${key} = ${String(property)}.`,
            );
          else property = readable.replaceAll('=', ': ');
        }
        const label = axes[displayKey] ?? displayKey;
        if (axes[displayKey] === undefined)
          report(node.id, `Unknown property name: ${node.id} "${displayKey}".`);
        if (properties[label] !== undefined)
          report(node.id, `Appearance label collision: ${node.id} ${label}.`);
        // Preserve unresolved short references in the candidate only; approval is blocked.
        if (label === 'Fargetema') {
          if (colorThemes[String(property)] === undefined)
            report(
              node.id,
              `Unmapped Fargetema value: ${node.id} ${String(property)}.`,
            );
          properties[label] = colorThemes[String(property)] ?? String(property);
        } else {
          if (
            definition.type === 'VARIANT' &&
            values[String(property)] === undefined
          )
            report(
              node.id,
              `Unknown value: ${node.id} ${displayKey} = "${String(property)}".`,
            );
          properties[label] = values[String(property)] ?? String(property);
        }
      }
      for (const key of Object.keys(exact))
        if (definitions[key]?.type !== 'VARIANT')
          report(node.id, `Unrepresented VARIANT axis: ${node.id} ${key}.`);
      for (const key of Object.keys(node.componentProperties ?? {}))
        if (!definitions[key] && !key.startsWith('_'))
          report(
            node.id,
            `Unrepresented appearance override: ${node.id} ${key}.`,
          );
      return {
        id: `${familySlug}-${node.id.replace(':', '-')}`,
        nodeId: node.id,
        name: Object.entries(properties)
          .map(([key, property]) => `${key}: ${property}`)
          .join(', '),
        properties,
        ...(node.type === 'INSTANCE' ? { componentId: node.componentId } : {}),
      };
    });
    const signatures = new Map<string, string[]>();
    for (const variant of variants) {
      const signature = JSON.stringify(
        Object.entries(variant.properties).sort(([a], [b]) =>
          a.localeCompare(b),
        ),
      );
      signatures.set(signature, [
        ...(signatures.get(signature) ?? []),
        variant.nodeId,
      ]);
    }
    for (const nodeIds of signatures.values())
      if (nodeIds.length > 1)
        report(
          nodeIds,
          `Repeated property signatures in ${set.name}: ${nodeIds.join(', ')}.`,
        );
    return {
      id: `${familySlug}-${set.id.replace(':', '-')}`,
      categoryId,
      nodeId: set.id,
      name: set.name,
      variants,
    };
  });
  const mapping: ImportMap = { schemaVersion: 2, state: 'reviewed', families };
  // Exercise the same ancestry, bounds, uniqueness and page checks as sync.
  resolveMapping(
    mapping,
    root,
    { schemaVersion: 2, state: 'pending-import', families: [] },
    false,
    categoryId,
  );
  return { families, issues, warnings };
}
