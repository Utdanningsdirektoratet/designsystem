import {
  Paragraph as DigdirParagraph,
  type ParagraphProps as DigdirParagraphProps,
} from '@digdir/designsystemet-react';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';

type ParagraphProps = Omit<DigdirParagraphProps, 'variant'>;

const Paragraph = DigdirParagraph as ForwardRefExoticComponent<
  ParagraphProps &
    HTMLAttributes<HTMLParagraphElement> &
    RefAttributes<HTMLParagraphElement>
>;

export type { ParagraphProps };
export { Paragraph };
