import DOMPurify from 'dompurify';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Field } from 'src/components/field';
import { Textarea } from 'src/components/textarea';
import { ToggleGroup } from 'src/components/toggleGroup';
import { Label } from 'src/components/typography/label';
import { RichText } from './RichText';

const meta = preview.meta({
  component: RichText,
  tags: ['udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'padded',
  },
});

export const Preview = meta.story({
  render: (args) => (
    <RichText {...args} data-testid="rich-text">
      <article>
        <div>
          <h2>Fra idé til ferdig resultat</h2>
          <p data-testid="paragraph">
            Et <strong>godt resultat</strong> starter med en{' '}
            <em>tydelig plan</em>. <a href="#steg">Se stegene i planen</a>.
          </p>
        </div>
        <section>
          <h3>Dette trenger du</h3>
          <ul>
            <li>et tydelig mål</li>
            <li>
              en enkel plan
              <ul>
                <li>oppgaver og tidsfrister</li>
              </ul>
            </li>
          </ul>
          <h4 id="steg">Steg for steg</h4>
          <ol>
            <li>Beskriv hva du vil oppnå</li>
            <li>Del arbeidet inn i mindre oppgaver</li>
          </ol>
          <blockquote>
            <p>En enkel plan gjør det lettere å komme i gang.</p>
          </blockquote>
          <hr data-testid="divider" />
          <h5>Når arbeidet er ferdig</h5>
          <figure>
            <picture>
              <source media="(min-width: 40rem)" srcSet="/img/feiring.svg" />
              <img alt="Illustrasjon av en feiring" src="/img/feiring.svg" />
            </picture>
            <figcaption>Marker at målet er nådd.</figcaption>
          </figure>
        </section>
        <div>
          <h6>Mer informasjon</h6>
          <p data-testid="last-paragraph">
            Ta vare på planen slik at du kan bruke den som utgangspunkt senere.
          </p>
        </div>
      </article>
    </RichText>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const richText = canvas.getByTestId('rich-text');
    const heading = canvas.getByRole('heading', {
      level: 2,
      name: 'Fra idé til ferdig resultat',
    });
    const sectionHeading = canvas.getByRole('heading', {
      level: 3,
      name: 'Dette trenger du',
    });
    await step('Forwards native props and applies the root class', async () => {
      expect(richText).toHaveClass('uds-rich-text');
    });

    await step('Styles semantic content through neutral wrappers', async () => {
      expect(getComputedStyle(heading).marginTop).toBe('0px');
      expect(
        Number.parseFloat(getComputedStyle(sectionHeading).marginTop),
      ).toBeGreaterThan(0);
      expect(getComputedStyle(canvas.getByTestId('paragraph')).marginTop).toBe(
        '0px',
      );
      expect(
        getComputedStyle(canvas.getByTestId('last-paragraph')).marginBottom,
      ).toBe('0px');
    });

    await step('Renders every supported styled element', async () => {
      for (const selector of [
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'strong',
        'em',
        'a',
        'ul',
        'ol',
        'li',
        'blockquote',
        'hr',
        'figure',
        'picture',
        'source',
        'img',
        'figcaption',
        'div',
        'section',
        'article',
      ]) {
        expect(richText.querySelector(selector)).not.toBeNull();
      }
    });
  },
});

const editableHtml = `<h2>Tilpasset opplæring</h2>
<p>Skolen skal <strong>tilpasse opplæringen</strong> slik at alle elever får et tilfredsstillende utbytte.</p>
<h3>Aktuelle tiltak</h3>
<ul>
  <li>varierte arbeidsmåter</li>
  <li>tilpassede læremidler</li>
</ul>
<p><a href="https://www.udir.no/">Les mer om tilpasset opplæring på Udir.no</a>.</p>`;

const sanitizeOptions = {
  ALLOWED_TAGS: [
    'a',
    'article',
    'blockquote',
    'br',
    'div',
    'em',
    'figcaption',
    'figure',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'img',
    'li',
    'ol',
    'p',
    'picture',
    'section',
    'source',
    'span',
    'strong',
    'ul',
  ],
  ALLOWED_ATTR: [
    'class',
    'alt',
    'height',
    'href',
    'id',
    'media',
    'rel',
    'sizes',
    'src',
    'srcset',
    'target',
    'title',
    'width',
  ],
  ALLOW_ARIA_ATTR: false,
  ALLOW_DATA_ATTR: false,
};

