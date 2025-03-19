import {
  Link as DigdirLink,
  type LinkProps as DigdirLinkProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type LinkProps = Omit<DigdirLinkProps, 'data-color'>;

const Link = DigdirLink as ForwardRefExoticComponent<LinkProps>;

export { Link, LinkProps };
