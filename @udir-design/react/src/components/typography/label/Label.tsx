import {
  Label as DigdirLabel,
  type LabelProps as DigdirLabelProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type LabelProps = Omit<DigdirLabelProps, 'data-color'>;

const Label = DigdirLabel as ForwardRefExoticComponent<
  LabelProps & RefAttributes<ComponentRef<typeof DigdirLabel>>
>;

export type { LabelProps };
export { Label };
