import {
  Button,
  Checkbox,
  Link,
  Paragraph,
} from '@digdir/designsystemet-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { InformationSquareFillIcon } from '@udir-design/icons';
import {
  WithInertInitialRender,
  useIsInert,
} from '.storybook/decorators/WithInertInitialRender';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Details } from 'src/components/details';
import { Dialog } from 'src/components/dialog';
import { Fieldset } from 'src/components/fieldset';
import { Heading } from 'src/components/typography/heading';
import { Prose } from 'src/components/typography/prose';
import exampleData from './exampleData.json';
import { type Locale, getPageLocale, translations } from './translations';

type ExampleData = {
  heading: string;
  body: string;
  cookieDeclarationText: string;
  websiteDomains: string;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    necessary: boolean;
    cookies: Array<{
      provider: string;
      purpose: string;
      name: string;
      expiration: string;
      domain: string;
    }>;
  }>;
};

const localizedExampleData = exampleData as unknown as Record<
  Locale,
  ExampleData
>;

declare global {
  interface Window {
    renewCookieConsent?: () => void;
  }
}

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    docs: advancedCodeDocs,
  },
  decorators: [withResponsiveDataSize, WithInertInitialRender],
});

export const Preview = meta.story({
  args: {},
  render: () => {
    const [open, setOpen] = useState(true);
    const isInert = useIsInert();
    const locale = getPageLocale();
    const content = localizedExampleData[locale];
    const text = translations[locale];
    const categoriesWithCookies = content.categories.filter(
      (category) => category.cookies.length > 0,
    );
    const optionalCategories = categoriesWithCookies.filter(
      (category) => !category.necessary,
    );

    return (
      <>
        <style>
          {`
            /* Styles defined in application-specific css */
            .cookies-buttons {
              display: flex;
              gap: var(--ds-size-4);
              flex-wrap: wrap;
            }
            .cookies-details ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .cookies-details li > strong {
              font-weight: 600;
            }
            .cookie-details-dialog {
              --dsc-dialog-backdrop-background: transparent;
            }
            .cookie-dialog:has(.cookie-details-dialog[open])::before {
              animation: ds-dialog-fade-in var(--dsc-dialog-transition-duration) ease-in-out;
              background: var(--dsc-dialog-backdrop-background);
              content: '';
              inset: 0;
              pointer-events: none;
              position: absolute;
              z-index: 1;
            }
            @media (prefers-reduced-motion: reduce) {
              .cookie-dialog:has(.cookie-details-dialog[open])::before {
                animation: none;
              }
            }
            @media (max-width: 40rem) {
              .cookies-buttons > button {
                flex: 1 1 auto;
              }
            }
          `}
        </style>
        <Dialog
          className="cookie-dialog"
          closeButton={text.declineOptionalAndClose}
          open={open}
          onClose={() => setOpen(false)}
          {...(isInert && { inert: true })}
        >
          <Prose>
            <Heading>{content.heading}</Heading>

            <Paragraph>{text.necessaryExplanation}</Paragraph>

            <Fieldset>
              <Fieldset.Legend>{text.optionalLegend}</Fieldset.Legend>
              <Fieldset.Description>{content.body}</Fieldset.Description>
              {optionalCategories.map((category) => (
                <Checkbox key={category.id} label={category.name} />
              ))}
            </Fieldset>

            <Dialog.TriggerContext>
              <Dialog.Trigger variant="secondary" data-size="sm">
                <InformationSquareFillIcon aria-hidden />
                {text.detailsTrigger}
              </Dialog.Trigger>
              <Dialog className="cookie-details-dialog">
                <Prose>
                  <Heading level={2}>{text.overviewHeading}</Heading>
                  <Paragraph>
                    {text.privacyPolicyText}{' '}
                    <Link href="https://example.com/privacy">
                      {text.privacyPolicyLinkText}
                    </Link>
                    .
                  </Paragraph>
                  {categoriesWithCookies.map((category) => (
                    <div key={category.name} className="cookies-container">
                      <Prose>
                        <Heading data-size="xs" level={3}>
                          {category.name}
                        </Heading>
                        <Paragraph>{category.description}</Paragraph>
                        <Details>
                          <Details.Summary>
                            {category.cookies.length}{' '}
                            {category.name.toLocaleLowerCase(locale)}
                          </Details.Summary>
                          <Details.Content className="cookies-details">
                            <Prose>
                              {category.cookies.map((cookie, index) => (
                                <Prose key={cookie.name}>
                                  <Heading data-size="2xs" level={4}>
                                    {index + 1}
                                  </Heading>
                                  <ul>
                                    <li>
                                      <strong>{text.provider}: </strong>
                                      {cookie.provider}
                                    </li>
                                    <li>
                                      <strong>{text.purpose}: </strong>
                                      {cookie.purpose}
                                    </li>
                                    <li>
                                      <strong>{text.name}: </strong>
                                      {cookie.name}
                                    </li>
                                    <li>
                                      <strong>{text.expiration}: </strong>
                                      {cookie.expiration}
                                    </li>
                                  </ul>
                                </Prose>
                              ))}
                            </Prose>
                          </Details.Content>
                        </Details>
                      </Prose>
                    </div>
                  ))}
                </Prose>
              </Dialog>
            </Dialog.TriggerContext>
            <Paragraph>
              {text.consentCanBeChanged} {text.consentAppliesTo}:{' '}
              {content.websiteDomains}.
            </Paragraph>
          </Prose>

          <div className="cookies-buttons">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {text.acceptAll}
            </Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {text.acceptSelected}
            </Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              {text.declineOptional}
            </Button>
          </div>
        </Dialog>
        {open ? null : (
          <Button
            variant="tertiary"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
          >
            {text.renewConsent}
          </Button>
        )}
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const acceptAll = await canvas.findByRole('button', {
      name: 'Godta alle',
    });

    await userEvent.click(acceptAll);

    const renewConsent = await canvas.findByRole('button', {
      name: 'Endre samtykke',
    });
    await expect(renewConsent).toBeVisible();

    await userEvent.click(renewConsent);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Godta alle' })).toBeVisible(),
    );
  },
});

