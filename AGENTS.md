# Agent Guidelines

## Monorepo tooling

- This is a **pnpm** workspace. Use `pnpm` for all package management.
- Use `pnpm turbo <package>#<task>` to run tasks (e.g. `pnpm turbo @udir-design/react#typecheck`).
  Do **not** pass `--force` to turbo unless there is a specific reason — it skips caching and is slow.

## Build and CI scripts

Unpublished tooling (`@internal/*`, and the `bin/`, `config/`, `process/`, `build/` and `.storybook/`
scripts in packages) is plain TypeScript run with `tsx`.

- Transform data with expressions instead of loops that mutate accumulators. Before writing a helper,
  check Ramda and Node built-ins. If neither has it and several scripts need the same logic, write
  one shared helper next to the scripts that use it, such as `@internal/ci/src/ci-decision.ts` or a
  published package's `config/` or `build/` folder. Never put tooling helpers in a published
  package's `src/`, which is library code.
- Prefer Node built-ins over small dependencies, unless the script gets worse to use. Keep `yargs` for
  scripts with options: it provides `--help` and readable errors for missing or wrong options.
- Throw `new Error(message, { cause })` naming what failed. Don't turn an error into `false`, an empty
  value or a default, unless that fallback is the script's documented behaviour. Check the shape of
  JSON from tools and APIs before relying on it. Use `process.exit`/`process.exitCode` only for
  documented exit codes.
- Run commands with `execFileSync(cmd, args, { encoding: 'utf8', stdio: 'pipe' })` and an argument
  array, not a shell string. The thrown error includes stderr and `status`. Treat only documented exit
  codes as answers, e.g. `git merge-base --is-ancestor` exits 1 for "no".
- A script whose stdout a workflow captures prints only the result there, and diagnostics on stderr.
  In workflows, assign before writing: `value=$(script)`, then `echo "key=$value" >> "$GITHUB_OUTPUT"`.
  In `echo "key=$(script)"` the step only sees `echo`'s exit status, which hides a failing script.
- Clean up with `using`, or `await using`, for anything that supports `Symbol.dispose` or
  `Symbol.asyncDispose`, such as Playwright's browser, context and page. For paired setup and
  teardown without one, return a small disposable object, as `trackRequests` in
  `buildSearchIndex.ts` and `createStagingFolder` in the Figma script do. Use `try`/`finally`
  otherwise.
- JSDoc says what a function or constant is for. Notes on how it works go in `//` comments next to
  the code. Don't add comments to tsconfig files.

### TypeScript config for scripts

- Every script must be in a config that both `typecheck` and editors use. Editors only load
  `tsconfig.json`, so in a package with several configs, `tsconfig.json` only references them, as in
  `@udir-design/react`, `symbols` and `icons`.
- APIs newer than the `lib` in `tsconfig.base.json` need a `lib` entry in the script's config, e.g.
  `esnext.array` for `Array.fromAsync`, or `esnext.disposable` for `using`.
- After changing `lib` or other compiler options, `tsc --build` can keep reporting the old errors
  until you delete the package's `.tsbuildinfo` in `dist/out-tsc/`.

### Verifying changes to scripts

- Compare the old and new script on the same input. Run the old one from
  `git show origin/main:<path>`, copied into the same directory so its imports resolve. Compare
  written files byte for byte. If two runs of the old script already differ, compare the content
  instead and ignore only what differs between those runs. For example, the Pagefind index differs
  in the random React Aria ids from run to run.
- Compare runs of scripts that rewrite tracked folders, such as `fetch-new:symbols`, in a temporary
  directory. `fetch-new:symbols` calls Figma's `GET images` endpoint, which has tight rate limits, so
  run it sparingly.

## Published packages

- The library builds bundle any devDependency that library code imports: Vite and tsdown only
  externalize `dependencies` and `peerDependencies`. A package that library code imports at runtime
  belongs in `dependencies`, or in `peerDependencies` if the app provides it (such as `react`). Leave
  it in `devDependencies` only if bundling it is intended, such as the private `@udir-design/tokens`.

## Commit messages

- Use [conventional commits](https://www.conventionalcommits.org/) (`ci:`, `build:`, `feat:`, `fix:`, etc.)
- Use backticks for code identifiers (file paths, package names, variables, etc.)
- Subject line must not exceed 100 characters (enforced by commitlint)
- Body lines should not exceed 100 characters (commitlint warning)
- Reserve `feat:` and `fix:` for changes that affect the published `@udir-design/*` packages
  (these types appear in changelogs). Everything else uses a different type:
  - CI/workflow changes → `ci:`
  - Build tooling, dependency bumps → `build:`
  - Documentation-only changes → `docs:`
  - Internal refactors, test changes, chores → `refactor:`, `test:`, `chore:`
    Even if a change "fixes" a CI pipeline or build config, use the appropriate type above.
    Adding a scope does not change this: `feat(ci):` is still wrong; use `ci:`.
- Say what a commit does, not how good it is: avoid "simplify", "clean up" or "improve" unless the
  diff clearly shows it, e.g. less code. Prefer something concrete such as "more declarative" or
  "use Node's glob instead of fast-glob".
