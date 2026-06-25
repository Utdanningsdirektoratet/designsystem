import {
  Button,
  Checkbox,
  Link,
  Paragraph,
} from '@digdir/designsystemet-react';
import { InformationSquareFillIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import { Details } from 'src/components/details';
import { Dialog } from 'src/components/dialog';
import { Fieldset } from 'src/components/fieldset';
import { Heading } from 'src/components/typography/heading';
import { Prose } from 'src/components/typography/prose';
import exampleData from './exampleData.json';

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
  decorators: [
    withResponsiveDataSize,
    (Story, context) => {
      // Hacky way to detect docs mode in iframe-rendered story
      const isInDocsPage =
        window.parent.location.search.includes('viewMode=docs');
      if (isInDocsPage) {
        // Set viewMode since Storybook doesn't detect it properly when rendered with "inline: false" (iframe mode)
        context.viewMode = 'docs';
      }
      return <Story />;
    },
  ],
});

const categoriesWithCookies = exampleData.categories.filter(
  (category) => category.cookies.length > 0,
);

export const Preview = meta.story({
  args: {},
  render: (args, context) => {
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
            @media (max-width: 40rem) {
              .cookies-buttons > button {
          flex: 1 1 auto;
              }
            }
          `}
        </style>
        <Dialog
          open={true}
          modal={false}
          {...args}
          {...(context.viewMode === 'docs' && { inert: true })}
        >
          <Prose>
            <Heading>{exampleData.heading}</Heading>
            {exampleData.body
              .split('\n\n')
              .map((paragraph, index, paragraphs) => (
                <Paragraph key={paragraph}>
                  {paragraph}
                  {index === paragraphs.length - 1 && (
                    <> Samtykket gjelder for: {exampleData.websiteDomains}</>
                  )}
                </Paragraph>
              ))}
            <Fieldset>
              <Fieldset.Legend>
                Velg hvilke informasjonskapsler du godtar
              </Fieldset.Legend>
              {categoriesWithCookies.map((category) => (
                <Checkbox
                  key={category.id}
                  label={`${category.name}${category.necessary ? ' (kan ikke velges bort)' : ''}`}
                  checked={category.necessary ? true : undefined}
                />
              ))}
            </Fieldset>
            <Dialog.TriggerContext>
              <Dialog.Trigger variant="tertiary">
                <InformationSquareFillIcon aria-hidden />
                Se hvilke informasjonskapsler vi bruker
              </Dialog.Trigger>
              <Dialog>
                <Prose>
                  <Heading level={2}>Informasjonskapsler</Heading>
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
                            {category.name.toLocaleLowerCase('nb')}
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
                                      <strong>Leverandør: </strong>
                                      {cookie.provider}
                                    </li>
                                    <li>
                                      <strong>Formål: </strong>
                                      {cookie.purpose}
                                    </li>
                                    <li>
                                      <strong>Navn: </strong>
                                      {cookie.name}
                                    </li>
                                    <li>
                                      <strong>Utløpstid: </strong>
                                      {cookie.expiration}
                                    </li>
                                    <li>
                                      <strong>Personvernerklæring: </strong>
                                      <Link href={cookie.privacyPolicyUrl}>
                                        Se personvernerklæring
                                      </Link>
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
          </Prose>

          <div className="cookies-buttons">
            <Button variant="secondary">{exampleData.labels.acceptAll}</Button>
            <Button variant="secondary">
              {exampleData.labels.acceptSelected}
            </Button>
            <Button variant="secondary">
              {exampleData.labels.declineOptional}
            </Button>
          </div>
        </Dialog>
      </>
    );
  },
});
