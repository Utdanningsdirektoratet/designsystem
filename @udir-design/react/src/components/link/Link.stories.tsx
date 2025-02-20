import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { Paragraph } from '../alpha';
import { EnvelopeClosedIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['alpha'],
  parameters: {
    customStyles: { padding: '2px' },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const udirLink = 'https://udir.no/';

export const Preview: Story = {
  args: {
    href: udirLink,
    children: 'Gå til udirs hjemmeside',
  },
};

export const InText: Story = {
  render: (args) => (
    <Paragraph>
      Designsystemet må ses i sammenheng med{' '}
      <Link href="https://www.udir.no/om-udir/mal-og-oppgaver/" {...args}>
        Udirs mål og oppgaver
      </Link>
      .
    </Paragraph>
  ),
};

export const WithIcon: Story = {
  args: {
    href: 'mailto:designsystem@digdir.no',
    children: [<EnvelopeClosedIcon aria-hidden />, ' Kontakt oss'],
  },
};

export const LongLink: Story = {
  parameters: {
    customStyles: { width: '200px' },
  },
  render: (args) => (
    <Paragraph>
      <Link href={udirLink} {...args}>
        Dette er en lenke som brekker over flere linjer
      </Link>
    </Paragraph>
  ),
};

export const Neutral: Story = {
  args: {
    children: 'Gå til designsystemet',
    href: udirLink,
    'data-color': 'neutral',
  },
};
