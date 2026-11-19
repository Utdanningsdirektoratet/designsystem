import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as R from 'ramda';
import yargs, { type Options } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { z } from 'zod';
import { getSource, importMapSchema } from '../src/schema.ts';
import type { CategoryId, ImportMap } from '../src/schema.ts';
import { categoryOption, sourcedCategoryIds } from './category.ts';
import {
  ID_BATCH_SIZE,
  getHierarchy,
  getToken,
  request,
  walk,
} from './figma.ts';
import type { FigmaNode } from './figma.ts';
import { packageRoot, writeJson } from './files.ts';
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
  const references = new Set(
    [...walk(root)].flatMap((node) =>
      [
        ...Object.values(node.componentPropertyDefinitions ?? {}).map(
          ({ type, defaultValue }) => ({ type, value: defaultValue }),
        ),
        ...Object.values(node.componentProperties ?? {}),
      ].flatMap(({ type, value }) =>
        type === 'INSTANCE_SWAP' && typeof value === 'string' ? [value] : [],
      ),
    ),
  );
  const responses = await Array.fromAsync(
    R.splitEvery(ID_BATCH_SIZE, [...references]),
    async (ids) => {
      const query = new URLSearchParams({ ids: ids.join(','), depth: '1' });
      const response = await request(
        `https://api.figma.com/v1/files/${fileKey}/nodes?${query}`,
        token,
      );
      return referenceSchema.parse(await response.json());
    },
  );
  return Object.fromEntries(
    responses
      .flatMap(({ nodes }) => Object.entries(nodes))
      .flatMap(([id, value]) =>
        value?.document.type === 'COMPONENT'
          ? [[id, { name: value.document.name }] as const]
          : [],
      ),
  );
}

/**
 * Adds the planned families and variants that `families` is missing for the category, after the
 * existing ones, and lists what was added.
 */
function addPlanned(
  families: ImportMap['families'],
  planned: ImportMap['families'],
  categoryId: CategoryId,
) {
  const additions = planned.map((family) => {
    const existing = families.find(
      (item) => item.categoryId === categoryId && item.nodeId === family.nodeId,
    );
    const known = new Set(existing?.variants.map((variant) => variant.nodeId));
    return {
      family,
      existing,
      missing: family.variants.filter((variant) => !known.has(variant.nodeId)),
    };
  });
  const missingByFamily = new Map(
    additions.flatMap(({ existing, missing }) =>
      existing && missing.length ? [[existing, missing] as const] : [],
    ),
  );
  const created = additions.filter(({ existing }) => !existing);
  return {
    families: [
      ...families.map((family) => {
        const missing = missingByFamily.get(family);
        return missing
          ? { ...family, variants: [...family.variants, ...missing] }
          : family;
      }),
      ...created.map(({ family, missing }) => ({
        ...family,
        variants: missing,
      })),
    ],
    added: additions
      .filter(({ missing }) => missing.length)
      .map(
        ({ family, missing }) =>
          `${family.name} (${family.nodeId}): ${missing.length} new variants`,
      ),
    addedNodeIds: new Set([
      ...created.map(({ family }) => family.nodeId),
      ...additions.flatMap(({ missing }) =>
        missing.map((variant) => variant.nodeId),
      ),
    ]),
  };
}

/**
 * Splits the category's entries in `families` into those whose Figma node is still on the page,
 * and descriptions of those that are gone, for example after a component was recreated.
 */
function findStale(
  families: ImportMap['families'],
  pageIds: Set<string>,
  categoryId: CategoryId,
) {
  const reviewed = families.map((family) => {
    if (family.categoryId !== categoryId) return { kept: [family], stale: [] };
    if (!pageIds.has(family.nodeId))
      return {
        kept: [],
        stale: [`${family.name} (${family.nodeId}): family is gone from Figma`],
      };
    const [live, gone] = R.partition(
      (variant) => pageIds.has(variant.nodeId),
      family.variants,
    );
    return {
      kept: live.length ? [{ ...family, variants: live }] : [],
      stale: gone.map(
        (variant) => `${variant.id} (${variant.nodeId}): gone from Figma`,
      ),
    };
  });
  return {
    kept: reviewed.flatMap(({ kept }) => kept),
    stale: reviewed.flatMap(({ stale }) => stale),
  };
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
  const { families, added, addedNodeIds } = addPlanned(
    current.families,
    plannedFamilies,
    categoryId,
  );
  const { kept, stale } = findStale(families, pageIds, categoryId);
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
    await writeJson(mapPath, next);
    console.log(
      `Updated import-map.json (${categoryId}).${added.length ? `\nAdded:\n- ${added.join('\n- ')}` : ''}${removed ? `\nRemoved ${stale.length} stale entries; run sync:figma --allow-removals --category=${categoryId}.` : ''}\nReview the diff, then run sync:figma --category=${categoryId}.`,
    );
  }
}

const yargsInstance = yargs(hideBin(process.argv));
const { category, prune } = await yargsInstance
  .version(false)
  .strict()
  .options({
    category: { ...categoryOption, defaultDescription: 'every category' },
    prune: {
      description: 'Remove entries whose Figma node is gone',
      type: 'boolean',
      default: false,
    },
  } satisfies Record<string, Options>)
  .wrap(yargsInstance.terminalWidth())
  .parseAsync();

for (const categoryId of category ? [category] : sourcedCategoryIds)
  await suggest(categoryId, prune);
