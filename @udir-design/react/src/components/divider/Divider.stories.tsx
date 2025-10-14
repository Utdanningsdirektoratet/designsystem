import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../link/Link';
import { List } from '../list/List';
import { Heading } from '../typography/heading/Heading';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
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
      <List.Unordered
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        <List.Item>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190252">
            Kvalitet i SFO
          </Link>
        </List.Item>
        <List.Item>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190241">
            Kvalitet i grunnopplæringen
          </Link>
        </List.Item>
        <List.Item>
          <Link href="https://www.udir.no/kvalitet-og-kompetanse/hva-er-kvalitet/#a190254">
            Kvalitet i PP-tjenesten
          </Link>
        </List.Item>
      </List.Unordered>
    </>
  ),
};
