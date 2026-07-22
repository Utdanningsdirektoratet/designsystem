/**
 * Optional peer dependencies nothing in this workspace uses. pnpm's
 * `autoInstallPeers` (on by default) pulls these in even though nothing here
 * requires them, and neither `ignoredOptionalDependencies` nor an `overrides`
 * removal affects an auto-installed optional peer. So we strip them at the
 * source: for any package that declares one of these as an *optional* peer, we
 * remove it before pnpm resolves the graph.
 *
 * - `@microsoft/api-extractor`: unplugin-dts's api-extractor-based dts rollup
 *   feature, which we don't use.
 * - `rollup`: Vite 8 builds with rolldown; nothing here invokes standalone
 *   rollup (it's only an optional peer of @rollup/pluginutils,
 *   @storybook/csf-plugin and unplugin-dts).
 */
const UNUSED_OPTIONAL_PEERS = new Set(['@microsoft/api-extractor', 'rollup']);

function readPackage(pkg) {
  for (const name of UNUSED_OPTIONAL_PEERS) {
    if (pkg.peerDependenciesMeta?.[name]?.optional) {
      delete pkg.peerDependencies?.[name];
      delete pkg.peerDependenciesMeta[name];
    }
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