export const NecessaryCookiesDialog = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    const locale = getPageLocale();
    const content = localizedExampleData[locale];
    const text = translations[locale];
    const necessaryCategories = content.categories.filter(
      (category) => category.necessary && category.cookies.length > 0,
    );

    return (
      <>
        <style>
          {`
            /* Styles defined in application-specific css */
            .cookies-details ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .cookies-details li > strong {
              font-weight: 600;
            }
          `}
        </style>
        <Link
          href="#informasjonskapsler"
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          {text.overviewHeading}
        </Link>
        <Dialog
          closeButton={text.closeDialog}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Prose>
            <Heading level={2}>{content.heading}</Heading>
            <Paragraph>
              {text.privacyPolicyText}{' '}
              <Link href="https://example.com/privacy">
                {text.privacyPolicyLinkText}
              </Link>
              .
            </Paragraph>
            {necessaryCategories.map((category) => (
              <div key={category.name} className="cookies-container">
                <Prose>
                  <Heading data-size="xs" level={3}>
                    {category.name}
                  </Heading>
                  <Paragraph>{category.description}</Paragraph>
                  <Details>
                    <Details.Summary>
                      {category.cookies.length}{' '}
                      {category.name.toLocaleLowerCase(locale)}
                    </Details.Summary>
                    <Details.Content className="cookies-details">
                      <Prose>
                        {category.cookies.map((cookie, index) => (
                          <Prose key={cookie.name}>
                            <Heading data-size="2xs" level={4}>
                              {index + 1}
                            </Heading>
                            <ul>
                              <li>
                                <strong>{text.provider}: </strong>
                                {cookie.provider}
                              </li>
                              <li>
                                <strong>{text.purpose}: </strong>
                                {cookie.purpose}
                              </li>
                              <li>
                                <strong>{text.name}: </strong>
                                {cookie.name}
                              </li>
                              <li>
                                <strong>{text.expiration}: </strong>
                                {cookie.expiration}
                              </li>
                            </ul>
                          </Prose>
                        ))}
                      </Prose>
                    </Details.Content>
                  </Details>
                </Prose>
              </div>
            ))}
            <Paragraph>
              {text.necessaryCookiesUsedOn}: {content.websiteDomains}.
            </Paragraph>
          </Prose>
          <Button onClick={() => setOpen(false)}>{text.close}</Button>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole('link', { name: 'Informasjonskapsler' }),
    );

    await waitFor(() => expect(canvas.getByRole('dialog')).toBeVisible());
    const dialog = canvas.getByRole('dialog');
    expect(within(dialog).queryByRole('checkbox')).not.toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Lukk' })).toBeVisible();
    expect(
      within(dialog).getByText(/Disse informasjonskapslene brukes på:/),
    ).toBeVisible();
  },
});
