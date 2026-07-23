import { defineConfig } from 'oxlint';
import baseConfig from '../../oxlint.config.ts';
import {
  jsxA11yOptionRules,
  reactPackagePlugins,
  reactPackageRules,
  reactPackageSettings,
} from '../../oxlint.shared.ts';

// `categories`, `env`, and `jsPlugins` (importx) are inherited from the root
// config; only the React-specific additions are declared here.
export default defineConfig({
  extends: [baseConfig],
  plugins: reactPackagePlugins,
  settings: reactPackageSettings,
  ignorePatterns: ['generated-src'],
  rules: {
    ...reactPackageRules,
    ...jsxA11yOptionRules,
  },
});
