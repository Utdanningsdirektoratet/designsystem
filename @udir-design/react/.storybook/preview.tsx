import './style.css';
import './customTheme.scss';
import { INITIAL_VIEWPORTS, type ViewportMap } from '@storybook/addon-viewport';
import { Preview } from '@storybook/react';
import customTheme from './customTheme';
import {
  Heading,
  HeadingProps,
  Link,
  List,
  Paragraph,
  Table,
} from '../src/alpha';
import componentStyles from './componentOverrides.module.scss';
import { customStylesDecorator } from './utils/customStylesDecorator';
import { MdxComponentOverrides } from './types/parameters';
import { Children, MouseEventHandler } from 'react';
import { ExternalLinkIcon, LinkIcon } from '@navikt/aksel-icons';

// See the complete list of available devices in INITIAL_VIEWPORTS here:
// https://storybook.js.org/docs/essentials/viewport#use-a-detailed-set-of-devices
const storybookViewports: ViewportMap = {
  iphone6: INITIAL_VIEWPORTS['iphone6'],
  ipad: INITIAL_VIEWPORTS['ipad'],
  desktop: {
    name: 'Desktop',
    styles: { width: '1200px', height: '100%' },
    type: 'desktop',
  },
};

const chromaticViewports = {
  desktop: { viewport: { width: 1200 } },
};

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

const handleLinkClick =
  (href: string): MouseEventHandler<HTMLAnchorElement> =>
  (event) => {
    // Handle in-page anchor links
    if (href.startsWith('#')) {
      event.preventDefault();
      document
        .getElementById(href.substring(1))
        ?.scrollIntoView({ behavior: 'smooth' });
      window.parent.history.pushState(undefined, '', href);
    }
  };

const HeadingSelfLink: React.FC<HeadingProps> = ({ children, ...props }) => {
  const href = `#${props.id}`;
  return (
    <Heading {...props} className={`sb-unstyled ${componentStyles.heading}`}>
      {children}
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
  h4: (props) => <HeadingSelfLink data-size="sm" {...props} level={4} />,
  h5: (props) => <HeadingSelfLink data-size="sm" {...props} level={5} />,
  h6: (props) => <HeadingSelfLink data-size="sm" {...props} level={6} />,
  p: (props) => (
    <Paragraph
      {...props}
      className="sb-unstyled"
      style={{
        backgroundColor: 'transparent',
        marginBottom: 'var(--ds-size-2)',
      }}
    />
  ),
  ol: (props) => (
    <List.Ordered
      {...props}
      style={{ maxWidth: '70ch', marginBottom: 'var(--ds-size-2)' }}
      className="sb-unstyled"
    />
  ),
  ul: (props) => (
    <List.Unordered
      {...props}
      style={{ maxWidth: '70ch', marginBottom: 'var(--ds-size-2)' }}
      className="sb-unstyled"
    />
  ),
  li: (props) => (
    <List.Item
      {...props}
      className="sb-unstyled"
      style={{ maxWidth: '70ch', marginTop: 'var(--ds-size-1)' }}
    />
  ),
  a: ({ children = '', ...props }) => {
    // if link starts with /, add current path to link
    const href = getPath(props.href);
    let isExternal = false;
    try {
      isExternal =
        new URL(href, document.location.origin).origin !==
        document.location.origin;
    } catch {
      // If the URL is invalid, assume it's not external
      isExternal = false;
    }
    return (
      <Link
        {...props}
        href={href}
        className={`sb-unstyled ${componentStyles.link}`}
        onClick={handleLinkClick(props.href ?? '')}
        // Add a data-attribute for use when styling links which include code snippets
        {...(Children.count(children) === 1 && { 'data-single-child': true })}
      >
        {children}
        {isExternal && (
          <ExternalLinkIcon className={componentStyles.linkIcon} />
        )}
      </Link>
    );
  },
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

const preview: Preview = {
  tags: ['autodocs', 'a11y-test'],
  parameters: {
    options: {
      storySort: {
        order: ['Introduksjon', 'demo', 'components'],
      },
    },

    docs: {
      // Configure the table of contents
      toc: {
        title: 'På denne siden',
        headingSelector: 'h2',
      },
      theme: customTheme,
      components: componentOverrides,
    },

    viewport: {
      options: storybookViewports,
    },

    chromatic: {
      modes: chromaticViewports,
    },

    a11y: {
      test: 'error',
    },
  },
  initialGlobals: {
    viewport: { value: 'desktop' },
  },
  decorators: customStylesDecorator,
};

export default preview;
