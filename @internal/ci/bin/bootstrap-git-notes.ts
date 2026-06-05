#!/usr/bin/env -S pnpm tsx

/**
 * Bootstrap semantic-release git notes for existing tags.
 *
 * semantic-release tracks which npm channel a tag was published on using
 * git notes stored in `refs/notes/semantic-release-<tag>`. Tags created
 * by the old Nx-based release system don't have these notes, so
 * semantic-release can't find them as prior releases.
 *
 * This script reads all `v*` tags, derives the channel from the semver
 * prerelease identifier (e.g. `beta` from `v1.0.0-beta.33`), and adds
 * the appropriate note. Tags that already have a note are skipped.
 *
 * Run once after migrating to semantic-release:
 *
 *   pnpm tsx @internal/ci/bin/bootstrap-git-notes.ts
 *   git push origin 'refs/notes/semantic-release*'
 */

import { execSync } from 'node:child_process';
import process from 'node:process';

const GIT_NOTE_REF = 'semantic-release';
const dryRun = process.argv.includes('--dry-run');

/**
 * Extract the prerelease channel from a version string.
 * `1.0.0-beta.33` → `"beta"`, `1.0.0` → `null`.
 */
function getPrereleaseChannel(version: string): string | null {
  const match = version.match(/^\d+\.\d+\.\d+-([a-zA-Z][a-zA-Z0-9-]*)/);
  return match ? match[1] : null;
}

const tags = execSync('git tag -l "v*"', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(Boolean);

if (tags.length === 0) {
  console.log('No v* tags found.');
  process.exit(0);
}

let added = 0;
let skipped = 0;

for (const tag of tags) {
  const version = tag.replace(/^v/, '');

  // Basic semver validation
  if (!/^\d+\.\d+\.\d+/.test(version)) {
    console.warn(`  skip ${tag} — not valid semver`);
    skipped++;
    continue;
  }

  // Derive channel from prerelease identifier.
  // "beta" from "1.0.0-beta.33", "alpha" from "1.0.0-alpha.1", null if stable.
  const channel = getPrereleaseChannel(version);
  const channels: (string | null)[] = [channel];
  const note = JSON.stringify({ channels });

  // Resolve the tag to its underlying commit. Annotated tags (created by
  // the old Nx release) point to a tag object, but semantic-release reads
  // notes via `git log` which only visits commits. Attaching the note to
  // the commit ensures `getTagsNotes` can find it.
  const commitSha = execSync(`git rev-parse "${tag}^{commit}"`, {
    encoding: 'utf-8',
  }).trim();

  // Check if a note already exists on the commit for this tag.
  const noteRef = `${GIT_NOTE_REF}-${tag}`;
  try {
    execSync(`git notes --ref "${noteRef}" show ${commitSha}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    console.log(`  skip ${tag} — note already exists`);
    skipped++;
    continue;
  } catch {
    // No note exists — we'll add one.
  }

  if (dryRun) {
    console.log(`  would add ${tag} (${commitSha.slice(0, 8)}) → ${note}`);
  } else {
    execSync(`git notes --ref "${noteRef}" add -f -m '${note}' ${commitSha}`, {
      stdio: 'pipe',
    });
    console.log(`  added ${tag} (${commitSha.slice(0, 8)}) → ${note}`);
  }
  added++;
}

console.log(
  `\nDone. ${added} notes ${dryRun ? 'would be ' : ''}added, ${skipped} skipped.`,
);

if (!dryRun && added > 0) {
  console.log(
    '\nPush the notes to the remote:\n' +
      "  git push origin 'refs/notes/semantic-release*'",
  );
}
