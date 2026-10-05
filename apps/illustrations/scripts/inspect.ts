import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';
import { parseCli } from './category.ts';
import { getHierarchy, getToken, parseHierarchy, request } from './figma.ts';
import type { FigmaNode } from './figma.ts';

const referenceSchema = z.object({
  nodes: z.record(
    z.string(),
    z
      .object({ document: z.object({ name: z.string(), type: z.string() }) })
      .nullable(),
  ),
});

try {
  const { source, inventory } = parseCli(process.argv.slice(2));
  const token = getToken();
  const hierarchy = await getHierarchy(token, source);
  const references = new Set<string>();
  function collect(node: FigmaNode) {
    for (const definition of Object.values(
      node.componentPropertyDefinitions ?? {},
    )) {
      if (
        definition.type === 'INSTANCE_SWAP' &&
        typeof definition.defaultValue === 'string'
      )
        references.add(definition.defaultValue);
    }
    for (const property of Object.values(node.componentProperties ?? {})) {
      if (
        property.type === 'INSTANCE_SWAP' &&
        typeof property.value === 'string'
      )
        references.add(property.value);
    }
    for (const child of node.children ?? []) collect(child);
  }
  collect(parseHierarchy(hierarchy, source.pageNodeId));
  const referenceComponents: Record<string, { name: string }> = {};
  const ids = [...references];
  for (let offset = 0; offset < ids.length; offset += 25) {
    const query = new URLSearchParams({
      ids: ids.slice(offset, offset + 25).join(','),
      depth: '1',
    });
    const response = await request(
      `https://api.figma.com/v1/files/${source.fileKey}/nodes?${query}`,
      token,
    );
    const parsed = referenceSchema.parse(await response.json());
    for (const [id, value] of Object.entries(parsed.nodes)) {
      if (value?.document.type === 'COMPONENT')
        referenceComponents[id] = { name: value.document.name };
    }
  }
  await mkdir(inventory, { recursive: true });
  await writeFile(
    join(inventory, 'hierarchy.json'),
    JSON.stringify(
      {
        fileKey: source.fileKey,
        pageNodeId: source.pageNodeId,
        inspectedAt: new Date().toISOString(),
        hierarchy,
        referenceComponents,
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    'Saved the category inventory hierarchy.json. Review all families and intentional variants before editing the import map.',
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Inspection failed.');
  process.exitCode = 1;
}
