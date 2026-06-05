# Nx Toolchain: Turborepo Migration Reference

This document records the migration from Nx to Turborepo for task orchestration (Phase 1,
complete) and a potential future migration from `nx/release` APIs to `semantic-release`
(Phase 2, not yet started).

---

## Background

The repo previously used **Nx** for both task orchestration (builds, caching,
affected-project detection, ESLint target inference) and release automation (`nx release`
APIs). After Phase 1, it now uses **Turborepo** for task orchestration and **Nx** for
release automation only (`nx release` APIs called from
`@internal/ci/src/semantic-release.ts`).

Phase 2 targets replacing the Nx release APIs with **`semantic-release`**, which would allow
Nx to be removed entirely.

**CVE-2025-36852** (CREEP) deprecated `@nx/azure-cache` in May 2026 with no patch path.
PR #796 (`build/remove-nx-azure-cache`) removed the package and replaced it with **Nx Cloud**
(free hobby tier), which temporarily resolved the CVE.

**Trigger (June 2026):** Usage data projected **838 000 credits/month** against a free tier
of 50 000 (~$433/month overage). This justified Phase 1 on cost alone — the 1-day migration
to Turborepo + GitHub Actions Cache eliminated the cost entirely.

### Key files

Phase 1 replaced the following Nx mechanisms:

| Before (Nx)                                   | After (Turborepo)                                    | Role                                                      |
| --------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| `nx.json` (task orchestration config)         | `turbo.json`                                         | Task pipeline — build/test/lint orchestration and caching |
| `nx.json` (release config)                    | `nx.json` (release section only)                     | Release config (`projectsRelationship`, `version`, etc.)  |
| `*/project.json` (per-package Nx targets)     | `*/turbo.json` (per-package overrides)               | Package-level task configuration                          |
| `@nx/eslint/plugin` (inferred lint targets)   | Explicit `"lint"` scripts in each `package.json`     | ESLint execution                                          |
| `nrwl/nx-set-shas` (in `pnpm-setup`)          | `TURBO_SCM_BASE` env var (in `pnpm-setup`)           | SCM base for affected detection                           |
| `@nx/azure-cache` / Nx Cloud                  | `actions/cache` for `.turbo/cache`                   | CI build caching                                          |
| `is-project-affected.sh` (inline shell in CI) | `should-run-ui-tests.ts`, `should-deploy-testapp.ts` | Conditional job gating via `turbo ls --affected`          |

CI and release scripts live in `@internal/ci/` (previously `@internal/build-tools`,
renamed since no published packages depend on it — it only contains CI and release
automation). Phase 2 replaced the Nx release dependencies:

| File                                        | Role                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `@internal/ci/src/semantic-release.ts`      | Release orchestrator — calls `semantic-release` programmatically |
| `@internal/ci/src/changelog-writer-opts.ts` | Changelog format customisation (commit body, footer stripping)   |
| `@internal/ci/bin/semantic-release.ts`      | CLI entry point                                                  |
| `@internal/ci/bin/sync-package-versions.ts` | Syncs resolved version into publishable `package.json` files     |

### Current git tag format

Tags follow `v{version}` format (e.g. `v1.0.0-beta.32`). A handful of very old
`@udir-design/react@0.0.0`-style bootstrapping tags exist but can be ignored — both `semantic-release`
and `release-it` default to `v{version}` so there is **no tag format migration needed**.

### Fixed versioning

All packages (`@udir-design/*`) are released at the same version simultaneously
(`projectsRelationship: "fixed"` in `nx.json`). This is an important constraint for Phase 2.

---

## Migration structure

**Phase 1 — Turborepo for task orchestration** ✅ Complete (1 day)

- Nx is kept installed as a release-only dependency, so the release path is
  untouched.
- **Justified by cost:** Nx Cloud projected ~838 000 credits/month against a
  50 000 free tier, costing ~$433/month. Turborepo + GitHub Actions Cache
  eliminated this cost entirely.

**Phase 2 — Replace `nx/release` APIs with `semantic-release`** ✅ Complete

