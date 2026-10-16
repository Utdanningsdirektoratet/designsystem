import { slug } from 'github-slugger';
import type { Heading, Root, RootContent } from 'mdast';

declare module 'mdast' {
  export interface HeadingData {
    id: string;
  }
}

// ─── Heading IDs ─────────────────────────────────────────────────────────────

/** Concatenates the text in an mdast or hast node, like `Node.textContent`. */
export function nodeText(node: {
  value?: unknown;
  children?: unknown[];
}): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? [])
    .map((child) => nodeText(child as Parameters<typeof nodeText>[0]))
    .join('');
}

/**
 * Slugifies heading text with GitHub's rules, which Storybook also uses for
 * MDX headings (through `rehype-slug`). Passed to markdown-to-jsx as the
 * `slugify` option in `<IncludeMarkdown>`, whose default would transliterate
 * letters such as `ø`. Don't pass `slug` directly: markdown-to-jsx calls it
 * with its default slugifier as the second argument, which `slug` reads as
 * `maintainCase`.
 */
export function slugifyHeading(text: string): string {
  return slug(text);
}

/**
 * Remark plugin that sets the `id` that `<IncludeMarkdown>` renders on each
 * top-level heading, both as `data.id` for `remarkGetSection` and as an HTML
 * attribute for `mdast-util-to-hast`.
 */
export function remarkSlugHeadings() {
  return function (tree: Root): void {
    for (const node of tree.children) {
      if (node.type !== 'heading') continue;
      const id = slugifyHeading(nodeText(node));
      node.data = {
        ...node.data,
        id,
        hProperties: { ...node.data?.hProperties, id },
      };
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
      // Otherwise a typo would silently include the whole document.
      throw new Error(`Found no heading with the id "${sectionId}"`);
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
