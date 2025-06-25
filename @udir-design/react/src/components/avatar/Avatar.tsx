import {
  Avatar as DigdirAvatar,
  type AvatarProps as DigdirAvatarProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type AvatarProps = Omit<DigdirAvatarProps, 'variant'>;
const Avatar = DigdirAvatar as ForwardRefExoticComponent<AvatarProps>;

export { Avatar, AvatarProps };
