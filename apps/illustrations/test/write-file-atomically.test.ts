import type * as FsPromises from 'node:fs/promises';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { writeJson } from '../scripts/files.ts';

// Lets a test make the next write fail partway, as a full disk would.
const failNextWrite = vi.hoisted(() => ({ enabled: false }));
vi.mock('node:fs/promises', async (importOriginal) => {
  const actual = await importOriginal<typeof FsPromises>();
  return {
    ...actual,
    writeFile: async (path: string, data: string) => {
      if (!failNextWrite.enabled) return actual.writeFile(path, data);
      failNextWrite.enabled = false;
      await actual.writeFile(path, data.slice(0, 10));
      throw Object.assign(new Error('ENOSPC: no space left on device'), {
        code: 'ENOSPC',
      });
    },
  };
});

let directory: string;
beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'illustration-write-test-'));
});
afterEach(async () => {
  await rm(directory, { recursive: true, force: true });
});

describe('writeJson', () => {
  it('keeps the previous file whole when a write fails partway', async () => {
    const path = join(directory, 'metadata.json');
    await writeFile(path, '{ "previous": true }\n');
    failNextWrite.enabled = true;
    await expect(writeJson(path, { next: true })).rejects.toThrow(/ENOSPC/);
    expect(await readFile(path, 'utf8')).toBe('{ "previous": true }\n');
    expect(await readdir(directory)).toEqual(['metadata.json']);
  });

  it('leaves one whole value when writers run at the same time, and readers never see a partial file', async () => {
    const path = join(directory, 'metadata.json');
    const values = Array.from({ length: 20 }, (_, writer) => ({
      writer,
      // Large enough that a shared temporary file would interleave writes.
      items: Array.from({ length: 5_000 }, (__, index) => `${writer}-${index}`),
    }));
    await writeJson(path, values[0]);
    let writing = true;
    const writes = Promise.all(
      values.map((value) => writeJson(path, value)),
    ).finally(() => {
      writing = false;
    });
    const read = async () => {
      while (writing) JSON.parse(await readFile(path, 'utf8'));
    };
    await Promise.all([writes, read(), read()]);
    expect(values).toContainEqual(JSON.parse(await readFile(path, 'utf8')));
    expect(await readdir(directory)).toEqual(['metadata.json']);
  });
});
