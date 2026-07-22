/**
 * Remove the optional `@microsoft/api-extractor` peer dependency from
 * `unplugin-dts`. We don't use api-extractor's rollup feature, but pnpm's
 * `autoInstallPeers` (on by default) auto-installs it anyway. Neither
 * `ignoredOptionalDependencies` nor an `overrides` removal affects an
 * auto-installed optional peer, so we strip it at the source here.
 */
function readPackage(pkg) {
  if (pkg.name === 'unplugin-dts') {
    if (pkg.peerDependencies) {
      delete pkg.peerDependencies['@microsoft/api-extractor'];
    }
    if (pkg.peerDependenciesMeta) {
      delete pkg.peerDependenciesMeta['@microsoft/api-extractor'];
    }
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
