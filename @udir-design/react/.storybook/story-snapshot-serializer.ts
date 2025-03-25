import { SnapshotSerializer } from 'vitest';
import diffableHtml from 'diffable-html';

const CLASS_PATTERN = /class="[^"]+"/g;
const TRANSLATE_PATTERN = /translate: [^;]*;/;

export default {
  serialize(val) {
    const cleaned = (val as string)
      .replace(CLASS_PATTERN, '') // remove class names
      .replace(TRANSLATE_PATTERN, 'translate: <removed>;'); // ensure dynamic translate don't break tests
    return diffableHtml(cleaned).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
