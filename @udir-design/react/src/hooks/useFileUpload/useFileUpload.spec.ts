import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { FileUploadEntry } from './useFileUpload';
import { useFileUpload } from './useFileUpload';

const pdf = (name: string, lastModified = 1) =>
  new File([new Uint8Array(64)], name, {
    type: 'application/pdf',
    lastModified,
  });

describe('useFileUpload', () => {
  it('keeps everything that was attached in one list', () => {
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.add([pdf('a.pdf')]);
    });
    act(() => {
      result.current.addRejected([
        { file: pdf('b.pdf'), error: 'Filen er for stor' },
      ]);
    });

    expect(result.current.entries.map(({ file }) => file.name)).toEqual([
      'a.pdf',
      'b.pdf',
    ]);
  });

  it('leaves files with an error out of the files to submit', () => {
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.add([pdf('a.pdf')]);
      result.current.addRejected([
        { file: pdf('b.pdf'), error: 'Filen er for stor' },
      ]);
    });

    expect(result.current.files.map(({ name }) => name)).toEqual(['a.pdf']);
    expect(result.current.hasErrors).toBe(true);
  });

  it('reports a file it has already seen instead of adding it twice', () => {
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.add([pdf('a.pdf')]);
    });

    let outcome!: ReturnType<typeof result.current.add>;
    act(() => {
      outcome = result.current.add([pdf('a.pdf'), pdf('c.pdf')]);
    });

    expect(outcome.duplicates.map(({ name }) => name)).toEqual(['a.pdf']);
    expect(outcome.added.map(({ file }) => file.name)).toEqual(['c.pdf']);
    expect(result.current.entries).toHaveLength(2);
  });

  it('catches a file repeated within one drop', () => {
    const { result } = renderHook(() => useFileUpload());

    let outcome!: ReturnType<typeof result.current.add>;
    act(() => {
      outcome = result.current.add([pdf('a.pdf'), pdf('a.pdf')]);
    });

    expect(outcome.duplicates).toHaveLength(1);
    expect(result.current.entries).toHaveLength(1);
  });

  it('tells two files apart when only the name matches', () => {
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.add([pdf('a.pdf', 1), pdf('a.pdf', 2)]);
    });

    expect(result.current.entries).toHaveLength(2);
  });

  it('follows a custom idea of what makes a file the same', () => {
    const { result } = renderHook(() =>
      useFileUpload({ getFileKey: (file) => file.name }),
    );

    act(() => {
      result.current.add([pdf('a.pdf', 1), pdf('a.pdf', 2)]);
    });

    expect(result.current.entries).toHaveLength(1);
  });

  it('returns the added entries so their status can be set', () => {
    const { result } = renderHook(() => useFileUpload());

    let id!: string;
    act(() => {
      id = result.current.add([pdf('a.pdf')]).added[0].id;
    });
    act(() => {
      result.current.update(id, { loading: true });
    });

    expect(result.current.uploading).toBe(true);
  });

  it('drops a file out of the submission when it later fails', () => {
    const { result } = renderHook(() => useFileUpload());

    let id!: string;
    act(() => {
      id = result.current.add([pdf('a.pdf')]).added[0].id;
    });
    act(() => {
      result.current.update(id, { error: 'Serveren kunne ikke lese filen.' });
    });

    expect(result.current.files).toHaveLength(0);
    // The entry stays: the user attached it, and it is theirs to remove.
    expect(result.current.entries).toHaveLength(1);
  });

  it('hands the whole list to the form whenever it changes', () => {
    const onEntriesChange = vi.fn();
    const { result } = renderHook(() => useFileUpload({ onEntriesChange }));

    // Mounting is not a change.
    expect(onEntriesChange).not.toHaveBeenCalled();

    act(() => {
      result.current.addRejected([
        { file: pdf('b.pdf'), error: 'Filen er for stor' },
      ]);
    });

    // A file that failed is part of the list too, so the form can validate it
    // and the user still has it when they come back to the page.
    expect(onEntriesChange).toHaveBeenCalledTimes(1);
    expect(
      onEntriesChange.mock.lastCall?.[0].map((e: FileUploadEntry) => e.error),
    ).toEqual(['Filen er for stor']);
  });

  it('starts from a list the form already holds', () => {
    const entry = { id: 'a', file: pdf('a.pdf') };
    const { result } = renderHook(() =>
      useFileUpload({ initialEntries: [entry] }),
    );

    expect(result.current.entries).toEqual([entry]);
    expect(result.current.files).toHaveLength(1);
  });

  it('does not add a file the form already holds', () => {
    const { result } = renderHook(() =>
      useFileUpload({ initialEntries: [{ id: 'a', file: pdf('a.pdf') }] }),
    );

    let outcome!: ReturnType<typeof result.current.add>;
    act(() => {
      outcome = result.current.add([pdf('a.pdf')]);
    });

    expect(outcome.duplicates).toHaveLength(1);
  });

  it('can set a status on the files as they are added', () => {
    // Otherwise a form that uploads on attach has to loop over the new entries
    // and update each one.
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.add([pdf('a.pdf')], { loading: true });
    });

    expect(result.current.uploading).toBe(true);
  });

  it('keeps the same functions across renders', () => {
    // Consumers put these in dependency arrays, so they must not change every
    // time the list does.
    const { result } = renderHook(() => useFileUpload());
    const before = result.current.add;

    act(() => {
      result.current.add([pdf('a.pdf')]);
    });

    expect(result.current.add).toBe(before);
    expect(result.current.entries).toHaveLength(1);
  });

  it('sees earlier work when called twice in one go', () => {
    const { result } = renderHook(() => useFileUpload());

    let second!: ReturnType<typeof result.current.add>;
    act(() => {
      result.current.add([pdf('a.pdf')]);
      second = result.current.add([pdf('a.pdf')]);
    });

    expect(second.duplicates).toHaveLength(1);
    expect(result.current.entries).toHaveLength(1);
  });

  it('removes an entry by id', () => {
    const { result } = renderHook(() => useFileUpload());

    let id!: string;
    act(() => {
      id = result.current.add([pdf('a.pdf'), pdf('b.pdf')]).added[0].id;
    });
    act(() => {
      result.current.remove(id);
    });

    expect(result.current.entries.map(({ file }) => file.name)).toEqual([
      'b.pdf',
    ]);
  });
});
