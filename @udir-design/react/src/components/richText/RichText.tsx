import cl from 'clsx/lite';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import './richText.css';

export type RichTextProps = HTMLAttributes<HTMLDivElement>;

/**
 * Presents semantic HTML with Udir's editorial styles.
 * Consumers are responsible for sanitizing HTML before rendering it.
 */
export const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  function RichText({ className, ...rest }, ref) {
    return (
      <div className={cl('uds-rich-text', className)} ref={ref} {...rest} />
    );
  },
);
