import {
  Skeleton as DigdirSkeleton,
  type SkeletonProps as DigdirSkeletonProps,
} from '@digdir/designsystemet-react';
import type { ComponentRef, RefAttributes } from 'react';

type SkeletonProps = Omit<DigdirSkeletonProps, 'characters'>;

const Skeleton: React.ForwardRefExoticComponent<
  SkeletonProps & RefAttributes<ComponentRef<typeof DigdirSkeleton>>
> = DigdirSkeleton;

export type { SkeletonProps };
export { Skeleton };
