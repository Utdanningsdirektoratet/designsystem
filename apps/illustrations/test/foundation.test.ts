import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspect } from 'node:util';
import sharp from 'sharp';
import { describe, expect, it, vi } from 'vitest';
import {
  ID_BATCH_SIZE,
  exportSvgUrls,
  parsePage,
  request,
} from '../scripts/figma.ts';
import { replaceDirectory } from '../scripts/files.ts';
import { joinCatalog, parseTags, resolveMapping } from '../scripts/mapping.ts';
import { renderPng, validateSvg } from '../scripts/svg.ts';
import figmaSnapshot from '../source/figma-snapshot.json';
import importMap from '../source/import-map.json';
import {
  catalogSchema,
  figmaSnapshotSchema,
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
// The snapshot before the first sync.
const unsynced = figmaSnapshotSchema.parse({ schemaVersion: 1, families: {} });
const snapshot = resolveMapping(mapping, root, unsynced, false, 'barnehage');
const joinMapping = (value: unknown, figma = snapshot) =>
  joinCatalog(importMapSchema.parse(value), figma);
const catalog = joinMapping(mapping);
// A function, so a stale snapshot fails the tests that read it instead of the whole file.
const joinCommitted = () =>
  joinCatalog(
    importMapSchema.parse(importMap),
    figmaSnapshotSchema.parse(figmaSnapshot),
  );

describe('catalog and reviewed mappings', () => {
  it('has Figma data for every illustration and variant in the committed import map', () => {
    expect(joinCommitted().families).not.toHaveLength(0);
  });

  it('rejects catalogs without illustrations, invalid dimensions and missing IDs', () => {
    expect(() => catalogSchema.parse({ ...catalog, families: [] })).toThrow();
    const broken = structuredClone(catalog);
    broken.families[0].variants[0].width = 0;
    expect(() => catalogSchema.parse(broken)).toThrow();
    expect(() =>
      resolveMapping(
        { ...mapping, state: 'pending-review' },
        root,
        unsynced,
        false,
        'barnehage',
      ),
    ).toThrow();
    expect(() =>
      resolveMapping(
        mapping,
        { ...root, children: [] },
        unsynced,
        false,
        'barnehage',
      ),
    ).toThrow(/Missing family/);
    const missingExport = structuredClone(mapping);
    missingExport.families[0].variants[0].nodeId = '99:99';
    expect(() =>
      resolveMapping(missingExport, root, unsynced, false, 'barnehage'),
    ).toThrow(/Export node/);
  });

  it('shows renamed variants without a new sync, under the same ID', () => {
    const renamed = structuredClone(mapping);
    renamed.families[0].variants[0].name = 'A new display name';
    const result = joinMapping(renamed).families[0].variants[0];
    expect(result.name).toBe('A new display name');
    expect(result.id).toBe('test-variant');
    expect(result.svg).toBe('test-variant.svg');
    expect(result.properties).toEqual({ arbitrary: 'Reviewed value' });
  });

  it('keeps every ID on the Figma node and family it was first synced with', () => {
    // The component set sits in a frame, so the frame can be mapped as a family too.
    const framed = {
      ...root,
      children: [
        { id: '1:0', name: 'Frame', type: 'FRAME', children: root.children },
      ],
    };
    const synced = resolveMapping(
      mapping,
      framed,
      unsynced,
      false,
      'barnehage',
    );
    const movedFamily = structuredClone(mapping);
    movedFamily.families[0].nodeId = '1:0';
    expect(() =>
      resolveMapping(movedFamily, framed, synced, true, 'barnehage'),
    ).toThrow(/Stable family ID test-family cannot be reassigned/);
    const movedVariant = structuredClone(movedFamily);
    movedVariant.families[0].id = 'frame-family';
    expect(() =>
      resolveMapping(movedVariant, framed, synced, true, 'barnehage'),
    ).toThrow(/Stable variant ID test-variant cannot be reassigned/);
    const movedNode = structuredClone(root);
    movedNode.children[0].children[0].id = '1:3';
    const renumbered = structuredClone(mapping);
    renumbered.families[0].variants[0].nodeId = '1:3';
    expect(() =>
      resolveMapping(renumbered, movedNode, snapshot, true, 'barnehage'),
    ).toThrow(/Stable variant ID test-variant cannot be reassigned/);
  });

  it('refuses to build the catalog until sync:figma has seen the import map changes', () => {
    const added = structuredClone(mapping);
    added.families[0].variants.push({
      ...added.families[0].variants[0],
      id: 'added-variant',
      nodeId: '1:9',
    });
    expect(() => joinMapping(added)).toThrow(
      /sync:figma --category=barnehage\./,
    );
    const removed = structuredClone(mapping);
    removed.families[0].id = 'other-family';
    expect(() => joinMapping(removed)).toThrow(/--allow-removals/);
  });

  it('reads tags from component set descriptions', () => {
    expect(parseTags('Kontor, retning , piler,, kontor')).toEqual([
      'kontor',
      'retning',
      'piler',
    ]);
    expect(parseTags('Tags: kontor, piler')).toEqual(['kontor', 'piler']);
    expect(parseTags('')).toEqual([]);
    const { descriptions } = parsePage(
      {
        nodes: {
          [FIGMA_PAGE_NODE_ID]: {
            document: root,
            componentSets: { '1:1': { description: 'kontor, piler' } },
          },
        },
      },
      FIGMA_PAGE_NODE_ID,
    );
    const [family] = joinMapping(
      mapping,
      resolveMapping(mapping, root, unsynced, false, 'barnehage', descriptions),
    ).families;
    expect(family.tags).toEqual(['kontor', 'piler']);
    expect(catalog.families[0].tags).toBeUndefined();
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
      resolveMapping(removed, root, snapshot, false, 'barnehage'),
    ).toThrow(/allow-removals/);
    expect(
      joinMapping(
        removed,
        resolveMapping(removed, root, snapshot, true, 'barnehage'),
      ).families[0].variants[0].id,
    ).toBe('new-variant');
  });
});

