import { serverRequire } from '@storybook/core-common';
import { type GeneratorMeta, generateDynamicCsf } from '@internal/dynamic-csf';

export const compile = async (fileName: string, tsconfigPath: string) => {
  const meta = serverRequire(fileName) as GeneratorMeta | undefined;
  if (!meta) {
    throw new Error('Missing default export of GeneratorMeta data');
  }

  return await generateDynamicCsf(tsconfigPath, fileName, meta);
};
