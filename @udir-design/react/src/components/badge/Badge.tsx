import {
  Badge as DigdirBadge,
  type BadgeProps as DigdirBadgeProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type BadgeProps = Omit<DigdirBadgeProps, 'data-color'> & {
  /**
   * Change the color scheme of badge
   */
  'data-color'?:
    | 'neutral'
    | 'accent'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning';
};

const Badge = DigdirBadge as ForwardRefExoticComponent<BadgeProps> &
  Pick<typeof DigdirBadge, 'Position'>;

export { Badge, BadgeProps };
