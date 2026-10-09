import { mkdir, mkdtemp, rename, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lock as acquireLock } from 'proper-lockfile';
import type { LockOptions } from 'proper-lockfile';

export const packageRoot = fileURLToPath(new URL('../', import.meta.url));

// Staging is on the same filesystem. Failed preparation never touches the destination.
// A failed replacement restores the previous directory; the lock excludes concurrent writers.
export async function replaceDirectory(
  destination: string,
  prepare: (stage: string) => Promise<void>,
  options: { lockPath?: string; retries?: LockOptions['retries'] } = {},
) {
  const lockPath = options.lockPath ?? join(packageRoot, '.refresh-lock');
  // Heartbeats protect live writers; interrupted builds are recoverable after 10 seconds.
  // Builds and imports share this lock so canonical sources cannot change during rendering.
  let release: () => Promise<void>;
  try {
    release = await acquireLock(lockPath, {
      realpath: false,
      lockfilePath: lockPath,
      stale: 10_000,
      update: 2_000,
      retries: options.retries ?? {
        retries: 60,
        factor: 1.1,
        minTimeout: 500,
        maxTimeout: 2_000,
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ELOCKED')
      throw new Error(
        'Another illustration build or import is still running. Retry when it finishes; interrupted locks recover automatically.',
        { cause: error },
      );
    throw error;
  }
  let stage: string | undefined;
  let backup: string | undefined;
  try {
    stage = await mkdtemp(
      join(packageRoot, destination.endsWith('dist') ? '.dist-' : '.catalog-'),
    );
    await prepare(stage);
    // A fresh checkout has no parent folder, such as public/.
    await mkdir(dirname(destination), { recursive: true });
    backup = `${stage}-previous`;
    try {
      await rename(destination, backup);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      backup = undefined;
    }
    try {
      await rename(stage, destination);
    } catch (error) {
      if (backup) await rename(backup, destination);
      throw error;
    }
    if (backup) await rm(backup, { recursive: true, force: true });
  } finally {
    try {
      if (stage) await rm(stage, { recursive: true, force: true });
    } finally {
      await release();
    }
  }
}
