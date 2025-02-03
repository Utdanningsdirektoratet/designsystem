import './style.css';
import { Preview } from '@storybook/react';
import type { MarkdownToJSX } from 'markdown-to-jsx';
import customTheme from './customTheme';
import { Heading, Link, LinkProps, List, Paragraph, Table } from '../src/alpha';
import componentStyles from './componentOverrides.module.scss';

type Props = Record<string, unknown>;

const getPath = (href: string | undefined): string => {
  if (!href) {
    return '';
  }

  // if link starts with /, add current path to link
  if (href.startsWith('/')) {
    const { origin = '' } = document.location;

    return `${origin}/?path=${href}`;
  }

  return href;
};

export const componentOverrides = {
  h1: (props: Props) => (
    <Heading
      data-size="lg"
      {...props}
      className={`sb-unstyled ${componentStyles.heading}`}
      level={1}
    />
  ),
  h2: (props: Props) => (
    <Heading
      data-size="md"
      {...props}
      className={`sb-unstyled ${componentStyles.heading}`}
      level={2}
    />
  ),
  h3: (props: Props) => (
    <Heading
      data-size="sm"
      {...props}
      className={`sb-unstyled ${componentStyles.heading}`}
      level={3}
    />
  ),
  p: (props: Props) => (
    <Paragraph
      {...props}
      className="sb-unstyled"
      style={{
        backgroundColor: 'transparent',
        marginBottom: 'var(--ds-spacing-2)',
      }}
    />
  ),
  ol: (props: Props) => (
    <List.Ordered
      {...props}
      style={{ maxWidth: '70ch', marginBottom: 'var(--ds-spacing-2)' }}
      className="sb-unstyled"
    />
  ),
  ul: (props: Props) => (
    <List.Unordered
      {...props}
      style={{ maxWidth: '70ch', marginBottom: 'var(--ds-spacing-2)' }}
      className="sb-unstyled"
    />
  ),
  li: (props: Props) => (
    <List.Item
      {...props}
      className="sb-unstyled"
      style={{ maxWidth: '70ch', marginTop: 'var(--ds-spacing-1)' }}
    />
  ),
  a: (props: LinkProps) => {
    // if link starts with /, add current path to link
    const href = getPath(props.href);

    return <Link {...props} href={href} className="sb-unstyled" />;
  },
  table: (props: Props) => (
    <Table {...props} zebra className="sb-unstyled" style={{ width: '100%' }} />
  ),
  thead: (props: Props) => <Table.Head {...props} className="sb-unstyled" />,
  tbody: (props: Props) => <Table.Body {...props} className="sb-unstyled" />,
  tr: (props: Props) => <Table.Row {...props} className="sb-unstyled" />,
  th: (props: Props) => <Table.HeaderCell {...props} className="sb-unstyled" />,
  td: (props: Props) => <Table.Cell {...props} className="sb-unstyled" />,
  dl: (props: Props) => <dl {...props} className="sb-unstyled" />,
} satisfies MarkdownToJSX.Overrides;

const preview: Preview = {
  tags: ['autodocs', 'a11y-test'],
  parameters: {
    options: {
      storySort: {
        order: ['Introduksjon', 'demo', 'components'],
      },
    },
    docs: {
      theme: customTheme,
      components: componentOverrides,
    },
  },
};

export default preview;
