import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { mdxToSearchHtml } from './mdxToSearchHtml';

const dir = mkdtempSync(path.join(tmpdir(), 'mdx-to-search-html-'));
afterAll(() => rmSync(dir, { recursive: true }));

const convert = (mdx: string) =>
  mdxToSearchHtml(mdx, path.join(dir, 'Page.mdx'));

describe('mdxToSearchHtml', () => {
  it('indexes the text in raw HTML in included markdown', () => {
    writeFileSync(
      path.join(dir, 'README.md'),
      '## Livsfaser\n\n<dl>\n<dt><strong>Alpha</strong></dt><dd>Komponenten er implementert.</dd>\n</dl>\n',
    );
    const { html } = convert(
      'import README from \'./README.md?raw\';\n\n<IncludeMarkdown markdown={README} sectionId="livsfaser" />\n',
    );
    expect(html).toContain('<dd>Komponenten er implementert.</dd>');
  });

  it('keeps HTML elements written in MDX, so the words in them stay separate', () => {
    const { html } = convert(
      '<ul>\n  <li>Første</li>\n  <li>Andre</li>\n</ul>\n',
    );
    expect(html).toContain('<li>Første</li>');
    expect(html).toContain('<li>Andre</li>');
  });

  it('indexes prose in tables and links, as in the navigation table in Header.mdx', () => {
    const { html } = convert(
      [
        '<Unstyled>',
        '  <Table border>',
        '    <Table.Body>',
        '      <Table.Row>',
        '        <Table.HeaderCell scope="row">Navigasjonslenker</Table.HeaderCell>',
        '        <Table.Cell>',
        '          <ul>',
        '            <li>Sidene er like viktige</li>',
        '          </ul>',
        '        </Table.Cell>',
        '      </Table.Row>',
        '    </Table.Body>',
        '  </Table>',
        '</Unstyled>',
        '',
        'Se <Link href="/typedoc">dokumentasjonen</Link>.',
        '',
      ].join('\n'),
    );
    expect(html).toContain('<th>Navigasjonslenker</th>');
    expect(html).toContain('<li>Sidene er like viktige</li>');
    expect(html).toContain('<a>dokumentasjonen</a>');
  });

  it('leaves out components that are not prose wrappers', () => {
    const { html } = convert('<Canvas>Eksempel</Canvas>\n\nTekst\n');
    expect(html).not.toContain('Eksempel');
    expect(html).toContain('Tekst');
  });
});
