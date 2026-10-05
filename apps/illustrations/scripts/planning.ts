import { z } from 'zod';
import { getSource } from '../src/schema.ts';
import type { CategoryId, ImportMap } from '../src/schema.ts';
import { parseHierarchy } from './figma.ts';
import type { FigmaNode } from './figma.ts';
import { resolveMapping } from './mapping.ts';

const evidenceSchema = z.object({
  fileKey: z.string().min(1),
  pageNodeId: z.string().regex(/^\d+:\d+$/),
  inspectedAt: z.iso.datetime(),
  hierarchy: z.unknown(),
  referenceComponents: z
    .record(z.string(), z.object({ name: z.string().min(1) }))
    .optional(),
});
const numericId = /^\d+:\d+$/;
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

export function planMapping(value: unknown, categoryId: CategoryId) {
  const source = getSource(categoryId);
  const evidence = evidenceSchema.parse(value);
  if (
    evidence.fileKey !== source.fileKey ||
    evidence.pageNodeId !== source.pageNodeId
  )
    throw new Error(`Inventory evidence is not from the ${categoryId} source.`);
  const root = parseHierarchy(evidence.hierarchy, source.pageNodeId);
  const entries: { node: FigmaNode; parent?: FigmaNode; art: boolean }[] = [];
  function visit(node: FigmaNode, parent?: FigmaNode, art = false) {
    entries.push({ node, parent, art });
    for (const child of node.children ?? [])
      visit(child, node, art || ['COMPONENT', 'INSTANCE'].includes(node.type));
  }
  visit(root);
  const issues = new Set<string>();
  const selected = new Set<string>();
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
  const templateComponents = new Set(
    allSets
      .filter(({ node }) => emptyTemplates.has(node.id))
      .flatMap(({ node }) => (node.children ?? []).map((child) => child.id)),
  );
  const components = new Map<string, FigmaNode>();
  for (const { node } of sets)
    for (const child of node.children ?? [])
      if (child.type === 'COMPONENT') components.set(child.id, child);
  const sourceNames = new Map(entries.map(({ node }) => [node.id, node.name]));
  for (const [id, component] of Object.entries(
    evidence.referenceComponents ?? {},
  ))
    sourceNames.set(id, component.name);
  const response = z
    .object({
      nodes: z.record(
        z.string(),
        z
          .object({
            components: z
              .record(z.string(), z.object({ name: z.string() }))
              .optional(),
          })
          .nullable(),
      ),
    })
    .parse(evidence.hierarchy);
  for (const [id, component] of Object.entries(
    response.nodes[source.pageNodeId]?.components ?? {},
  ))
    sourceNames.set(id, component.name);
  const familyReports: {
    nodeId: string;
    name: string;
    group: string;
    components: number;
    instances: number;
    variants: number;
    definitions: FigmaNode['componentPropertyDefinitions'];
    propertyValues: Record<string, string[]>;
    duplicates: { properties: Record<string, string>; nodeIds: string[] }[];
  }[] = [];
  const families: ImportMap['families'] = sets.map(({ node: set, parent }) => {
    const familySlug = `${source.idPrefix}${slug(set.name)}`;
    const definitions = set.componentPropertyDefinitions ?? {};
    if (
      !familySlug ||
      !numericId.test(set.id) ||
      !Object.keys(definitions).length
    )
      issues.add(`Missing family identity/property definitions: ${set.id}.`);
    const bases =
      set.children?.filter((child) => child.type === 'COMPONENT') ?? [];
    if (!bases.length || bases.length !== set.children?.length)
      issues.add(`Unexpected family children: ${set.id}.`);
    const instances = entries
      .filter(
        ({ node, art }) =>
          !art &&
          node.type === 'INSTANCE' &&
          bases.some((base) => base.id === node.componentId),
      )
      .map(({ node }) => node);
    const variants = [...bases, ...instances].map((node) => {
      selected.add(node.id);
      const base =
        node.type === 'INSTANCE'
          ? components.get(node.componentId ?? '')
          : node;
      if (!base) throw new Error(`Missing source component for ${node.id}.`);
      const exact = assignments(base);
      const properties: Record<string, string> = {};
      for (const [key, definition] of Object.entries(definitions)) {
        const displayKey = key.replace(/#\d+:\d+$/, '');
        if (displayKey.startsWith('_')) continue;
        const override = node.componentProperties?.[key];
        if (override && override.type !== definition.type)
          issues.add(`Property type conflict: ${node.id} ${key}.`);
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
          issues.add(
            `Invalid/conflicting VARIANT evidence: ${node.id} ${key}.`,
          );
        if (
          !['VARIANT', 'BOOLEAN', 'TEXT', 'INSTANCE_SWAP'].includes(
            definition.type,
          ) ||
          property === undefined
        )
          issues.add(
            `Unsupported/missing appearance property: ${node.id} ${key}.`,
          );
        if (definition.type === 'BOOLEAN' && typeof property !== 'boolean')
          issues.add(`Invalid BOOLEAN evidence: ${node.id} ${key}.`);
        if (definition.type === 'INSTANCE_SWAP') {
          const readable = sourceNames.get(String(property));
          if (!readable || readable.length > 120)
            issues.add(
              `Unresolved readable INSTANCE_SWAP label: ${set.name} ${key} = ${String(property)}.`,
            );
          else property = readable.replaceAll('=', ': ');
        }
        const label = axes[displayKey] ?? displayKey;
        if (properties[label] !== undefined)
          issues.add(`Appearance label collision: ${node.id} ${label}.`);
        // Preserve unresolved short references in the candidate only; approval is blocked.
        if (label === 'Fargetema') {
          if (colorThemes[String(property)] === undefined)
            issues.add(
              `Unmapped Fargetema value: ${node.id} ${String(property)}.`,
            );
          properties[label] = colorThemes[String(property)] ?? String(property);
        } else properties[label] = values[String(property)] ?? String(property);
      }
      for (const key of Object.keys(exact))
        if (definitions[key]?.type !== 'VARIANT')
          issues.add(`Unrepresented VARIANT axis: ${node.id} ${key}.`);
      for (const key of Object.keys(node.componentProperties ?? {}))
        if (!definitions[key] && !key.startsWith('_'))
          issues.add(`Unrepresented appearance override: ${node.id} ${key}.`);
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
    const signatures = new Map<string, typeof variants>();
    for (const variant of variants) {
      const signature = JSON.stringify(
        Object.entries(variant.properties).sort(([a], [b]) =>
          a.localeCompare(b),
        ),
      );
      signatures.set(signature, [
        ...(signatures.get(signature) ?? []),
        variant,
      ]);
    }
    const duplicates = [...signatures.values()]
      .filter((group) => group.length > 1)
      .map((group) => ({
        properties: group[0].properties,
        nodeIds: group.map((variant) => variant.nodeId),
      }));
    if (duplicates.length)
      issues.add(
        `Repeated property signatures in ${set.name}; review node-level differences (no nodes deduplicated).`,
      );
    familyReports.push({
      nodeId: set.id,
      name: set.name,
      group: parent?.name ?? '',
      components: bases.length,
      instances: instances.length,
      variants: variants.length,
      definitions,
      propertyValues: Object.fromEntries(
        [
          ...new Set(
            variants.flatMap((variant) => Object.keys(variant.properties)),
          ),
        ].map((key) => [
          key,
          [...new Set(variants.map((variant) => variant.properties[key]))],
        ]),
      ),
      duplicates,
    });
    return {
      id: `${familySlug}-${set.id.replace(':', '-')}`,
      categoryId,
      nodeId: set.id,
      name: set.name,
      variants,
    };
  });
  const setIds = new Set(sets.map(({ node }) => node.id));
  const exclusions = entries
    .filter(
      ({ node }) =>
        !selected.has(node.id) && !setIds.has(node.id) && node.id !== root.id,
    )
    .map(({ node, parent, art }) => {
      let reason = 'unmatched';
      if (
        emptyTemplates.has(node.id) ||
        templateComponents.has(node.id) ||
        (node.componentId && templateComponents.has(node.componentId))
      )
        reason = 'empty template (background and hidden guides only)';
      else if (art) reason = 'nested artwork (not an export)';
      else if (
        node.type === 'INSTANCE' &&
        ['_header', '_status'].includes(node.name)
      )
        reason = 'internal header/status';
      else if (node.type === 'TEXT') reason = 'presentation text';
      else if (
        node.type === 'FRAME' &&
        (node.children ?? []).every(
          (child) =>
            child.type === 'TEXT' ||
            (child.type === 'INSTANCE' && child.name === '_status'),
        )
      )
        reason = 'presentation layout';
      else if (
        node.type === 'FRAME' &&
        parent?.id === root.id &&
        node.children?.some((child) => setIds.has(child.id))
      )
        reason = 'category layout';
      if (reason === 'unmatched')
        issues.add(`Unmatched node ${node.id} (${node.type}, ${node.name}).`);
      return {
        nodeId: node.id,
        name: node.name,
        type: node.type,
        parentId: parent?.id,
        reason,
      };
    });
  const mapping: ImportMap = { schemaVersion: 2, state: 'reviewed', families };
  // Exercise the same ancestry, bounds, uniqueness and page checks as the importer.
  resolveMapping(
    mapping,
    root,
    { schemaVersion: 2, state: 'pending-import', families: [] },
    false,
    categoryId,
  );
  return {
    mapping,
    report: {
      inspectedAt: evidence.inspectedAt,
      approvalReady: issues.size === 0,
      counts: {
        families: families.length,
        components: familyReports.reduce(
          (n, family) => n + family.components,
          0,
        ),
        instances: familyReports.reduce((n, family) => n + family.instances, 0),
        variants: selected.size,
        excludedNodes: exclusions.length,
        unmatchedNodes: exclusions.filter((node) => node.reason === 'unmatched')
          .length,
        emptyTemplateFamilies: emptyTemplates.size,
      },
      families: familyReports,
      issues: [...issues],
      exclusions,
    },
  };
}
