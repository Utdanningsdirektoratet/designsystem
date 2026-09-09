import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { RuleTester } from 'oxlint/plugins-dev';
import { describe, expect, it } from 'vitest';
import { noRelativePackages } from './no-relative-packages.ts';
import { findPackageDir } from './package-json.ts';

// Oxlint's `RuleTester` picks up `describe`/`it` from the global scope, which
// Vitest only populates when `globals` is enabled. Hand them over explicitly.
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

/** See `fixtures/README.md` for the layout these paths refer to. */
const fixtures = join(import.meta.dirname, '..', 'fixtures');
const inPackageA = (file: string) => join(fixtures, 'package-a', file);

/**
 * A directory with no `package.json` anywhere above it — impossible inside the
 * repo, where the root manifest owns everything.
 */
const outsideAnyPackage = join(tmpdir(), 'oxlint-plugin-outside-any-package');

new RuleTester().run('no-relative-packages', noRelativePackages, {
  valid: [
    {
      name: 'sibling module in the same package',
      filename: inPackageA('src/button.ts'),
      code: "import { cx } from './cx';",
    },
    {
      name: '`../` traversal that stays inside the package',
      filename: inPackageA('src/components/button.ts'),
      code: "import { cx } from '../../utilities/cx';",
    },
    {
      name: 'another package imported by name',
      filename: inPackageA('src/button.ts'),
      code: "import { thing } from '@fixture/package-b/src/thing';",
    },
    {
      name: 'export without a module source',
      filename: inPackageA('src/button.ts'),
      code: 'const cx = 1;\nexport { cx };',
    },
    {
      name: 'dynamic import of a computed specifier',
      filename: inPackageA('src/button.ts'),
      code: 'export const load = (path: string) => import(path);',
    },
    {
      name: 'package whose manifest declares no name',
      filename: inPackageA('src/button.ts'),
      code: "import { thing } from '../../unnamed/thing';",
    },
    {
      name: 'file outside any package',
      filename: join(outsideAnyPackage, 'file.ts'),
      code: "import { thing } from '../sibling/thing';",
      // Without this the case could quietly stop testing what it claims to,
      // should anything above the temp directory ever declare a package.
      before: () => expect(findPackageDir(outsideAnyPackage)).toBeNull(),
    },
  ],

  invalid: [
    {
      name: 'module inside another package',
      filename: inPackageA('src/button.ts'),
      code: "import { thing } from '../../package-b/src/thing';",
      output: "import { thing } from '@fixture/package-b/src/thing';",
      errors: [
        {
          messageId: 'relativePackage',
          data: { suggestion: '@fixture/package-b/src/thing' },
        },
      ],
    },
    {
      name: 'root of another package',
      filename: inPackageA('src/button.ts'),
      code: "import { thing } from '../../package-b';",
      output: "import { thing } from '@fixture/package-b';",
      errors: [
        {
          messageId: 'relativePackage',
          data: { suggestion: '@fixture/package-b' },
        },
      ],
    },
    {
      name: 'the package the other packages live in',
      filename: inPackageA('src/button.ts'),
      code: "import { shared } from '../../shared';",
      output: "import { shared } from '@fixture/workspace-root/shared';",
      errors: [
        {
          messageId: 'relativePackage',
          data: { suggestion: '@fixture/workspace-root/shared' },
        },
      ],
    },
    {
      name: 're-export crossing the boundary',
      filename: inPackageA('src/button.ts'),
      code: "export { thing } from '../../package-b/src/thing';",
      output: "export { thing } from '@fixture/package-b/src/thing';",
      errors: [{ messageId: 'relativePackage' }],
    },
    {
      name: 'star re-export crossing the boundary',
      filename: inPackageA('src/button.ts'),
      code: "export * from '../../package-b/src/thing';",
      output: "export * from '@fixture/package-b/src/thing';",
      errors: [{ messageId: 'relativePackage' }],
    },
    {
      name: 'dynamic import crossing the boundary',
      filename: inPackageA('src/button.ts'),
      code: "export const load = () => import('../../package-b/src/thing');",
      output:
        "export const load = () => import('@fixture/package-b/src/thing');",
      errors: [{ messageId: 'relativePackage' }],
    },
    {
      name: 'import type crossing the boundary',
      filename: inPackageA('src/button.ts'),
      code: "export type Thing = import('../../package-b/src/thing').Thing;",
      output:
        "export type Thing = import('@fixture/package-b/src/thing').Thing;",
      errors: [{ messageId: 'relativePackage' }],
    },
    {
      name: 'fix keeps the quote style of the specifier it replaces',
      filename: inPackageA('src/button.ts'),
      code: 'import { thing } from "../../package-b/src/thing";',
      output: 'import { thing } from "@fixture/package-b/src/thing";',
      errors: [{ messageId: 'relativePackage' }],
    },
  ],
});
