import React from 'react';
import styles from './UserTable.module.scss';
import { Heading } from 'src/components/typography/heading/Heading';
import { Select } from 'src/components/select/Select';
import { Popover } from 'src/components/popover/Popover';
import { Button } from 'src/components/button/Button';
import { Search } from 'src/components/search/Search';
import { Table } from 'src/components/table';

export function UserTable() {
  return (
    <div className={styles.tableContainer}>
      <Heading>Alle brukere</Heading>
      <div className={styles.actionAndSearch}>
        <div className={styles.selectAction}>
          <Select aria-label="Velg handling">
            <Select.Option value="blank">Velg handling</Select.Option>
            <Select.Option value="duplicate">Dupliser</Select.Option>
            <Select.Option value="delete">Slett</Select.Option>
            <Select.Option value="update">Oppdater</Select.Option>
          </Select>
          <Popover.TriggerContext>
            <Popover.Trigger className={styles.actionBtn}>
              Utfør
            </Popover.Trigger>
            <Popover>
              Er du sikker på at du vil gjennomføre? Handlingen vil utføres på
              alle brukere.
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--ds-size-2)',
                  marginTop: 'var(--ds-size-2)',
                }}
              >
                <Button data-size="sm">Ja, utfør</Button>
                <Button data-size="sm" variant="tertiary">
                  Avbryt
                </Button>
              </div>
            </Popover>
          </Popover.TriggerContext>
        </div>
        <Search className={styles.tableSearch}>
          <Search.Input aria-label="Søk" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </div>
      <div className={styles.tableWrapper}>
        <Table className={styles.table}>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell sort="none">Navn</Table.HeaderCell>
              <Table.HeaderCell>Epost</Table.HeaderCell>
              <Table.HeaderCell sort="none">Telefon</Table.HeaderCell>
              <Table.HeaderCell sort="none">Ansattnr</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell className={styles.tableCell}>Tom Bombadil</Table.Cell>
              <Table.Cell>tom.bombadill@post.no</Table.Cell>
              <Table.Cell>22345678</Table.Cell>
              <Table.Cell>0001</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.tableCell}>
                Samvis Gamgod
              </Table.Cell>
              <Table.Cell>samvis.gamgod@post.no</Table.Cell>
              <Table.Cell>87654321</Table.Cell>
              <Table.Cell>0002</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.tableCell}>
                Harry Goatleaf
              </Table.Cell>
              <Table.Cell>harry.goatleaf@post.no</Table.Cell>
              <Table.Cell>55654321</Table.Cell>
              <Table.Cell>0003</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.tableCell}>
                Frodo Baggins
              </Table.Cell>
              <Table.Cell>frodo.baggins@post.no</Table.Cell>
              <Table.Cell>87904721</Table.Cell>
              <Table.Cell>0004</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className={styles.tableCell}>
                Fréaláf Hildason
              </Table.Cell>
              <Table.Cell>frealaf.hildason@post.no</Table.Cell>
              <Table.Cell>09873940</Table.Cell>
              <Table.Cell>0005</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
