/**
 * Custom `writerOpts` for `@semantic-release/release-notes-generator`.
 *
 * Wraps the default `conventional-changelog-conventionalcommits` preset to add
 * one feature: commit body text (indented, with footers stripped) is rendered
 * below each changelog entry. This matches the behaviour of the former
 * Nx-based `changelog-renderer.ts`.
 *
 * Everything else — type grouping, BREAKING CHANGES section, commit links,
 * issue linking, @mention linking, sorting, compare URLs — is inherited from
 * the preset as-is.
 */

import createPreset from 'conventional-changelog-conventionalcommits';

// ─── Footer patterns (same as the old changelog-renderer) ────────────────────

const breakingChangePattern = /^BREAKING[ -]CHANGE:\s*/m;
const tokenFooterPattern = /^[A-Za-z-]+(?:: | #)/m;
const footerPattern = new RegExp(
  `(?:${breakingChangePattern.source})|(?:${tokenFooterPattern.source})`,
  'm',
);

function indent(text: string, indentation = '  '): string {
  return text
    .split('\n')
    .map((line) => (line.trim() ? `${indentation}${line}` : ''))
    .join('\n');
}

// ─── Commit types ────────────────────────────────────────────────────────────

/**
 * Section headers use emojis to stay consistent with the changelogs produced by
 * the former Nx-based renderer.
 */
export const commitTypes = [
  { type: 'feat', section: '🚀 Features' },
  { type: 'fix', section: '🩹 Fixes' },
  { type: 'perf', section: '🏎 Performance Improvements' },
  { type: 'revert', section: '⏪ Reverts' },
  { type: 'docs', hidden: true },
  { type: 'style', hidden: true },
  { type: 'chore', hidden: true },
  { type: 'refactor', hidden: true },
  { type: 'test', hidden: true },
  { type: 'build', hidden: true },
  { type: 'ci', hidden: true },
] satisfies { type: string; section?: string; hidden?: boolean }[];

// ─── Build writerOpts ────────────────────────────────────────────────────────

const preset = createPreset({ types: commitTypes });
const presetWriterOpts = preset.writer;

/**
 * Wrap the preset's transform to preserve and format the commit body.
 *
 * The default transform returns `{ notes, type, scope, shortHash, subject,
 * references }` — it does NOT forward `body`. We save `body` before calling
 * the default, strip footer tokens, indent, and attach it to the result.
 */
function wrapTransform(
  presetTransform: (
    commit: Record<string, unknown>,
    context: unknown,
  ) => Record<string, unknown> | undefined,
) {
  return (commit: Record<string, unknown>, context: unknown) => {
    // Save body before the preset transform drops it
    const rawBody =
      typeof commit['body'] === 'string'
        ? (commit['body'] as string).trim()
        : null;

    const result = presetTransform(commit, context);
    if (!result) return result; // commit was filtered out by the preset

    // Rename "BREAKING CHANGES" → "Breaking Changes" to match old format
    const notes = result['notes'] as
      { title: string; text: string }[] | undefined;
    if (notes) {
      for (const note of notes) {
        if (note.title === 'BREAKING CHANGES') {
          note.title = 'Breaking Changes';
        }
      }
    }

    if (rawBody) {
      const stripped = rawBody.split(footerPattern)[0].trim();
      result['body'] = stripped ? indent(stripped) : null;
    }

    return result;
  };
}

/**
 * Extend the preset's `commitPartial` Handlebars template to render `{{body}}`
 * (indented) below each changelog entry when present.
 */
function extendCommitPartial(template: string): string {
  // Append inline with the last line to prevent Handlebars standalone-tag
  // stripping from eating the trailing newline when body is absent.
  return template.trimEnd() + '{{#if body}}\n\n{{body}}{{/if}}\n';
}

/**
 * Customise the `mainTemplate`:
 *
 * 1. The ⚠️ Breaking Changes section includes the commit subject and a link,
 *    matching the format used by the former Nx-based renderer.
 * 2. The section heading uses `⚠️  Breaking Changes` instead of the preset's
 *    `⚠ BREAKING CHANGES`.
 *
 * The default preset template only renders `{{text}}` (the note body). Our
 * version renders: `* **scope:** subject ([hash](url))\n\n  text`.
 */
function extendMainTemplate(template: string): string {
  // Replace the note entry to include commit subject + link
  const defaultNoteEntry =
    '* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}';
  const enhancedNoteEntry = [
    '* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{commit.subject}}',
    '{{#if commit.shortHash}}',
    ' ([{{commit.shortHash}}]({{@root.host}}/{{@root.owner}}/{{@root.repository}}/commit/{{commit.hash}}))',
    '{{/if}}',
    '\n\n  {{text}}\n',
  ].join('');

  return template
    .replace(defaultNoteEntry, enhancedNoteEntry)
    .replace('### ⚠ {{title}}', '### ⚠️  {{title}}');
}

export const writerOpts = {
  ...presetWriterOpts,
  transform: wrapTransform(presetWriterOpts.transform),
  commitPartial: extendCommitPartial(presetWriterOpts.commitPartial),
  mainTemplate: extendMainTemplate(presetWriterOpts.mainTemplate),
};
