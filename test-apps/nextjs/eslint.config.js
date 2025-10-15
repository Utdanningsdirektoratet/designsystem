import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.js';

const { configs } = eslintJs;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: configs.recommended,
});

const eslintConfig = defineConfig(
  fixupConfigRules(compat.extends('next')),
  fixupConfigRules(compat.extends('next/core-web-vitals')),
  nxEslintPlugin.configs['flat/react-typescript'],
  baseConfig.map((x) => ({
    ...x,
    ...(x.plugins && {
      plugins: Object.fromEntries(
        // nextjs bundles its own version of the import plugin in a way that is incompatible with the base config
        Object.entries(x.plugins).filter(([key]) => key !== 'import'),
      ),
    }),
  })),
  { ignores: ['.next/**/*'] },
);
export default eslintConfig;
