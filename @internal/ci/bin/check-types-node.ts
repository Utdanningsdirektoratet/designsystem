#!/usr/bin/env -S pnpm tsx

/**
 * Checks that every `@types/node` that a workspace package depends on directly
 * describes the Node version in the root `package.json`'s `devEngines.runtime`.
 *
 * `@types/node` shares its major and minor version with Node. The types must
 * have the same major as the runtime, and a minor no newer than the runtime's,
 * so they don't describe APIs that the Node we run lacks. The types often lag
 * behind Node, so an older minor is fine.
 *
 * Exits with 1 and explains what to change if a version doesn't match.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parseLockfile } from '../src/diff-runtime-deps.js';

const repoRoot = path.resolve(import.meta.dirname, '../../..');

const parseMajorMinor = (version: string) => {
  const match = /^(\d+)\.(\d+)\./.exec(version);
  if (!match) throw new Error(`Unexpected version: ${version}`);
  return { major: Number(match[1]), minor: Number(match[2]) };
};

const rootPkg = JSON.parse(
  readFileSync(path.join(repoRoot, 'package.json'), 'utf-8'),
);
const runtimeVersion: unknown = rootPkg.devEngines?.runtime?.version;
if (typeof runtimeVersion !== 'string') {
  throw new Error('The root package.json has no devEngines.runtime.version');
}
const runtime = parseMajorMinor(runtimeVersion);

const lockfile = parseLockfile(
  readFileSync(path.join(repoRoot, 'pnpm-lock.yaml'), 'utf-8'),
);

const checks = Object.entries(lockfile.importers).flatMap(
  ([importer, deps]) => {
    const typesNode =
      deps.dependencies?.['@types/node'] ??
      deps.devDependencies?.['@types/node'];
    if (!typesNode) return [];

    const types = parseMajorMinor(typesNode.version);
    const problem =
      types.major !== runtime.major
        ? `has major ${types.major}, but devEngines.runtime is Node ${runtimeVersion}`
        : types.minor > runtime.minor
          ? `describes Node ${types.major}.${types.minor}, newer than devEngines.runtime ${runtimeVersion}`
          : undefined;
    return [{ importer, typesNode, problem }];
  },
);

for (const { importer, typesNode, problem } of checks) {
  if (problem) {
    console.error(
      `❌ ${importer}: @types/node ${typesNode.version} (${typesNode.specifier}) ${problem}. ` +
        'Update devEngines.runtime.version in package.json, or the @types/node range ' +
        'in the pnpm-workspace.yaml catalog.',
    );
  } else {
    console.log(
      `✅ ${importer}: @types/node ${typesNode.version} matches Node ${runtimeVersion}`,
    );
  }
}

if (checks.some(({ problem }) => problem)) process.exit(1);
