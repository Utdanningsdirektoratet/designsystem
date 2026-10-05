import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';
import { exportSvgUrls, request } from '../scripts/figma.ts';
import { replaceDirectory } from '../scripts/files.ts';
import { resolveMapping } from '../scripts/mapping.ts';
import { renderPng, validateSvg } from '../scripts/svg.ts';
import imported from '../source/catalog/metadata.json';
import importMap from '../source/import-map.json';
import {
  catalogSchema,
  getSource,
  sources,
  importMapSchema,
} from '../src/schema.ts';

const FIGMA_FILE_KEY = getSource('barnehage').fileKey;
const FIGMA_PAGE_NODE_ID = getSource('barnehage').pageNodeId;

// Synthetic geometry is test input only, never catalog art or Figma inventory evidence.
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5"><rect width="5" height="5" fill="#ff0000"/></svg>';
const mapping = {
  schemaVersion: 2,
  state: 'reviewed',
  families: [
    {
      id: 'test-family',
      categoryId: 'barnehage',
      nodeId: '1:1',
      name: 'Test family',
      variants: [
        {
          id: 'test-variant',
          nodeId: '1:2',
          name: 'Test variant',
          properties: { arbitrary: 'Reviewed value' },
        },
      ],
    },
  ],
};
const root = {
  id: FIGMA_PAGE_NODE_ID,
  name: 'Test page',
  type: 'CANVAS',
  children: [
    {
      id: '1:1',
      name: 'Test family',
      type: 'COMPONENT_SET',
      children: [
        {
          id: '1:2',
          name: 'Test variant',
          type: 'COMPONENT',
          absoluteBoundingBox: { width: 10, height: 5 },
        },
      ],
    },
  ],
};
// Pending-state coverage must not depend on the production catalog staying empty.
const empty = catalogSchema.parse({
  schemaVersion: 2,
  state: 'pending-import',
  families: [],
});
const catalog = resolveMapping(mapping, root, empty, false, 'barnehage');

