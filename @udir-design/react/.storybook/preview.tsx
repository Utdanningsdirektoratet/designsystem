import './style.css';
import { Preview } from '@storybook/react';
import type { MarkdownToJSX } from 'markdown-to-jsx';
import customTheme from './customTheme';
import {
  Heading,
  Link,
  LinkProps,
  List,
  Paragraph,
  Table,
} from '@udir-design/react/alpha';

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
      {...props}
      className="sb-unstyled"
      level={1}
      data-size="lg"
      data-color-scheme="light"
      style={{
        backgroundColor: 'transparent',
        marginBottom: 'var(--ds-spacing-2)',
      }}
    />
  ),
  h2: (props: Props) => (
    <Heading
      {...props}
      className="sb-unstyled"
      level={2}
      data-size="md"
      data-color-scheme="light"
      style={{
        backgroundColor: 'transparent',
        marginTop: 'var(--ds-spacing-5)',
        marginBottom: 'var(--ds-spacing-2)',
      }}
    />
  ),
  h3: (props: Props) => (
    <Heading
      {...props}
      className="sb-unstyled"
      level={3}
      data-size="sm"
      data-color-scheme="light"
      style={{
        backgroundColor: 'transparent',
        marginTop: 'var(--ds-spacing-4)',
        marginBottom: 'var(--ds-spacing-2)',
      }}
    />
  ),
  p: (props: Props) => (
    <Paragraph
      {...props}
      className="sb-unstyled"
      data-color-scheme="light"
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
      data-color-scheme="light"
    />
  ),
  ul: (props: Props) => (
    <List.Unordered
      {...props}
      style={{ maxWidth: '70ch', marginBottom: 'var(--ds-spacing-2)' }}
      className="sb-unstyled"
      data-color-scheme="light"
    />
  ),
  li: (props: Props) => (
    <List.Item
      {...props}
      className="sb-unstyled"
      style={{ maxWidth: '70ch', marginTop: 'var(--ds-spacing-1)' }}
      data-color-scheme="light"
    />
  ),
  a: (props: LinkProps) => {
    // if link starts with /, add current path to link
    const href = getPath(props.href);

    return (
      <Link
        {...props}
        href={href}
        className="sb-unstyled"
        data-color-scheme="light"
      />
    );
  },
  table: (props: Props) => (
    <Table
      {...props}
      zebra
      className="sb-unstyled"
      style={{ width: '100%' }}
      data-color-scheme="light"
    />
  ),
  thead: (props: Props) => (
    <Table.Head {...props} className="sb-unstyled" data-color-scheme="light" />
  ),
  tbody: (props: Props) => (
    <Table.Body {...props} className="sb-unstyled" data-color-scheme="light" />
  ),
  tr: (props: Props) => (
    <Table.Row {...props} className="sb-unstyled" data-color-scheme="light" />
  ),
  th: (props: Props) => (
    <Table.HeaderCell
      {...props}
      className="sb-unstyled"
      data-color-scheme="light"
    />
  ),
  td: (props: Props) => (
    <Table.Cell {...props} className="sb-unstyled" data-color-scheme="light" />
  ),
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
