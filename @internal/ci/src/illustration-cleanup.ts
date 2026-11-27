/**
 * The name of an artwork version folder in the illustrations container: the artwork hash, the
 * artwork revision, and the category for a single-category deploy.
 */
export const VERSION_PATTERN = /^[0-9a-f]{16}-r\d+(?:-[a-z]+(?:-[a-z]+)*)?$/;

/** The name of a raw SVG folder under `source/`: the artwork revision. */
export const SOURCE_REVISION_PATTERN = /^r\d+$/;

const DAY = 24 * 60 * 60 * 1000;

/** An artwork version folder, and when the cleanup marked it as retired, if it has. */
export interface ArtworkVersion {
  name: string;
  retiredAt?: Date;
}

export type CleanupAction =
  | { type: 'retire'; version: string }
  | { type: 'unretire'; version: string }
  | { type: 'delete-version'; version: string }
  | { type: 'delete-source'; revision: string };

/**
 * Decides what the deploy's cleanup does with the illustrations container:
 *
 * - The live version is never deleted, and loses its `retired` marker if it was live again.
 * - Any other version is marked as retired the first time the cleanup sees it, which is when it
 *   stopped being live, and deleted once it has been retired for `graceDays`.
 * - Raw SVG folders are deleted, except for the current artwork revision and the live version's.
 *   A single-category test run can use another revision than the live app, and must not delete
 *   the raw SVGs the next real deploy needs.
 *
 * Folders whose names don't match the patterns are left alone.
 */
export function planCleanup({
  live,
  versions,
  sourceRevisions,
  currentRevision,
  now,
  graceDays,
}: {
  live: string;
  versions: ArtworkVersion[];
  sourceRevisions: string[];
  currentRevision: string;
  now: Date;
  graceDays: number;
}): CleanupAction[] {
  // A malformed `live` would retire, and later delete, the version the app uses.
  if (!VERSION_PATTERN.test(live)) {
    throw new Error(`The live pointer names no artwork version: "${live}"`);
  }
  if (!SOURCE_REVISION_PATTERN.test(currentRevision)) {
    throw new Error(`Not an artwork revision: "${currentRevision}"`);
  }
  const versionActions = versions
    .filter(({ name }) => VERSION_PATTERN.test(name))
    .flatMap(({ name, retiredAt }): CleanupAction[] => {
      if (name === live) {
        return retiredAt ? [{ type: 'unretire', version: name }] : [];
      }
      if (!retiredAt) return [{ type: 'retire', version: name }];
      return now.getTime() - retiredAt.getTime() > graceDays * DAY
        ? [{ type: 'delete-version', version: name }]
        : [];
    });
  // The version name ends with -r<revision>, before an optional category.
  const liveRevision = /-(r\d+)(?:-|$)/.exec(live)![1];
  const kept = new Set([currentRevision, liveRevision]);
  const sourceActions = sourceRevisions
    .filter(
      (revision) =>
        SOURCE_REVISION_PATTERN.test(revision) && !kept.has(revision),
    )
    .map((revision): CleanupAction => ({ type: 'delete-source', revision }));
  return [...versionActions, ...sourceActions];
}
