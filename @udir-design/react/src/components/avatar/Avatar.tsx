import {
  Avatar as DigdirAvatar,
  type AvatarProps as DigdirAvatarProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type AvatarProps = Omit<DigdirAvatarProps, 'variant'>;
const Avatar = DigdirAvatar as ForwardRefExoticComponent<
  AvatarProps & RefAttributes<ComponentRef<typeof DigdirAvatar>>
>;

export { Avatar };
export type { AvatarProps };
