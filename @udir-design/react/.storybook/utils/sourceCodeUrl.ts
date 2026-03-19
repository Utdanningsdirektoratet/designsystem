import * as R from 'ramda';
import type { API_HashEntry, API_LeafEntry } from 'storybook/internal/types';

export type SourceCodeLinkConfig = {
  label: string;
  path: string;
  order?: number;
};

type LinkFn = (importPath: string) => string;

export type SourceCodeConfig = {
  links?: SourceCodeLinkConfig[];
  autoLinks?: {
    component?: false;
    stories?: false;
    docs?: false;
  };
  /** When true, configured links replace auto-detected links. Default: false (merge). */
  overwrite?: boolean;
};

export type SourceCodeContext = {
  story: API_LeafEntry;
  siblings?: API_HashEntry[];
  sourceCode?: SourceCodeConfig;
};

export type SourceLink = {
  label: string;
  href: string;
  order: number;
};

const REPO_URL = 'https://github.com/Utdanningsdirektoratet/designsystem';
const DEFAULT_BRANCH = 'main';

const STORIES_FILE_RE = /\.stories\.(t|j)sx?$/;
const MDX_FILE_RE = /\.mdx?$/;

function replaceExtension(path: string, from: RegExp, to: string): string {
  return path.replace(from, to);
}

function toComponentPath(importPath: string): string {
  const storiesPath = importPath.endsWith('.mdx')
    ? toStoriesPath(importPath)
    : importPath;
  const filename = storiesPath.split('/').pop() ?? '';
  const baseName = filename.replace(STORIES_FILE_RE, '');
  const ext = baseName.startsWith('use') ? '.ts' : '.tsx';
  return replaceExtension(storiesPath, STORIES_FILE_RE, ext);
}

function toStoriesPath(importPath: string): string {
  return replaceExtension(importPath, MDX_FILE_RE, '.stories.tsx');
}

function buildGitHubUrl(importPath: string, gitBranch?: string): string {
  const branch = gitBranch || DEFAULT_BRANCH;
  const normalized = importPath.replace(/^\./, '');
  const path = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${REPO_URL}/blob/${branch}/@udir-design/react${path}`;
}

function buildConfiguredLinks(
  links: SourceCodeLinkConfig[] | undefined,
  gitBranch?: string,
): SourceLink[] {
  if (!links?.length) return [];

  return links
    .map((link, index) => ({
      label: link.label,
      href: buildGitHubUrl(link.path, gitBranch),
      order: link.order ?? index,
    }))
    .sort((a, b) => a.order - b.order);
}

export function getSourceLinks(
  context: SourceCodeContext,
  gitBranch?: string,
): SourceLink[] {
  const { sourceCode, story, siblings } = context;
  const { importPath, type } = story;
  const { autoLinks: configuredAutoLinks = {} } = sourceCode ?? {};

  const hasExportedComponent =
    /^(components|utilities)/i.test(story.title) &&
    !story.tags.includes('unattached-mdx');

  const defaultAutoLinks: Record<
    keyof typeof configuredAutoLinks,
    false | LinkFn
  > = {
    component: hasExportedComponent && toComponentPath,
    docs: type === 'docs' && R.identity,
    stories:
      type === 'story' ? R.identity : hasExportedComponent && toStoriesPath,
  };

  const autoLinks = { ...defaultAutoLinks, ...configuredAutoLinks };

  const configuredLinks = buildConfiguredLinks(sourceCode?.links, gitBranch);
  if (configuredLinks.length > 0 && sourceCode?.overwrite)
    return configuredLinks;

  const builtinLinkPaths = {
    component: autoLinks.component && autoLinks.component(importPath),
    stories: autoLinks.stories && autoLinks.stories(importPath),
    docs: autoLinks.docs && autoLinks.docs(importPath),
  };
  type BuiltInLink = keyof typeof builtinLinkPaths;
  const builtinLinkLabels: Record<BuiltInLink, string> = {
    component: 'Component source code',
    stories: 'Stories source code',
    docs: 'Documentation source',
  };

  const links = R.toPairs(builtinLinkPaths)
    .filter((pair): pair is [BuiltInLink, string] => pair[1] !== false)
    .map(
      ([key, path], index): SourceLink => ({
        label: builtinLinkLabels[key],
        href: buildGitHubUrl(path, gitBranch),
        order: index,
      }),
    );

  // Create links to sibling components from a documentation page, when docs are
  // shared between multiple components (e.g. Typography and Logo)
  const siblingLinks =
    siblings?.flatMap((x, index): SourceLink[] =>
      x.type === 'component'
        ? [
            {
              label: `${x.name} component source`,
              href: buildGitHubUrl(
                toComponentPath(x.importPath ?? ''),
                gitBranch,
              ),
              order: links.length + index,
            },
            {
              label: `${x.name} stories source`,
              href: buildGitHubUrl(
                toStoriesPath(x.importPath ?? ''),
                gitBranch,
              ),
              order: links.length + index,
            },
          ]
        : [],
    ) ?? [];

  // Merge configured links (order after auto-detected by default)
  const autoCount = links.length + siblingLinks.length;
  const confLinks = configuredLinks.map((link) => ({
    ...link,
    order: link.order + autoCount,
  }));
  return [...links, ...siblingLinks, ...confLinks].sort(
    (a, b) => a.order - b.order,
  );
}
