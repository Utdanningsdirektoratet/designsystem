# Agent Guidelines

## Monorepo tooling

- This is a **pnpm** workspace. Use `pnpm` for all package management.
- Use `pnpm turbo <package>#<task>` to run tasks (e.g. `pnpm turbo @udir-design/react#typecheck`).
  Do **not** pass `--force` to turbo unless there is a specific reason — it skips caching and is slow.

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
