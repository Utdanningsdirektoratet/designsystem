import { SnapshotSerializer } from 'vitest';
import diffableHtml from 'diffable-html';

const CLASS_PATTERN = /class="[^"]+"/g;

export default {
  serialize(val) {
    const withoutClass = val.replace(CLASS_PATTERN, '');
    return diffableHtml(withoutClass).trim();
  },
  /**
   * Should this serializer be used?
   */
  test(val) {
    return val && typeof val === 'string';
  },
} satisfies SnapshotSerializer;
