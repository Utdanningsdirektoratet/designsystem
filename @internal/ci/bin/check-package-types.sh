#!/usr/bin/env bash
# Checks that the `exports` and type declarations of the published `@udir-design/*` packages
# resolve correctly for TypeScript, with Are the Types Wrong? (`attw`).
#
# The checked packages are the `@udir-design/*` devDependencies of `@internal/ci`, so turbo builds
# them first (`^build`). `@udir-design/css` and `@udir-design/theme` are left out: they ship CSS,
# and the declarations in `theme` only augment `@digdir/designsystemet-types`.
#
# Each package is packed with `pnpm pack`, since releases are published with pnpm, so `attw` sees
# the package as it would be published. (`attw --pack` would use `npm pack`.)
#
# `node10` resolution is not checked (`--profile node16`), since it can't resolve subpaths.

set -uo pipefail
cd "$(dirname "$0")/.."

tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT

status=0
for package_dir in node_modules/@udir-design/*; do
  pack_dir="$tmp_dir/$(basename "$package_dir")"
  mkdir "$pack_dir"
  (cd "$package_dir" && pnpm pack --pack-destination "$pack_dir" > /dev/null) || exit 1
  pnpm exec attw "$pack_dir"/*.tgz --profile node16 --exclude-entrypoints style.css || status=1
done
exit $status
