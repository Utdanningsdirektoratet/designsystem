import {
  type FinalOptions,
  type FinalTemplateContext,
  writeChangelogString,
} from 'conventional-changelog-writer';
import { describe, expect, it } from 'vitest';
import { type ChangelogCommit, writerOpts } from './changelog-writer-opts.js';

const { transform } = writerOpts;
const renderContext = {
  version: '1.2.3',
  date: '2026-01-01',
  host: 'https://github.com',
  owner: 'Utdanningsdirektoratet',
  repository: 'designsystem',
  linkReferences: true,
  commit: 'commit',
  issue: 'issues',
};

async function renderChangelog(commits: ReturnType<typeof parsedCommit>[]) {
  return writeChangelogString(commits, renderContext, writerOpts);
}

/**
 * Minimal parsed-commit shape expected by conventional-changelog-writer's
 * transform function (matches what `conventional-commits-parser` emits).
 */
function parsedCommit(overrides: Record<string, unknown> = {}) {
  return {
    type: 'feat',
    scope: null,
    subject: 'add button',
    merge: null,
    header: 'feat: add button',
    body: null,
    footer: null,
    notes: [],
    references: [],
    mentions: [],
    revert: null,
    hash: 'abc1234567890abcdef1234567890abcdef123456',
    ...overrides,
  };
}

/**
 * Minimal writer context and options (the second and third arguments to
 * transform). The preset's transform only reads the repository fields.
 */
const context = {
  host: 'https://github.com',
  owner: 'Utdanningsdirektoratet',
  repository: 'designsystem',
} as FinalTemplateContext<ChangelogCommit>;
const options = writerOpts as FinalOptions<ChangelogCommit>;

const breakingChangesHeading = '### ⚠️ Breaking Changes';
const repositoryUrl = `${renderContext.host}/${renderContext.owner}/${renderContext.repository}`;

function commitUrl(hash: string) {
  return `${repositoryUrl}/commit/${hash}`;
}

function commitLine({
  scope,
  subject,
  hash,
}: {
  scope: string | null;
  subject: string;
  hash: string;
}) {
  const scopePrefix = scope ? `**${scope}:** ` : '';
  return `* ${scopePrefix}${subject} ([${hash.slice(0, 7)}](${commitUrl(hash)}))`;
}

function indentedBody(text: string) {
  return text
    .split('\n')
    .map((line) => (line ? `  ${line}` : ''))
    .join('\n');
}

function expectNoRawTemplates(changelog: string) {
  expect(changelog).not.toContain('{{');
}

