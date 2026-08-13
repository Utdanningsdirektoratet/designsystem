import { defineConfig } from 'oxlint';
import baseConfig from '../../oxlint.config.ts';

// Everything (plugins, categories, env, settings, jsPlugins, rules, overrides)
// is inherited from the root config via `extends` — no package-specific config
// is needed here.
export default defineConfig({
  extends: [baseConfig],
});
