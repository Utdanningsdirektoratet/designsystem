import { LinkIcon } from '@udir-design/icons';
import { Link } from 'src/components/link/Link';
import { List } from 'src/components/list/List';
import { Table } from 'src/components/table';
import type { HeadingProps } from 'src/components/typography/heading/Heading';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import type { MdxComponentOverrides } from '../types';
import componentStyles from './componentOverrides.module.scss';
import { StorybookLink, handleLinkClick } from './components/StorybookLink';

const HeadingSelfLink: React.FC<HeadingProps> = ({ children, ...props }) => {
  const href = `#${props.id}`;
  return (
    <Heading {...props} className={`sb-unstyled ${componentStyles.heading}`}>
      <span>{children}</span>
      <Link
        aria-hidden
        tabIndex={-1}
        href={href}
        className={componentStyles.headingLink}
        onClick={handleLinkClick(href)}
      >
        <LinkIcon title="Link to this heading" />
      </Link>
    </Heading>
  );
};

export const componentOverrides: MdxComponentOverrides = {
  h1: (props) => <HeadingSelfLink data-size="lg" {...props} level={1} />,
  h2: (props) => <HeadingSelfLink data-size="md" {...props} level={2} />,
  h3: (props) => <HeadingSelfLink data-size="sm" {...props} level={3} />,
  h4: (props) => <HeadingSelfLink data-size="xs" {...props} level={4} />,
  h5: (props) => <HeadingSelfLink data-size="xs" {...props} level={5} />,
  h6: (props) => <HeadingSelfLink data-size="xs" {...props} level={6} />,
  p: (props) => (
    <Paragraph
      {...props}
      className={`sb-unstyled ${componentStyles.paragraph}`}
    />
  ),
  ol: (props) => (
    <List.Ordered
      {...props}
      className={`sb-unstyled ${componentStyles.list}`}
    />
  ),
  ul: (props) => (
    <List.Unordered
      {...props}
      className={`sb-unstyled ${componentStyles.list}`}
    />
  ),
  li: (props) => <List.Item {...props} className="sb-unstyled" />,
  a: StorybookLink,
  table: (props) => (
    <Table
      {...props}
      border={false}
      zebra
      className="sb-unstyled"
      style={{ width: '100%' }}
    />
  ),
  thead: (props) => <Table.Head {...props} className="sb-unstyled" />,
  tbody: (props) => <Table.Body {...props} className="sb-unstyled" />,
  tr: (props) => <Table.Row {...props} className="sb-unstyled" />,
  th: (props) => <Table.HeaderCell {...props} className="sb-unstyled" />,
  td: (props) => <Table.Cell {...props} className="sb-unstyled" />,
  dl: (props) => <dl {...props} className="sb-unstyled" />,
};
