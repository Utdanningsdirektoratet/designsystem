import type { IllustrationCatalog, IllustrationVariant } from './metadata';

/** Synthetic metadata only. These IDs do not refer to approved illustrations or files. */
function variant(
  id: string,
  properties: Record<string, string>,
  index: number,
): IllustrationVariant {
  return {
    id,
    nodeId: `900:${index}`,
    name: `Testvariant ${index}`,
    width: 120 + index,
    height: 80 + index,
    properties,
    svg: `${id}.svg`,
  };
}

export const fixtureCatalog: IllustrationCatalog = {
  schemaVersion: 2,
  state: 'imported',
  families: [
    {
      id: 'test-family',
      categoryId: 'barnehage',
      nodeId: '900:100',
      name: 'Syntetisk testfamilie',
      variants: [
        variant('test-a', { Utsnitt: 'Hel', Retning: 'Venstre' }, 1),
        variant('test-b', { Utsnitt: 'Nær', Retning: 'Høyre' }, 2),
        variant('test-c', { Utsnitt: 'Nær', Retning: 'Venstre' }, 3),
        variant('test-duplicate', { Utsnitt: 'Hel', Retning: 'Venstre' }, 4),
        variant('test-missing', { Utsnitt: 'Hel' }, 5),
        variant('test-empty', {}, 6),
      ],
    },
    {
      id: 'test-other-family',
      categoryId: 'barnehage',
      nodeId: '900:200',
      name: 'Annen syntetisk familie',
      variants: [variant('test-other', {}, 7)],
    },
  ],
};

/** Sparse combinations and fallback axes, without downloadable artwork. */
export const binaryFixtureCatalog: IllustrationCatalog = {
  ...fixtureCatalog,
  families: [
    {
      id: 'test-binary-family',
      categoryId: 'barnehage',
      nodeId: '900:300',
      name: 'Syntetiske avkrysningsbokser',
      variants: [
        variant(
          'test-binary-off',
          {
            'Geometrisk form': 'Nei',
            Bakgrunn: 'Nei',
            Format: 'Liggende',
            Fargetema: 'Lys',
            Annet: 'Ja',
          },
          8,
        ),
        variant(
          'test-binary-shape',
          {
            'Geometrisk form': 'Ja',
            Bakgrunn: 'Nei',
            Format: 'Stående',
            Fargetema: 'Mørk',
            Annet: 'Nei',
          },
          9,
        ),
        variant(
          'test-binary-background',
          {
            'Geometrisk form': 'Ja',
            Bakgrunn: 'Ja',
            Format: 'Liggende',
            Fargetema: 'Lys',
            Annet: 'Ja',
          },
          10,
        ),
      ],
    },
    {
      id: 'test-missing-binary-family',
      categoryId: 'barnehage',
      nodeId: '900:400',
      name: 'Syntetiske manglende verdier',
      variants: [
        variant(
          'test-missing-binary-ja',
          { 'Geometrisk form': 'Ja', Bakgrunn: 'Ja' },
          11,
        ),
        variant(
          'test-missing-binary-nei',
          { 'Geometrisk form': 'Nei', Bakgrunn: 'Nei' },
          12,
        ),
        variant('test-missing-binary-empty', {}, 13),
      ],
    },
    {
      id: 'test-nonbinary-family',
      categoryId: 'barnehage',
      nodeId: '900:500',
      name: 'Syntetiske ikke-binære verdier',
      variants: [
        variant(
          'test-nonbinary-ja',
          { 'Geometrisk form': 'Ja', Bakgrunn: 'Ja' },
          14,
        ),
        variant(
          'test-nonbinary-nei',
          { 'Geometrisk form': 'Nei', Bakgrunn: 'Nei' },
          15,
        ),
        variant(
          'test-nonbinary-other',
          { 'Geometrisk form': 'Kanskje', Bakgrunn: '' },
          16,
        ),
      ],
    },
  ],
};
