import { Button, Link, Paragraph } from '@digdir/designsystemet-react';
import preview from '.storybook/preview';
import { Dialog } from 'src/components/dialog/Dialog';
import { Heading } from 'src/components/typography/heading/Heading';
import { Prose } from 'src/components/typography/prose/Prose';

const meta = preview.meta({
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
  },
});

export const Preview = meta.story({
  args: {},
  render: (args) => {
    return (
      <Dialog open={true} modal={false} {...args}>
        <Prose>
          <Heading>Hjelp oss å forbedre nettsiden</Heading>
          <Paragraph>
            Nødvendige informasjonskapsler sørger for at nettstedet fungerer og
            er sikkert, og kan ikke velges bort. Andre brukes til statistikk,
            analyse, og å forbedre brukeropplevelsen. Godkjenner du alle,
            hjelper du oss å lage bedre nettsider og tjenester.{' '}
            <Link href="#">Om informasjonskapslene.</Link>
          </Paragraph>
          <Paragraph>
            Du kan når som helst endre samtykket ditt via lenken i bunnmenyen.
          </Paragraph>
        </Prose>
        <div style={{ display: 'flex', gap: 'var(--ds-size-4)' }}>
          <Button variant="secondary">Godta alle</Button>
          <Button variant="secondary">Tilpass valg</Button>
          <Button variant="secondary">Godta bare nødvendige</Button>
        </div>
      </Dialog>
    );
  },
});

export const Drawer = meta.story({
  args: { placement: 'bottom' },
  render: Preview.input.render,
});
