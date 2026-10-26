import { describe, expect, it } from 'vitest';
import { artworkHash } from '../scripts/catalog.ts';
import type { IllustrationCatalog } from '../src/schema.ts';

function catalog(
  overrides: { family?: object; variant?: object } = {},
): IllustrationCatalog {
  return {
    schemaVersion: 2,
    state: 'imported',
    families: [
      {
        id: 'a',
        categoryId: 'barnehage',
        nodeId: '1:1',
        name: 'a',
        tags: ['x'],
        ...overrides.family,
        variants: [
          {
            id: 'a-1',
            nodeId: '1:2',
            name: 'A',
            width: 100,
            height: 50,
            properties: { Format: 'Landskap' },
            svg: 'a-1.svg',
            ...overrides.variant,
          },
          {
            id: 'a-2',
            nodeId: '1:3',
            name: 'B',
            width: 100,
            height: 50,
            properties: {},
            svg: 'a-2.svg',
          },
        ],
      },
    ],
  } as unknown as IllustrationCatalog;
}

const sources = ['svg', 'build'];
const base = artworkHash(catalog(), sources);

describe('artworkHash', () => {
  it('ignores tags, names, properties and variant order', () => {
    expect(
      artworkHash(
        catalog({
          family: { tags: ['y', 'z'], name: 'renamed' },
          variant: { name: 'Other', properties: { Format: 'Portrett' } },
        }),
        sources,
      ),
    ).toBe(base);
    const reordered = catalog();
    reordered.families[0].variants.reverse();
    expect(artworkHash(reordered, sources)).toBe(base);
  });

  it.each([
    ['id', { id: 'a-9' }],
    ['svg filename', { svg: 'other.svg' }],
    ['node id', { nodeId: '9:9' }],
    ['width', { width: 101 }],
    ['height', { height: 51 }],
  ])('changes with the %s', (_name, variant) => {
    expect(artworkHash(catalog({ variant }), sources)).not.toBe(base);
  });

  it('changes with the processing sources', () => {
    expect(artworkHash(catalog(), ['svg', 'build changed'])).not.toBe(base);
  });
});
