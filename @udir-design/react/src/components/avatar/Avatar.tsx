import {
  Avatar as DigdirAvatar,
  type AvatarProps as DigdirAvatarProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type AvatarProps = Omit<DigdirAvatarProps, 'variant'>;
const Avatar = DigdirAvatar as ForwardRefExoticComponent<
  AvatarProps & RefAttributes<ComponentRef<typeof DigdirAvatar>>
>;

export type { AvatarProps };
export { Avatar };
