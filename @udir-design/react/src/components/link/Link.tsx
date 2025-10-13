import {
  Link as DigdirLink,
  type LinkProps as DigdirLinkProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import './link.css';

type LinkProps = Omit<DigdirLinkProps, 'data-color'>;

const Link = DigdirLink as ForwardRefExoticComponent<
  LinkProps & RefAttributes<ComponentRef<typeof DigdirLink>>
>;

export { Link, LinkProps };
