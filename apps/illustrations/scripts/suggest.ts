import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';
import { getSource, importMapSchema, sources } from '../src/schema.ts';
import type { CategoryId, ImportMap } from '../src/schema.ts';
import { parseCli } from './category.ts';
import { getHierarchy, getToken, request, walk } from './figma.ts';
import type { FigmaNode } from './figma.ts';
import { packageRoot } from './files.ts';
import { planMapping } from './planning.ts';

const referenceSchema = z.object({
  nodes: z.record(
    z.string(),
    z
      .object({ document: z.object({ name: z.string(), type: z.string() }) })
      .nullable(),
  ),
});

// Resolves INSTANCE_SWAP targets to readable names, as planMapping expects.
async function getReferenceComponents(
  root: FigmaNode,
  token: string,
  fileKey: string,
) {
  const references = new Set<string>();
  for (const node of walk(root)) {
    for (const definition of Object.values(
      node.componentPropertyDefinitions ?? {},
    ))
      if (
        definition.type === 'INSTANCE_SWAP' &&
        typeof definition.defaultValue === 'string'
      )
        references.add(definition.defaultValue);
    for (const property of Object.values(node.componentProperties ?? {}))
      if (
        property.type === 'INSTANCE_SWAP' &&
        typeof property.value === 'string'
      )
        references.add(property.value);
  }
  const result: Record<string, { name: string }> = {};
  const ids = [...references];
  for (let offset = 0; offset < ids.length; offset += 25) {
    const query = new URLSearchParams({
      ids: ids.slice(offset, offset + 25).join(','),
      depth: '1',
    });
    const response = await request(
      `https://api.figma.com/v1/files/${fileKey}/nodes?${query}`,
      token,
    );
    const parsed = referenceSchema.parse(await response.json());
    for (const [id, value] of Object.entries(parsed.nodes))
      if (value?.document.type === 'COMPONENT')
        result[id] = { name: value.document.name };
  }
  return result;
}

// Adds families and variants missing from import-map.json and reports entries whose Figma node is
// gone. Existing entries are only removed with --prune.
async function suggest(categoryId: CategoryId, prune: boolean) {
  const source = getSource(categoryId);
  const token = getToken();
  const { root, components } = await getHierarchy(token, source);
  const {
    families: plannedFamilies,
    issues,
    warnings,
  } = planMapping(
    root,
    {
      ...(await getReferenceComponents(root, token, source.fileKey)),
      ...components,
    },
    categoryId,
  );
  for (const warning of warnings)
    console.warn(`Warning (${categoryId}): ${warning}`);
  const pageIds = new Set([...walk(root)].map((node) => node.id));

  const mapPath = join(packageRoot, 'source/import-map.json');
  const current = importMapSchema.parse(
    JSON.parse(await readFile(mapPath, 'utf8')),
  );
  const families: ImportMap['families'] = structuredClone(current.families);
  const added: string[] = [];
  const addedNodeIds = new Set<string>();
  for (const family of plannedFamilies) {
    let existing = families.find(
      (item) => item.categoryId === categoryId && item.nodeId === family.nodeId,
    );
    if (!existing) {
      existing = { ...family, variants: [] };
      families.push(existing);
      addedNodeIds.add(family.nodeId);
    }
    const known = new Set(existing.variants.map((variant) => variant.nodeId));
    const missing = family.variants.filter(
      (variant) => !known.has(variant.nodeId),
    );
    if (!missing.length) continue;
    existing.variants.push(...missing);
    added.push(
      `${family.name} (${family.nodeId}): ${missing.length} new variants`,
    );
    for (const variant of missing) addedNodeIds.add(variant.nodeId);
  }

  // Entries whose Figma node no longer exists, for example after a component was recreated.
  const stale: string[] = [];
  const kept: ImportMap['families'] = [];
  for (const family of families) {
    if (family.categoryId !== categoryId) {
      kept.push(family);
    } else if (!pageIds.has(family.nodeId)) {
      stale.push(
        `${family.name} (${family.nodeId}): family is gone from Figma`,
      );
    } else {
      const live = family.variants.filter((variant) => {
        if (pageIds.has(variant.nodeId)) return true;
        stale.push(`${variant.id} (${variant.nodeId}): gone from Figma`);
        return false;
      });
      if (live.length) kept.push({ ...family, variants: live });
    }
  }
  const removed = prune && stale.length > 0;

  if (stale.length)
    console.warn(
      `Stale entries (${categoryId}):\n- ${stale.join('\n- ')}\n${prune ? 'Removed.' : 'Run suggest:figma --prune to remove them.'}`,
    );
  if (!added.length && !removed) {
    console.log(`import-map.json already covers ${categoryId}. Nothing added.`);
  } else {
    // Issues about already-mapped nodes are ignored; anything about a new node blocks the write.
    const blocking = issues.filter(({ nodeIds }) =>
      nodeIds.some((id) => addedNodeIds.has(id)),
    );
    if (blocking.length)
      throw new Error(
        `Cannot add new nodes confidently; fix them in Figma or edit the map by hand:\n- ${blocking.map(({ message }) => message).join('\n- ')}`,
      );
    const next = importMapSchema.parse({
      ...current,
      families: removed ? kept : families,
    });
    await writeFile(mapPath, JSON.stringify(next, null, 2) + '\n');
    console.log(
      `Updated import-map.json (${categoryId}).${added.length ? `\nAdded:\n- ${added.join('\n- ')}` : ''}${removed ? `\nRemoved ${stale.length} stale entries; run sync:figma --allow-removals --category=${categoryId}.` : ''}\nReview the diff, then run sync:figma --category=${categoryId}.`,
    );
  }
}

try {
  const args = process.argv.slice(2);
  const prune = args.includes('--prune');
  const rest = args.filter((arg) => arg !== '--prune');
  const categoryIds = rest.length
    ? [parseCli(rest).categoryId]
    : (Object.keys(sources) as CategoryId[]);
  for (const categoryId of categoryIds) await suggest(categoryId, prune);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Suggest failed.');
  process.exitCode = 1;
}
