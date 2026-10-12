import { describe, expect, it } from 'vitest';
import { getCanvasSourceHref, getCanvasStoryHref } from './canvasActions';

const fileName = './src/components/button/Button.stories.tsx';
const repo = 'https://github.com/Utdanningsdirektoratet/designsystem/blob';
const fileHref = `${repo}/main/@udir-design/react/src/components/button/Button.stories.tsx`;

describe('Canvas example source', () => {
  it('highlights a definition range or a single line', () => {
    expect(
      getCanvasSourceHref(fileName, 'main', { startLine: 20, endLine: 35 }),
    ).toBe(`${fileHref}#L20-L35`);
    expect(
      getCanvasSourceHref(fileName, 'main', { startLine: 20, endLine: 20 }),
    ).toBe(`${fileHref}#L20`);
  });

  it.each([
    { startLine: 0, endLine: 4 },
    { startLine: 4, endLine: 2 },
    { startLine: 1.5, endLine: 3 },
    { startLine: 1, endLine: NaN },
  ])('falls back to the file for an invalid range: %j', (location) => {
    expect(getCanvasSourceHref(fileName, 'main', location)).toBe(fileHref);
  });

  it('uses the current branch and defaults to main', () => {
    expect(getCanvasSourceHref(fileName, 'feature/canvas')).toBe(
      `${repo}/feature/canvas/@udir-design/react/src/components/button/Button.stories.tsx`,
    );
    expect(getCanvasSourceHref(fileName)).toBe(fileHref);
  });

  it.each([
    'src/components/link/Link.stories.tsx',
    'src/hooks/useDebounce.stories.tsx',
    'src/patterns/Example.stories.tsx',
  ])('links directly to the supplied example: %s', (path) => {
    expect(getCanvasSourceHref(`./${path}`)).toBe(
      `${repo}/main/@udir-design/react/${path}`,
    );
  });
});

describe('Canvas standalone preview', () => {
  it('uses a relative URL retaining deployment subpaths', () => {
    const href = getCanvasStoryHref('components-button--loading');
    expect(href).toBe('iframe.html?id=components-button--loading');
    expect(
      new URL(href, 'https://example.org/designsystem/iframe.html').href,
    ).toBe(
      'https://example.org/designsystem/iframe.html?id=components-button--loading',
    );
  });

  it('preserves custom preview URLs and queries, replacing the story id', () => {
    expect(
      getCanvasStoryHref(
        'components-link--preview',
        'https://preview.example/subpath/iframe.html?token=example&id=old',
      ),
    ).toBe(
      'https://preview.example/subpath/iframe.html?token=example&id=components-link--preview',
    );
  });

  it('encodes ids and treats an empty preview URL as the default', () => {
    expect(getCanvasStoryHref('story & example', '')).toBe(
      'iframe.html?id=story+%26+example',
    );
  });
});
