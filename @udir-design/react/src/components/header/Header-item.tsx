import { HTMLAttributes } from 'react';

export type HeaderItem = HTMLAttributes<HTMLElement> & {
  hide?: 'sm' | 'md' | 'lg';
};

export const HeaderItem = function HeaderItem({
  children,
  hide,
  ...props
}: HeaderItem) {
  return (
    <div className="ds-header__item" data-hide={hide} {...props}>
      {children}
    </div>
  );
};
