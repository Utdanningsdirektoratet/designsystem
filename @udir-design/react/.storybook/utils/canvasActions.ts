import { buildGitHubUrl } from './sourceCodeUrl';

export function getCanvasSourceHref(
  fileName: string,
  gitBranch?: string,
): string {
  return buildGitHubUrl(fileName, gitBranch);
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
