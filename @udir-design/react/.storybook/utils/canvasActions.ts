import { buildGitHubUrl } from './sourceCodeUrl';

export function getCanvasSourceHref(
  fileName: string,
  gitBranch?: string,
  location?: { startLine: number; endLine: number },
): string {
  const href = buildGitHubUrl(fileName, gitBranch);
  if (
    !location ||
    !Number.isInteger(location.startLine) ||
    location.startLine < 1 ||
    !Number.isInteger(location.endLine) ||
    location.endLine < location.startLine
  )
    return href;
  return `${href}#L${location.startLine}${location.endLine === location.startLine ? '' : `-L${location.endLine}`}`;
}

export function getCanvasStoryHref(
  storyId: string,
  previewUrl?: string,
): string {
  // Match Storybook's Canvas toolbar getStoryHref (not publicly exported).
  // Relative URLs retain the deployment subpath; custom preview queries survive.
  const [url, query] = (previewUrl || 'iframe.html').split('?');
  const params = new URLSearchParams(query || '');
  params.set('id', storyId);
  return `${url}?${params.toString()}`;
}
