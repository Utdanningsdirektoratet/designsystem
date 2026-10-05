import { describe, expect, it } from 'vitest';
import { binaryFixtureCatalog, fixtureCatalog } from './gallery.fixtures';
import {
  familyDisplayName,
  illustrationAssetUrl,
  isBinaryProperty,
  matchesFamilySearch,
  needsVariantChooser,
  normalizeFamilySearch,
  propertyOptions,
  selectProperty,
  sortFamilies,
} from './gallery.utils';
import { metadata } from './metadata';

const family = fixtureCatalog.families[0];
const [first, second, third] = family.variants;

describe('illustration gallery browsing', () => {
  it.each([
    ['aktivitet-3a', 'Aktivitet 3a'],
    ['miljø-1', 'Miljø 1'],
    ['lek-4b', 'Lek 4b'],
    ['  flere--ord  med SVG ', 'Flere ord med SVG'],
    ['', ''],
  ])(
    'formats %s for display without changing the remaining case',
    (name, expected) => {
      expect(familyDisplayName(name)).toBe(expected);
    },
  );

  it('normalizes Norwegian case, hyphens and whitespace', () => {
    expect(normalizeFamilySearch('  MILJØ- 1\t')).toBe('miljø1');
    for (const query of [
      'Aktivitet 1',
      'AKTIVITET-1',
      'aktivitet1',
      ' aktivitet  1 ',
    ]) {
      expect(matchesFamilySearch('aktivitet-1', query)).toBe(true);
    }
    expect(matchesFamilySearch('miljø-1', 'MILJØ 1')).toBe(true);
    expect(matchesFamilySearch('aktivitet-1', 'lek')).toBe(false);
    expect(matchesFamilySearch('aktivitet-1', '  ')).toBe(true);
  });

  it('sorts Norwegian names and numeric suffixes without mutating metadata', () => {
    const names = [
      'øvelse-1',
      'aktivitet-10',
      'aktivitet-4',
      'aktivitet-3b',
      'aktivitet-2',
      'aktivitet-3a',
      'aktivitet-1',
      'ærlig-1',
      'zebra-1',
      'åpen-1',
    ];
    const families = names.map((name, index) => ({
      ...family,
      id: `sort-${index}`,
      name,
    }));
    expect(sortFamilies(families).map(({ name }) => name)).toEqual([
      'aktivitet-1',
      'aktivitet-2',
      'aktivitet-3a',
      'aktivitet-3b',
      'aktivitet-4',
      'aktivitet-10',
      'zebra-1',
      'ærlig-1',
      'øvelse-1',
      'åpen-1',
    ]);
    expect(families.map(({ name }) => name)).toEqual(names);
    expect(sortFamilies([])).toEqual([]);
  });
});

describe('illustration gallery binary controls', () => {
  const binaryFamily = binaryFixtureCatalog.families[0];

  it('recognizes only complete named Ja/Nei axes, regardless of value order', () => {
    expect(
      isBinaryProperty(binaryFamily, 'Geometrisk form', ['Nei', 'Ja']),
    ).toBe(true);
    expect(isBinaryProperty(binaryFamily, 'Bakgrunn', ['Ja', 'Nei'])).toBe(
      true,
    );
    expect(isBinaryProperty(binaryFamily, 'Annet', ['Ja', 'Nei'])).toBe(false);
  });

  it.each([['Ja'], ['Ja', 'nei'], ['Ja', 'Nei', 'Kanskje'], ['Ja', '']])(
    'keeps constant or non-exact binary values %j as selectors',
    (...values) => {
      expect(isBinaryProperty(binaryFamily, 'Bakgrunn', values)).toBe(false);
    },
  );

  it('keeps selectors when any variant has a missing property', () => {
    const missingFamily = binaryFixtureCatalog.families[1];
    for (const { key, values } of propertyOptions(missingFamily)) {
      expect(isBinaryProperty(missingFamily, key, values)).toBe(false);
    }
  });

  it('uses real sparse variants and catalog-order ties for binary changes', () => {
    const [off, shape, background] = binaryFamily.variants;
    expect(selectProperty(binaryFamily, off, 'Bakgrunn', 'Ja')).toBe(
      background,
    );
    expect(
      selectProperty(binaryFamily, background, 'Geometrisk form', 'Nei'),
    ).toBe(off);
    expect(selectProperty(binaryFamily, shape, 'Bakgrunn', 'Ja')).toBe(
      background,
    );
    expect(selectProperty(binaryFamily, background, 'Bakgrunn', 'Nei')).toBe(
      off,
    );
  });
});

