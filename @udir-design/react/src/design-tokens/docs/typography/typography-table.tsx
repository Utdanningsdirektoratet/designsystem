import { Heading } from 'src/components/typography/heading/Heading';
import { Table } from 'src/components/table';
import * as R from 'ramda';
import type { HTMLAttributes } from 'react';
import { capitalizeString } from 'src/utilities/helpers/stringHelpers';
import {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
} from './typography-previews';
import { labels } from '../strings';
import classes from './typography.module.css';

type TokenTableProps = {
  tokens: PreviewToken[];
} & HTMLAttributes<HTMLDivElement>;

type PreviewToken = { variable: string; value: string; path: string[] };

const groupedByPathIndex = (index = 0) =>
  R.groupBy((token: PreviewToken) => token.path[index] || 'rest');

const getValuePreview = (variable: string, value: string) => {
  if (variable.includes('font-size')) {
    return <FontSize value={value} />;
  }
  if (variable.includes('line-height')) {
    return <LineHeight value={value} />;
  }
  if (variable.includes('font-weight')) {
    return <FontWeight value={value} text={variable} />;
  }
  if (variable.includes('font-family')) {
    return <FontFamily value={value} />;
  }
  if (variable.includes('letter-spacing')) {
    return <LetterSpacing value={value} />;
  }

  return <code>{value}</code>;
};

const TypographySetTables = ({
  tokens: typographySetTokens,
}: {
  tokens: Partial<Record<string, PreviewToken[]>>;
}) => {
  return Object.entries(typographySetTokens).map(([path, tokens]) => {
    if (tokens?.length === 0) {
      return null;
    }

    const groupByTypography = groupedByPathIndex(2)(tokens || []);

    return Object.entries(groupByTypography).map(
      ([typographyName, typographyTokens]) => {
        return (
          <div key={typographyName} className={classes.section}>
            <Table data-color="neutral" tintedColumnHeader>
              <caption>
                <Heading level={5} data-size="sm">
                  {`${capitalizeString(path)} ${typographyName}`}
                </Heading>
              </caption>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>
                    {labels['token-preview'].table.name}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {labels['token-preview'].table.value}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {labels['token-preview'].table.preview}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {typographyTokens?.map(({ variable, value }) => {
                  return (
                    <Table.Row key={variable}>
                      <Table.Cell>
                        <code>{variable}</code>
                      </Table.Cell>
                      <Table.Cell>
                        <code>{value}</code>
                      </Table.Cell>
                      <Table.Cell>
                        {getValuePreview(variable, value)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        );
      },
    );
  });
};

export const TypographyTable = ({ tokens }: TokenTableProps) => {
  const groupedTokens = groupedByPathIndex(0)(tokens);

  return Object.entries(groupedTokens).map(([path, tokens]) => {
    if (tokens?.length === 0) {
      return null;
    }

    const isTypography = path === 'typography';
    const groupByTypography = isTypography
      ? groupedByPathIndex(1)(tokens || [])
      : ([] as unknown as Partial<Record<string, PreviewToken[]>>);

    return isTypography ? (
      <TypographySetTables key={path} tokens={groupByTypography} />
    ) : (
      <div key={path} className={classes.section}>
        <Table data-color="neutral" key={path} tintedColumnHeader>
          <caption>
            <Heading level={5} data-size="sm">
              {capitalizeString(path)}
            </Heading>
          </caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Verdi</Table.HeaderCell>
              <Table.HeaderCell>Forhåndsvisning</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {tokens?.map(({ variable, value }) => (
              <Table.Row key={variable}>
                <Table.Cell>
                  <code>{variable}</code>
                </Table.Cell>
                <Table.Cell>
                  <code>{value}</code>
                </Table.Cell>
                <Table.Cell>{getValuePreview(variable, value)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  });
};
