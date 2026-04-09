// Compat shim: remove fixupConfigRules once eslint-config-next natively supports ESLint 10
import { fixupConfigRules } from '@eslint/compat';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = defineConfig(
  fixupConfigRules([nextVitals, nextTypescript].flat()),
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
);
export default eslintConfig;