export const InteractiveComparison = meta.story({
  parameters: {
    customStyles: {
      width: '100%',
    },
  },
  render: () => {
    const [html, setHtml] = useState(editableHtml);
    const [previewMode, setPreviewMode] = useState('styled');
    const cleanHtml = DOMPurify.sanitize(html, sanitizeOptions);

    return (
      <div
        style={{
          display: 'grid',
          gap: 'var(--ds-size-8)',
          width: '100%',
        }}
      >
        <Field>
          <Label htmlFor="rich-text-html">Riktekstredigeringsverktøy</Label>
          <Field.Description>
            Legg inn tekst som kan formateres med HTML. Forhåndsvisning av
            innholdet vises under.
          </Field.Description>
          <Textarea
            id="rich-text-html"
            rows={10}
            spellCheck={false}
            value={html}
            onChange={(event) => setHtml(event.target.value)}
          />
        </Field>

        <ToggleGroup
          aria-label="Velg forhåndsvisning"
          value={previewMode}
          onChange={setPreviewMode}
        >
          <ToggleGroup.Item value="styled">Med RichText</ToggleGroup.Item>
          <ToggleGroup.Item value="unstyled">Uten RichText</ToggleGroup.Item>
        </ToggleGroup>

        <section
          aria-live="polite"
          aria-label="Forhåndsvisning"
          style={{
            padding: 'var(--ds-size-8)',
            border:
              'var(--ds-border-width-default) solid var(--ds-color-border-subtle)',
            borderRadius: 'var(--ds-border-radius-default)',
          }}
        >
          {previewMode === 'styled' ? (
            <RichText
              data-testid="rich-text-preview"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          ) : (
            <iframe
              data-testid="plain-html-preview"
              onLoad={(event) => {
                const iframe = event.currentTarget;
                const contentHeight =
                  iframe.contentDocument?.documentElement.scrollHeight;
                if (contentHeight) iframe.style.height = `${contentHeight}px`;
              }}
              sandbox="allow-same-origin"
              srcDoc={cleanHtml}
              style={{ border: 0, display: 'block', width: '100%' }}
              title="HTML uten RichText-stiler"
            />
          )}
        </section>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByRole('textbox', {
      name: 'Riktekstredigeringsverktøy',
    });
    const styledToggle = canvas.getByRole('radio', { name: 'Med RichText' });
    const unstyledToggle = canvas.getByRole('radio', {
      name: 'Uten RichText',
    });

    await step('Shows the RichText preview by default', async () => {
      expect(styledToggle).toBeChecked();
      expect(canvas.getByTestId('rich-text-preview')).toHaveClass(
        'uds-rich-text',
      );
      expect(
        canvas.queryByTitle('HTML uten RichText-stiler'),
      ).not.toBeInTheDocument();
    });

    await step('Updates and sanitizes the selected preview', async () => {
      const unsafeHtml =
        '<h2>Oppdatert innhold</h2><img src="test.jpg" alt="Test" onerror="alert(1)"><script>alert(1)</script>';

      await userEvent.clear(editor);
      await userEvent.type(editor, unsafeHtml);

      const richTextPreview = canvas.getByTestId('rich-text-preview');
      expect(
        within(richTextPreview).getByText('Oppdatert innhold'),
      ).toBeVisible();
      expect(richTextPreview.querySelector('script')).not.toBeInTheDocument();
      expect(
        richTextPreview.querySelector('[onerror]'),
      ).not.toBeInTheDocument();

      await userEvent.click(canvas.getByText('Uten RichText', { exact: true }));
      expect(unstyledToggle).toBeChecked();

      const plainPreview = canvas.getByTitle<HTMLIFrameElement>(
        'HTML uten RichText-stiler',
      );
      await waitFor(() =>
        expect(plainPreview.contentDocument?.body.innerHTML).toBe(
          richTextPreview.innerHTML,
        ),
      );
      expect(
        plainPreview.contentDocument?.querySelector('script'),
      ).not.toBeInTheDocument();
      expect(
        plainPreview.contentDocument?.querySelector('[onerror]'),
      ).not.toBeInTheDocument();
    });
  },
});
