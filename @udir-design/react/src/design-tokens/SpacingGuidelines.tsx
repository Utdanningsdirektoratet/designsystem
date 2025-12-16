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
    use: 'Maks bredde for innhold',
    token: '80rem',
    px: '1280px',
    comment: 'Kan gjøres unntak ved f.eks. fagsystemer som trenger mer plass',
  },
  {
    use: 'Sidemarg ved fagsystemer',
    token: '--ds-size-5',
    px: '20px',
    comment:
      'Når brukeren er godt kjent med systemet kan man utnytte hele bredden for mest mulig funksjonalitet per flate',
  },
  {
    use: 'Sidemarg ved andre digitale tjenester',
    token: '--ds-size-15',
    px: '60px',
    comment:
      'Mer luft gjør det mer brukervennlig der brukerne ikke er så kjent med tjenesten',
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
