# Nx Toolchain: Turborepo Migration Reference

This document records the analysis and implementation steps for a potential migration from Nx
to Turborepo. **Migration is not a current goal** — the immediate drivers have been resolved —
but the analysis is preserved here as a reference if circumstances change.

---

## Background

The repo currently uses **Nx** for two distinct things:

1. **Task orchestration** — builds, caching, affected-project detection, ESLint target inference
2. **Release automation** — `nx release` APIs (`releaseVersion`, `releaseChangelog`,
   `releasePublish`) called from `@internal/build-tools/src/semantic-release.ts`, which
   implements a semantic-release-style flow on top of Nx

If migration were undertaken, the target would be **Turborepo** for orchestration and
**`semantic-release`** for release automation, without disrupting the release process at any
point.

**CVE-2025-36852** (CREEP) deprecated `@nx/azure-cache` in May 2026 with no patch path.
PR #796 (`build/remove-nx-azure-cache`) removed the package and replaced it with **Nx Cloud**
(free hobby tier), which resolved the CVE and the cache problem more completely than Phase 1
would have — Nx Cloud caches cross-machine including developer machines, without the
machine-ID restriction that makes `actions/cache` ineffective for Nx 22+.

**Update (June 2026):** Usage data from the first two days of June projects **838 000 credits
per month** against a free tier of 50 000. Overage pricing is $5.50 per 10 000 credits,
giving an estimated monthly cost of **~$433/month (~$5 200/year)**. This is the trigger
identified above — Nx Cloud's hobby tier limits have been exceeded by ~17×. **Phase 1 is now
justified on cost alone.** A 2–3 day migration to Turborepo + GitHub Actions Cache (Option A)
or Vercel Remote Cache (Option B) eliminates this cost entirely, paying for itself within the
first week of engineering time. Phase 2 remains independently motivated and can follow when
there is capacity.

### Key files to understand before touching anything

| File                                               | Role                                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `nx.json`                                          | Nx task defaults + release config (`release.projectsRelationship`, `release.version`, etc.)    |
| `@internal/build-tools/src/semantic-release.ts`    | The release orchestrator — calls `nx/release` APIs                                             |
| `@internal/build-tools/bin/semantic-release.ts`    | CLI entry point for the above                                                                  |
| `changelog-renderer.ts`                            | Extends `nx/release/changelog-renderer`; customises body indent and breaking-change extraction |
| `.github/workflows/release.yml`                    | Calls the semantic-release script; also runs `pnpm nx run-many`                                |
| `.github/workflows/ci.yml`                         | Runs `pnpm nx affected`, uses `nrwl/nx-set-shas`, calls `is-project-affected.sh`               |
| `.github/actions/pnpm-setup/action.yml`            | Runs `nrwl/nx-set-shas` to set `NX_BASE`/`NX_HEAD`                                             |
| `@internal/build-tools/bin/is-project-affected.sh` | Uses `nx show projects --affected`                                                             |

### Current git tag format

Tags follow `v{version}` format (e.g. `v1.0.0-beta.32`). A handful of very old
`@udir-design/react@0.0.0`-style bootstrapping tags exist but can be ignored — both `semantic-release`
and `release-it` default to `v{version}` so there is **no tag format migration needed**.

### Fixed versioning

All packages (`@udir-design/*`) are released at the same version simultaneously
(`projectsRelationship: "fixed"` in `nx.json`). This is an important constraint for Phase 2.

---

## Migration structure

A migration would split into two independent phases. Each can be implemented or skipped
independently of the other.

**Phase 1 — Turborepo for task orchestration** (estimated 2–3 days)

- Nx is kept installed as a release-only dependency, so the release path is
  untouched.
- **Strongly justified:** Nx Cloud projects ~838 000 credits/month against a
  50 000 free tier, costing ~$433/month. Turborepo + GitHub Actions Cache or
  Vercel Remote Cache is free and eliminates this cost entirely.

**Phase 2 — Replace `nx/release` APIs with `semantic-release`** (estimated 1–2 weeks)

- Combined with Phase 1, allows Nx to be removed entirely.
- Independently motivated: the existing release orchestrator is self-described
  as "a simple imitation of semantic-release" and has accumulated workarounds
  (`ignoreGitTags`, `restoreGitTags`, `sanitizeNpmTag`, the 0.x→1.x guard) that
  the real tool handles natively.
- Carries release-pipeline risk and should be scheduled deliberately, not
  opportunistically.

---

## Phase 1 — Task Orchestration (estimated: 2–3 days)

### 1.1 Install Turborepo

```bash
pnpm add -Dw turbo
```

### 1.2 Create `turbo.json`

