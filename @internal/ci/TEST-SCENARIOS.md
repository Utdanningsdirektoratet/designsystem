# Test scenarios for semantic-release migration

Use these scenarios to verify the release pipeline behaves correctly after
migrating from Nx release to semantic-release.

## Prerequisites

```bash
# Make sure dependencies are installed
pnpm install

# Build all publishable packages (required before publishing)
pnpm turbo run build --filter="@udir-design/*"
```

### Sandbox setup

Most scenarios need a local bare repo with a tagged baseline that
semantic-release can recognise. Run this once before starting:

```bash
# Create a temporary bare repo with current HEAD as release/latest
git init --bare /tmp/test-remote.git
git push /tmp/test-remote.git HEAD:refs/heads/release/latest --tags
git --git-dir=/tmp/test-remote.git symbolic-ref HEAD refs/heads/release/latest

# Tag HEAD as v1.0.0 baseline with a semantic-release git note
git tag v1.0.0 HEAD
git notes --ref semantic-release-v1.0.0 add -f -m '{"channels":[null]}' HEAD
git push /tmp/test-remote.git v1.0.0 "refs/notes/semantic-release-v1.0.0"

# Sync the local release/latest branch (required for tag discovery)
git branch -f release/latest HEAD
```

Then pass `--repository-url file:///tmp/test-remote.git` to all commands.
After each scenario, update the local branch and remote:

```bash
# After creating test commit(s):
git branch -f release/latest HEAD
git push /tmp/test-remote.git HEAD:refs/heads/release/latest --force

# After verifying results:
git reset HEAD~N  # N = number of test commits
git branch -f release/latest HEAD
rm -f CHANGELOG.md
```

### Cleanup

```bash
git tag -d v1.0.0
git notes --ref semantic-release-v1.0.0 remove HEAD 2>/dev/null
git branch -f release/latest origin/release/latest
rm -rf /tmp/test-remote.git CHANGELOG.md
```

---

## Scenario 1: Dry-run on `release/latest` (no releasable commits)

Verifies that the script exits cleanly when HEAD has no new `feat:` or `fix:`
commits since the last tag.

```bash
./@internal/ci/bin/semantic-release.ts --branch release/latest --dry-run
```

**Expected:** "No release is needed — no relevant commits found."

---

## Scenario 2: Preview changelog with a feature commit

Simulates the PR changelog preview. After running, `CHANGELOG.md` should exist
at the workspace root with the generated notes.

```bash
# Create a dummy commit to test with (on a test branch)
git stash  # if needed
git commit --allow-empty -m "feat(button): add new size prop

This allows consumers to choose between small, medium, and large.
The default remains medium for backward compatibility."

# Run preview
./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog

# Check the output
cat CHANGELOG.md
```

**Expected:**

- `CHANGELOG.md` contains a `## v…` heading with the next version
- The entry includes "add new size prop" with body text indented below
- No git tags are created
- No npm publish happens

```bash
# Cleanup
git reset HEAD~1
rm -f CHANGELOG.md
```

---

## Scenario 3: Preview changelog with a BREAKING CHANGE

```bash
git commit --allow-empty -m "feat(button)!: change default variant

The default variant changes from outline to filled.

BREAKING CHANGE: The default variant for Button is now \"filled\"
instead of \"outline\". Update your code if you relied on the
implicit default."

./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog

cat CHANGELOG.md
```

**Expected:**

- `CHANGELOG.md` has a "⚠️ Breaking Changes" section
- The breaking change explanation is listed
- The version bump should be major (e.g. v2.0.0 if currently v1.x.x)

```bash
git reset HEAD~1
rm -f CHANGELOG.md
```

---

## Scenario 4: Only `fix:` commits → patch bump

```bash
git commit --allow-empty -m "fix(input): resolve focus ring issue

The focus ring was not visible in high-contrast mode."

./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog

cat CHANGELOG.md
```

**Expected:**

- Version is a patch bump (e.g. 1.0.x → 1.0.x+1)
- Listed under "🩹 Fixes"
- Body text is included

```bash
git reset HEAD~1
rm -f CHANGELOG.md
```

---

## Scenario 5: Non-releasable commits only

```bash
git commit --allow-empty -m "chore: update deps"
git commit --allow-empty -m "ci: fix workflow"
git commit --allow-empty -m "docs: update readme"

./@internal/ci/bin/semantic-release.ts --branch release/latest --dry-run
```

**Expected:** "No release is needed — no relevant commits found."

```bash
git reset HEAD~3
```

---

## Scenario 6: `perf:` commit → patch bump

```bash
git commit --allow-empty -m "perf: optimize rendering

Reduces re-renders by memoizing internal state."

./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog

cat CHANGELOG.md
```

