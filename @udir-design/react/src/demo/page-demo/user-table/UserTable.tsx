import React from 'react';
import {
  Heading,
  Button,
  Select,
  Search,
  Table,
} from '@udir-design/react/alpha';
import styles from './UserTable.module.scss';

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
          <Button className={styles.actionBtn}>Utfør</Button>
        </div>
        <Search className={styles.tableSearch}>
          <Search.Input aria-label="Søk" />
          <Search.Clear />
          <Search.Button />
        </Search>
      </div>
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
            <Table.Cell className={styles.tableCell}>Samvis Gamgod</Table.Cell>
            <Table.Cell>samvis.gamgod@post.no</Table.Cell>
            <Table.Cell>87654321</Table.Cell>
            <Table.Cell>0002</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.tableCell}>Harry Goatleaf</Table.Cell>
            <Table.Cell>harry.goatleaf@post.no</Table.Cell>
            <Table.Cell>55654321</Table.Cell>
            <Table.Cell>0003</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className={styles.tableCell}>Frodo Baggins</Table.Cell>
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
  );
}