- Combined with Phase 1, allows Nx to be removed entirely.
- Independently motivated: the existing release orchestrator was self-described
  as "a simple imitation of semantic-release" and had accumulated workarounds
  (`ignoreGitTags`, `restoreGitTags`, `sanitizeNpmTag`, the 0.x→1.x guard) that
  the real tool handles natively.

**Remaining steps before Nx can be fully removed:**

1. Bootstrap git notes for existing tags (see `RELEASING.md` §1)
2. Push notes to origin: `git push origin 'refs/notes/semantic-release*'`
3. Remove `nx`, `@nx/js`, and related deps (see §2.10 below)

---

## Phase 1 — Task Orchestration ✅

### 1.1 Install Turborepo ✅

`turbo` added to root `devDependencies`.

### 1.2 Create `turbo.json` ✅

Root `turbo.json` defines the task pipeline. Key design decisions beyond a straight
`targetDefaults` translation:

- **`globalDependencies`** — `tsconfig.base.json` and `eslint.config.js` invalidate all
  tasks when changed.
- **`futureFlags.affectedUsingTaskInputs`** — enables the newer affected detection that
  uses declared task inputs rather than the full project graph.
- **`inject` task** — declared with empty config (`{}`) at root because Turborepo
  requires a task to be registered before any package can depend on it via `^inject`.
  Packages that actually have an `inject` script declare `dependsOn: ["build"]` per-package.
- **`dev` task** — declared persistent at root with `dependsOn: ["build"]`.

See `turbo.json` for the full configuration.

### 1.3 Per-package `turbo.json` overrides ✅

Five per-package override files exist:

| Package                         | Purpose                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@udir-design/react/turbo.json` | `lint:cycles` gate on `build`; production-only `inputs` (excludes tests/stories/docs); `build:storybook`, `build:docs`, `test:unit`, `test:storybook` task definitions (with `dependsOn`, `outputs`); `dev`, `watch:typedoc`, `serve:typedoc`, `serve:docs`, `view-test-report:storybook` persistent tasks; `inject` with `dependsOn: ["build"]` |
| `@udir-design/css/turbo.json`   | Cross-package `inputs` — includes `../react/src/components/**/*.css` (excludes `.module.css`) to invalidate css build when component CSS changes, without requiring a `package.json` dependency (which would create a cycle)                                                                                                                     |
| `@udir-design/icons/turbo.json` | `inject` task with `dependsOn: ["build"]`                                                                                                                                                                                                                                                                                                        |
| `test-apps/nextjs/turbo.json`   | Non-standard build outputs (`.next/**`, excluding `.next/cache/**`); persistent `dev` task with `dependsOn: ["^build", "^inject"]`                                                                                                                                                                                                               |
| `test-apps/vite/turbo.json`     | Persistent `dev` task with `dependsOn: ["^build", "^inject"]`                                                                                                                                                                                                                                                                                    |

All per-package files include `"extends": ["//"]` to inherit root defaults.

Design note: `@udir-design/react/turbo.json` explicitly re-declares `dependsOn: ["^build", "^inject", "lint:cycles"]`
on its `build` task rather than relying on inheritance, because Turborepo's per-package `dependsOn`
**replaces** (not merges with) the root definition.

### 1.4 Add `lint` scripts to every package ✅

`@nx/eslint/plugin` previously auto-inferred `lint` targets. Turborepo requires explicit
`package.json` scripts. Added `"lint": "eslint . --max-warnings 0"` to:

- `@udir-design/react`
- `@udir-design/css`
- `@udir-design/icons`
- `@udir-design/symbols`
- `@internal/ci`

`design-tokens` and `@udir-design/theme` have no source files that benefit from linting
(tokens are generated, theme copies CSS from tokens) and do not have lint scripts.

### 1.5 Remote caching ✅

Three options were evaluated:

| Option                                             | Mechanism                          | Developer cache sharing | Cost                  | Operational overhead    |
| -------------------------------------------------- | ---------------------------------- | ----------------------- | --------------------- | ----------------------- |
| **A. GitHub Actions Cache**                        | `actions/cache` for `.turbo/cache` | ❌ Local only           | Free                  | None                    |
| B. Vercel Remote Cache                             | Managed Turbo remote cache         | ✅ Full bidirectional   | Free                  | Vercel account + tokens |
| C. Self-hosted (`ducktors/turborepo-remote-cache`) | Azure Blob backend                 | ✅ Full bidirectional   | Free (existing infra) | Host a server           |

Chose **Option A** — simplest, zero external dependencies, and developer cache sharing
is not critical for a team this size. Configured in `.github/actions/pnpm-setup/action.yml`:

- **Path:** `.turbo/cache`
- **Key:** `turbo-${{ runner.os }}-${{ github.job }}-${{ github.sha }}`
- **Restore-keys:** Falls back progressively: same job first, then any job on the same OS
  (so storybook-tests can reuse build results cached by the main job)
- **`TURBO_SCM_BASE`:** Set per-event type — for PRs uses `origin/${{ github.base_ref }}`,
  for pushes uses `github.event.before` (the previous commit on the branch)

No external accounts, tokens, or costs. CI↔CI cache sharing works automatically via
GitHub’s branch-scoping rules (PR caches are unreadable by `main`). Developers retain
local Turborepo caching only.

<details>
<summary>Background: why actions/cache works for Turbo but not Nx 22+</summary>

Nx 22+ stores a machine ID inside every cache artifact and refuses artifacts from a different
machine. On GitHub Actions each job runs on a fresh runner, so restored artifacts are rejected.

Turborepo validates by content hash only — an artifact restored from any runner is accepted as
long as its hash matches the task inputs.

GitHub Actions Cache and the Turbo Remote Cache API both enforce **immutability** (409 on
existing keys) and **branch isolation** (PR caches unreadable by main), making both
structurally immune to CVE-2025-36852 (CREEP).

</details>

### 1.6 Migrate ESLint configs off `@nx/eslint-plugin` ✅

Removed `@nx/eslint-plugin` and `@nx/eslint` from dependencies. Replaced with direct
`@eslint/js`, `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, and
`eslint-plugin-jsx-a11y` flat configs. The `@nx/enforce-module-boundaries` rule was replaced
by `import/no-relative-packages` (from the already-present `eslint-plugin-import`), which
prevents relative imports that cross package boundaries. The Nx rule had the same practical
effect and already had to be disabled for `eslint.config.js` files (which legitimately import
the root config via relative path). The new rule carries forward the same exception.

All rules from `recommended` configs are fully enabled. Only `react/prop-types` (redundant
with TypeScript) and `jsx-a11y/no-autofocus` (intentional component API) are permanently
disabled.

### 1.7 Strip `nx.json` to release-only config ✅

`nx.json` now contains only the `release` section (needed until Phase 2). All
task-orchestration config, `targetDefaults`, `defaultProject`, and `plugins` were removed.
`@nx/eslint` and `@nx/eslint-plugin` removed from devDependencies. `nx` itself is kept
for release APIs. `NX_KEY` was removed from CI secrets.

### 1.8 Update CI commands ✅

All Nx task-running commands replaced with Turborepo equivalents. Additionally,
`nrwl/nx-set-shas` was removed entirely (replaced by `TURBO_SCM_BASE` in `pnpm-setup`),
and inline shell scripts for conditional job logic were replaced with dedicated TypeScript
scripts that use `turbo ls --affected`:

- `should-run-ui-tests.ts` — gates storybook-tests & chromatic jobs
- `should-deploy-testapp.ts` — gates the Next.js test app deployment

Both scripts are tested in `@internal/ci/bin/ci-decisions.test.ts`.

Current CI command mapping:

| Workflow                     | Step             | Command                                                     |
| ---------------------------- | ---------------- | ----------------------------------------------------------- |
| `ci.yml` — `main` job        | Build            | `pnpm build` (root script, runs turbo)                      |
| `ci.yml` — `main` job        | Affected listing | `pnpm turbo ls --affected`                                  |
| `ci.yml` — `storybook-tests` | Test             | `pnpm turbo run test:storybook --filter=@udir-design/react` |
| `ci.yml` — `chromatic`       | Build storybook  | `pnpm turbo run build:docs --filter=@udir-design/react`     |
| `ci.yml` — `deploy-docs`     | Build storybook  | `pnpm turbo run build:docs --filter=@udir-design/react`     |
| `release.yml`                | Build packages   | `pnpm turbo run build --filter="@udir-design/*"`            |
| `update-digdir.yml`          | Rebuild theme    | `pnpm turbo run build --filter=@udir-design/theme`          |
| `update-digdir.yml`          | Update snapshots | `pnpm test:storybook:update` (root script)                  |

The root `package.json` `build` script runs all quality checks without a `--filter` flag —
Turborepo’s `--affected` detection via `TURBO_SCM_BASE` is used for the conditional UI test
gating (via `should-run-ui-tests.ts`), not for the build itself.

### 1.9 Add root `package.json` scripts for developer commands ✅

Root scripts replace the ergonomics previously provided by `defaultProject`:

```json
"dev":                  "turbo run dev watch:typedoc serve:typedoc --filter=@udir-design/react",
"build":                "pnpm prettier:check && turbo run typecheck lint test:unit build build:docs",
"build:storybook":      "turbo run build:storybook --filter=@udir-design/react",
"build:docs":           "turbo run build:docs --filter=@udir-design/react",
"test:storybook":       "turbo run test:storybook --filter=@udir-design/react",
"test:storybook:update": "turbo run test:storybook --filter=@udir-design/react -- --update"
```

Developers use `pnpm dev`, `pnpm build:docs`, etc. CI keeps explicit
`turbo run … --filter=…` invocations for auditability.

---

## Phase 2 — Replace `nx/release` APIs ✅

### What needs replacing

The following imports in `@internal/ci/src/semantic-release.ts` must go:

```typescript
import {
  releaseChangelog as nxCreateChangelog,
  releasePublish as nxPublishRelease,
  releaseVersion as nxUpdateVersion,
} from 'nx/release';
import { VersionOptions } from 'nx/src/command-line/release/command-object';
```

And in `changelog-renderer.ts`:

```typescript
import DefaultChangelogRenderer from 'nx/release/changelog-renderer';
import { ChangelogChange } from 'nx/src/command-line/release/changelog';
```

The **existing wrapper logic** in `semantic-release.ts` is NOT being replaced — only the three
Nx function calls. The branch-to-channel mapping, pre-release tag ignoring, 0.x→1.x transition,
and `--preview-changelog`/`--dry-run` flags all stay in the wrapper.

```
┌────────────────────── semantic-release.ts ─────────────────────┐
│  Branch -> channel mapping         (custom, ~30 lines)         │
│  Pre-release tag ignoring          (custom, ~30 lines)         │
│  0.x -> 1.x transition guard       (custom, ~20 lines)         │
│  Dry-run / preview-changelog       (custom, flags)             │
│  ────────────────────────────────────────────────────────────  │
│  nxUpdateVersion()                 <- REPLACE THIS             │
│  nxCreateChangelog()               <- REPLACE THIS             │
│  nxPublishRelease()                <- REPLACE THIS             │
└────────────────────────────────────────────────────────────────┘
```

### Alternatives considered

Three alternatives were evaluated in detail. `changesets` was excluded because it requires
manual changeset files per PR (violates the commit-based changelog requirement).

| Dimension                          | `semantic-release`                                                           | `release-it`                                                | Custom impl                                              |
| ---------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Commit-based changelog             | ✅ native                                                                    | ✅ via `@release-it/conventional-changelog`                 | ✅ via `conventional-recommended-bump`                   |
| Branch-triggered releases          | ✅ native `branches` array — maps almost directly to `defaultReleaseConfigs` | ⚠️ no native branch config; handled by the existing wrapper | ✅ existing wrapper unchanged                            |
| Fixed versioning (all packages)    | ⚠️ not native; requires `@semantic-release/exec` to sync package.json files  | ⚠️ not native; requires hooks                               | ✅ trivial; you write the code                           |
| Pre-release channels               | ✅ native via branch `prerelease` field                                      | ✅ `preRelease` option                                      | ✅ existing logic unchanged                              |
| `--preview-changelog` mode         | ⚠️ minor workaround needed (see below)                                       | ⚠️ `--dry-run` skips file writes; more complex workaround   | ✅ zero change                                           |
| Git tag format (`v1.2.3`)          | ✅ already using this format, no migration                                   | ✅ same                                                     | ✅ same                                                  |
| `ignoreGitTags` / `restoreGitTags` | ✅ delete entirely — SR handles pre-release tag filtering natively           | ✅ existing wrapper logic unchanged                         | ✅ existing logic unchanged                              |
| 0.x → 1.x transition               | ⚠️ custom SR plugin (or `@semantic-release/exec` script)                     | ⚠️ wrapper code around `release-it` call                    | ✅ existing logic unchanged                              |
| `changelog-renderer.ts`            | ❌ rewrite as SR plugin or adapt preset; same logic, new entry point         | ❌ rewrite as conventional-changelog preset                 | ✅ rewrite without Nx base class; same 40 lines of logic |
| Maintenance burden                 | 🟢 well-maintained, stable                                                   | 🟢 well-maintained, active                                  | 🔴 you own it                                            |
| Implementation effort              | Medium                                                                       | Medium–High                                                 | High                                                     |

**`release-it` was ruled out** because: the `--preview-changelog` workaround is more complex than
with `semantic-release`; fixed-versioning monorepo publishing requires more hook ceremony; and the
branch logic must live in the wrapper anyway. The cost/benefit doesn't improve over the other options.

### Recommended: `semantic-release`

**Why it wins:**

- The existing code is literally described as "a simple imitation of semantic-release" in its own
  docstring. Using the real tool removes the imitation.
- `defaultReleaseConfigs` maps nearly one-to-one to `semantic-release`'s `branches` array.
- `ignoreGitTags` / `restoreGitTags` can be deleted — semantic-release filters pre-release tags
  internally and correctly.
- The git tag format is already `v1.2.3` — no migration needed.
- The `--preview-changelog` concern is minor (see below).

### Implementation plan for Phase 2

The subsections below were the original plan. Each is annotated with what was
actually done.

#### 2.1 New dependencies ✅

Added to `@internal/ci` (not root) as devDependencies:

- `semantic-release` — core release engine
- `@semantic-release/exec` — runs version sync and publish commands
- `conventional-changelog-conventionalcommits` — changelog preset

The bundled plugins (`@semantic-release/commit-analyzer`,
`@semantic-release/release-notes-generator`, `@semantic-release/github`) ship
with `semantic-release` and did not need separate installation.
`@semantic-release/changelog`, `@semantic-release/npm`, and
`@semantic-release/git` were not needed.

#### 2.2 Replace `nxUpdateVersion` ✅

Implemented as `@internal/ci/bin/sync-package-versions.ts`, called by
`@semantic-release/exec` in the `prepare` step. Discovers publishable packages
via glob + `publishConfig` check, as planned.

#### 2.3 Replace `nxCreateChangelog` ✅

`@semantic-release/release-notes-generator` with custom `writerOpts`
(in `@internal/ci/src/changelog-writer-opts.ts`). The `--preview-changelog`
workaround works as planned: programmatic call → `nextRelease.notes` →
`writeFile('CHANGELOG.md', ...)`.

#### 2.4 Replace `nxPublishRelease` ✅

Uses `@semantic-release/exec` with `pnpm stage publish` (staged publishing)
instead of direct `pnpm publish`. Packages require manual approval via
`pnpm stage approve` before going live.

#### 2.5 Handle the 0.x → 1.x transition ✅

Simplified to nothing — all packages are well past v1.0.0, so the guard was
dropped entirely.

#### 2.6 Rewrite `changelog-renderer.ts` ✅

Replaced with `writerOpts` that wraps the `conventionalcommits` preset
transform. Adds commit body text (indented, footers stripped) below each entry.
The BREAKING CHANGES section is handled natively by the preset.

#### 2.7 Branch config ✅

The `branches` array in `@internal/ci/src/semantic-release.ts` maps directly
from the former `defaultReleaseConfigs`. `sanitizeNpmTag`, `removeReleasePrefix`,
and `getReleaseConfig` were all deleted.

#### 2.8 Affect on `ignoreGitTags` / `restoreGitTags` ✅

Both deleted as planned. semantic-release handles pre-release tag filtering
natively via git notes and branch config.

**Additional discovery:** existing tags (created by Nx as annotated tags) had no
git notes, making them invisible to semantic-release. A bootstrap script
(`@internal/ci/bin/bootstrap-git-notes.ts`) was added to create the required
notes. See `RELEASING.md` §1 for details.

#### 2.9 CI changes for Phase 2 ✅

`release.yml` required no structural changes — the CLI interface (`--branch`,
`--dry-run`, `--publish`, `--preview-changelog`) was preserved.

#### 2.10 Final cleanup

Once Phase 2 is validated on a release branch:

- Remove `nx` and `@nx/js` from root `devDependencies` and pnpm catalog
- Delete `nx.json` and `changelog-renderer.ts`
- Remove `@swc-node/register` and `ts-node` (only needed by Nx)
- `@swc/core` stays (used by `@vitejs/plugin-react-swc`)
- `@swc/helpers` stays (used by `next`)

This cleanup is prepared on branch `build/remove-nx`.

---

## Summary: what Nx usage gets replaced by what

| Current Nx usage                           | Phase 1 status                                                                                             | Phase 2 replacement                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `nx affected -t ...`                       | ✅ Replaced with `turbo run ...` (no affected filter on build; affected detection drives conditional jobs) | —                                            |
| `nx run-many -t build -p "@udir-design/*"` | ✅ `turbo run build --filter="@udir-design/*"`                                                             | —                                            |
| `nx test:storybook`                        | ✅ `turbo run test:storybook --filter=@udir-design/react`                                                  | —                                            |
| `nx build:docs`                            | ✅ `turbo run build:docs --filter=@udir-design/react`                                                      | —                                            |
| `nx run @udir-design/theme:build`          | ✅ `turbo run build --filter=@udir-design/theme`                                                           | —                                            |
| `nx test:storybook -u`                     | ✅ `turbo run test:storybook ... -- --update`                                                              | —                                            |
| `defaultProject: "@udir-design/react"`     | ✅ Root `package.json` scripts + explicit `--filter` in CI                                                 | —                                            |
| `nx show projects --affected`              | ✅ `turbo ls --affected` in `should-run-ui-tests.ts`                                                       | —                                            |
| `nrwl/nx-set-shas`                         | ✅ Removed. Replaced with `TURBO_SCM_BASE`                                                                 | —                                            |
| `targetDefaults` task orchestration        | ✅ `turbo.json`                                                                                            | —                                            |
| `@nx/eslint/plugin` task inference         | ✅ Explicit `lint` scripts + migrated ESLint configs                                                       | —                                            |
| `@nx/azure-cache` / Nx Cloud               | ✅ GitHub Actions Cache                                                                                    | —                                            |
| `@nx/eslint`, `@nx/eslint-plugin`          | ✅ Removed                                                                                                 | —                                            |
| `nx/release` APIs                          | Nx kept installed, unchanged                                                                               | ✅ `semantic-release` + plugins              |
| `nx/release/changelog-renderer`            | Nx kept installed, unchanged                                                                               | ✅ `writerOpts` wrapping conventionalcommits |
| `nx.json` `release` section                | Kept as-is                                                                                                 | ✅ Deleted (config is programmatic)          |

---

## What is NOT disrupted

These items were preserved through both phases:

- The `semantic-release.ts` CLI interface — flags (`--branch`, `--dry-run`,
  `--publish`, `--preview-changelog`) are unchanged; `--git-push`,
  `--commit-version-numbers`, and `--verbose` were removed (`semantic-release`
  manages git internally and logs verbosely by default)
- The branch-to-channel strategy (`release/latest`, `release/beta`, etc.)
- `pnpm-workspace.yaml` structure
- Package `publishConfig`, `version`, and `exports` fields
- The PR preview-changelog comment feature
- `release.yml` workflow structure
