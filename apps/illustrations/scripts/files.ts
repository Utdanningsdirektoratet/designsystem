import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lock } from 'proper-lockfile';
import type { LockOptions } from 'proper-lockfile';

export const packageRoot = fileURLToPath(new URL('../', import.meta.url));

/**
 * Replaces the `destination` folder with one that `prepare` fills, so a failed build keeps the
 * previous folder. Waits while another build replaces it.
 */
export async function replaceDirectory(
  destination: string,
  prepare: (stage: string) => Promise<void>,
  options: { lockPath?: string; retries?: LockOptions['retries'] } = {},
) {
  await using _lock = await lockBuild(
    options.lockPath ?? join(packageRoot, '.refresh-lock'),
    options.retries,
  );
  // A fresh checkout has no parent folder, such as public/.
  await mkdir(dirname(destination), { recursive: true });
  await using stage = await createStagingFolder(destination);
  await prepare(stage.path);
  await swapIn(stage.path, destination);
}

/**
 * Replaces a file in one step, so readers never see it partly written, and a failed write keeps
 * the previous content.
 */
export async function writeFileAtomically(path: string, content: string) {
  // A folder of its own, so concurrent writers never share a temporary file.
  await using stage = await createStagingFolder(path);
  const temporary = join(stage.path, basename(path));
  await writeFile(temporary, content);
  await rename(temporary, path);
}

/** Writes a value as formatted JSON with `writeFileAtomically`. */
export async function writeJson(path: string, value: unknown) {
  await writeFileAtomically(path, JSON.stringify(value, null, 2) + '\n');
}

/**
 * Takes the lock that lets one build at a time replace the assets, released when disposed.
 * `sync` and `suggest` don't take it; they replace their files atomically instead.
 */
async function lockBuild(lockPath: string, retries?: LockOptions['retries']) {
  try {
    const release = await lock(lockPath, {
      realpath: false,
      lockfilePath: lockPath,
      // Heartbeats keep a running build's lock; an interrupted build's lock is taken over after
      // 10 seconds.
      stale: 10_000,
      update: 2_000,
      retries: retries ?? {
        retries: 60,
        factor: 1.1,
        minTimeout: 500,
        maxTimeout: 2_000,
      },
    });
    return { [Symbol.asyncDispose]: release };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ELOCKED')
      throw new Error(
        'Another illustration build is still running. Retry when it finishes; interrupted locks recover automatically.',
        { cause: error },
      );
    throw error;
  }
}

/** A temporary folder next to `target`, removed when disposed if still there. */
async function createStagingFolder(target: string) {
  // Next to the target, so the final rename never crosses filesystems.
  const path = await mkdtemp(join(dirname(target), '.staging-'));
  return {
    path,
    [Symbol.asyncDispose]: () => rm(path, { recursive: true, force: true }),
  };
}

/**
 * Moves `staged` to `destination`. Keeps the previous folder until the new one is in place, and
 * puts it back if that fails.
 */
async function swapIn(staged: string, destination: string) {
  const backup = `${staged}-previous`;
  const hadPrevious = await rename(destination, backup).then(
    () => true,
    (error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return false;
      throw error;
    },
  );
  try {
    await rename(staged, destination);
  } catch (error) {
    if (hadPrevious)
      await rename(backup, destination).catch((restoreError: unknown) => {
        throw new Error(
          `Could not move the new ${destination} into place, nor put the previous one back. It is in ${backup}.`,
          { cause: new AggregateError([error, restoreError]) },
        );
      });
    throw error;
  }
  if (hadPrevious) await rm(backup, { recursive: true, force: true });
}
