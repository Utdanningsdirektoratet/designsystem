import type { Heading, Root, RootContent } from 'mdast';

declare module 'mdast' {
  export interface HeadingData {
    id: string;
  }
}

// ─── Heading ID Assignment ──────────────────────────────────────────────────

/** Recursively extracts plain text from an mdast node. */
function mdastNodeToText(node: {
  type: string;
  value?: string;
  children?: unknown[];
}): string {
  if (node.type === 'text') return node.value ?? '';
  if (node.children)
    return (node.children as (typeof node)[]).map(mdastNodeToText).join('');
  return '';
}

/**
 * GitHub-style heading slugification.
 * Preserves Unicode letters (e.g. Norwegian æ, ø, å).
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Remark plugin that assigns `data.id` to headings by slugifying their text.
 * This is a lightweight replacement for `remark-heading-id` that covers the
 * `{ defaults: true }` behaviour without needing the patched package.
 *
 * Used by both the `<IncludeMarkdown>` component and the Pagefind indexer
 * so that `remarkGetSection` can match headings by their slugified ID.
 */
export function remarkSlugHeadings() {
  return function (tree: Root): void {
    for (const node of tree.children) {
      if (node.type === 'heading') {
        const data = (node.data ?? {}) as Record<string, unknown>;
        if (!data.id) {
          data.id = slugify(mdastNodeToText(node));
        }
        node.data = data as unknown as typeof node.data;
      }
    }
  };
}

// ─── Section Extraction ─────────────────────────────────────────────────────

export interface RemarkGetSectionOptions {
  sectionId?: string;
}

export function remarkGetSection({ sectionId }: RemarkGetSectionOptions) {
  return function (tree: Root): void {
    if (sectionId === undefined) {
      return;
    }

    const isWantedHeading = (x: RootContent): x is Heading =>
      x.type === 'heading' && x.data?.id === sectionId;

    const startIndex = tree.children.findIndex(isWantedHeading);
    if (startIndex === -1) {
      return;
    }

    const wantedHeading = tree.children[startIndex] as Heading;

    let endIndex = tree.children.length;
    for (let i = startIndex + 1; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (
        node.type === 'heading' &&
        node.depth <= wantedHeading.depth &&
        node.data?.id !== sectionId
      ) {
        endIndex = i;
        break;
      }
    }

    tree.children = tree.children.slice(startIndex, endIndex);
  };
}
