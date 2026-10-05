import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogSchema, importMapSchema } from '../src/schema.ts';
import { parseCli } from './category.ts';
import { parseHierarchy } from './figma.ts';
import { packageRoot } from './files.ts';
import { resolveMapping } from './mapping.ts';
import { planMapping } from './planning.ts';

try {
  const { categoryId, source, inventory } = parseCli(process.argv.slice(2), [
    '--approve',
  ]);
  const evidence = JSON.parse(
    await readFile(join(inventory, 'hierarchy.json'), 'utf8'),
  );
  const { mapping, report } = planMapping(evidence, categoryId);
  await writeFile(
    join(inventory, 'map-candidate.json'),
    JSON.stringify({ ...mapping, state: 'pending-review' }, null, 2) + '\n',
  );
  await writeFile(
    join(inventory, 'map-report.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  console.log(
    JSON.stringify(
      {
        counts: report.counts,
        approvalReady: report.approvalReady,
        families: report.families.map(
          ({ name, components, instances, variants, duplicates }) => ({
            name,
            components,
            instances,
            variants,
            duplicateSignatures: duplicates.length,
          }),
        ),
        issues: report.issues,
      },
      null,
      2,
    ),
  );
  if (process.argv.includes('--approve')) {
    if (!report.approvalReady)
      throw new Error(
        'Approval blocked by inventory ambiguities. Review inventory/map-report.json; source/import-map.json was not changed.',
      );
    const previous = catalogSchema.parse(
      JSON.parse(
        await readFile(
          join(packageRoot, 'source/catalog/metadata.json'),
          'utf8',
        ),
      ),
    );
    resolveMapping(
      mapping,
      parseHierarchy(evidence.hierarchy, source.pageNodeId),
      previous,
      false,
      categoryId,
    );
    // Approving one category keeps every other category's reviewed mapping.
    const current = importMapSchema.parse(
      JSON.parse(
        await readFile(join(packageRoot, 'source/import-map.json'), 'utf8'),
      ),
    );
    await writeFile(
      join(packageRoot, 'source/import-map.json'),
      JSON.stringify(
        {
          ...mapping,
          families: [
            ...current.families.filter(
              (family) => family.categoryId !== categoryId,
            ),
            ...mapping.families,
          ],
        },
        null,
        2,
      ) + '\n',
    );
    console.log(
      'Approved evidence-based mapping. Artwork import remains a separate manual task.',
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Planning failed.');
  process.exitCode = 1;
}
