import {
  Skeleton as DigdirSkeleton,
  type SkeletonProps as DigdirSkeletonProps,
} from '@digdir/designsystemet-react';

type SkeletonProps = Omit<DigdirSkeletonProps, 'characters'>;

const Skeleton: React.ForwardRefExoticComponent<
  SkeletonProps & React.RefAttributes<HTMLSpanElement>
> = DigdirSkeleton;

export { Skeleton, SkeletonProps };
