import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  utimes,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { replaceDirectory } from '../scripts/files.ts';

async function fixture(
  run: (destination: string, lockPath: string) => Promise<void>,
) {
  const directory = await mkdtemp(join(tmpdir(), 'illustration-lock-test-'));
  try {
    const destination = join(directory, 'output');
    await mkdir(destination);
    await writeFile(join(destination, 'asset'), 'original');
    await run(destination, join(directory, '.refresh-lock'));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

describe('recoverable illustration writer locks', () => {
  it('recovers an abandoned legacy lock without modifying prior output during preparation', async () => {
    await fixture(async (destination, lockPath) => {
      await mkdir(lockPath);
      const stale = new Date(Date.now() - 60_000);
      await utimes(lockPath, stale, stale);
      await replaceDirectory(
        destination,
        async (stage) => {
          expect(await readFile(join(destination, 'asset'), 'utf8')).toBe(
            'original',
          );
          await writeFile(join(stage, 'asset'), 'complete');
        },
        { lockPath, retries: 0 },
      );
      expect(await readFile(join(destination, 'asset'), 'utf8')).toBe(
        'complete',
      );
      await expect(stat(lockPath)).rejects.toThrow();
    });
  });

  it('never steals an active lock and releases it after preparation fails', async () => {
    await fixture(async (destination, lockPath) => {
      await replaceDirectory(
        destination,
        async () => {
          await expect(
            replaceDirectory(
              destination,
              async () => {
                throw new Error('must not run');
              },
              { lockPath, retries: 0 },
            ),
          ).rejects.toThrow(/Another illustration build or import/);
          throw new Error('interrupted preparation');
        },
        { lockPath, retries: 0 },
      ).catch((error: Error) => {
        expect(error.message).toBe('interrupted preparation');
      });
      expect(await readFile(join(destination, 'asset'), 'utf8')).toBe(
        'original',
      );
      await expect(stat(lockPath)).rejects.toThrow();
      await replaceDirectory(
        destination,
        async (stage) => {
          await writeFile(join(stage, 'asset'), 'retry');
        },
        { lockPath, retries: 0 },
      );
      expect(await readFile(join(destination, 'asset'), 'utf8')).toBe('retry');
    });
  });

  it('serializes concurrent writers rather than exposing EEXIST', async () => {
    await fixture(async (destination, lockPath) => {
      const order: string[] = [];
      let entered!: () => void;
      const ready = new Promise<void>((resolve) => {
        entered = resolve;
      });
      let finish!: () => void;
      const gate = new Promise<void>((resolve) => {
        finish = resolve;
      });
      const first = replaceDirectory(
        destination,
        async (stage) => {
          order.push('first');
          entered();
          await gate;
          await writeFile(join(stage, 'asset'), 'first');
        },
        { lockPath },
      );
      await ready;
      const second = replaceDirectory(
        destination,
        async (stage) => {
          order.push('second');
          expect(await readFile(join(destination, 'asset'), 'utf8')).toBe(
            'first',
          );
          await writeFile(join(stage, 'asset'), 'second');
        },
        { lockPath },
      );
      finish();
      await Promise.all([first, second]);
      expect(order).toEqual(['first', 'second']);
      expect(await readFile(join(destination, 'asset'), 'utf8')).toBe('second');
    });
  });
});

describe('replacing a directory in a fresh checkout', () => {
  it('creates the missing parent folder', async () => {
    const directory = await mkdtemp(
      join(tmpdir(), 'illustration-parent-test-'),
    );
    try {
      const destination = join(directory, 'public', 'assets');
      await replaceDirectory(
        destination,
        async (stage) => {
          await writeFile(join(stage, 'asset'), 'complete');
        },
        { lockPath: join(directory, '.refresh-lock'), retries: 0 },
      );
      expect(await readFile(join(destination, 'asset'), 'utf8')).toBe(
        'complete',
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
