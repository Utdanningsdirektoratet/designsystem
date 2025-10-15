import type { Meta, StoryObj } from '@storybook/react-vite';
import { EnvelopeClosedIcon, FilePdfFillIcon } from '@udir-design/icons';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Link } from './Link';

EnvelopeClosedIcon.displayName = 'EnvelopeClosedIcon';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const udirLink = 'https://udir.no/';

export const Preview: Story = {
  args: {
    href: udirLink,
    children: 'Gå til udir.no',
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
  },
  render: (args) => (
    <Link {...args}>
      <EnvelopeClosedIcon aria-hidden />
      <span>Kontakt oss</span>
    </Link>
  ),
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

export const File: Story = {
  args: {
    href: 'https://www.udir.no/api/PdfApi/PrintPageAsPdfDocument/224209',
  },
  render: (args) => (
    <Link {...args}>
      <FilePdfFillIcon aria-hidden />
      <span>Samisk i barnehagen (PDF, 299KB)</span>
    </Link>
  ),
};

export const Focused: Story = {
  args: Preview.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};