describe('offline rasterization', () => {
  it('produces rounded frame-size bounds with alpha and preserves artwork background', async () => {
    const png = await renderPng(svg, { width: 10.2, height: 5.1 });
    const { data, info } = await sharp(png)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect([info.width, info.height]).toEqual([10, 5]);
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
    expect(background[(10 - 1) * 4 + 3]).toBe(255);
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
      '<image href="data:image/svg+xml;base64,PHN2Zz48L3N2Zz4="/>',
      '<rect href="data:image/png;base64,iVBORw0KGgo="/>',
      '<image href="data:image/png;base64,iVBORw0KGgo=" onload="x"/>',
    ])
      expect(() =>
        validateSvg(svg.replace('</svg>', `${unsafe}</svg>`)),
      ).toThrow();
  });

  it('accepts embedded raster images only on image elements', () => {
    const image = '<image href="data:image/png;base64,iVBORw0KGgo+on/AA=="/>';
    expect(() =>
      validateSvg(svg.replace('</svg>', `${image}</svg>`)),
    ).not.toThrow();
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

  it('exports at most one batch per request and rejects partial export responses', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json({ images: { '1:1': null } }));
    const tooMany = Array.from(
      { length: ID_BATCH_SIZE + 1 },
      (_, index) => `1:${index}`,
    );
    await expect(
      exportSvgUrls(tooMany, 'secret-test-token', FIGMA_FILE_KEY, fetcher),
    ).rejects.toThrow(/one request/);
    expect(fetcher).not.toHaveBeenCalled();
    await expect(
      exportSvgUrls(['1:1'], 'secret-test-token', FIGMA_FILE_KEY, fetcher),
    ).rejects.toThrow(/missing node/);
  });

  it('rejects a malformed export URL without exposing it', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json({
        images: {
          '1:1':
            'htt ps://bucket.s3.amazonaws.com/a.svg?X-Amz-Signature=private-signature',
        },
      }),
    );
    const error = await exportSvgUrls(
      ['1:1'],
      'secret-test-token',
      FIGMA_FILE_KEY,
      fetcher,
    ).catch((caught: unknown) => caught);
    expect(String(error)).toMatch(/Untrusted SVG download host for node 1:1/);
    // What Node prints for an uncaught error, including properties such as `input`.
    expect(inspect(error)).not.toMatch(/private-signature/);
  });

  it("reports Figma's explanation and rate limit, but not a storage error body", async () => {
    const rateLimited = vi.fn<typeof fetch>().mockResolvedValue(
      Response.json(
        { status: 429, err: 'Rate limit exceeded' },
        {
          status: 429,
          headers: {
            'Retry-After': '3600',
            'X-Figma-Rate-Limit-Type': 'low',
          },
        },
      ),
    );
    await expect(
      request('https://api.figma.com/test', 'secret-test-token', rateLimited),
    ).rejects.toThrow(/X-Figma-Rate-Limit-Type: low.*"Rate limit exceeded"/);
    const storageError = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(
          '<Error><Code>SignatureDoesNotMatch</Code><SignatureProvided>private-signature</SignatureProvided></Error>',
          { status: 403, headers: { 'Content-Type': 'application/xml' } },
        ),
      );
    const error = await request(
      'https://s3.amazonaws.com/test.svg',
      undefined,
      storageError,
    ).catch((caught: unknown) => caught);
    expect(String(error)).toMatch(/HTTP 403/);
    expect(String(error)).not.toMatch(/private-signature/);
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
            vi
              .fn<(delay: number) => Promise<void>>()
              .mockResolvedValue(undefined),
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
      joinCommitted()
        .families.flatMap((family) =>
          family.variants.map((variant) => variant.properties.Fargetema),
        )
        .filter((theme) => theme !== undefined),
    );
    expect([...themes].sort()).toEqual(['blå', 'brun', 'grønn']);
    expect(JSON.stringify(importMap)).not.toMatch(/alt [123]/);
  });

  it('rejects categories without a reviewed Figma source before any request', () => {
    expect(() => getSource('unknown')).toThrow(/no configured Figma source/);
  });

  it('refreshes one category without touching others, even with equal node IDs', () => {
    const original = sources.grunnskole;
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
      const first = resolveMapping(mapping, root, unsynced, false, 'barnehage');
      const combined = resolveMapping(
        both,
        { ...root, id: '7:7' },
        first,
        false,
        'grunnskole',
      );
      expect(
        Object.values(combined.families).map((family) => family.categoryId),
      ).toEqual(['barnehage', 'grunnskole']);
      expect(combined.families['test-family']).toEqual(
        first.families['test-family'],
      );
      // Removing the other category's family needs no approval for this refresh.
      expect(
        resolveMapping(mapping, root, combined, false, 'barnehage'),
      ).toEqual(combined);
    } finally {
      sources.grunnskole = original;
    }
  });
});
