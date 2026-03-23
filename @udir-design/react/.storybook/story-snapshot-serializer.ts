import diffableHtml from 'diffable-html';
import { fromHtml } from 'hast-util-from-html';
import { isElement } from 'hast-util-is-element';
import { toHtml } from 'hast-util-to-html';
import { remove } from 'unist-util-remove';
import type { SnapshotSerializer } from 'vitest';

const CLASS_PATTERN = /\bclass="[^"]+"/g;
const TEST_ID_PATTERN = /\bdata-testid="[^"]+"/g;
const ID_PATTERN = /\bid="[^"]+"/g;
const FOR_PATTERN = /\bfor="[^"]+"/g;
const ARIA_LABELLEDBY_PATTERN = /\baria-labelledby="[^"]+"/g;
const ARIA_DESCRIBEDBY_PATTERN = /\baria-describedby="[^"]+"/g;
const DATA_CLICKDELEGATEFOR_PATTERN = /\bdata-clickdelegatefor="[^"]+"/g;

const DS_POPOVER_ARROW_PATTERN = /(--ds-popover-arrow-[xy]): [^;]+;/g;
const DSC_TOOLTIP_ARROW_PATTERN = /(--dsc-tooltip-arrow-[xy]): [^;]+;/g;
const TRANSLATE_PATTERN = /(translate): [^;]+;/g;
const HIGHCHART_ID_PATTERN = /\bid=(["'])highcharts-[^'"]+\1/g;

export default {
  serialize(val) {
    const cleaned = (val as string)
      .replace(CLASS_PATTERN, '') // remove class names
      .replace(TEST_ID_PATTERN, '') // remove data-testid="..."
      .replace(HIGHCHART_ID_PATTERN, '') // remove highcharts id
      .replace(ID_PATTERN, 'id="<removed>"')
      .replace(FOR_PATTERN, 'for="<removed>"')
      .replace(ARIA_LABELLEDBY_PATTERN, 'aria-labelledby="<removed>"')
      .replace(ARIA_DESCRIBEDBY_PATTERN, 'aria-describedby="<removed>"')
      .replace(
        DATA_CLICKDELEGATEFOR_PATTERN,
        'data-clickdelegatefor="<removed>"',
      )
      // ensure dynamic popover arrow position doesn't break tests
      .replace(DS_POPOVER_ARROW_PATTERN, '$1: <removed>;')
      // ensure dynamic tooltip arrow position doesn't break tests
      .replace(DSC_TOOLTIP_ARROW_PATTERN, '$1: <removed>;')
      // ensure dynamic translate doesn't break tests
      .replace(TRANSLATE_PATTERN, '$1: <removed>;');

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

    return diffableHtml(processed, {
      sortAttributes: (names) => names.toSorted(),
    }).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
