#!/usr/bin/env -S pnpm tsx

/**
 * Cleans up the illustrations container at the end of a deploy, as `planCleanup` decides: retires
 * versions that are no longer live, deletes versions retired for a week, and deletes raw SVGs for
 * old artwork revisions.
 *
 * Reads from environment variables:
 *   STORAGE_ACCOUNT - the storage account, e.g. stdsillustrations
 *   CONTAINER       - the artwork container, e.g. illustrations
 *   ASSET_REVISION  - the current artwork revision number
 *
 * Needs `az` signed in, and `azcopy` with AZCOPY_AUTO_LOGIN_TYPE=AZCLI. Does nothing when the
 * container has no `live` pointer yet, since every version would then look retired.
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  type CleanupAction,
  planCleanup,
} from '../src/illustration-cleanup.js';

/** How long a version stays after it stops being live, for tabs still using it. */
const GRACE_DAYS = 7;

const account = requiredEnv('STORAGE_ACCOUNT');
const container = requiredEnv('CONTAINER');
const currentRevision = `r${requiredEnv('ASSET_REVISION')}`;

const live = readLive();
if (live === undefined) {
  console.log('No live pointer yet, so nothing is cleaned up.');
} else {
  const versions = listFolders('').map((name) => ({
    name,
    retiredAt: retiredAt(name),
  }));
  const actions = planCleanup({
    live,
    versions,
    sourceRevisions: listFolders('source/'),
    currentRevision,
    now: new Date(),
    graceDays: GRACE_DAYS,
  });
  console.log(`Live version: ${live}`);
  if (actions.length === 0) console.log('Nothing to clean up.');
  for (const action of actions) run(action);
}

function run(action: CleanupAction) {
  switch (action.type) {
    case 'retire': {
      console.log(`Retiring ${action.version}`);
      using folder = temporaryFolder();
      const file = join(folder.path, 'retired');
      writeFileSync(file, new Date().toISOString());
      az(
        'storage',
        'blob',
        'upload',
        '--container-name',
        container,
        '--name',
        `${action.version}/retired`,
        '--file',
        file,
        '--content-type',
        'text/plain',
        '--overwrite',
        'true',
      );
      return;
    }
    case 'unretire':
      console.log(
        `${action.version} is live again; removing its retired marker`,
      );
      az(
        'storage',
        'blob',
        'delete',
        '--container-name',
        container,
        '--name',
        `${action.version}/retired`,
      );
      return;
    case 'delete-version':
      console.log(
        `Deleting ${action.version}, retired more than ${GRACE_DAYS} days ago`,
      );
      removeFolder(action.version);
      return;
    case 'delete-source':
      console.log(`Deleting raw SVGs for artwork revision ${action.revision}`);
      removeFolder(`source/${action.revision}`);
      return;
  }
}

/** The version named by the `live` pointer, or undefined if there is none yet. */
function readLive() {
  const exists = az(
    'storage',
    'blob',
    'exists',
    '--container-name',
    container,
    '--name',
    'live',
    '--query',
    'exists',
    '--output',
    'tsv',
  ).trim();
  if (exists !== 'true') return undefined;
  using folder = temporaryFolder();
  const file = join(folder.path, 'live');
  az(
    'storage',
    'blob',
    'download',
    '--container-name',
    container,
    '--name',
    'live',
    '--file',
    file,
    '--output',
    'none',
  );
  return readFileSync(file, 'utf8').trim();
}

/** A temporary folder, removed when disposed. */
function temporaryFolder() {
  const path = mkdtempSync(join(tmpdir(), 'illustrations-cleanup-'));
  return {
    path,
    [Symbol.dispose]: () => rmSync(path, { recursive: true, force: true }),
  };
}

/** The names of the folders directly under `prefix`, without the prefix and trailing slash. */
function listFolders(prefix: string): string[] {
  const names: unknown = JSON.parse(
    az(
      'storage',
      'blob',
      'list',
      '--container-name',
      container,
      '--prefix',
      prefix,
      '--delimiter',
      '/',
      '--num-results',
      '*',
      '--query',
      '[].name',
      '--output',
      'json',
    ),
  );
  if (
    !Array.isArray(names) ||
    !names.every((name) => typeof name === 'string')
  ) {
    throw new Error(`Unexpected blob list for "${prefix}" from az`);
  }
  return names
    .filter((name) => name.endsWith('/'))
    .map((name) => name.slice(prefix.length, -1));
}

/** When the cleanup marked a version as retired, if it has. */
function retiredAt(version: string) {
  const marker = `${version}/retired`;
  const modified = az(
    'storage',
    'blob',
    'list',
    '--container-name',
    container,
    '--prefix',
    marker,
    '--query',
    `[?name=='${marker}'].properties.lastModified`,
    '--output',
    'tsv',
  ).trim();
  if (!modified) return undefined;
  const date = new Date(modified);
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Unexpected last-modified time for ${marker}: "${modified}"`,
    );
  }
  return date;
}

function removeFolder(path: string) {
  execFileSync(
    'azcopy',
    [
      'remove',
      `https://${account}.blob.core.windows.net/${container}/${path}`,
      '--recursive',
      '--output-level',
      'essential',
    ],
    { stdio: 'inherit' },
  );
}

function az(...args: string[]) {
  return execFileSync(
    'az',
    [
      ...args,
      '--account-name',
      account,
      '--auth-mode',
      'login',
      '--only-show-errors',
    ],
    { encoding: 'utf8', stdio: 'pipe' },
  );
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}
