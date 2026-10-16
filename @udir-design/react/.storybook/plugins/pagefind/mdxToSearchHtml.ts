import * as fs from 'node:fs';
import * as path from 'node:path';
import { toHtml } from 'hast-util-to-html';
import type {
  PhrasingContentMap,
  Root,
  RootContent,
  RootContentMap,
} from 'mdast';
import { toHast } from 'mdast-util-to-hast';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { remove } from 'unist-util-remove';
import { SKIP, visit } from 'unist-util-visit';
import {
  remarkGetSection,
  remarkSlugHeadings,
} from '../../utils/remarkGetSection.js';

type MdxJsxElement =
  | RootContentMap['mdxJsxFlowElement']
  | PhrasingContentMap['mdxJsxTextElement'];

type MdxJsxAttribute = Extract<
  MdxJsxElement['attributes'][number],
  { type: 'mdxJsxAttribute' }
>;

/**
 * JSX components that wrap prose, such as callouts. Their children are indexed;
 * all other JSX elements, such as examples and story blocks, are left out.
 */
const PROSE_WRAPPER_COMPONENTS: Record<string, true> = {
  SimpleAlert: true,
  Alert: true,
  Unstyled: true,
};

export type SearchHtml = {
  html: string;
  /** Text of the first `<h1>`, which Pagefind uses as the result title. */
  title: string | undefined;
};

/**
 * Converts an MDX docs page to the HTML that Pagefind indexes: the prose only,
 * with `<IncludeMarkdown>` resolved, and `id`s on `<h2>`–`<h6>` so Pagefind can
 * link to sections of the page.
 */
export function mdxToSearchHtml(mdx: string, mdxPath: string): SearchHtml {
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .parse(mdx);

  const rawImports = collectRawImports(tree, path.dirname(mdxPath));
  remove(tree, ['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression']);
  replaceJsxElements(tree, rawImports);

  const hast = toHast(tree);
  let title: string | undefined;
  visit(hast, 'element', (node) => {
    if (node.tagName === 'h1') {
      // Pagefind uses the first h1 as the title, so it gets no section id.
      title ??= nodeText(node);
    } else if (/^h[2-6]$/.test(node.tagName) && !node.properties.id) {
      node.properties.id = slugify(nodeText(node));
    }
  });

  return { html: toHtml(hast), title };
}

/**
 * Maps the names bound by `import NAME from './file.md?raw'` to absolute file
 * paths, so `<IncludeMarkdown markdown={NAME} />` can be resolved.
 */
function collectRawImports(tree: Root, mdxDir: string): Map<string, string> {
  const rawImports = new Map<string, string>();
  visit(tree, 'mdxjsEsm', (node) => {
    for (const statement of node.data?.estree?.body ?? []) {
      if (statement.type !== 'ImportDeclaration') continue;
      const source = String(statement.source.value);
      if (!source.endsWith('?raw')) continue;
      for (const specifier of statement.specifiers) {
        if (specifier.type === 'ImportDefaultSpecifier') {
          rawImports.set(
            specifier.local.name,
            path.resolve(mdxDir, source.slice(0, -'?raw'.length)),
          );
        }
      }
    }
  });
  return rawImports;
}

/** Replaces every JSX element with the markdown content it contributes. */
function replaceJsxElements(tree: Root, rawImports: Map<string, string>): void {
  visit(tree, (node, index, parent) => {
    if (
      (node.type !== 'mdxJsxFlowElement' &&
        node.type !== 'mdxJsxTextElement') ||
      index === undefined ||
      !parent
    ) {
      return;
    }
    // The replacement may put block content in a phrasing parent. That doesn't
    // matter for search, but the mdast types don't allow it.
    (parent.children as RootContent[]).splice(
      index,
      1,
      ...searchableContent(node, rawImports),
    );
    // Continue at the same index, so JSX nested in the replacement is
    // processed too.
    return [SKIP, index];
  });
}

function searchableContent(
  node: MdxJsxElement,
  rawImports: Map<string, string>,
): RootContent[] {
  if (node.name === 'IncludeMarkdown') {
    return includedMarkdown(node, rawImports);
  }
  if (node.name && Object.hasOwn(PROSE_WRAPPER_COMPONENTS, node.name)) {
    const heading = findAttribute(node, 'heading')?.value;
    if (typeof heading !== 'string') return node.children;
    return [
      {
        type: 'paragraph',
        children: [
          { type: 'strong', children: [{ type: 'text', value: heading }] },
        ],
      },
      ...node.children,
    ];
  }
  return [];
}

/**
 * Resolves `<IncludeMarkdown markdown={NAME} sectionId="…" />` the same way the
 * component does, see `IncludeMarkdown.tsx`.
 */
function includedMarkdown(
  node: MdxJsxElement,
  rawImports: Map<string, string>,
): RootContent[] {
  const markdownValue = findAttribute(node, 'markdown')?.value;
  const filePath =
    typeof markdownValue === 'object' && markdownValue !== null
      ? rawImports.get(markdownValue.value)
      : undefined;
  const sectionId = findAttribute(node, 'sectionId')?.value;
  if (!filePath) return [];

  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkSlugHeadings)
      .use(remarkGetSection, {
        sectionId: typeof sectionId === 'string' ? sectionId : undefined,
      });
    const markdownTree = processor.parse(fs.readFileSync(filePath, 'utf-8'));
    processor.runSync(markdownTree);
    return markdownTree.children;
  } catch {
    return [];
  }
}

function findAttribute(
  node: MdxJsxElement,
  name: string,
): MdxJsxAttribute | undefined {
  return node.attributes.find(
    (attribute): attribute is MdxJsxAttribute =>
      attribute.type === 'mdxJsxAttribute' && attribute.name === name,
  );
}

/** Concatenates the text in a syntax tree node, like `Node.textContent`. */
function nodeText(node: { value?: unknown; children?: unknown[] }): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? [])
    .map((child) => nodeText(child as Parameters<typeof nodeText>[0]))
    .join('');
}

/**
 * GitHub-style heading slugification matching Storybook's anchor scheme.
 * Preserves Unicode letters (Norwegian å, ø, æ, etc.).
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
