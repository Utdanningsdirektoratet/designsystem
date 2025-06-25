import { SnapshotSerializer } from 'vitest';
import diffableHtml from 'diffable-html';

const CLASS_PATTERN = /class="[^"]+"/g;
const TEST_ID_PATTERN = /data-testid="[^"]+"/g;
const DS_POPOVER_ARROW_PATTERN = /(--ds-popover-arrow-[xy]): [^;]+;/g;
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
      // ensure dynamic translate doesn't break tests
      .replace(TRANSLATE_PATTERN, '$1: <removed>;');
    return diffableHtml(cleaned).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
