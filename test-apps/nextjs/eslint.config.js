import { defineConfig, globalIgnores } from '@eslint/config-helpers';
import next from 'eslint-config-next';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = defineConfig(
  next,
  nextVitals,
  nextTypescript,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
);
export default eslintConfig;
