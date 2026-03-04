import {
  type AnchorHTMLAttributes,
  Children,
  type MouseEventHandler,
} from 'react';
import { Link } from 'src/components/link/Link';

const getPath = (href: string | undefined): string => {
  if (!href) {
    return '';
  }

  // if link starts with /, add current path to link
  if (href.startsWith('/')) {
    // Get location from window.parent instead of document, otherwise pathname is iframe.html
    const { origin = '', pathname } = window.parent.location;

    return `${origin}${pathname}?path=${href}`;
  }

  return href;
};

export const handleLinkClick =
  (href: string): MouseEventHandler<HTMLAnchorElement> =>
  (event) => {
    // Handle in-page anchor links
    if (href.startsWith('#')) {
      event.preventDefault();
      document
        .getElementById(decodeURIComponent(href).substring(1))
        ?.scrollIntoView({ behavior: 'smooth' });
      window.parent.history.pushState(undefined, '', href);
    }
  };

export const StorybookLink = ({
  children = '',
  ...props
}: Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'data-size' | 'data-color'
>) => {
  // if link starts with /, add current path to link
  const href = getPath(props.href);

  return (
    <Link
      {...props}
      href={href}
      className="sb-unstyled"
      onClick={handleLinkClick(props.href ?? '')}
      // Add a data-attribute for use when styling links which include code snippets
      {...(Children.count(children) === 1 && { 'data-single-child': true })}
    >
      {children}
    </Link>
  );
};
