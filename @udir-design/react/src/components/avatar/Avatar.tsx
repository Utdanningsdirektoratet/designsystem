import {
  Avatar as DigdirAvatar,
  type AvatarProps as DigdirAvatarProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type AriaLabel = {
  /**
   * The name of the person the avatar represents.
   */
  'aria-label': string;
};
type AriaHidden = Partial<AriaLabel> & { 'aria-hidden': true | 'true' };

type AvatarProps = (AriaLabel | AriaHidden) &
  Omit<DigdirAvatarProps, 'variant' | 'aria-label'>;
const Avatar = DigdirAvatar as ForwardRefExoticComponent<
  AvatarProps & RefAttributes<ComponentRef<typeof DigdirAvatar>>
>;

export { Avatar, AvatarProps };
