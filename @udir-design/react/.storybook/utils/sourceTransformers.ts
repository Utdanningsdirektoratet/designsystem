import type { DocsTypes } from '@storybook/addon-docs';
import camelcase from 'camelcase';
import type { ParserOptions, Plugin } from 'prettier';
import * as EstreePlugin from 'prettier/plugins/estree';
import * as HtmlPlugin from 'prettier/plugins/html';
import * as TypescriptPlugin from 'prettier/plugins/typescript';
import { format as prettierFormat } from 'prettier/standalone';
import type { StoryContext } from 'storybook/internal/types';
import type { RequiredDeep } from 'type-fest';
import type { Parameters } from '.storybook/types';

type SourceTransformer =
  RequiredDeep<DocsTypes>['parameters']['docs']['source']['transform'];

/**
 * Use this as parameters.docs.source.transform as needed to better format React code.
 * Not enabled by default to avoid unnecessary performance hit.
 */
export const formatReactSource: SourceTransformer = async (
  src,
  ctx: StoryContext,
) => {
  const storyNamePascal = camelcase(ctx.name, { pascalCase: true });
  const srcToFormat = await extractRender(src, storyNamePascal);
  return formatWithPrettier('typescript', srcToFormat);
};

/**
 * Helper to format code with prettier in Storybook docs
 */
async function formatWithPrettier(
  format: 'html' | 'typescript',
  unformatted: string,
) {
  const parserPlugins = {
    html: [HtmlPlugin] as Plugin[],
    typescript: [EstreePlugin, TypescriptPlugin] as Plugin[],
  };
  return prettierFormat(unformatted, {
    parser: format,
    plugins: parserPlugins[format],
  });
}

/**
 * Parse the story source with Prettier's TypeScript parser and extract the
 * `render` property, transforming it into a named function or const.
 * Falls back to the original source if no render property is found.
 */
async function extractRender(src: string, name: string): Promise<string> {
  const { parse, locStart, locEnd } = TypescriptPlugin.parsers.typescript;
  // Wrap in parens so the parser treats `{...}` as an object expression, not a block
  const wrapped = `(${src})`;

  let ast: unknown;
  try {
    ast = await parse(wrapped, {
      plugins: [EstreePlugin, TypescriptPlugin],
      parser: 'typescript',
    } as unknown as ParserOptions);
  } catch {
    return src;
  }

  const renderNode = findRenderProperty(ast);
  if (!renderNode) return src;

  if (renderNode.method) {
    // render(args) { ... } → function Name(args) { ... }
    const extracted = wrapped.slice(locStart(renderNode), locEnd(renderNode));
    return extracted.replace(/^render/, `function ${name}`);
  }

  // render: (args) => ... → const Name = (args) => ...
  const valueSource = wrapped.slice(
    locStart(renderNode.value),
    locEnd(renderNode.value),
  );
  return `const ${name} = ${valueSource}`;
}

interface RenderNode {
  type: string;
  method?: boolean;
  key: { name?: string; value?: string };
  value: Record<string, unknown>;
}

/** Walk the AST to find an object property named "render" */
function findRenderProperty(node: unknown): RenderNode | null {
  if (!node || typeof node !== 'object') return null;

  const n = node as Record<string, unknown>;
  if (n.type === 'Property') {
    const key = n.key as Record<string, unknown> | undefined;
    if (key?.name === 'render' || key?.value === 'render') {
      return n as unknown as RenderNode;
    }
  }

  for (const key of Object.keys(n)) {
    if (key === 'loc') continue;
    const child = n[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        const result = findRenderProperty(item);
        if (result) return result;
      }
    } else if (child && typeof child === 'object') {
      const result = findRenderProperty(child);
      if (result) return result;
    }
  }

  return null;
}

/** Set parameters.docs to this for better (but static) code examples when using hooks etc */
export const advancedCodeDocs = {
  source: { type: 'code', transform: formatReactSource },
} satisfies Parameters['docs'];
