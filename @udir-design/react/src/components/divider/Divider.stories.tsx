import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';
import {
  Heading,
  Link,
  ListItem,
  ListUnordered,
  Paragraph,
} from '@udir-design/react/alpha';

const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Preview: Story = {
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-4)',
    },
  },
  render: (args) => (
    <>
      <Heading
        level={1}
        data-size="md"
        style={{ marginBottom: 'var(--ds-size-2)' }}
      >
        Kvalitet i barnehagen
      </Heading>
      <Paragraph>
        Barnehagen er første trinn i et langt utdanningsløp og skal gi barn en
        god start, uavhengig av bakgrunn og behov. Barnehager av høy kvalitet
        kan ha positiv effekt som varer hele livet.
      </Paragraph>
      <Paragraph>
        Kvalitet i barnehagen omtales i barnehageloven med forskrifter inkludert
        rammeplanen. Rammeplanen er utgangspunktet for barnehagens arbeid med å
        ivareta barnas behov for omsorg og lek, og fremme læring og danning som
        grunnlag for allsidig utvikling.
      </Paragraph>
      <Divider {...args} style={{ margin: 'var(--ds-size-4) 0' }} />
      <Heading level={2}>Se også</Heading>
      <ListUnordered
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        <ListItem>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190252">
            Kvalitet i SFO
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190241">
            Kvalitet i grunnopplæringen
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190254">
            Kvalitet i PP-tjenesten
          </Link>
        </ListItem>
      </ListUnordered>
    </>
  ),
};
