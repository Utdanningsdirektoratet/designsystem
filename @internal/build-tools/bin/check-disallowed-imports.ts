#!/usr/bin/env -S pnpm tsx

/*
 * This script checks whether any .tsx files in @udir-design/react/.storybook import
 * components or utilities from barrel files. Such imports will wreak havoc with
 * Chromatic's ability to correctly snapshot our components, as any change in a component
 * results in a change in .storybook, which necessitates a full Chromatic build.
 */

import process from 'node:process';
import madge from 'madge';
import glob from 'fast-glob';
import path from 'node:path';
import yargs, { Options } from 'yargs';
import { hideBin } from 'yargs/helpers';

const pathToChech = '.storybook';
const disallowedImports = [
  'src/components/stable.ts',
  'src/components/beta.ts',
  'src/components/alpha.ts',
  'src/utilities/hooks/beta.ts',
  'src/utilities/hooks/alpha.ts',
];

(async () => {
  const yargsInstance = yargs(hideBin(process.argv));
  const options = await yargsInstance
    .version(false) // disable default --version option in yargs
    .options({
      baseDir: {
        type: 'string',
        demandOption: true,
        description: 'Path to @udir-design/react from the current dir',
      },
    } satisfies Record<string, Options>)
    .wrap(yargsInstance.terminalWidth())
    .parseAsync();

  const { baseDir } = options;

  const expandedPaths = await glob(path.join(baseDir, pathToChech, '**/*.tsx'));
  const madgeInstance = await madge(expandedPaths);
  const disallowedRelativePaths = disallowedImports.map((disallowed) =>
    path.relative(
      path.join(baseDir, pathToChech),
      path.join(baseDir, disallowed),
    ),
  );

  const toBeWalked: string[] = [...disallowedRelativePaths];
  const currentPath: string[] = [];
  const results: string[][] = [];

  while (toBeWalked.length) {
    const current = toBeWalked.pop() as string;
    currentPath.push(current);
    const deps = madgeInstance.depends(current);
    if (deps.length === 0) {
      if (hasDisallowed(currentPath, disallowedRelativePaths)) {
        results.push([...currentPath]);
      }
      currentPath.splice(0); // empty the path array to prepare for the next dep
    } else {
      toBeWalked.splice(toBeWalked.length, 0, ...deps); // walk the dependencies
    }
  }

  if (results.length) {
    const prettyResults = results
      .map((depChain) => {
        const pretty = depChain
          .reverse()
          .map(
            (path, index) =>
              `${Array<string>(index).fill('  ', 0).join('')}${index !== 0 ? ' › ' : ''}${path}`,
          )
          .join('\n');
        return `  ${pretty}`;
      })
      .join('\n\n');
    console.error(
      `Found forbidden imports in the following import chains:\n${prettyResults}`,
    );
    process.exit(1);
  }
})();

function hasDisallowed(deps: string[], disallowedDeps: string[]): boolean {
  return (
    deps.length > 1 &&
    deps.some((depPath) =>
      disallowedDeps.some((disallowed) => depPath === disallowed),
    )
  );
}
