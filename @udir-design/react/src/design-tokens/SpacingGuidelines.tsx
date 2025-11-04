import { Table } from '../components/table';

const data = [
  {
    use: 'Mellomrom mellom mindre innholdsseksjoner (f.eks. avsnitt, bilder og tabeller)',
    token: '--ds-size-5',
    px: '20px',
    comment: 'Ekstra spacing over titler legges separat',
  },
  {
    use: 'Mellomrom mellom hovedseksjoner i innhold',
    token: '--ds-size-10',
    px: '40px',
    comment: 'Brukes f.eks. mellom seksjoner på lengre tekstsider',
  },
  {
    use: 'Maks bredde for tekstinnhold',
    token: '50rem',
    px: '800px',
    comment: 'For god lesbarhet på større skjermer',
  },
  {
    use: 'Sidemarg ved interntjenester',
    token: '--ds-size-5',
    px: '20px',
    comment: 'Gjelder høyre og venstre marg',
  },
  {
    use: 'Sidemarg ved publikumstjenester',
    token: '--ds-size-16',
    px: '64px',
    comment: 'Gir mer luft og bedre tilgjengelighet',
  },
];

export function SpacingGuidelines() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Bruksområde</Table.HeaderCell>
          <Table.HeaderCell>Token / rem</Table.HeaderCell>
          <Table.HeaderCell>Verdi i px (md)</Table.HeaderCell>
          <Table.HeaderCell>Kommentar</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.use}>
            <Table.Cell>{row.use}</Table.Cell>
            <Table.Cell>
              {row.token && <code className="css-b5rkn5">{row.token}</code>}
            </Table.Cell>
            <Table.Cell>{row.px}</Table.Cell>
            <Table.Cell>{row.comment}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