describe('changelog writerOpts.transform', () => {
  it('passes through feat commits', async () => {
    const result = await transform(
      parsedCommit({ type: 'feat' }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🚀 Features');
  });

  it('passes through fix commits', async () => {
    const result = await transform(
      parsedCommit({ type: 'fix' }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🩹 Fixes');
  });

  it('passes through perf commits', async () => {
    const result = await transform(
      parsedCommit({ type: 'perf' }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['type']).toBe('🏎 Performance Improvements');
  });

  it('passes through revert commits', async () => {
    const result = await transform(
      parsedCommit({ type: 'revert' }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['type']).toBe('⏪ Reverts');
  });

  it('filters out hidden types (chore, ci, docs, …)', async () => {
    for (const type of [
      'chore',
      'ci',
      'docs',
      'style',
      'refactor',
      'test',
      'build',
    ]) {
      const result = await transform(parsedCommit({ type }), context, options);
      expect(result).toBeUndefined();
    }
  });

  it('keeps commits with BREAKING CHANGE notes regardless of type', async () => {
    const result = await transform(
      parsedCommit({
        type: 'refactor',
        notes: [{ title: 'BREAKING CHANGE', text: 'removed API' }],
      }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['notes']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Breaking Changes',
          text: 'removed API',
        }),
      ]),
    );
  });

  it('preserves commit body', async () => {
    const result = await transform(
      parsedCommit({
        body: 'This adds a size prop.\n\nThe default remains medium.',
      }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toBe(
      'This adds a size prop.\n\nThe default remains medium.',
    );
  });

  it('strips footer tokens from body', async () => {
    const result = await transform(
      parsedCommit({
        body: 'Adds an icon prop.\n\nReviewed-by: Someone\nRefs: #123',
      }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toContain('Adds an icon prop.');
    expect(result!['body']).not.toContain('Reviewed-by');
    expect(result!['body']).not.toContain('Refs');
  });

  it('strips BREAKING CHANGE footer from body', async () => {
    const result = await transform(
      parsedCommit({
        body: 'Changes the default variant.\n\nBREAKING CHANGE: old API removed',
        notes: [{ title: 'BREAKING CHANGE', text: 'old API removed' }],
      }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toContain('Changes the default variant.');
    expect(result!['body']).not.toContain('BREAKING CHANGE');
  });

  it('sets body to null when body is empty or only footers', async () => {
    const result = await transform(
      parsedCommit({ body: 'Refs: #123' }),
      context,
      options,
    );
    expect(result).toBeDefined();
    expect(result!['body']).toBeNull();
  });

  it('shortens the commit hash', async () => {
    const result = await transform(
      parsedCommit({ hash: 'abc1234567890' }),
      context,
      options,
    );
    expect(result!['shortHash']).toBe('abc1234');
  });
});

describe('changelog writerOpts line unwrapping', () => {
  async function transformedBody(body: string) {
    const result = await transform(parsedCommit({ body }), context, options);
    return result!['body'];
  }

  it('joins wrapped lines within a paragraph and keeps paragraph breaks', async () => {
    expect(
      await transformedBody(
        'Adds a size prop, which defaults\nto medium.\n\nThe icon size follows it.',
      ),
    ).toBe(
      'Adds a size prop, which defaults to medium.\n\nThe icon size follows it.',
    );
  });

  it('keeps list items on separate lines and joins their wrapped continuations', async () => {
    expect(
      await transformedBody(
        'Also of note:\n- `Avatar` renders `initials` as text, in favour of\n  passing the text as `children`.\n- `Tag` supports `asChild`.',
      ),
    ).toBe(
      'Also of note:\n- `Avatar` renders `initials` as text, in favour of passing the text as `children`.\n- `Tag` supports `asChild`.',
    );
  });

  it('keeps headings and fenced code separate from the prose around them', async () => {
    expect(
      await transformedBody(
        '# Migration\nReplace the\nimport:\n```ts\nimport { A } from "a";\nimport { B } from "b";\n```\nThen remove\nthe old one.',
      ),
    ).toBe(
      '# Migration\nReplace the import:\n```ts\nimport { A } from "a";\nimport { B } from "b";\n```\nThen remove the old one.',
    );
  });

  it('leaves indented code and tables unchanged', async () => {
    const body =
      'Example:\n\n    const a = 1;\n    const b = 2;\n\n| Prop | Default |\n| ---- | ------- |\n| size | medium  |';
    expect(await transformedBody(body)).toBe(body);
  });

  it('keeps explicit hard line breaks', async () => {
    expect(
      await transformedBody('First line\\\nsecond line  \nthird\nline'),
    ).toBe('First line\\\nsecond line  \nthird line');
  });

  it('joins lines between inline code and links with a single space', async () => {
    expect(
      await transformedBody(
        'Supports `@types/react`\n  `^18.3.7`, see [1.22.0](https://example.com/a) and\n[1.23.0](https://example.com/b).',
      ),
    ).toBe(
      'Supports `@types/react` `^18.3.7`, see [1.22.0](https://example.com/a) and [1.23.0](https://example.com/b).',
    );
  });

  it('leaves blockquotes unchanged, so GitHub alerts keep their marker line', async () => {
    const body = '> [!NOTE]\n> Requires React\n> 19.';
    expect(await transformedBody(body)).toBe(body);
  });

  it('joins wrapped lines in breaking change notes', async () => {
    const result = await transform(
      parsedCommit({
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'The default variant is now\n`filled`.\n\n- Remove `variant="outline"`',
          },
        ],
      }),
      context,
      options,
    );
    expect(result!['notes']).toEqual([
      expect.objectContaining({
        text: 'The default variant is now `filled`.\n\n- Remove `variant="outline"`',
      }),
    ]);
  });
});

describe('changelog writerOpts rendering', () => {
  it('renders commit bodies without collapsing adjacent commits', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        scope: 'button',
        subject: 'add icon prop',
        header: 'feat(button): add icon prop',
        body: null,
        hash: 'abc1234567890abcdef1234567890abcdef123456',
      }),
      parsedCommit({
        scope: 'button',
        subject: 'add size prop',
        header: 'feat(button): add size prop',
        body: 'This adds a size prop.\n\nThe default remains medium.',
        hash: 'def1234567890abcdef1234567890abcdef123456',
      }),
    ]);

    expect(changelog).toContain(`### 🚀 Features

${commitLine({
  scope: 'button',
  subject: 'add icon prop',
  hash: 'abc1234567890abcdef1234567890abcdef123456',
})}
${commitLine({
  scope: 'button',
  subject: 'add size prop',
  hash: 'def1234567890abcdef1234567890abcdef123456',
})}

${indentedBody('This adds a size prop.\n\nThe default remains medium.')}`);
    expectNoRawTemplates(changelog);
  });

  it('renders unscoped commits without a scope prefix', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        scope: null,
        subject: 'update dependencies',
        header: 'feat: update dependencies',
        body: 'Includes new Newsletter icon in `@udir-design/icons`.',
        hash: 'a18491e11234567890abcdef1234567890abcdef',
      }),
    ]);

    expect(changelog).toContain(
      commitLine({
        scope: null,
        subject: 'update dependencies',
        hash: 'a18491e11234567890abcdef1234567890abcdef',
      }),
    );
    expect(changelog).toContain(
      indentedBody('Includes new Newsletter icon in `@udir-design/icons`.'),
    );
    expect(changelog).not.toContain('**null:**');
    expectNoRawTemplates(changelog);
  });

  it('renders multiline breaking notes, including lists, inside their entry', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        type: 'feat',
        scope: 'Header.UserButton',
        subject: 'render icons via CSS instead of React components',
        header:
          'feat(Header.UserButton): render icons via CSS instead of React components',
        footer: `BREAKING CHANGE: Consumers using \`@udir-design/css\` must update their markup.\n\n- Replace \`h3\` with \`span\`\n- Remove \`data-size\``,
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'Consumers using `@udir-design/css` must update their markup.\n\n- Replace `h3` with `span`\n- Remove `data-size`',
          },
        ],
        hash: 'c29a7c221234567890abcdef1234567890abcdef',
      }),
    ]);

    expect(changelog).toContain(`${breakingChangesHeading}

${commitLine({
  scope: 'Header.UserButton',
  subject: 'render icons via CSS instead of React components',
  hash: 'c29a7c221234567890abcdef1234567890abcdef',
})}

  Consumers using \`@udir-design/css\` must update their markup.

  - Replace \`h3\` with \`span\`
  - Remove \`data-size\``);
    expect(changelog).toContain('### 🚀 Features');
    expect(changelog).toContain(
      commitLine({
        scope: 'Header.UserButton',
        subject: 'render icons via CSS instead of React components',
        hash: 'c29a7c221234567890abcdef1234567890abcdef',
      }),
    );
    expectNoRawTemplates(changelog);
    expect(changelog).not.toContain('### ⚠ BREAKING CHANGES');
  });

  it('renders hidden-type breaking changes only in the breaking changes section', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        type: 'refactor',
        scope: null,
        subject: 'omit deprecated props from component types',
        header: 'refactor: omit deprecated props from component types',
        footer:
          'BREAKING CHANGE: Omitted props:\n- `Dialog`: `asChild`\n- `Select`: `readOnly`',
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'Omitted props:\n- `Dialog`: `asChild`\n- `Select`: `readOnly`',
          },
        ],
        hash: 'ef2b0d699261cc52ae839794f053e13e74f6defc',
      }),
    ]);

    expect(changelog).toContain(`${breakingChangesHeading}

${commitLine({
  scope: null,
  subject: 'omit deprecated props from component types',
  hash: 'ef2b0d699261cc52ae839794f053e13e74f6defc',
})}

  Omitted props:
  - \`Dialog\`: \`asChild\`
  - \`Select\`: \`readOnly\``);
    const entry = commitLine({
      scope: null,
      subject: 'omit deprecated props from component types',
      hash: 'ef2b0d699261cc52ae839794f053e13e74f6defc',
    });
    expect(changelog.split(entry)).toHaveLength(2);
    expect(changelog).not.toContain('### 🚀 Features');
    expect(changelog).not.toContain('### 🩹 Fixes');
    expectNoRawTemplates(changelog);
  });

  it('renders commits with both a body and a breaking note in both sections', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        type: 'feat',
        scope: 'Button',
        subject: 'change default variant',
        header: 'feat(Button): change default variant',
        body: 'The default variant changes from outline to filled.',
        footer:
          'BREAKING CHANGE: The default variant for Button is now `filled` instead of `outline`.',
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'The default variant for Button is now `filled` instead of `outline`.',
          },
        ],
        hash: '4d1c5331234567890abcdef1234567890abcdef',
      }),
    ]);

    expect(changelog).toContain(`${breakingChangesHeading}

${commitLine({
  scope: 'Button',
  subject: 'change default variant',
  hash: '4d1c5331234567890abcdef1234567890abcdef',
})}

  The default variant for Button is now \`filled\` instead of \`outline\`.`);
    expect(changelog).toContain(`### 🚀 Features

${commitLine({
  scope: 'Button',
  subject: 'change default variant',
  hash: '4d1c5331234567890abcdef1234567890abcdef',
})}

${indentedBody('The default variant changes from outline to filled.')}`);
    expectNoRawTemplates(changelog);
  });

  it('renders multiple breaking changes as separate entries', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        type: 'refactor',
        scope: 'Paragraph',
        subject: 'remove variant prop',
        header: 'refactor(Paragraph): remove variant prop',
        footer:
          'BREAKING CHANGE: If you used `variant="long"`, `"short"` or `"default"`, you must remove the prop usage.',
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'If you used `variant="long"`, `"short"` or `"default"`, you must remove the prop usage.',
          },
        ],
        hash: '2aacc0c71234567890abcdef1234567890abcdef',
      }),
      parsedCommit({
        type: 'refactor',
        scope: 'Header',
        subject: 'render icons via CSS instead of React components',
        header:
          'refactor(Header): render icons via CSS instead of React components',
        footer: 'BREAKING CHANGE: Header component HTML structure changed.',
        notes: [
          {
            title: 'BREAKING CHANGE',
            text: 'Header component HTML structure changed.',
          },
        ],
        hash: 'c29a7c221234567890abcdef1234567890abcdea',
      }),
    ]);

    expect(changelog.match(/### ⚠️ Breaking Changes/g)).toHaveLength(1);
    expect(changelog).toContain(
      commitLine({
        scope: 'Paragraph',
        subject: 'remove variant prop',
        hash: '2aacc0c71234567890abcdef1234567890abcdef',
      }),
    );
    expect(changelog).toContain(
      commitLine({
        scope: 'Header',
        subject: 'render icons via CSS instead of React components',
        hash: 'c29a7c221234567890abcdef1234567890abcdea',
      }),
    );
    expectNoRawTemplates(changelog);
  });

  it('renders mixed visible sections and omits hidden commit types', async () => {
    const changelog = await renderChangelog([
      parsedCommit({
        type: 'feat',
        scope: 'Dialog',
        subject: 'add dialog component',
        header: 'feat(Dialog): add dialog component',
        hash: '11111111234567890abcdef1234567890abcdef',
      }),
      parsedCommit({
        type: 'fix',
        scope: 'Button',
        subject: 'correct button padding',
        header: 'fix(Button): correct button padding',
        hash: '22222221234567890abcdef1234567890abcdef',
      }),
      parsedCommit({
        type: 'docs',
        scope: 'Dialog',
        subject: 'document dialog usage',
        header: 'docs(Dialog): document dialog usage',
        hash: '33333331234567890abcdef1234567890abcdef',
      }),
      parsedCommit({
        type: 'chore',
        scope: null,
        subject: 'update lockfile',
        header: 'chore: update lockfile',
        hash: '44444441234567890abcdef1234567890abcdef',
      }),
    ]);

    expect(changelog).toContain('### 🚀 Features');
    expect(changelog).toContain('### 🩹 Fixes');
    expect(changelog).toContain('add dialog component');
    expect(changelog).toContain('correct button padding');
    expect(changelog).not.toContain('document dialog usage');
    expect(changelog).not.toContain('update lockfile');
    expect(changelog.indexOf('### 🚀 Features')).toBeLessThan(
      changelog.indexOf('### 🩹 Fixes'),
    );
    expectNoRawTemplates(changelog);
  });
});