describe('catalog and reviewed mappings', () => {
  it('keeps the imported catalog, reviewed mapping and canonical SVGs in correspondence', async () => {
    const actual = catalogSchema.parse(imported);
    const reviewed = importMapSchema.parse(importMap);
    expect(actual.state).toBe('imported');
    expect(actual.families).not.toHaveLength(0);

    // Compare all public identities and appearance labels, without freezing inventory counts.
    const mappedFamilies = reviewed.families
      .map((family) => ({
        ...family,
        variants: family.variants
          .map(({ id, nodeId, name, properties }) => ({
            id,
            nodeId,
            name,
            properties,
          }))
          .sort((a, b) => a.id.localeCompare(b.id)),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));
    const catalogFamilies = actual.families
      .map((family) => ({
        ...family,
        variants: family.variants
          .map(({ id, nodeId, name, properties }) => ({
            id,
            nodeId,
            name,
            properties,
          }))
          .sort((a, b) => a.id.localeCompare(b.id)),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));
    expect(catalogFamilies).toEqual(mappedFamilies);

    const directory = new URL('../source/catalog/svg/', import.meta.url);
    const variants = actual.families.flatMap((family) => family.variants);
    expect((await readdir(directory)).sort()).toEqual(
      variants.map((variant) => variant.svg).sort(),
    );
    for (const variant of variants) {
      const source = await readFile(new URL(variant.svg, directory), 'utf8');
      expect(source.length, variant.svg).toBeGreaterThan(0);
      expect(() => validateSvg(source), variant.svg).not.toThrow();
    }
  });

  it('accepts pending metadata, rejects invalid states, dimensions and missing IDs', () => {
    expect(empty.families).toEqual([]);
    expect(() =>
      catalogSchema.parse({ ...empty, state: 'imported' }),
    ).toThrow();
    const broken = structuredClone(catalog);
    broken.families[0].variants[0].width = 0;
    expect(() => catalogSchema.parse(broken)).toThrow();
    expect(() =>
      resolveMapping(
        { ...mapping, state: 'pending-review' },
        root,
        empty,
        false,
        'barnehage',
      ),
    ).toThrow();
    expect(() =>
      resolveMapping(
        mapping,
        { ...root, children: [] },
        empty,
        false,
        'barnehage',
      ),
    ).toThrow(/Missing family/);
    const missingExport = structuredClone(mapping);
    missingExport.families[0].variants[0].nodeId = '99:99';
    expect(() =>
      resolveMapping(missingExport, root, empty, false, 'barnehage'),
    ).toThrow(/Export node/);
  });

  it('retains stable identity on renames without guessing property axes', () => {
    const renamed = structuredClone(mapping);
    renamed.families[0].variants[0].name = 'A new display name';
    const result = resolveMapping(renamed, root, catalog, false, 'barnehage')
      .families[0].variants[0];
    expect(result.id).toBe('test-variant');
    expect(result.svg).toBe('test-variant.svg');
    expect(result.properties).toEqual({ arbitrary: 'Reviewed value' });
    const reassigned = structuredClone(root);
    reassigned.children[0].children[0].id = '1:3';
    renamed.families[0].variants[0].nodeId = '1:3';
    expect(() =>
      resolveMapping(renamed, reassigned, catalog, true, 'barnehage'),
    ).toThrow(/cannot be reassigned/);
  });

  it('rejects duplicates, unsafe filenames and unconfirmed removals', () => {
    const duplicate = structuredClone(catalog);
    duplicate.families[0].variants.push(duplicate.families[0].variants[0]);
    expect(() => catalogSchema.parse(duplicate)).toThrow(/Duplicate/);
    const unsafe = structuredClone(catalog);
    unsafe.families[0].variants[0].svg = '../unsafe.svg';
    expect(() => catalogSchema.parse(unsafe)).toThrow();
    const removed = structuredClone(mapping);
    removed.families[0].variants[0].id = 'new-variant';
    expect(() =>
      resolveMapping(removed, root, catalog, false, 'barnehage'),
    ).toThrow(/allow-removals/);
    expect(
      resolveMapping(removed, root, catalog, true, 'barnehage').families[0]
        .variants[0].id,
    ).toBe('new-variant');
  });
});

describe('offline rasterization', () => {
  it('produces rounded 2x bounds with alpha and preserves artwork background', async () => {
    const png = await renderPng(svg, { width: 10.2, height: 5.1 });
    const { data, info } = await sharp(png)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect([info.width, info.height]).toEqual([20, 10]);
    expect(data[3]).toBe(255);
    expect(data[(info.width - 1) * 4 + 3]).toBe(0);
    const opaque = svg.replace(
      '<rect',
      '<rect width="10" height="5" fill="#ffffff"/><rect',
    );
    const background = await sharp(
      await renderPng(opaque, { width: 10, height: 5 }),
    )
      .ensureAlpha()
      .raw()
      .toBuffer();
    expect(background[(20 - 1) * 4 + 3]).toBe(255);
  });

  it('rejects active content, external references and disguised URLs', () => {
    for (const unsafe of [
      '<script>alert(1)</script>',
      '<foreignObject/>',
      '<image href="https://example.com/a.svg"/>',
      '<image href="//example.com/a.svg"/>',
      '<style>rect{fill:url(//example.com/a)}</style>',
      '<style>rect{fill:u\\72l(https://example.com/a)}</style>',
      '<rect onclick="alert(1)"/>',
      '<image href="&#104;ttps://example.com/a"/>',
    ])
      expect(() =>
        validateSvg(svg.replace('</svg>', `${unsafe}</svg>`)),
      ).toThrow();
  });
});

describe('bounded requests and source replacement', () => {
  it('reports expired tokens without exposing credentials', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 403 }));
    await expect(
      request('https://api.figma.com/test', 'secret-test-token', fetcher),
    ).rejects.toThrow(/token expired/);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('honors Retry-After and caps attempts', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementation(
        async () =>
          new Response(null, { status: 429, headers: { 'Retry-After': '2' } }),
      );
    const wait = vi
      .fn<(delay: number) => Promise<void>>()
      .mockResolvedValue(undefined);
    await expect(
      request('https://api.figma.com/test', undefined, fetcher, wait),
    ).rejects.toThrow(/retry limit/);
    expect(fetcher).toHaveBeenCalledTimes(4);
    expect(wait).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenCalledWith(2000);
  });

  it('bounds export batches and rejects partial export responses', async () => {
    const ids = Array.from({ length: 26 }, (_, index) => `1:${index}`);
    const images = Object.fromEntries(
      ids.slice(0, 25).map((id) => [id, 'https://s3.amazonaws.com/test.svg']),
    );
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ images }))
      .mockResolvedValueOnce(Response.json({ images: { '1:25': null } }));
    await expect(
      exportSvgUrls(ids, 'secret-test-token', FIGMA_FILE_KEY, fetcher),
    ).rejects.toThrow(/missing node/);
    expect(fetcher).toHaveBeenCalledTimes(2);
    const requested = fetcher.mock.calls[0][0];
    const first = new URL(
      requested instanceof Request ? requested.url : requested,
    );
    expect(first.searchParams.get('ids')?.split(',')).toHaveLength(25);
  });

  it('keeps prior sources after a partial fetch and swaps only complete stages', async () => {
    const destination = await mkdtemp(join(tmpdir(), 'illustrations-test-'));
    try {
      await writeFile(join(destination, 'old.svg'), 'prior source');
      await expect(
        replaceDirectory(destination, async (stage) => {
          await writeFile(join(stage, 'partial.svg'), svg);
          await request(
            'https://api.figma.com/test',
            undefined,
            vi.fn<typeof fetch>().mockRejectedValue(new Error('private URL')),
          );
        }),
      ).rejects.toThrow(/network request failed/);
      expect(await readFile(join(destination, 'old.svg'), 'utf8')).toBe(
        'prior source',
      );
      await replaceDirectory(destination, async (stage) => {
        await writeFile(join(stage, 'new.svg'), svg);
      });
      expect(await readFile(join(destination, 'new.svg'), 'utf8')).toBe(svg);
      await expect(readFile(join(destination, 'old.svg'))).rejects.toThrow();
    } finally {
      await rm(destination, { recursive: true, force: true });
    }
  });
});

