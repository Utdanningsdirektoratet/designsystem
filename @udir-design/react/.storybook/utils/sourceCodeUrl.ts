import type { API_LeafEntry } from 'storybook/internal/types';

export type SourceCodeLinkConfig = {
  label: string;
  path: string;
  order?: number;
};

export type SourceCodeConfig = {
  links?: SourceCodeLinkConfig[];
  /** When true, configured links replace auto-detected links. Default: false (merge). */
  overwrite?: boolean;
};

export type SourceCodeContext = {
  story: API_LeafEntry;
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

function replaceExtension(
  path: string,
  from: RegExp,
  to: string,
): string | undefined {
  return from.test(path) ? path.replace(from, to) : undefined;
}

function toComponentPath(storiesPath: string): string | undefined {
  const filename = storiesPath.split('/').pop() ?? '';
  const baseName = filename.replace(STORIES_FILE_RE, '');
  const ext = baseName.startsWith('use') ? '.ts' : '.tsx';
  return replaceExtension(storiesPath, STORIES_FILE_RE, ext);
}

function toStoriesPath(mdxPath: string): string | undefined {
  return replaceExtension(mdxPath, MDX_FILE_RE, '.stories.tsx');
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
  const { sourceCode, story } = context;
  const { importPath, type } = story;

  const configuredLinks = buildConfiguredLinks(sourceCode?.links, gitBranch);
  if (configuredLinks.length > 0 && sourceCode?.overwrite)
    return configuredLinks;

  if (!importPath && configuredLinks.length > 0) return configuredLinks;
  if (!importPath) return [];

  const links: SourceLink[] = [];
  const push = (label: string, path: string | undefined, order: number) => {
    if (path) {
      links.push({ label, href: buildGitHubUrl(path, gitBranch), order });
    }
  };

  const hasExportedComponent =
    /^(components|utilities)/i.test(story.title) &&
    !story.tags.includes('unattached-mdx');

  if (hasExportedComponent) {
    if (type === 'story') {
      push('Component source code', toComponentPath(importPath), 0);
      push('Stories source code', importPath, 1);
    } else if (type === 'docs') {
      const storiesPath = STORIES_FILE_RE.test(importPath)
        ? importPath
        : toStoriesPath(importPath);
      push(
        'Component source code',
        storiesPath ? toComponentPath(storiesPath) : undefined,
        0,
      );
      push('Stories source code', storiesPath, 1);
      push('Documentation source', importPath, 2);
    }
  } else if (type === 'story') {
    push('Stories source code', importPath, 0);
  } else if (type === 'docs') {
    push('Documentation source', importPath, 0);
  }

  // Merge configured links (order after auto-detected by default)
  const autoCount = links.length;
  for (const configured of configuredLinks) {
    links.push({
      ...configured,
      order: configured.order + autoCount,
    });
  }

  // Fallback: if no links were generated, link to the primary source file
  if (links.length === 0) {
    push('Source file', importPath, 0);
  }

  return links.sort((a, b) => a.order - b.order);
}