**Expected:**

- Version is a patch bump (e.g. 1.0.x → 1.0.x+1)
- Listed under "🏎 Performance Improvements"
- Body text is included

```bash
git reset HEAD~1
rm -f CHANGELOG.md
```

---

## Scenario 7: Pre-release channel (beta)

```bash
git commit --allow-empty -m "feat: beta feature"

./@internal/ci/bin/semantic-release.ts --branch release/beta --preview-changelog

cat CHANGELOG.md
```

**Expected:**

- Version includes a pre-release identifier (e.g. `1.1.0-beta.1`)
- Channel is "beta"

```bash
git reset HEAD~1
rm -f CHANGELOG.md
```

---

## Scenario 8: Version sync to package.json files

```bash
# Test the sync script directly
pnpm tsx @internal/ci/bin/sync-package-versions.ts 99.99.99

# Check that publishable packages were updated
grep '"version"' @udir-design/react/package.json
grep '"version"' @udir-design/css/package.json
grep '"version"' @udir-design/icons/package.json
grep '"version"' @udir-design/symbols/package.json
grep '"version"' @udir-design/theme/package.json

# Verify non-publishable packages were NOT updated
grep '"version"' design-tokens/package.json
```

**Expected:**

- All 5 publishable packages show `"version": "99.99.99"`
- `design-tokens` still shows its original version

```bash
# Restore
git checkout -- @udir-design/*/package.json
```

---

## Scenario 9: Unmatched branch → no release

```bash
./@internal/ci/bin/semantic-release.ts --branch main --dry-run
```

**Expected:** "No release is needed" or semantic-release exits because `main`
does not match any configured release branch.

---

## Scenario 10: Mixed commit types in one release

```bash
git commit --allow-empty -m "feat: add dialog component"
git commit --allow-empty -m "fix: correct button padding"
git commit --allow-empty -m "chore: update lockfile"
git commit --allow-empty -m "docs: document dialog usage"

./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog

cat CHANGELOG.md
```

**Expected:**

- Features section contains "add dialog component"
- Bug Fixes section contains "correct button padding"
- No entries for chore or docs commits
- Version is a minor bump (because of feat)

```bash
git reset HEAD~4
rm -f CHANGELOG.md
```

---

## Scenario 11: `revert:` commit (via `git revert`) → patch bump

The commit-analyzer rule `{ revert: true, release: "patch" }` matches on the
`commit.revert` property, which `conventional-commits-parser` sets when the
body contains `"This reverts commit <hash>"`. A plain `revert:` subject without
that body pattern would NOT trigger a bump.

> **Important:** The original commit must already be "released" (before the
> baseline tag). `conventional-commits-filter` removes revert + original pairs
> that both appear in the same release window, resulting in no bump.
> Also, `git revert` requires a real file change — `--allow-empty` commits
> cannot be reverted.

```bash
# 1. Create a commit with a real file change
echo "tooltip component" > .test-tooltip-placeholder
git add .test-tooltip-placeholder
git commit -m "feat: add tooltip"

# 2. Move the baseline tag to include this commit (simulates it being released)
git tag -d v1.0.0
git notes --ref semantic-release-v1.0.0 remove HEAD~ 2>/dev/null
git tag v1.0.0 HEAD
git notes --ref semantic-release-v1.0.0 add -f -m '{"channels":[null]}' HEAD
git push /tmp/test-remote.git v1.0.0 --force "refs/notes/semantic-release-v1.0.0" \
  HEAD:refs/heads/release/latest --force

# 3. Revert the feat (this commit is AFTER the tag)
git revert --no-edit HEAD
git branch -f release/latest HEAD
git push /tmp/test-remote.git HEAD:refs/heads/release/latest --force

./@internal/ci/bin/semantic-release.ts --branch release/latest --preview-changelog \
  --repository-url file:///tmp/test-remote.git

cat CHANGELOG.md
```

**Expected:**

- Version is a patch bump (e.g. 1.0.0 → 1.0.1)
- The revert entry appears under "⏪ Reverts"
- Body contains "This reverts commit …"
- If a revert is breaking, mark it with `!` or a `BREAKING CHANGE` footer to
  get a major bump instead

```bash
# Cleanup: reset the two commits, restore the tag, remove temp file
git reset HEAD~2
git tag -d v1.0.0
git notes --ref semantic-release-v1.0.0 remove HEAD 2>/dev/null
# Restore the original v1.0.0 tag at the sandbox baseline
# (or just re-run sandbox setup from Prerequisites)
git branch -f release/latest HEAD
rm -f CHANGELOG.md .test-tooltip-placeholder
```
