import { EnvelopeClosedIcon, FilePdfFillIcon } from '@udir-design/icons';
import preview from '.storybook/preview';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Link } from './Link';

EnvelopeClosedIcon.displayName = 'EnvelopeClosedIcon';

const meta = preview.meta({
  component: Link,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
  args: {
    children: undefined,
  },
});

const udirLink = 'https://udir.no/';

export const Preview = meta.story({
  args: {
    href: udirLink,
    children: 'Gå til udir.no',
  },
});

export const InText = meta.story({
  render: (args) => (
    <Paragraph>
      Designsystemet må ses i sammenheng med{' '}
      <Link href="https://www.udir.no/om-udir/mal-og-oppgaver/" {...args}>
        Udirs mål og oppgaver
      </Link>
      .
    </Paragraph>
  ),
});

export const WithIcon = meta.story({
  args: {
    href: 'mailto:designsystem@digdir.no',
  },
  render: (args) => (
    <Link {...args}>
      <EnvelopeClosedIcon aria-hidden />
      <span>Kontakt oss</span>
    </Link>
  ),
});

export const LongLink = meta.story({
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
});

export const File = meta.story({
  args: {
    href: 'https://www.udir.no/api/PdfApi/PrintPageAsPdfDocument/224209',
  },
  render: (args) => (
    <Link {...args}>
      <FilePdfFillIcon aria-hidden />
      <span>Samisk i barnehagen (PDF, 299KB)</span>
    </Link>
  ),
});

export const Focused = meta.story({
  args: Preview.input.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
});
