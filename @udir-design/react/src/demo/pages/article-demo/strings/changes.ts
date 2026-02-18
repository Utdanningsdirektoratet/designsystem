interface Change {
  summary: string;
  content: string;
}

export const changes: Change[] = [
  {
    summary: 'Oversikt - 19.11.2022',
    content:
      'Vi har lagt til en ny knapp hvor du får oversikt over hvilke deler av læreplanen du har brukt i planene dine.',
  },
  {
    summary: 'Tilgang for instruktører i bedrift - 09.11.2022',
    content:
      'Vi har lagt til pålogging med ID-porten slik at også instruktører i bedrift kan bruke planleggingsverktøyet.',
  },
  {
    summary: 'Invitere til flere planer - 25.01.2022',
    content:
      'Vi har fått innspill om at det er tungvindt å gå inn i en og en plan for å invitere samarbeidspartnere. Vi har lagt til mulighet for å invitere samarbeidspartnere til mange planer samtidig. ',
  },
  {
    summary: 'Velge språk - 10.01.2022',
    content:
      'Vi har lagt til funksjon for å velge språk slik at verktøyet er tilgjengelig på bokmål, nynorsk, nordsamisk, sørsamisk og lulesamisk. Det er mulig å velge språk på brukerinnstillinger og på hver enkelt plan.',
  },
  {
    summary: 'Overføring av planer når en bruker slettes - 22.06.2022',
    content:
      'Tidligere var det slik at hvis en bruker slettet seg fra planleggingsverktøyet, så ble alle planene personen hadde opprettet også slettet. Vi fikk tilbakemelding om at dette var uheldig for samarbeidspartnerne. Vi har derfor endret dette. Nå er det slik: Den som har  opprettet en plan, har rollen som administrator. Hvis administrator av en plan slettes som bruker, blir ikke planen slettet hvis det er samarbeidspartnere på planen. Rollen som administrator blir overført til den samarbeidspartneren som står øverst på lista i planen. Samtykkeerklæringen er oppdatert i tråd med denne endringen. Det er fortsatt slik at både administrator og samarbeidspartnere kan endre en plan, men bare administrator kan slette den',
  },
];