describe('categories and color themes', () => {
  it('uses grønn, blå and brun and no alt labels in the imported catalog', () => {
    const themes = new Set(
      catalogSchema
        .parse(imported)
        .families.flatMap((family) =>
          family.variants.map((variant) => variant.properties.Fargetema),
        ),
    );
    expect([...themes].sort()).toEqual(['blå', 'brun', 'grønn']);
    expect(JSON.stringify(imported)).not.toMatch(/alt [123]/);
  });

  it('rejects categories without a reviewed Figma source before any request', () => {
    expect(() => getSource('grunnskole')).toThrow(/no configured Figma source/);
    expect(() => getSource('unknown')).toThrow();
  });

  it('refreshes one category without touching others, even with equal node IDs', () => {
    sources.grunnskole = {
      fileKey: 'other-file',
      pageNodeId: '7:7',
      idPrefix: 'grunnskole-',
    };
    try {
      const other = structuredClone(mapping);
      other.families[0].id = 'grunnskole-test-family';
      other.families[0].categoryId = 'grunnskole';
      other.families[0].variants[0].id = 'grunnskole-test-variant';
      const both = {
        ...mapping,
        families: [...mapping.families, ...other.families],
      };
      const first = resolveMapping(mapping, root, empty, false, 'barnehage');
      const combined = resolveMapping(
        both,
        { ...root, id: '7:7' },
        first,
        false,
        'grunnskole',
      );
      expect(combined.families.map((family) => family.categoryId)).toEqual([
        'barnehage',
        'grunnskole',
      ]);
      expect(combined.families[0]).toEqual(first.families[0]);
      // Removing the other category's family needs no approval for this refresh.
      expect(() =>
        resolveMapping(mapping, root, combined, false, 'barnehage'),
      ).not.toThrow();
      expect(
        resolveMapping(mapping, root, combined, false, 'barnehage').families,
      ).toHaveLength(2);
    } finally {
      delete sources.grunnskole;
    }
  });
});
