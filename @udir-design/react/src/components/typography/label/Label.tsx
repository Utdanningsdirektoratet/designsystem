import {
  Label as DigdirLabel,
  type LabelProps as DigdirLabelProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type LabelProps = Omit<DigdirLabelProps, 'data-color'>;

const Label = DigdirLabel as ForwardRefExoticComponent<LabelProps>;

export { Label, LabelProps };
