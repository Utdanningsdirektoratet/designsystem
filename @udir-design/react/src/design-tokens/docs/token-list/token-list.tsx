import { useDebounceCallback } from '@digdir/designsystemet-react';
import { useState } from 'react';
import { Field } from 'src/components/field/Field';
import { Search } from 'src/components/search/Search';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { ColorTokensTable } from '../color/color-table';
import colorTokens from '../design-tokens/color.json';
import semanticTokens from '../design-tokens/semantic.json';
import sizeTokens from '../design-tokens/size.json';
import typeScaleTokens from '../design-tokens/type-scale.json';
import typographyTokens from '../design-tokens/typography.json';
import { SemanticTokensTable } from '../semantic/semantic-table';
import { labels } from '../strings';
import type { PreviewToken } from '../types';
import { TypographyTable } from '../typography/typography-table';
import { has, includes, pick } from '../utilities/search-utitilites';
import classes from './token-list.module.css';

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
  }, 500);

  const headingMatches = {
    colors: includes(labels['token-preview']['colors'], value),
    typography: includes(labels['token-preview'].typography, value),
    semantic: includes(labels['token-preview'].semantic, value),
  };

  const filteredColorTokens = filteredRecord(colorTokens, value);
  const filteredTypeScaleTokens = typeScaleTokens.filter((t) =>
    tokenSearchFilter(t, value),
  );
  const filteredTypographyGroups = filteredRecord(typographyTokens, value);
  const filteredTypographyCombined = [
    ...filteredTypeScaleTokens,
    ...Object.values(filteredTypographyGroups).flat(),
  ];
  const filteredSemanticTokens = semanticTokens.filter((t) =>
    tokenSearchFilter(t, value),
  );
  const filteredSizeTokens = sizeTokens.filter((t) =>
    tokenSearchFilter(t, value),
  );
  const filteredSemanticAndSize = [
    ...filteredSizeTokens,
    ...filteredSemanticTokens,
  ];

  // all (unfiltered)
  const allTypography = [
    ...Object.values(typographyTokens).flat(),
    ...typeScaleTokens,
  ];
  const allSemanticAndSize = [...sizeTokens, ...semanticTokens];

  const displayColorTokens = pick(
    headingMatches.colors,
    colorTokens,
    filteredColorTokens,
  );
  const displayTypographyTokens = pick(
    headingMatches.typography,
    allTypography,
    filteredTypographyCombined,
  );
  const displaySemanticTokens = pick(
    headingMatches.semantic,
    allSemanticAndSize,
    filteredSemanticAndSize,
  );

  const showColors = headingMatches.colors || has(filteredColorTokens);
  const showTypography =
    headingMatches.typography || filteredTypographyCombined.length > 0;
  const showSemantic =
    headingMatches.semantic || filteredSemanticAndSize.length > 0;
  const noSearchResult = !(showColors || showTypography || showSemantic);

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
        {showColors && (
          <>
            <Heading
              level={2}
              data-size="lg"
              id={labels['token-preview']['colors'] + 'heading'}
            >
              {labels['token-preview']['colors']}
            </Heading>
            <Paragraph>{labels['token-preview'].color.description}</Paragraph>
            <div className={classes.section}>
              <ColorTokensTable colorTokens={displayColorTokens} />
            </div>
          </>
        )}
        {showTypography && (
          <>
            <Heading
              level={2}
              data-size="lg"
              id={labels['token-preview'].typography + 'heading'}
            >
              {labels['token-preview'].typography}
            </Heading>
            <div className={classes.section}>
              <TypographyTable tokens={displayTypographyTokens} />
            </div>
          </>
        )}
        {showSemantic && (
          <>
            <Heading
              level={2}
              data-size="lg"
              id={labels['token-preview'].semantic + 'heading'}
            >
              {labels['token-preview'].semantic}
            </Heading>
            <Paragraph>{labels['token-preview'].size.description}</Paragraph>
            <div className={classes.section}>
              <SemanticTokensTable tokens={displaySemanticTokens} />
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
