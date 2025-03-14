import { generateDynamicCsf } from './generateDynamicCsf';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

const tsconfigPath = path.resolve(
  import.meta.dirname,
  '../../tsconfig.lib.json',
);
const testCaseDirectory = path.resolve(import.meta.dirname, './test-cases');

describe('dynamicCsf', () => {
  it('Should generate expected output on simple test case', async () => {
    const meta = (await import('./test-cases/Simple.dynamic')).default;
    const expectedOutput = await fs.readFile(
      path.resolve(testCaseDirectory, 'Simple.generated.tsx'),
      { encoding: 'utf-8' },
    );
    const generatedOutput = await generateDynamicCsf(
      tsconfigPath,
      path.resolve(testCaseDirectory, 'Simple.dynamic.tsx'),
      meta,
      console,
    );
    expect(generatedOutput).toBe(expectedOutput);
  });
});
