import type { Size } from '@digdir/designsystemet-react';
import { groupBy } from 'ramda';
import { type HTMLAttributes, useState } from 'react';
import { Field } from 'src/components/field/Field';
import { Select } from 'src/components/select/Select';
import { Table } from 'src/components/table';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { capitalizeString } from 'src/utilities/helpers/stringHelpers';
import { labels } from '../strings';
import type { PreviewToken } from '../types';
import {
  BorderRadius,
  BorderWidth,
  ComputedValue,
  Opacity,
  Shadow,
  Size as SizePreview,
} from './semantic-previews';
import classes from './semantic.module.css';

type TokenTableProps = {
  tokens: PreviewToken[];
} & HTMLAttributes<HTMLDivElement>;

const groupedByPathIndex = (index = 0) =>
  groupBy((token: PreviewToken) => token.path[index] || 'rest');

const getValuePreview = (variable: string, value: string, size?: string) => {
  if (/^--ds-size.*(\d+|unit)$/.test(variable)) {
    return <SizePreview value={value} size={size} />;
  }
  if (/^--ds-border-radius(?!.*(scale|base)$)/.test(variable)) {
    return <BorderRadius value={value} />;
  }

  if (/^--ds-shadow/.test(variable)) {
    return <Shadow value={value} />;
  }

  if (/^--ds-opacity/.test(variable)) {
    return <Opacity value={value} />;
  }

  if (/^--ds-border-width/.test(variable)) {
    return <BorderWidth value={value} />;
  }

  return <code>{value}</code>;
};

const getValueRender = (variable: string, value: string, size?: string) => {
  if (!/opacity|shadow|size-base|size-step/.test(variable)) {
    return <ComputedValue value={value} size={size} />;
  }

  return <code>{value}</code>;
};

const DefaultSemanticTable = ({
  tokens,
  title,
}: {
  tokens: PreviewToken[];
  title: string;
}) => {
  return (
    <div key={title} className={classes['overflow-table']}>
      <Table tintedColumnHeader>
        <caption>
          <Heading level={5} data-size="sm">
            {capitalizeString(title)}
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
              {labels['token-preview'].table.variable}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tokens?.map(({ variable, value }) => (
            <Table.Row key={variable}>
              <Table.Cell>
                <code>{variable}</code>
              </Table.Cell>
              <Table.Cell>{getValueRender(variable, value)}</Table.Cell>
              <Table.Cell>{getValuePreview(variable, value)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const SemanticSizeTable = ({
  tokens,
  title,
}: {
  tokens: PreviewToken[];
  title: string;
}) => {
  const sizes: Size[] = ['sm', 'md', 'lg'];
  const [selectedSize, setSelectedSize] = useState<Size>('md');

  return (
    <div key={title}>
      <Field className={classes.input}>
        <Label>{labels['token-preview'].size['select-label']}</Label>
        <Select
          value={selectedSize || ''}
          onChange={(e) =>
            setSelectedSize(e.target.value as (typeof sizes)[number])
          }
        >
          {sizes.map((size) => (
            <Select.Option key={size} value={size}>
              {size}
            </Select.Option>
          ))}
        </Select>
      </Field>
      <div key={title} className={classes['overflow-table']}>
        <Table tintedColumnHeader>
          <caption>
            <Heading level={5} data-size="sm">
              {capitalizeString(title)}
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
                {labels['token-preview'].table.variable}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {tokens?.map(({ variable, value }) => (
              <Table.Row key={variable}>
                <Table.Cell>
                  <code>{variable}</code>
                </Table.Cell>
                <Table.Cell>
                  {getValueRender(variable, value, selectedSize)}
                </Table.Cell>
                <Table.Cell>
                  {getValuePreview(variable, value, selectedSize)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export const SemanticTokensTable = ({ tokens }: TokenTableProps) => {
  const groupedTokens = groupedByPathIndex(0)(tokens);

  return Object.entries(groupedTokens).map(([path, tokens]) => {
    if (!tokens) {
      return null;
    }

    const prettyPath = path.replace(/_/g, ''); // Remove underscores from size tokens

    if (prettyPath === 'size') {
      return (
        <SemanticSizeTable
          key={prettyPath}
          tokens={tokens}
          title={prettyPath}
        />
      );
    }

    return (
      <DefaultSemanticTable
        key={prettyPath}
        tokens={tokens}
        title={prettyPath}
      />
    );
  });
};
