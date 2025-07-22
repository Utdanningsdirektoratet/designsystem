import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx/lite';

export type BunnfeltListProps = HTMLAttributes<HTMLUListElement>;

/**
 * BunnfeltList component, used to display a list of items in the Bunnfelt.
 *
 * @example
 * <Bunnfelt>
 *  <BunnfeltList>
 *    <BunnfeltItem>
 *    </BunnfeltItem>
 *  </BunnfeltList>
 * </Bunnfelt>
 */
export const BunnfeltList = forwardRef<HTMLUListElement, BunnfeltListProps>(
  function BunnfeltList({ className, ...rest }, ref) {
    return (
      <ul className={cl(`ds-bunnfelt-list`, className)} ref={ref} {...rest} />
    );
  },
);
