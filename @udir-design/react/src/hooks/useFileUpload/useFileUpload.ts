import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** One file the user has tried to attach. Render it as a `FileUpload.Item`. */
export type FileUploadEntry = {
  /** Identifies the entry, not the file: the same file can be attached twice. */
  id: string;
  /** The file itself. */
  file: File;
  /** Error message for the entry. If set, the file is kept out of `files`. */
  error?: string;
  /** Whether the file is still being uploaded. */
  loading?: boolean;
};

export type UseFileUploadProps = {
  /**
   * The list to start from, for a form that already holds one, such as when a
   * user comes back to a page.
   */
  initialEntries?: FileUploadEntry[];
  /**
   * Called whenever the list changes, so form state can hold it. Keep the whole
   * list rather than only `files`: a form that drops the failed attempts cannot
   * validate them, and the user loses them on the way back to the page.
   */
  onEntriesChange?: (entries: FileUploadEntry[]) => void;
  /**
   * Decides when two files count as the same one. The default treats name,
   * size and last modified date as the file's identity.
   *
   * Define it outside the component or memoise it: a new function on every
   * render makes the returned functions change too.
   */
  getFileKey?: (file: File) => string;
};

export type UseFileUploadReturn = {
  /** Every file the user has tried to attach, in the order they tried. */
  entries: FileUploadEntry[];
  /** The files without an error, meaning the ones that would be submitted. */
  files: File[];
  /** Whether any entry has an error. */
  hasErrors: boolean;
  /** Whether any entry is still uploading. */
  uploading: boolean;
  /**
   * Adds the files that are not in the list already. The ones that are come
   * back in `duplicates` instead, for you to report however you want to.
   */
  add: (
    files: File[],
    initial?: Pick<FileUploadEntry, 'error' | 'loading'>,
  ) => { added: FileUploadEntry[]; duplicates: File[] };
  /** Adds files that were turned away, with the message you want shown. */
  addRejected: (rejected: { file: File; error: string }[]) => void;
  /** Changes the status of one entry. */
  update: (
    id: string,
    patch: Pick<FileUploadEntry, 'error' | 'loading'>,
  ) => void;
  /** Removes one entry. */
  remove: (id: string) => void;
  /** Removes every entry. */
  clear: () => void;
};

const defaultFileKey = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

/**
 * Holds the files a user has attached, and keeps the two views of them apart:
 * `entries` is every attempt, whatever came of it, which is what
 * `FileUpload.List` shows; `files` is the ones that would actually be
 * submitted, which is what `FileUpload.Dropzone` and `FileUpload.Trigger` take
 * as `files`, and what your form state should hold.
 *
 * It holds no messages of its own: every error is one you passed in.
 */
export function useFileUpload({
  initialEntries = [],
  onEntriesChange,
  getFileKey = defaultFileKey,
}: UseFileUploadProps = {}): UseFileUploadReturn {
  const [entries, setEntries] = useState<FileUploadEntry[]>(initialEntries);
  // The list is also kept in a ref so the returned functions can read it
  // without closing over it: they stay the same across renders, and two calls
  // in one go still see each other's work.
  const current = useRef(entries);

  // Read through a ref as well, so passing an inline function does not make
  // every returned function change with it.
  const notify = useRef(onEntriesChange);
  useEffect(() => {
    notify.current = onEntriesChange;
  });

  const commit = useCallback((next: FileUploadEntry[]) => {
    current.current = next;
    setEntries(next);
    notify.current?.(next);
  }, []);

  const files = useMemo(
    () => entries.filter(({ error }) => !error).map(({ file }) => file),
    [entries],
  );

  const add = useCallback(
    (added: File[], initial?: Pick<FileUploadEntry, 'error' | 'loading'>) => {
      const taken = new Set(
        current.current.map(({ file }) => getFileKey(file)),
      );
      const duplicates: File[] = [];
      const fresh: FileUploadEntry[] = [];

      for (const file of added) {
        const key = getFileKey(file);
        // Checked against `taken` rather than the list, so a file repeated
        // within one drop is caught as well.
        if (taken.has(key)) {
          duplicates.push(file);
          continue;
        }
        taken.add(key);
        fresh.push({ id: crypto.randomUUID(), file, ...initial });
      }

      commit([...current.current, ...fresh]);
      return { added: fresh, duplicates };
    },
    [commit, getFileKey],
  );

  const addRejected = useCallback(
    (rejected: { file: File; error: string }[]) =>
      commit([
        ...current.current,
        ...rejected.map(({ file, error }) => ({
          id: crypto.randomUUID(),
          file,
          error,
        })),
      ]),
    [commit],
  );

  const update = useCallback(
    (id: string, patch: Pick<FileUploadEntry, 'error' | 'loading'>) =>
      commit(
        current.current.map((entry) =>
          entry.id === id ? { ...entry, ...patch } : entry,
        ),
      ),
    [commit],
  );

  const remove = useCallback(
    (id: string) => commit(current.current.filter((e) => e.id !== id)),
    [commit],
  );

  const clear = useCallback(() => commit([]), [commit]);

  return {
    entries,
    files,
    hasErrors: entries.some(({ error }) => error),
    uploading: entries.some(({ loading }) => loading),
    add,
    addRejected,
    update,
    remove,
    clear,
  };
}
