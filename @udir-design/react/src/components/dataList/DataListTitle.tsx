import cl from 'clsx/lite';
import { forwardRef } from 'react';
import { Heading, type HeadingProps } from '../typography/heading';

export type DataListTitleProps = Omit<HeadingProps, 'data-size' | 'level'> & {
  /**
   * Heading level of the title. Choose the level that fits the heading
   * structure of the page, usually one level below the heading of the list.
   *
   * @default 3
   */
  level?: HeadingProps['level'];
};

export const DataListTitle = forwardRef<HTMLHeadingElement, DataListTitleProps>(
  function DataListTitle({ className, level = 3, ...rest }, ref) {
    return (
      <Heading
        ref={ref}
        level={level}
        className={cl('uds-data-list__title', className)}
        {...rest}
      />
    );
  },
);
