/**
 * Custom `writerOpts` for `@semantic-release/release-notes-generator`.
 *
 * Wraps the default `conventional-changelog-conventionalcommits` preset to
 * match the changelogs produced by the former Nx-based `changelog-renderer.ts`:
 *
 * - commit body text (with footers stripped) is rendered below each entry
 * - breaking change notes include the commit subject and a link
 * - the breaking changes heading reads `⚠️ Breaking Changes`
 *
 * Everything else — type grouping, commit links, issue linking, @mention
 * linking, sorting, compare URLs — is inherited from the preset as-is.
 */

import createPreset, {
  type CommitType,
  formatCommitUrl,
  formatNoteTitle,
  type PresetConfig,
} from 'conventional-changelog-conventionalcommits';
import type {
  CommitKnownProps,
  CommitNote,
  CommitPartialFunction,
  CommitTransformFunction,
  Options,
  TemplateFunction,
} from 'conventional-changelog-writer';

/** Commit fields set by the preset's transform and read by our templates. */
export interface ChangelogCommit extends CommitKnownProps {
  scope?: string | null;
  subject?: string | null;
  shortHash?: string | null;
}

/** The writer attaches the transformed commit to each note before rendering. */
interface RenderedNote extends CommitNote {
  commit: ChangelogCommit;
}

type WriterOpts = Options<ChangelogCommit> &
  Required<
    Pick<Options<ChangelogCommit>, 'transform' | 'commitPartial' | 'template'>
  >;

// ─── Footer patterns (same as the old changelog-renderer) ────────────────────

const breakingChangePattern = /^BREAKING[ -]CHANGE:\s*/m;
const tokenFooterPattern = /^[A-Za-z-]+(?:: | #)/m;
const footerPattern = new RegExp(
  `(?:${breakingChangePattern.source})|(?:${tokenFooterPattern.source})`,
  'm',
);

// ─── Preset configuration ────────────────────────────────────────────────────

/**
 * Section headers use emojis to stay consistent with the changelogs produced by
 * the former Nx-based renderer.
 */
export const commitTypes: CommitType[] = [
  { type: 'feat', section: '🚀 Features' },
  { type: 'fix', section: '🩹 Fixes' },
  { type: 'perf', section: '🏎 Performance Improvements' },
  { type: 'revert', section: '⏪ Reverts' },
  { type: 'docs', effect: 'hidden' },
  { type: 'style', effect: 'hidden' },
  { type: 'chore', effect: 'hidden' },
  { type: 'refactor', effect: 'hidden' },
  { type: 'test', effect: 'hidden' },
  { type: 'build', effect: 'hidden' },
  { type: 'ci', effect: 'hidden' },
];

const breakingChangesTitle = 'Breaking Changes';

const presetConfig: PresetConfig = {
  types: commitTypes,
  // The preset groups breaking changes under `⚠ BREAKING CHANGES`
  formatNoteTitle: (context, title) => {
    const presetTitle = formatNoteTitle(context, title);
    return presetTitle === 'BREAKING CHANGES'
      ? breakingChangesTitle
      : presetTitle;
  },
  formatNoteIcon: (_context, title) =>
    title === breakingChangesTitle ? '⚠️' : '',
};

// The preset declares its return type as `{}`; this is the part we use.
const preset = createPreset(presetConfig) as { writer: WriterOpts };
const presetWriterOpts = preset.writer;

// ─── Build writerOpts ────────────────────────────────────────────────────────

/**
 * Wrap the preset's transform to preserve the commit body.
 *
 * The default transform returns `{ notes, type, scope, shortHash, subject,
 * references }` — it does NOT forward `body`. We save `body` before calling
 * the default, strip footer tokens, and attach it to the result.
 */
function wrapTransform(
  presetTransform: CommitTransformFunction<ChangelogCommit>,
): CommitTransformFunction<ChangelogCommit> {
  return async (commit, context, options) => {
    const result = await presetTransform(commit, context, options);
    if (!result) return result; // commit was filtered out by the preset

    const body = commit.body?.trim().split(footerPattern)[0].trim();
    return { ...result, body: body || null };
  };
}

/**
 * Render the commit body below each changelog entry when present. The preset
 * renders entries with `list()`, which indents continuation lines so the body
 * stays inside the list item.
 */
function extendCommitPartial(
  presetCommitPartial: CommitPartialFunction<ChangelogCommit>,
): CommitPartialFunction<ChangelogCommit> {
  return (context, commit) => {
    const entry = presetCommitPartial(context, commit);
    return commit.body ? `${entry}\n\n${commit.body}` : entry;
  };
}

/**
 * Customise the preset's template:
 *
 * 1. Prefix each note with its commit subject and link. The preset only renders
 *    `**scope:** text`; ours renders `**scope:** subject ([hash](url))\n\ntext`.
 * 2. Drop commit groups without a title. The preset keeps hidden-type commits
 *    with breaking changes so their notes are rendered, but files them under no
 *    section. That group has no heading, so its list merges with the breaking
 *    changes list above it and repeats the entry without its note.
 */
function extendTemplate(
  presetTemplate: TemplateFunction<ChangelogCommit>,
): TemplateFunction<ChangelogCommit> {
  return (context) =>
    presetTemplate({
      ...context,
      commitGroups: context.commitGroups?.filter((group) => group.title),
      noteGroups: context.noteGroups?.map((group) => ({
        ...group,
        notes: (group.notes as RenderedNote[]).map((note) => {
          const { commit } = note;
          const commitLink = commit.hash
            ? ` ([${commit.shortHash}](${formatCommitUrl(context, commit)}))`
            : '';
          return {
            ...note,
            text: `${commit.subject}${commitLink}\n\n${note.text}`,
          };
        }),
      })),
    });
}

export const writerOpts: WriterOpts = {
  ...presetWriterOpts,
  transform: wrapTransform(presetWriterOpts.transform),
  commitPartial: extendCommitPartial(presetWriterOpts.commitPartial),
  template: extendTemplate(presetWriterOpts.template),
  // The preset sorts notes by text since v10; keep them in commit order instead,
  // as the subject that now leads each note is not part of the sorted text.
  notesSort: () => 0,
};
