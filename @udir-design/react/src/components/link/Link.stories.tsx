import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import {
  Card,
  Heading,
  ListItem,
  ListUnordered,
  Paragraph,
} from '@udir-design/react/alpha';
import {
  ArrowDownRightIcon,
  EnvelopeClosedIcon,
  FilePdfFillIcon,
} from '@navikt/aksel-icons';
import styles from '../../utilities/css/anchorLink.module.css';
EnvelopeClosedIcon.displayName = 'EnvelopeClosedIcon';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['beta'],
  parameters: {
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
      <EnvelopeClosedIcon aria-hidden /> Kontakt oss
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
      <FilePdfFillIcon aria-hidden /> Samisk i barnehagen (PDF, 299KB)
    </Link>
  ),
};

export const AnchorLinks: Story = {
  parameters: {
    customStyles: {
      width: '25rem',
    },
  },
  render: () => (
    <Card variant="tinted" data-color="accent">
      <Heading level={2} data-size="xs">
        Innhold på siden
      </Heading>
      <ListUnordered
        style={{
          listStyle: 'none',
          padding: 0,
          marginTop: 'var(--ds-size-4)',
        }}
      >
        <ListItem>
          <Link href="#retningslinjer" className={styles.anchorLink}>
            <ArrowDownRightIcon aria-hidden /> Retningslinjer
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#tekst-i-link" className={styles.anchorLink}>
            <ArrowDownRightIcon aria-hidden /> Tekst i Link
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#tilgjengelighet" className={styles.anchorLink}>
            <ArrowDownRightIcon aria-hidden /> Tilgjengelighet
          </Link>
        </ListItem>
      </ListUnordered>
    </Card>
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
