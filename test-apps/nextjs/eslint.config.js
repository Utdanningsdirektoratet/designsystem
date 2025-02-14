import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import { fixupConfigRules } from '@eslint/compat';
import eslintPlugin from '@nx/eslint-plugin';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';

const { configs } = eslintJs;
const { configs: _configs } = eslintPlugin;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: configs.recommended,
});

const eslintConfig = [
  ...fixupConfigRules(compat.extends('next')),

  ...fixupConfigRules(compat.extends('next/core-web-vitals')),

  ...baseConfig,
  ..._configs['flat/react-typescript'],
  { ignores: ['.next/**/*'] },
];
export default eslintConfig;
