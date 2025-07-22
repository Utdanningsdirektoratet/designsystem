import { forwardRef, type HTMLAttributes } from 'react';
import cl from 'clsx/lite';

export type BunnfeltItemProps = HTMLAttributes<HTMLLIElement>;

/**
 * BunnfeltItem component, used to display an item in the Bunnfelt. Used within a BunnfeltList.
 *
 * @example
 * <Bunnfelt>
 *  <BunnfeltList>
 *    <BunnfeltItem>
 *    </BunnfeltItem>
 *  </BunnfeltList>
 * </Bunnfelt>
 */
export const BunnfeltItem = forwardRef<HTMLLIElement, BunnfeltItemProps>(
  function BunnfeltItem({ className, ...rest }, ref) {
    return (
      <li className={cl(`ds-bunnfelt-item`, className)} ref={ref} {...rest} />
    );
  },
);
