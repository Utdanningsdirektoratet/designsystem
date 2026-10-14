import { Unstyled } from '@storybook/addon-docs/blocks';
import { Fragment, useState } from 'react';
import { CopyButton } from '.storybook/docs/components';
import { Table } from 'src/components/table';
import { ToggleGroup } from 'src/components/toggleGroup';
import exampleData from '../exampleData.json';

type Language = keyof typeof exampleData;

const languageNames: Record<Language, string> = {
  nb: 'Bokmål',
  en: 'Engelsk',
};

export const CookieInformationTexts = () => {
  const [language, setLanguage] = useState<Language>('nb');
  const content = exampleData[language];

  const sections = [
    {
      heading: 'Consent popup',
      fields: [
        { label: 'Headline', labelLang: 'en', text: content.heading },
        { label: 'Consent popup text', labelLang: 'en', text: content.body },
      ],
    },
    {
      heading: 'Cookie policy',
      fields: [
        {
          label: 'Cookie policy text',
          labelLang: 'en',
          text: content.cookieDeclarationText,
        },
      ],
    },
    {
      heading: 'Tracking categories',
      fields: content.categories.map((category) => ({
        label: category.name,
        labelLang: language,
        text: category.description,
      })),
    },
  ];

  return (
    <Unstyled>
      <div style={{ display: 'grid', gap: 'var(--ds-size-4)' }}>
        <ToggleGroup
          aria-label="Velg språk"
          data-size="sm"
          value={language}
          onChange={(value) => setLanguage(value as Language)}
        >
          {Object.entries(languageNames).map(([value, name]) => (
            <ToggleGroup.Item key={value} value={value}>
              {name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
        <Table
          border
          tintedColumnHeader
          tintedRowHeader
          style={{ maxWidth: '40rem' }}
        >
          <caption className="ds-sr-only">
            Tekster for Cookie Information-oppsett
          </caption>
          <Table.Body>
            {sections.map(({ heading, fields }) => (
              <Fragment key={heading}>
                <Table.Row>
                  <Table.HeaderCell
                    scope="colgroup"
                    colSpan={3}
                    lang="en"
                    style={{
                      textAlign: 'center',
                      backgroundColor: 'var(--ds-color-surface-tinted)',
                    }}
                  >
                    {heading}
                  </Table.HeaderCell>
                </Table.Row>
                {fields.map(({ label, labelLang, text }) => (
                  <Table.Row key={label}>
                    <Table.HeaderCell scope="row" lang={labelLang}>
                      {label}
                    </Table.HeaderCell>
                    <Table.Cell lang={language}>{text}</Table.Cell>
                    <Table.Cell>
                      <CopyButton text={text} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Unstyled>
  );
};
