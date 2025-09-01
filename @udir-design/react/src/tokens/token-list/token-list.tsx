import {
  Field,
  Heading,
  Label,
  Paragraph,
  Search,
} from '@digdir/designsystemet-react';
import { useDebounceCallback } from '@digdir/designsystemet-react';
import { Fragment, useState } from 'react';
import { capitalizeString } from '../../utilities/helpers/stringHelpers';
import { ColorTokensTable } from '../color/color-table';
import colorTokens from '../design-tokens/color.json';
import semanticTokens from '../design-tokens/semantic.json';
import typographyTokens from '../design-tokens/typography.json';
import { SemanticTokensTable } from '../semantic/semantic-table';
import type { PreviewToken } from '../types';
import { TypographyTable } from '../typography/typography-table';
import classes from './token-list.module.css';
import { labels } from '../strings';

const tokenSearchFilter = (token: PreviewToken, searchValue: string) =>
  `${token.variable}${token.value}`
    .toLowerCase()
    .includes(searchValue?.toLowerCase() || '');

const filteredRecord = (
  record: Record<string, PreviewToken[]>,
  searchValue: string,
): Record<string, PreviewToken[]> => {
  return Object.entries(record).reduce(
    (acc, [name, tokens]) => {
      const filteredTokens = tokens.filter((token) =>
        tokenSearchFilter(token, searchValue),
      );
      if (filteredTokens.length > 0) {
        acc[name] = filteredTokens;
      }
      return acc;
    },
    {} as Record<string, PreviewToken[]>,
  );
};

export const TokenList = () => {
  const [value, setValue] = useState<string>('');

  const debouncedCallback = useDebounceCallback((value: string) => {
    setValue(value);
  }, 1000);

  const filteredColorTokens = filteredRecord(colorTokens, value);
  const colorTokensCount = Object.keys(filteredColorTokens);
  const filteredTypographyTokens = Object.entries(
    filteredRecord(typographyTokens, value),
  );
  const filteredSemanticTokens = semanticTokens.filter((token) =>
    tokenSearchFilter(token, value),
  );

  const noSearchResult =
    filteredSemanticTokens.length +
      filteredTypographyTokens.length +
      colorTokensCount.length ===
    0;

  return (
    <div className={classes.tokensContainer}>
      <Field className={classes.input}>
        <Label>{labels['token-preview']['search-in-design-tokens']}</Label>
        <Search>
          <Search.Input
            aria-label={labels['token-preview']['search-input-aria-label']}
            onChange={(e) => debouncedCallback(e.target.value)}
          />
          <Search.Clear />
        </Search>
      </Field>

      <div className={classes.tokens}>
        {colorTokensCount.length > 0 && (
          <>
            <Heading level={2} data-size="lg">
              {labels['token-preview']['colors']}
            </Heading>
            <Paragraph>{labels['token-preview'].color.description}</Paragraph>
            <div className={classes.section}>
              <ColorTokensTable colorTokens={filteredColorTokens} />
            </div>
          </>
        )}

        {filteredTypographyTokens.length > 0 &&
          filteredTypographyTokens.map(([name, tokens]) => {
            return (
              <Fragment key={name}>
                <Heading level={2} data-size="lg">
                  {labels['token-preview'].typography}
                </Heading>
                <div className={classes.section}>
                  <Heading level={4} data-size="md">
                    {capitalizeString(name)}
                  </Heading>
                  <TypographyTable tokens={tokens} />
                </div>
              </Fragment>
            );
          })}
        {filteredSemanticTokens.length > 0 && (
          <>
            <Heading level={2} data-size="lg">
              {labels['token-preview'].semantic}
            </Heading>
            <Paragraph>{labels['token-preview'].size.description}</Paragraph>
            <div className={classes.section}>
              <SemanticTokensTable tokens={filteredSemanticTokens} />
            </div>
          </>
        )}

        {noSearchResult && (
          <Paragraph>{labels['token-preview']['no-results']}</Paragraph>
        )}
      </div>
    </div>
  );
};
