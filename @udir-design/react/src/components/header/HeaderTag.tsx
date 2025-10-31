import cl from 'clsx/lite';
import {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from 'react';
import { Tag, TagProps } from '../tag/Tag';

export type HeaderTagProps = TagProps;

export const HeaderTag = forwardRef<HTMLDivElement, HeaderTagProps>(
  function HeaderTag({ className, ...props }, ref) {
    return (
      <Tag className={cl('uds-header__tag', className)} ref={ref} {...props} />
    );
  },
) as ForwardRefExoticComponent<
  TagProps & RefAttributes<ComponentRef<typeof Tag>>
>;
