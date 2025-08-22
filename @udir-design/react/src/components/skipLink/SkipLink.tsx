import {
  SkipLink as DigdirSkipLink,
  type SkipLinkProps as DigdirSkipLinkProps,
} from '@digdir/designsystemet-react';

type SkipLinkProps = Omit<DigdirSkipLinkProps, 'data-color'>;

const SkipLink: React.ForwardRefExoticComponent<SkipLinkProps> = DigdirSkipLink;

export { SkipLink, SkipLinkProps };
