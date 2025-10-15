import diffableHtml from 'diffable-html';
import { fromHtml } from 'hast-util-from-html';
import { isElement } from 'hast-util-is-element';
import { toHtml } from 'hast-util-to-html';
import { remove } from 'unist-util-remove';
import { SnapshotSerializer } from 'vitest';

const CLASS_PATTERN = /class="[^"]+"/g;
const TEST_ID_PATTERN = /data-testid="[^"]+"/g;
const DS_POPOVER_ARROW_PATTERN = /(--ds-popover-arrow-[xy]): [^;]+;/g;
const DSC_TOOLTIP_ARROW_PATTERN = /(--dsc-tooltip-arrow-[xy]): [^;]+;/g;
const TRANSLATE_PATTERN = /(translate): [^;]+;/g;
const HIGHCHART_ID_PATTERN = /\s*id=(["'])highcharts-[^'"]+\1/g;

export default {
  serialize(val) {
    const cleaned = (val as string)
      .replace(CLASS_PATTERN, '') // remove class names
      .replace(TEST_ID_PATTERN, '') // remove data-testid="..."
      .replace(HIGHCHART_ID_PATTERN, '') // remove highcharts id
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

    return diffableHtml(processed).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
