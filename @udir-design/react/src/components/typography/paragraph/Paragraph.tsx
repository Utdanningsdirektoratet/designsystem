import {
  Paragraph as DigdirParagraph,
  type ParagraphProps as DigdirParagraphProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type ParagraphProps = Omit<DigdirParagraphProps, 'variant'>;

const Paragraph = DigdirParagraph as ForwardRefExoticComponent<
  ParagraphProps & RefAttributes<ComponentRef<typeof DigdirParagraph>>
>;

export type { ParagraphProps };
export { Paragraph };