Maps `nx.json` `targetDefaults` to Turborepo's task pipeline. Place at the workspace root.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build", "^inject"],
      "inputs": ["$TURBO_DEFAULT$"],
      "outputs": ["dist/**"]
    },
    "typecheck": {
      "dependsOn": ["build"],
      "inputs": ["$TURBO_DEFAULT$"]
    },
    "lint": {
      "inputs": ["$TURBO_DEFAULT$"]
    },
    "inject": {
      "dependsOn": ["build"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["$TURBO_DEFAULT$"]
    },
    "test:unit": {
      "dependsOn": ["build"],
      "inputs": ["$TURBO_DEFAULT$"]
    },
    "test:storybook": {
      "dependsOn": ["build"],
      "inputs": ["$TURBO_DEFAULT$"],
      "outputs": ["test-reports/storybook.json", "test-reports/storybook/**"]
    },
    "build:storybook": {
      "dependsOn": ["build"],
      "inputs": ["$TURBO_DEFAULT$"],
      "env": ["GITHUB_HEAD_REF"],
      "outputs": ["storybook-static/**"]
    },
    "build:docs": {
      "dependsOn": ["build:storybook"],
      "inputs": ["$TURBO_DEFAULT$"],
      "outputs": ["storybook-static/typedoc/**"]
    }
  }
}
```

**Note on `continuous` tasks:** Nx's `continuous: true` (used for `dev`, `watch`, `serve:*`) becomes
`"persistent": true` in Turborepo. Add these to `turbo.json` if `turbo dev` support is desired.

### 1.3 Per-package `turbo.json` overrides

Two Nx-specific input patterns require package-level config.

#### `@udir-design/react` — production named input

The Nx `production` named input excludes test/story/demo/docs files from the build cache key.
Replicate with `@udir-design/react/turbo.json`:

```json
{
  "tasks": {
    "build": {
      "inputs": [
        "$TURBO_DEFAULT$",
        "!vitest.config.ts",
        "!.storybook/**",
        "!**/*.mdx",
        "!**/*.stories.*",
        "!src/**/demo/**",
        "!src/**/docs/**"
      ]
    },
    "build:storybook": {
      "env": ["GITHUB_HEAD_REF"],
      "inputs": ["$TURBO_DEFAULT$"]
    }
  }
}
```

The Nx `{ "runtime": "git rev-parse --abbrev-ref HEAD" }` input has no Turbo equivalent. In CI
`GITHUB_HEAD_REF` already covers this. For local builds, stale storybook cache is the worst case.

#### `@udir-design/css` — cross-package inputs

`css/project.json` includes non-module CSS source files from `@udir-design/react/src/components`
in its build cache key. The css build already reads these files by relative path — see
`@udir-design/css/src/components.css`:

```css
@import '../../react/src/components/**/*.!(module.)css' layer(udir.components);
```

Adding a declared `package.json` dependency from css → react is not possible (react already depends
on css, creating a cycle). However, Turborepo's `inputs` supports relative paths that escape the
package boundary, which is the direct equivalent of Nx's `{workspaceRoot}/…` named-input syntax.

Create `@udir-design/css/turbo.json`:

```json
{
  "tasks": {
    "build": {
      "inputs": [
        "$TURBO_DEFAULT$",
        "../react/src/components/**/*.css",
        "!../react/src/components/**/*.module.css"
      ]
    }
  }
}
```

This tells Turbo to invalidate the css build cache when component CSS files change, without
requiring a package.json dependency. The three architectural benefits (independent CSS bundling,
Chromatic TurboSnap, Storybook HMR) are unaffected:

| Benefit                  | How it works                                                       | Turbo impact                        |
| ------------------------ | ------------------------------------------------------------------ | ----------------------------------- |
| Independent CSS bundling | PostCSS reads the cross-package glob at build time                 | Handled by the `inputs` entry above |
| Chromatic TurboSnap      | Traces Vite's module import graph — not a Turbo concern            | None                                |
| Storybook HMR            | Vite watches all transitively-imported files — not a Turbo concern | None                                |

#### `@udir-design/react` — `lint:cycles` task and build dependency

`react/project.json` declares a `lint:cycles` target (runs madge cycle detection) and lists it
as a local `dependsOn` for `build`. Without replicating this, Turborepo would run `build`
without the cycle-detection guard.

Add to `@udir-design/react/turbo.json`:

```json
{
  "tasks": {
    "lint:cycles": {
      "inputs": [
        "$TURBO_DEFAULT$",
        "!vitest.config.ts",
        "!.storybook/**",
        "!**/*.mdx",
        "!**/*.stories.*",
        "!src/**/demo/**",
        "!src/**/docs/**"
      ]
    },
    "build": {
      "dependsOn": ["lint:cycles"],
      "inputs": [
        "$TURBO_DEFAULT$",
        "!vitest.config.ts",
        "!.storybook/**",
        "!**/*.mdx",
        "!**/*.stories.*",
        "!src/**/demo/**",
        "!src/**/docs/**"
      ]
    },
    "build:storybook": {
      "env": ["GITHUB_HEAD_REF"],
      "inputs": ["$TURBO_DEFAULT$"]
    }
  }
}
```

The `lint:cycles` inputs mirror the `production` named input so that changes to test files or
stories don't invalidate the cycle-check cache. The `build` task's `dependsOn` in the root
`turbo.json` (`["^build", "^inject"]`) continues to apply; the per-package override adds
`lint:cycles` on top of those inherited dependencies.

#### `@udir-design/css` — `watch` script

`css/project.json` defines a `watch` target, but the script (`pnpm build --watch`) is not
in use. Remove it from `@udir-design/css/package.json`. There is nothing to carry forward
to `@udir-design/css/turbo.json`. The `build` task override is still needed:

```json
{
  "tasks": {
    "build": {
      "inputs": [
        "$TURBO_DEFAULT$",
        "../react/src/components/**/*.css",
        "!../react/src/components/**/*.module.css"
      ]
    }
  }
}
```

#### `test-apps/nextjs` — non-standard build output

Next.js writes its build output to `.next`, not `dist`. Without a per-package override the
Turborepo cache captures the wrong directory and every build is a miss. Create
`test-apps/nextjs/turbo.json`:

```json
{
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
}
```

The `!.next/cache/**` exclusion follows Turborepo's own Next.js guidance — caching Next's
internal build cache inside the Turbo cache would cause unnecessary cache churn.

#### `@udir-design/react` — `dev` task and the `{ projects: "!css" }` dependency

`react/project.json` declares `dev.dependsOn` as:

```json
[
  "build",
  { "projects": "!css", "target": "^watch" },
  "lint:cycles",
  "serve:typedoc"
]
```

`css` is the only package with a `watch` script, and it is not in use. Remove the script
from `@udir-design/css/package.json` (covered in the subsection above) and drop `^watch`
from the `dev` task entirely:

```json
"dev": {
  "persistent": true,
  "dependsOn": ["build", "lint:cycles", "serve:typedoc"]
}
```

`serve:typedoc` also needs a `turbo.json` entry (persistent, no dependsOn).

### 1.4 Add `lint` scripts to every package

`@nx/eslint/plugin` currently auto-infers `lint` targets. Turborepo requires explicit `package.json`
scripts. **No package currently has a `lint` script.** Add to each:

```json
"lint": "eslint . --max-warnings 0"
```

Packages requiring this:

- `@udir-design/react`
- `@udir-design/css`
- `@udir-design/theme`
- `@udir-design/icons`
- `@udir-design/symbols`
- `design-tokens` (`@udir-design/tokens`)
- `@internal/build-tools`

### 1.5 Remote caching

`@nx/azure-cache` was removed and replaced with **Nx Cloud** (free hobby tier) in PR #796.
Caching across CI runs and developer machines is already working — but at a projected cost of
~$433/month (838 000 credits/month against a 50 000 free tier at $5.50/10 000 overage).

**Important:** Nx Cloud caches tasks dispatched by Nx's own task runner. Once Phase 1 is
complete, tasks run through Turborepo instead, so Nx Cloud will no longer cache them. This
step must be implemented alongside Phase 1 — do not merge Phase 1 without also choosing and
configuring one of the options below. All options below are **free**, eliminating the Nx Cloud
overage cost entirely.

The technical background below explains why `actions/cache` (Option A) works for Turborepo
even though it did not work as a direct replacement for `@nx/azure-cache` under Nx 22+.

#### Why `actions/cache` works for Turborepo but not for Nx 22+

Nx 22+ stores a machine ID inside every cache artifact it writes and refuses to use artifacts
produced by a different machine. On GitHub Actions each job runs on a fresh ephemeral runner,
so any artifact restored from `actions/cache` is rejected. The bypass env var
(`NX_REJECT_UNKNOWN_LOCAL_CACHE=0`) only applies to the legacy Nx file system cache deprecated
in Nx 20.

Turborepo validates artifacts by content hash, not by machine ID. An artifact restored from
`actions/cache` on any runner is accepted as long as its hash matches the task inputs. Cross-run
and cross-job caching both work correctly.

#### Cache security comparison

Nx Cloud's security model (what we had) provided:

1. **Personal access tokens** for developers — read-only by default, can't poison the cache
2. **Branch-scoped isolation** — PR branches write to an isolated cache that `main` never reads
3. **Release workflow skips cache** — deployed artifacts are always built from scratch
4. **End-to-end encryption** — artifacts stored encrypted at rest

The table below compares how each Turborepo caching option maps to these properties:

| Security property                           | Nx Cloud (previous)                    | Option A (GitHub Actions Cache)                                                       | Option B (Vercel Remote Cache)                                                                                                              |
| ------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Immutability** (can't overwrite entries)  | ✅ API-enforced                        | ✅ GitHub returns 409 on existing keys                                                | ✅ Turbo Remote Cache API spec requires 409                                                                                                 |
| **Branch isolation** (PR can't poison main) | ✅ Scoped write tokens                 | ✅ GitHub's branch-scoping rules: PR can read from main, but main never reads from PR | ⚠️ No built-in branch scoping — but immutability means existing entries can't be overwritten, and different inputs produce different hashes |
| **Developer write access**                  | Read-only by default                   | N/A (developers don't share CI cache)                                                 | Read-write after `turbo login` — acceptable for internal teams                                                                              |
| **Artifact integrity**                      | End-to-end encryption                  | Content-hash validation by Turbo                                                      | HMAC-SHA256 artifact signing (`remoteCache.signature: true`)                                                                                |
| **Release isolation**                       | Token not provided to release workflow | Don't set up cache step in release workflow                                           | Don't set `TURBO_TOKEN` in release workflow                                                                                                 |
| **Developer machine sharing**               | ✅ Developers read CI cache            | ❌ Local cache only                                                                   | ✅ Full bidirectional sharing                                                                                                               |
| **External dependency**                     | Nx Cloud account                       | None (GitHub-native)                                                                  | Vercel account (free, no hosting needed)                                                                                                    |
| **Cost**                                    | ~$433/month at current usage           | Free                                                                                  | Free                                                                                                                                        |

**Key insight:** The main cache poisoning vector — a malicious PR writes bad artifacts that
`main` later reads — is addressed differently by each option:

- **GitHub Actions Cache:** Structurally impossible. GitHub's branch-scoping rules make PR
  caches unreadable by `main`. Only the reverse direction works.
- **Vercel Remote Cache:** Addressed by immutability + content addressing. A PR computes
  different hashes than main (different inputs), so main never reads PR-produced entries.
  Even if hashes collided, immutability prevents overwriting existing entries.

This repository is public (open source) but does not accept contributions from outside the
Udir organization. The relevant security boundary is who can trigger CI workflows with write
access — not whether the source is readable. GitHub never exposes Actions secrets to workflows
triggered by fork PRs, so an external actor cannot access `TURBO_TOKEN` or write to the GitHub
Actions Cache. Both options provide equivalent security to the Nx Cloud setup. The release
workflow continues to build without cache in either case. If the contribution policy ever
changes, revisit this — but since fork PRs run without secrets by default, both options remain
safe even in that scenario.

#### CREEP immunity

Turborepo's Remote Cache API spec explicitly requires `409 Conflict` when a client writes to a
key that already exists — the property that makes cache poisoning impossible. `@nx/azure-cache`
used raw Azure Blob Storage, which allows overwrites; the Turborepo spec does not.

`actions/cache` has the same immutability guarantee (existing keys return 409), and GitHub's
branch-scoping rules mean a PR branch's cache is never readable by `main` — only the reverse.
Both options below are structurally immune to CREEP.

#### Option A — GitHub Actions Cache (recommended)

No server or credentials required. Add to the `pnpm-setup` composite action:

```yaml
- uses: actions/cache@v4
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```

Turborepo validates every cache entry by content hash independently of which directory
`actions/cache` restores — so even a cache from a different commit will correctly hit unchanged
tasks and miss changed ones. The `sha` in the key gives exact hits for job re-runs and for
parallel jobs (e.g. `storybook-tests` and `chromatic`) sharing output from the same `main` job.

Developers retain local Turborepo caching (`.turbo/` directory) but do not share a remote
cache. If warm local builds matter, use Option B or C instead.

#### Option B — Vercel Remote Cache (free, managed)

Vercel provides a managed remote cache free on all plans, including teams that do not host on
Vercel. Zero infrastructure to operate; includes HMAC-SHA256 artifact signing out of the box.

In CI, set `TURBO_TOKEN` and `TURBO_TEAM` as GitHub Actions secrets (obtained from
`vercel.com/account/tokens`). Developers run `turbo login && turbo link` once to share the
same cache locally.

This closes the one gap that Option A has: developer machines share the CI cache, so a fresh
clone gets a warm first build.

#### Option C — Self-hosted on Azure (`ducktors/turborepo-remote-cache`)

Deploy [`ducktors/turborepo-remote-cache`](https://github.com/ducktors/turborepo-remote-cache),
which implements the Turborepo Remote Cache API with Azure Blob Storage as the backend. Reuses
the existing `AZURE_STORAGE_CONNECTION_STRING` secret. Requires hosting a small server (Azure
Container App or Function) and adding `TURBO_API`, `TURBO_TOKEN`, `TURBO_TEAM` as CI secrets.

Given that Option B is free and operationally equivalent, Option C is only worth pursuing if
there is a policy reason to keep data within the team's own Azure subscription.

### 1.6 Migrate ESLint configs off `@nx/eslint-plugin`

Removing `@nx/eslint-plugin` from devDependencies (done in step 1.7) requires updating six
`eslint.config.js` files first. All usages fall into three Nx flat-config shapes, each with a
direct replacement using packages already present in root `devDependencies`.

#### `flat/base` + `flat/typescript` + `flat/javascript` (root `eslint.config.js`)

These three configs collectively set up the Nx plugin, TypeScript parser, and recommended
TypeScript rules. Replace with `typescript-eslint` directly (already a root devDependency):

```diff
-import nxEslintPlugin from '@nx/eslint-plugin';
+import tseslint from 'typescript-eslint';
+import js from '@eslint/js';

 // in the defineConfig(...) call:
-nxEslintPlugin.configs['flat/base'],
-nxEslintPlugin.configs['flat/typescript'],
-nxEslintPlugin.configs['flat/javascript'],
+js.configs.recommended,
+...tseslint.configs.recommended,
```

#### `@nx/enforce-module-boundaries` rule (root `eslint.config.js`)

Remove this rule entirely. The current constraints are effectively a no-op — `sourceTag: '*'`
depending on `'*'` means any package may depend on any other, which enforces nothing beyond what
TypeScript's module resolution already catches. The rule also requires Nx's project graph at
runtime and has no equivalent without Nx. The existing per-package `no-restricted-imports` rules
and the `lint:cycles` madge check provide the actual boundary enforcement in use.

#### `flat/react` (`@udir-design/react`, `@udir-design/symbols`, `test-apps/vite`, `test-apps/vite-vanilla`)

Replace with `eslint-plugin-react` and `eslint-plugin-react-hooks` directly (both already in
root `devDependencies`):

```diff
-import nxEslintPlugin from '@nx/eslint-plugin';
+import reactPlugin from 'eslint-plugin-react';
+import reactHooksPlugin from 'eslint-plugin-react-hooks';

 // in the defineConfig(...) call:
-nxEslintPlugin.configs['flat/react'],
+reactPlugin.configs.flat.recommended,
+reactHooksPlugin.configs['recommended-latest'],
+{ settings: { react: { version: 'detect' } } },
```

#### `flat/react-typescript` (`test-apps/nextjs/eslint.config.js`)

`flat/react-typescript` is a stricter variant of `flat/react` with additional TypeScript-specific
React rules. The Next.js test app already applies several `eslint-config-next` configs that cover
React linting; the `flat/react-typescript` replacement is the same as `flat/react` above. Review
whether any rules provided by `flat/react-typescript` but not by `flat/react` are desirable in
the Next.js context — since this is a test app (not a published package), a lighter config is
acceptable.

#### Validation

After making these changes, run `pnpm lint` across all packages and compare the rule set and
error output against a pre-migration baseline. The replacement configs should produce identical
warnings and errors for any known-bad code.

### 1.7 Strip `nx.json` to release-only config

Remove all task-orchestration config from `nx.json`, keeping only the `release` section (which
Phase 2 will remove). The stripped file should look like:

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "release": {
    "projectsRelationship": "fixed",
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github",
        "renderer": "{workspaceRoot}/changelog-renderer.ts",
        "renderOptions": { "authors": false }
      }
    },
    "version": {
      "conventionalCommits": true,
      "fallbackCurrentVersionResolver": "disk"
    }
  }
}
```

Remove from root `devDependencies`: `@nx/eslint`, `@nx/eslint-plugin`.
**Keep `nx`** — still needed for release APIs until Phase 2.
Remove the `plugins` array from `nx.json` (the `@nx/eslint/plugin` entry).
`NX_KEY` was already removed from `pnpm-workspace.yaml` and CI secrets on `build/remove-nx-azure-cache`.

### 1.8 Update CI commands

Because `nx` is still installed in Phase 1, `is-project-affected.sh`, `nrwl/nx-set-shas`, and
`pnpm nx show projects --affected` all continue to work **without changes**. Only the
task-running commands need updating.

Note: several commands rely on `nx.json`'s `defaultProject: "@udir-design/react"` to infer which
package to run a task in. When `nx.json` is stripped, that default disappears — Turbo replacements
need explicit `--filter` flags.

**`release.yml`:**

```diff
- run: pnpm nx run-many -t build -p "@udir-design/*"
+ run: pnpm turbo run build --filter="@udir-design/*"
```

**`ci.yml` — `storybook-tests` job:**

```diff
- run: pnpm nx test:storybook
+ run: pnpm turbo run test:storybook --filter=@udir-design/react
```

**`ci.yml` — `chromatic` job (Build storybook step):**

```diff
- run: pnpm nx build:docs
+ run: pnpm turbo run build:docs --filter=@udir-design/react
```

**`ci.yml` — `deploy-docs` job (Build storybook step):**

```diff
- run: pnpm nx build:docs
+ run: pnpm turbo run build:docs --filter=@udir-design/react
```

**`update-digdir.yml` — Rebuild theme step:**

```diff
- run: pnpm nx run @udir-design/theme:build
+ run: pnpm turbo run build --filter=@udir-design/theme
```

**`update-digdir.yml` — Update snapshots step:**

```diff
- run: pnpm nx test:storybook -u
+ run: pnpm turbo run test:storybook:update --filter=@udir-design/react
```

Add a dedicated script to `@udir-design/react/package.json`:

```json
"test:storybook:update": "vitest --project storybook --update-snapshots"
```

Add a corresponding task to the root `turbo.json`:

```json
"test:storybook:update": {
  "cache": false,
  "dependsOn": ["build"]
}
```

> `cache: false` is preferable to a two-step bash chain
> (`turbo run build --filter=...@udir-design/react && pnpm --filter=@udir-design/react run test:storybook -- -u`).
> The two-step approach relies on whoever edits the workflow knowing to use the `...` filter syntax to
> get dependency builds — easy to drop accidentally. Declaring `cache: false` with `dependsOn` in
> `turbo.json` makes the intent auditable in config and gives developers the same single command
> locally as CI uses.

**Root `package.json` build script:**

```diff
- "build": "pnpm prettier:check && pnpm nx affected -t typecheck lint test:unit build build:docs"
+ "build": "pnpm prettier:check && pnpm turbo run typecheck lint test:unit build build:docs --filter=...[origin/main]"
```

> `pnpm nx affected` used `NX_BASE` set by `nrwl/nx-set-shas`, which resolves to the last
> successful CI commit rather than `origin/main`. This is smarter: it avoids re-running tasks
> that already passed in a previous CI run on the same branch. If preserving this behaviour
> matters, set a `BASE_SHA` env var in CI (derived from the GitHub API or a stored artifact)
> and use `--filter=...[$BASE_SHA]` instead of `--filter=...[origin/main]`.

### 1.9 Add root `package.json` scripts for developer commands

Nx's `defaultProject: "@udir-design/react"` in `nx.json` lets developers run
`pnpm nx dev`, `pnpm nx build:docs`, etc. without specifying a package. Stripping
`nx.json` removes that default, and requiring developers to type
`pnpm turbo run dev --filter=@udir-design/react` is a significant ergonomic regression for the
most common daily task.

Add the following to the root `package.json` `scripts` section:

```json
"dev":                  "turbo run dev --filter=@udir-design/react",
"build:storybook":      "turbo run build:storybook --filter=@udir-design/react",
"build:docs":           "turbo run build:docs --filter=@udir-design/react",
"test:storybook":       "turbo run test:storybook --filter=@udir-design/react",
"test:storybook:update": "turbo run test:storybook:update --filter=@udir-design/react"
```

Developers then use `pnpm dev`, `pnpm build:docs`, etc. — matching today's `pnpm nx dev`
experience exactly. Running through turbo means dependency builds still happen first (via
`dependsOn`), so the behaviour is identical to the current Nx flow.

CI steps in `ci.yml` keep their explicit `turbo run … --filter=…` invocations rather than
calling these root scripts. CI transparency matters more than CI ergonomics: an explicit
`turbo run test:storybook --filter=@udir-design/react` is auditable at a glance in the
workflow YAML, whereas `pnpm test:storybook` hides what package is being targeted.

> The `turbo run build --filter=@udir-design/theme` command in `update-digdir.yml` is not a
> developer command and does not need a root script equivalent.

---

## Phase 2 — Replace `nx/release` APIs (estimated: 1–2 weeks)

### What needs replacing

The following imports in `@internal/build-tools/src/semantic-release.ts` must go:

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
┌─────────────────── semantic-release.ts ───────────────────┐
│  Branch → channel mapping       (custom, ~30 lines)        │
│  Pre-release tag ignoring        (custom, ~30 lines)        │
│  0.x → 1.x transition guard     (custom, ~20 lines)        │
│  Dry-run / preview-changelog     (custom, flags)            │
│  ────────────────────────────────────────────────────────  │
│  nxUpdateVersion()               ← REPLACE THIS            │
│  nxCreateChangelog()             ← REPLACE THIS            │
│  nxPublishRelease()              ← REPLACE THIS            │
└────────────────────────────────────────────────────────────┘
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

#### 2.1 New dependencies

```bash
pnpm add -Dw semantic-release \
  @semantic-release/commit-analyzer \
  @semantic-release/release-notes-generator \
  @semantic-release/changelog \
  @semantic-release/github \
  @semantic-release/npm \
  @semantic-release/exec \
  @semantic-release/git \
  conventional-changelog-conventionalcommits
```

#### 2.2 Replace `nxUpdateVersion`

`semantic-release`'s `commit-analyzer` plugin determines the bump type. The new version is
available as `nextRelease.version` in the semantic-release lifecycle. For fixed versioning, use
`@semantic-release/exec` in the `prepare` step to propagate the version to all package.json files:

```bash
# scripts/sync-package-versions.sh ${nextRelease.version}
VERSION=$1
for pkg in @udir-design/react @udir-design/css @udir-design/icons @udir-design/symbols @udir-design/theme design-tokens; do
  node -e "
    const fs = require('fs');
    const p = '$pkg/package.json';
    const j = JSON.parse(fs.readFileSync(p));
    j.version = '$VERSION';
    fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
  "
done
```

#### 2.3 Replace `nxCreateChangelog`

`@semantic-release/changelog` writes `CHANGELOG.md`. `@semantic-release/github` creates the GitHub
release. These are drop-in replacements via the plugin config.

**`--preview-changelog` workaround:**

`semantic-release` with `dryRun: true` generates `nextRelease.notes` but does not write
`CHANGELOG.md`. The existing preview step in `ci.yml` reads from `CHANGELOG.md`. The fix is
to call semantic-release programmatically and write the file manually:

```typescript
// In semantic-release.ts, for the previewChangelog path:
import semanticRelease from 'semantic-release';
import { writeFile } from 'node:fs/promises';

const result = await semanticRelease({ dryRun: true, ...config });
if (result && result.nextRelease?.notes) {
  await writeFile('CHANGELOG.md', result.nextRelease.notes, 'utf-8');
}
// preview-changelogs.sh then reads CHANGELOG.md as today
```

#### 2.4 Replace `nxPublishRelease`

`@semantic-release/npm` can publish a single package. For publishing all five packages from one
run, use `@semantic-release/exec` in the `publish` step:

```bash
# scripts/publish-all.sh ${nextRelease.channel}
TAG=${1:-latest}
pnpm -r --filter "@udir-design/*" publish --no-git-checks --tag "$TAG" --access public
```

Or configure multiple `@semantic-release/npm` steps, one per package directory.

#### 2.5 Handle the 0.x → 1.x transition

The existing transition guard in `updateVersion()` in `semantic-release.ts` detects when all
packages are at `0.x.x` and forces a bump to `1.0.0`. With `semantic-release`, implement this as
an `analyzeCommits` plugin override or a `verifyConditions` hook that overrides `nextRelease.version`
when the current version is `0.x.x`. Alternatively — since all packages are well past `v1.0.0` —
this guard can be simplified to a version assertion that exits early if it detects a `0.x.x` state,
rather than trying to auto-correct it.

#### 2.6 Rewrite `changelog-renderer.ts`

The current file extends `nx/release/changelog-renderer` and overrides two methods:

- `formatChange`: adds body text (indented) below each changelog entry
- `extractBreakingChangeExplanation`: strips git footers and indents the explanation

Without the Nx base class, rewrite this as a `@semantic-release/release-notes-generator` custom
template or a `generateNotes` plugin. The 40 lines of logic (footer stripping, indentation) remain
the same — only the entry point changes. Since the user is open to changelog format changes,
starting from a standard conventional-commits template and iterating is also acceptable.

#### 2.7 Branch config

Replace `defaultReleaseConfigs` in `semantic-release.ts` with a `branches` array passed to
`semanticRelease(...)`. The mapping is:

```typescript
// Before (current defaultReleaseConfigs)
{ name: 'release/+([0-9])?(.{+([0-9]),x}).x' }
{ name: 'release/latest' }
{ name: 'release/next' }
{ name: 'release/next-major' }
{ name: 'release/beta',  prerelease: true }
{ name: 'release/alpha', prerelease: true }

// After (semantic-release branches)
{ name: 'release/+([0-9])?(.{+([0-9]),x}).x' }  // same glob syntax
{ name: 'release/latest' }
{ name: 'release/next',       prerelease: 'next',       channel: 'next' }
{ name: 'release/next-major', prerelease: 'next-major', channel: 'next-major' }
{ name: 'release/beta',       prerelease: 'beta',       channel: 'beta' }
{ name: 'release/alpha',      prerelease: 'alpha',      channel: 'alpha' }
```

The `sanitizeNpmTag` and `removeReleasePrefix` helpers in the current file become unnecessary —
semantic-release handles channel naming from the branch config directly.

The `getReleaseConfig` function (which uses `micromatch`) also becomes unnecessary — semantic-release
runs only on branches that match the `branches` array, and exits cleanly otherwise.

#### 2.8 Affect on `ignoreGitTags` / `restoreGitTags`

**Delete both functions.** Semantic-release does not pick up pre-release tags as the base version
for stable releases. This is core behaviour, not an edge case. The manual tag deletion/restoration
dance is a workaround for the fact that the current system (Nx release) doesn't have this built in.

#### 2.9 CI changes for Phase 2

**`release.yml`** — the `semantic-release.ts` CLI entry point and its flags (`--branch`,
`--dry-run`, `--publish`, `--preview-changelog`) can remain unchanged if the new implementation
honours the same interface. The `semantic-release` package is then an internal dependency of
the script, not something invoked directly by CI.

**`pnpm-setup/action.yml`** — once `nx` is removed, delete the `nrwl/nx-set-shas` step.
Replace with a simpler git-base calculation if affected detection is still needed
(see Phase 1 notes on `is-project-affected.sh`).

**`is-project-affected.sh`** — replace `nx show projects --affected` with a Turbo-native check:

```bash
#!/usr/bin/env bash
PACKAGE=$1
BASE="${BASE:-origin/main}"
pnpm turbo run build --filter="$PACKAGE" --dry=json 2>/dev/null \
  | jq '.tasks | any(.[]; .cache.status != "HIT")' 2>/dev/null \
  || printf false
```

Or a simpler git-based check (doesn't account for transitive deps via the task graph):

```bash
#!/usr/bin/env bash
PACKAGE=$1
BASE="${BASE:-origin/main}"
PKG_DIR=$(pnpm list --filter "$PACKAGE" --depth 0 --json | jq -r '.[0].path' | sed "s|$(pwd)/||")
git diff --name-only "$BASE"...HEAD | grep -q "^$PKG_DIR/" && printf true || printf false
```

#### 2.10 Final cleanup

Once Phase 2 is complete and CI is green on a release branch:

- Remove `nx` from root `devDependencies`
- Remove the entire `release` section from `nx.json` (or delete `nx.json` entirely)
- Remove `@nx/eslint`, `@nx/eslint-plugin` from the `pnpm-workspace.yaml` catalog
- Remove `NX_KEY` secret from GitHub Actions and from `.github/workflows/release.yml` env block
- Delete all `project.json` files (they are Nx-only; Turbo reads from `package.json` scripts)
- Rename `.github/actions/pnpm-setup/action.yml` description from "Prepare pnpm & Nx" if desired

---

## Summary: what Nx usage gets replaced by what

| Current Nx usage                           | Location                                          | Phase 1 replacement                                                                                                                     | Phase 2 replacement                            |
| ------------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `nx affected -t ...`                       | `package.json` build script                       | `turbo run ... --filter=...[origin/main]`                                                                                               | —                                              |
| `nx run-many -t build -p "@udir-design/*"` | `release.yml`                                     | `turbo run build --filter="@udir-design/*"`                                                                                             | —                                              |
| `nx test:storybook`                        | `ci.yml` (storybook-tests job)                    | `turbo run test:storybook --filter=@udir-design/react`                                                                                  | —                                              |
| `nx build:docs`                            | `ci.yml` (chromatic + deploy-docs jobs)           | `turbo run build:docs --filter=@udir-design/react`                                                                                      | —                                              |
| `nx run @udir-design/theme:build`          | `update-digdir.yml`                               | `turbo run build --filter=@udir-design/theme`                                                                                           | —                                              |
| `nx test:storybook -u`                     | `update-digdir.yml`, local dev                    | New `test:storybook:update` task (`cache: false`) + root `package.json` script                                                          | —                                              |
| `defaultProject: "@udir-design/react"`     | `nx.json` (implicit in several CI commands above) | Root `package.json` scripts for dev commands; explicit `--filter` flags in CI                                                           | —                                              |
| `nx show projects --affected`              | `ci.yml`, `is-project-affected.sh`                | Unchanged (Nx still installed)                                                                                                          | Turbo `--dry=json` + jq, or git-based          |
| `nrwl/nx-set-shas`                         | `pnpm-setup` action                               | Unchanged                                                                                                                               | Remove; use `origin/main` as base              |
| `targetDefaults` task orchestration        | `nx.json`                                         | `turbo.json`                                                                                                                            | —                                              |
| `@nx/eslint/plugin` task inference         | `nx.json` plugins                                 | Add `lint` scripts to each `package.json` (step 1.4); migrate ESLint configs to `typescript-eslint` + explicit react plugins (step 1.6) | —                                              |
| `@nx/azure-cache` remote cache             | `nx.json`, CI secrets                             | GitHub Actions cache or `turborepo-remote-cache`                                                                                        | —                                              |
| `@nx/eslint`, `@nx/eslint-plugin`          | Root devDeps                                      | Remove                                                                                                                                  | —                                              |
| `nx/release` APIs                          | `semantic-release.ts`                             | Nx kept installed, unchanged                                                                                                            | `semantic-release` + plugins                   |
| `nx/release/changelog-renderer`            | `changelog-renderer.ts`                           | Nx kept installed, unchanged                                                                                                            | Custom renderer (same logic, no Nx base class) |
| `nx.json` `release` section                | `nx.json`                                         | Kept as-is                                                                                                                              | Removed                                        |
| `project.json` files                       | Each package                                      | Kept (Nx still installed)                                                                                                               | Delete all                                     |

---

## What is NOT disrupted at any point

- The `semantic-release.ts` CLI interface — flags (`--branch`, `--dry-run`, `--publish`,
  `--preview-changelog`, `--git-push`, etc.) are unchanged throughout
- The script invocation in `release.yml` is unchanged; it gets one command replacement (the
  `nx run-many` build step). `ci.yml` and `update-digdir.yml` also get command replacements,
  but the behaviours those commands support (running tests, building docs, updating snapshots)
  are fully preserved
- The branch-to-channel strategy (`release/latest`, `release/beta`, etc.) is preserved in Phase 2
  via semantic-release's native `branches` config
- `pnpm-workspace.yaml` is untouched
- Package `publishConfig`, `version`, and `exports` fields are untouched
- The PR preview-changelog comment feature works throughout
