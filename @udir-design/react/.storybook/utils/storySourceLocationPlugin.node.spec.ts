import { readFileSync } from 'node:fs';
import path from 'node:path';
import { isStory } from 'storybook/internal/csf';
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  addStorySourceLocations,
  storySourceLocationPlugin,
} from './storySourceLocationPlugin';

const fixtures = path.join(import.meta.dirname, 'fixtures');
const read = (name: string) => readFileSync(path.join(fixtures, name), 'utf8');

// Fixtures are loaded through the real plugin, so stories are executed exactly
// as Storybook would run them.
let server: ViteDevServer;
beforeAll(async () => {
  server = await createServer({
    configFile: false,
    root: fixtures,
    logLevel: 'silent',
    server: { middlewareMode: true, ws: false },
    appType: 'custom',
    plugins: [storySourceLocationPlugin()],
  });
});
afterAll(() => server.close());

const load = (name: string) => server.ssrLoadModule(`/${name}`);
const annotationsOf = (story: unknown) =>
  isStory(story) ? story.input : (story as Record<string, unknown>);

describe('addStorySourceLocations', () => {
  it('appends location metadata for factory stories, leaving the source unchanged', async () => {
    const source = read('factory.stories.js');
    const result = addStorySourceLocations(source, 'factory.stories.js');
    expect(result.startsWith(source)).toBe(true);
    await expect(result).toMatchFileSnapshot(
      './fixtures/expected/factory.transformed.js',
    );
  });

  it('appends location metadata for plain CSF stories', async () => {
    const result = addStorySourceLocations(
      read('csf.stories.js'),
      'csf.stories.js',
    );
    await expect(result).toMatchFileSnapshot(
      './fixtures/expected/csf.transformed.js',
    );
  });

  it('updates ranges when lines are inserted', () => {
    const result = addStorySourceLocations(
      `\n\n${read('csf.stories.js')}`,
      'csf.stories.js',
    );
    expect(result).toContain('"startLine":5,"endLine":5');
  });

  it('leaves files without story exports unchanged', () => {
    const source = read('no-stories.stories.js');
    expect(addStorySourceLocations(source, 'no-stories.stories.js')).toBe(
      source,
    );
  });
});

describe('storySourceLocationPlugin', () => {
  it('adds udirSourceLocation to plain CSF stories and keeps parameters', async () => {
    const { Primary, Secondary } = await load('csf.stories.js');
    expect(Primary.parameters).toEqual({
      layout: 'fullscreen',
      udirSourceLocation: { startLine: 3, endLine: 3 },
    });
    expect(Secondary.parameters.udirSourceLocation).toEqual({
      startLine: 5,
      endLine: 7,
    });
  });

  it('adds udirSourceLocation to factory stories and keeps parameters', async () => {
    const { Primary, Secondary } = await load('factory.stories.js');
    expect(isStory(Primary)).toBe(true);
    expect(Primary.input.parameters).toEqual({
      layout: 'fullscreen',
      udirSourceLocation: { startLine: 5, endLine: 7 },
    });
    expect(Secondary.input.parameters.udirSourceLocation).toEqual({
      startLine: 9,
      endLine: 9,
    });
  });

  it('does not collide with existing bindings or shadow exported names', async () => {
    const { Primary, entries } = await load('name-collision.stories.js');
    expect(Primary.parameters.udirSourceLocation.startLine).toBe(6);
    expect(entries.parameters.udirSourceLocation.startLine).toBe(7);
  });

  it.each(['shared-csf.stories.js', 'shared-factory.stories.js'])(
    'leaves shared annotations in %s unchanged for file-level fallback',
    async (name) => {
      const { Primary, Alias } = await load(name);
      expect(Primary).toBe(Alias);
      expect(annotationsOf(Primary).parameters).toBeUndefined();
    },
  );

  it('warns and skips optional extraction when parsing fails', async () => {
    const hook = storySourceLocationPlugin().transform;
    if (typeof hook !== 'function')
      throw new Error('Expected a transform hook');
    const warn = vi.fn();
    expect(
      await hook.call(
        { warn } as never,
        'not valid JavaScript!',
        'Example.stories.ts',
      ),
    ).toBeUndefined();
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Example.stories.ts'),
    );
    warn.mockClear();
    expect(
      await hook.call({ warn } as never, 'not valid JavaScript!', 'Example.ts'),
    ).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });
});
