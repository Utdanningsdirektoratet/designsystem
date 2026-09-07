import { describe, expect, it } from 'vitest';
import serializer, { GENERATED_ID_PATTERN } from './story-snapshot-serializer';

const serialize = (html: string) => serializer.serialize(html);

describe('GENERATED_ID_PATTERN', () => {
  /*
   * Each test case is a real shape taken from the snapshots
   */
  it.each([
    [':ds:5', 'digdir counter'],
    [':ds-tab2', 'digdir tab counter'],
    [':u-datalist3', 'u-elements datalist counter'],
    [':u-option17', 'u-elements option counter'],
    ['_r_1a_', 'React 19 useId'],
    [':r1a:', 'React 18 useId'],
  ])('recognises %s (%s)', (value) => {
    expect(value.replace(GENERATED_ID_PATTERN, '<generated>')).toBe(
      '<generated>',
    );
  });

  it.each(['language-picker', 'ageGroup', 'postal-code', 'Kornaks_svg__a'])(
    'leaves the author-set value %s alone',
    (value) => {
      expect(value.replace(GENERATED_ID_PATTERN, '<generated>')).toBe(value);
    },
  );
});

describe('serialize', () => {
  it('replaces generated ids whatever attribute carries them', () => {
    const html =
      '<input id="_r_3_" list=":u-datalist1" popovertarget=":u-datalist1" aria-controls=":u-datalist1" name="_r_3_">';

    expect(serialize(html)).toMatchInlineSnapshot(`
      "<input
        id="<generated>"
        list="<generated>"
        popovertarget="<generated>"
        aria-controls="<generated>"
        name="<generated>"
      >"
    `);
  });

  it('keeps the author-set part of a composite value', () => {
    const html =
      '<button id="title-_r_j_" aria-controls="_r_i_-tests" name="togglegroup-name-_r_f_"></button>';

    expect(serialize(html)).toMatchInlineSnapshot(`
      "<button
        id="title-<generated>"
        aria-controls="<generated>-tests"
        name="togglegroup-name-<generated>"
      >
      </button>"
    `);
  });

  it('replaces every id in a space-separated reference list', () => {
    const html = '<div aria-labelledby=":ds:15 :ds:31"></div>';

    expect(serialize(html)).toMatchInlineSnapshot(`
      "<div aria-labelledby="<generated> <generated>">
      </div>"
    `);
  });

  it('leaves author-set ids in place', () => {
    const html = '<a id="language-picker" href="#sidetittel">Til toppen</a>';

    expect(serialize(html)).toMatchInlineSnapshot(`
      "<a
        id="language-picker"
        href="#sidetittel"
      >
        Til toppen
      </a>"
    `);
  });

  it('does not touch text that looks like a generated id', () => {
    const html = '<code>useId() gir _r_3_ i React 19</code>';

    expect(serialize(html)).toMatchInlineSnapshot(`
      "<code>
        useId() gir _r_3_ i React 19
      </code>"
    `);
  });
});
