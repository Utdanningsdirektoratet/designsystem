import { Unstyled } from '@storybook/addon-docs/blocks';
import { Table } from 'src/components/table';
import styles from './CssLanguageVariables.module.css';

export const CssLanguageVariables = ({
  variables,
}: {
  variables: Record<string, { nb: string; en: string }>;
}) => {
  return (
    <Unstyled>
      <Table className={styles.languageVariables} border zebra>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            <Table.HeaderCell>
              <code>lang="nb"</code>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <code>lang="en"</code>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {Object.entries(variables).map(([name, value]) => (
            <Table.Row key={name}>
              <Table.Cell>
                <code>{name}</code>
              </Table.Cell>
              <Table.Cell>"{value.nb}"</Table.Cell>
              <Table.Cell>"{value.en}"</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Unstyled>
  );
};
