import { Card } from 'src/components/card/Card';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

export function StableAnnouncement() {
  return (
    <Card style={{ display: 'flex', width: 'fit-content' }}>
      <Card.Block style={{ padding: '1rem' }}>
        <img
          src={'./assets/img/feiring.svg'}
          alt={'Feiring'}
          role="img"
          style={{ width: '14rem', height: 'auto' }}
        />
      </Card.Block>
      <Card.Block>
        <Heading level={2}>Udirs Designsystem er stabilt!</Heading>
        <Paragraph>
          Etter to år med kartlegging, design og utvikling er vi glade for
          endelig å kunne tilby den første stabile versjonen av Udirs
          designsystem!
        </Paragraph>
        <Paragraph>
          Versjon 1.0.0 er resultatet av et solid kartleggingsarbeid, et godt
          samarbeid med teamet bak Digdirs Designsystem og en grundig design- og
          utviklingsprosess. Takk til alle dere som har testet, gitt
          tilbakemeldinger og bidratt underveis. Vi er stolte av resultatet, og
          ser frem til å fortsette å utvikle og forbedre designsystemet sammen
          med dere.
        </Paragraph>
      </Card.Block>
    </Card>
  );
}
