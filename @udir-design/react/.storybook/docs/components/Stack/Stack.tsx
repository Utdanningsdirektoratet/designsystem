import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import classes from './Stack.module.css';

export const Stack = ({
  style,
  gap = 'var(--ds-size-4)',
  direction = 'row',
  wrap = 'wrap',
  ...rest
}: FlexContainerProps & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`${classes.stack} sb-unstyled`}
    style={{
      ...style,
      gap,
      flexDirection: direction,
      flexWrap: wrap,
    }}
    {...rest}
  ></div>
);

export type FlexContainerProps = {
  children: ReactNode;
  style?: CSSProperties;
  gap?: string;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
};