describe('illustration gallery selection', () => {
  it('discovers property keys and unique values from metadata', () => {
    expect(propertyOptions(family)).toEqual([
      { key: 'Utsnitt', values: ['Hel', 'Nær'] },
      { key: 'Retning', values: ['Venstre', 'Høyre'] },
    ]);
  });

  it('preserves other properties when a valid combination exists', () => {
    expect(selectProperty(family, first, 'Utsnitt', 'Nær')).toBe(third);
  });

  it('falls back to a real variant when the requested combination does not exist', () => {
    expect(selectProperty(family, first, 'Retning', 'Høyre')).toBe(second);
  });

  it('breaks equal-score ties using catalog order and rejects unknown values', () => {
    expect(selectProperty(family, second, 'Utsnitt', 'Hel')).toBe(first);
    expect(selectProperty(family, first, 'Utsnitt', 'Ukjent')).toBe(first);
  });

  it('requires a chooser for duplicate, missing and absent properties', () => {
    expect(
      needsVariantChooser({ ...family, variants: [first, family.variants[3]] }),
    ).toBe(true);
    expect(
      needsVariantChooser({ ...family, variants: [first, family.variants[4]] }),
    ).toBe(true);
    expect(
      needsVariantChooser({
        ...family,
        variants: [family.variants[5], fixtureCatalog.families[1].variants[0]],
      }),
    ).toBe(true);
    expect(
      needsVariantChooser({ ...family, variants: [first, second, third] }),
    ).toBe(false);
  });

  it('keeps every unique complete combination reachable through its properties', () => {
    const complete = { ...family, variants: [first, second, third] };
    for (const target of complete.variants) {
      let selected = first;
      for (const [key, value] of Object.entries(target.properties)) {
        selected = selectProperty(complete, selected, key, value);
      }
      expect(selected).toBe(target);
    }
  });

  it('keeps every production variant reachable using the visible selectors', () => {
    expect(metadata.state).toBe('imported');
    expect(metadata.families.length).toBeGreaterThan(0);
    for (const catalogFamily of metadata.families) {
      expect(catalogFamily.variants.length).toBeGreaterThan(0);
      const options = propertyOptions(catalogFamily).filter(
        ({ values }) => values.length > 1,
      );
      // A fallback chooser exposes every variant directly; otherwise traverse
      // the actual selection graph rather than assuming a Cartesian product.
      const reachable = new Set<string>();
      const queue = needsVariantChooser(catalogFamily)
        ? [...catalogFamily.variants]
        : [catalogFamily.variants[0]];
      for (let index = 0; index < queue.length; index++) {
        const current = queue[index];
        if (reachable.has(current.id)) continue;
        reachable.add(current.id);
        for (const { key, values } of options) {
          for (const value of values) {
            const next = selectProperty(catalogFamily, current, key, value);
            expect(next.properties[key]).toBe(value);
            if (!reachable.has(next.id)) queue.push(next);
          }
        }
      }
      expect(reachable, catalogFamily.name).toEqual(
        new Set(catalogFamily.variants.map(({ id }) => id)),
      );
    }
  });
});

describe('illustration asset URLs', () => {
  it.each(['/', '/illustrasjoner/', '/illustrasjoner'])(
    'prefixes assets with the base path %s',
    (base) => {
      const prefix = base.endsWith('/') ? base : `${base}/`;
      expect(illustrationAssetUrl(first, 'svg', base)).toBe(
        `${prefix}illustrations-assets/svg/test-a.svg`,
      );
      expect(illustrationAssetUrl(first, 'png', base)).toBe(
        `${prefix}illustrations-assets/png/test-a.png`,
      );
    },
  );
});
