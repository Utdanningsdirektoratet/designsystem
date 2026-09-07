import diffableHtml from 'diffable-html';
import { fromHtml } from 'hast-util-from-html';
import { isElement } from 'hast-util-is-element';
import { toHtml } from 'hast-util-to-html';
import { remove } from 'unist-util-remove';
import type { SnapshotSerializer } from 'vitest';

const CLASS_PATTERN = /\bclass="[^"]+"/g;
const TEST_ID_PATTERN = /\bdata-testid="[^"]+"/g;
/*
 * Generated ids are assigned in render order from counters shared across the whole
 * test run, so adding or removing a story shifts every later value and breaks
 * baselines for components that did not change. Only the generated part of a value
 * is replaced, while author-set prefixes and suffixes survive.
 *
 * Matching on the value rather than the attribute name covers every attribute that
 * references an id (`id`, `for`, `list`, `popovertarget`, `aria-controls`,
 * `commandfor`, `name` and the aria-* references) without having to enumerate them,
 * and leaves author-set values like `id="language-picker"` in place.
 *
 * Each shape below is pinned by an example in story-snapshot-serializer.spec.ts, so
 * breaking one later fails there rather than churning baselines silently. Note that a
 * generator whose shape is not listed at all still churns unnoticed — the spec cannot
 * fail for a shape it was never told about.
 */
const DS_COUNTER = /:ds:[0-9a-z]+/; // digdir, e.g. `:ds:15`
const DS_TAB_COUNTER = /:ds-[a-z]+[0-9]+/; // digdir tabs, e.g. `:ds-tab2`
const U_ELEMENTS_COUNTER = /:u-[a-z]+[0-9]+/; // u-elements, e.g. `:u-datalist3`
const REACT_19_USE_ID = /_r_[0-9a-z]+_/; // e.g. `_r_1a_`
const REACT_18_USE_ID = /:r[0-9a-z]+:/; // e.g. `:r1a:`, a supported peer we do not snapshot under

export const GENERATED_ID_PATTERN = new RegExp(
  [
    DS_COUNTER,
    DS_TAB_COUNTER,
    U_ELEMENTS_COUNTER,
    REACT_19_USE_ID,
    REACT_18_USE_ID,
  ]
    .map(({ source }) => source)
    .join('|'),
  'g',
);
const ATTRIBUTE_VALUE_PATTERN = /="[^"]*"/g;

const STYLE_PATTERN = /\bstyle="[^"]+"/g;
const HIGHCHART_ID_PATTERN = /\bid=(["'])highcharts-[^'"]+\1/g;

export default {
  serialize(val) {
    const cleaned = (val as string)
      .replace(CLASS_PATTERN, '') // remove class names
      .replace(TEST_ID_PATTERN, '') // remove data-testid="..."
      .replace(HIGHCHART_ID_PATTERN, '') // remove highcharts id
      // scoped to quoted attribute values, so element text is left alone
      .replace(ATTRIBUTE_VALUE_PATTERN, (value) =>
        value.replace(GENERATED_ID_PATTERN, '<generated>'),
      )
      // ensure dynamic styling (floating arrow position, field sizing etc) doesn't break tests
      .replace(STYLE_PATTERN, 'style="<removed>"');

    const tree = fromHtml(cleaned, { fragment: true });
    // Remove Highcharts nodes, since they are subtly different on each render
    remove(
      tree,
      (node) =>
        isElement(node) && node.properties.dataHighchartsChart !== undefined,
    );
    const processed = toHtml(tree, {
      characterReferences: { useNamedReferences: true },
    });

    return diffableHtml(processed).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
