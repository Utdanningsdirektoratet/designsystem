import { runInNewContext } from 'node:vm';
import { definePreview, isStory } from 'storybook/internal/csf';
import { describe, expect, it, vi } from 'vitest';
import {
  addStorySourceLocations,
  storySourceLocationPlugin,
} from './storySourceLocationPlugin';

// Execute plain-JavaScript fixtures with real Storybook factories. Only ESM
// syntax is removed to run the generated body in an isolated VM sandbox.
function execute(source: string, exports = ['Primary']) {
  const script = addStorySourceLocations(source, 'Example.stories.ts')
    .replace(/import preview from '\.\/preview';/, '')
    .replace(
      /import \{ isStory as (\w+) \} from 'storybook\/internal\/csf';/,
      'const $1 = isStory;',
    )
    .replace(/export default /g, 'const defaultExport = ')
    .replace(/export (?=const |function )/g, '');
  return runInNewContext(`${script}\n;({ ${exports.join(', ')} })`, {
    isStory,
    preview: definePreview({}),
  });
}

describe('story source locations', () => {
  it('extracts original export ranges for factory stories without changing source lines', () => {
    const source = `import preview from './preview';
const meta = preview.meta({ title: 'Example' });
export const Primary = meta.story({
  args: { label: 'Example' },
});
export const Secondary = meta.story({});`;
    const result = addStorySourceLocations(source, 'Example.stories.tsx');
    expect(result.startsWith(source)).toBe(true);
    expect(result).toContain('"startLine":3,"endLine":5');
    expect(result).toContain('"startLine":6,"endLine":6');
    expect(result).toMatch(/\w+\(Primary\) \? Primary.input : Primary/);
  });

  it('supports traditional CSF and preserves existing parameters', () => {
    const source = `export default { title: 'Example' };
export const Primary = { parameters: { layout: 'fullscreen' } };`;
    const result = addStorySourceLocations(source, 'Example.stories.ts');
    expect(result).toContain('"startLine":2,"endLine":2');
    expect(result).toContain('...annotations.parameters');
  });

  it('updates ranges when lines are inserted', () => {
    const source = `export default { title: 'Example' };
export const Primary = {};`;
    expect(
      addStorySourceLocations(`\n\n${source}`, 'Example.stories.ts'),
    ).toContain('"startLine":4,"endLine":4');
  });

  it('executes traditional annotations and preserves parameters', () => {
    const { Primary } = execute(`export default { title: 'Example' };
export const Primary = { parameters: { layout: 'fullscreen' } };`);
    expect(Primary.parameters).toEqual({
      layout: 'fullscreen',
      udirSourceLocation: { startLine: 2, endLine: 2 },
    });
  });

  it('executes factory stories and annotates their input', () => {
    const { Primary } = execute(`import preview from './preview';
  const meta = preview.meta({ title: 'Example' });
export const Primary = meta.story({ parameters: { layout: 'fullscreen' } });`);
    expect(isStory(Primary)).toBe(true);
    expect(Primary.input.parameters).toEqual({
      layout: 'fullscreen',
      udirSourceLocation: { startLine: 3, endLine: 3 },
    });
  });

  it('does not collide with existing bindings or shadow exported names', () => {
    const { Primary, entries } = execute(
      `export default { title: 'Example' };
const _udirIsStory = 1;
const __udirIsStory = 2;
export const Primary = {};
export const entries = {};`,
      ['Primary', 'entries'],
    );
    expect(Primary.parameters.udirSourceLocation.startLine).toBe(4);
    expect(entries.parameters.udirSourceLocation.startLine).toBe(5);
  });

  it.each(['{}', 'meta.story({})'])(
    'leaves shared %s annotations unchanged for file-level fallback',
    (value) => {
      const meta =
        value === '{}'
          ? "export default { title: 'Example' };"
          : "import preview from './preview';\nconst meta = preview.meta({ title: 'Example' });";
      const { Primary, Alias } = execute(
        `${meta}
export const Primary = ${value};
export const Alias = Primary;`,
        ['Primary', 'Alias'],
      );
      expect(Primary).toBe(Alias);
      expect(
        (isStory(Primary) ? Primary.input : Primary).parameters,
      ).toBeUndefined();
    },
  );

  it('leaves files without story exports unchanged', () => {
    const source = `export default { title: 'Example' };`;
    expect(addStorySourceLocations(source, 'Example.stories.ts')).toBe(source);
  });

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
