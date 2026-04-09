// import { FlatCompat } from '@eslint/eslintrc';
// import eslintJs from '@eslint/js';
// Compat shim: remove fixupConfigRules and plugin filtering once eslint-config-next natively supports ESLint 10
import { fixupConfigRules } from '@eslint/compat';
import nxEslintPlugin from '@nx/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import baseConfig from '../../eslint.config.js';

// eslint-config-next/core-web-vitals includes the base next + typescript configs.
// Filter out plugin registrations that conflict with plugins already registered by
// NX / baseConfig (@typescript-eslint, import) to avoid ESLint 10 "Cannot redefine plugin" errors.
const pluginsProvidedByBaseConfig = new Set(['@typescript-eslint', 'import']);
const nextConfigs = [nextVitals].flat().map(({ plugins, ...rest }) => {
  if (!plugins) return rest;
  const filtered = Object.fromEntries(
    Object.entries(plugins).filter(
      ([name]) => !pluginsProvidedByBaseConfig.has(name),
    ),
  );
  return Object.keys(filtered).length > 0
    ? { ...rest, plugins: filtered }
    : rest;
});

const eslintConfig = defineConfig(
  fixupConfigRules(nextConfigs),
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  nxEslintPlugin.configs['flat/react-typescript'],
  baseConfig,
);
export default eslintConfig;
