import { Field } from 'src/components/field/Field';
import { Heading } from 'src/components/typography/heading/Heading';
import { Label } from 'src/components/typography/label/Label';
import { Table } from 'src/components/table';
import { Select } from 'src/components/select/Select';
import { type HTMLAttributes, useState } from 'react';
import { capitalizeString } from 'src/utilities/helpers/stringHelpers';
import type { PreviewToken } from '../types';
import { ColorDark, ColorLight } from './color-previews';
import { labels } from '../strings';
import classes from './color.module.css';

type TokenTableProps = {
  colorTokens: Record<string, PreviewToken[]>;
} & HTMLAttributes<HTMLDivElement>;

export const ColorTokensTable = ({ colorTokens }: TokenTableProps) => {
  const colors = Object.keys(colorTokens);
  const [selectedColor, setSelectedColor] =
    useState<(typeof colors)[number]>('neutral');
  const tokens = colorTokens[selectedColor] || [];

  return (
    <div data-color={selectedColor}>
      <Field className={classes.input}>
        <Label>{labels['token-preview'].color['select-label']}</Label>
        <Select
          value={selectedColor || ''}
          onChange={(e) =>
            setSelectedColor(e.target.value as (typeof colors)[number])
          }
        >
          {colors.map((color) => (
            <Select.Option key={color} value={color}>
              {color}
            </Select.Option>
          ))}
        </Select>
      </Field>
      <Table
        data-color="neutral"
        data-colors={colors}
        key={selectedColor}
        tintedColumnHeader
      >
        <caption>
          <Heading level={4} data-size="md">
            {capitalizeString(selectedColor)}
          </Heading>
        </caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              {labels['token-preview'].table.name}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {labels['token-preview'].table.light}
            </Table.HeaderCell>
            <Table.HeaderCell>
              {labels['token-preview'].table.dark}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tokens.map((token) => {
            const name = token.variable;
            const value = token.value;
            return (
              <Table.Row key={name}>
                <Table.Cell>
                  <code>{name}</code>
                </Table.Cell>
                <Table.Cell>
                  <ColorLight colorVariable={value} />
                </Table.Cell>
                <Table.Cell>
                  <ColorDark colorVariable={value} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
