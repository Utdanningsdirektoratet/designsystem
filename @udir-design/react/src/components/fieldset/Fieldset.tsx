import {
  Fieldset as DigdirFieldset,
  type FieldsetProps as DigdirFieldsetProps,
  FieldsetDescription,
  type FieldsetDescriptionProps,
  FieldsetLegend,
  type FieldsetLegendProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type FieldsetProps = Omit<DigdirFieldsetProps, 'data-color'>;
const Fieldset = DigdirFieldset as ForwardRefExoticComponent<FieldsetProps> &
  Pick<typeof DigdirFieldset, 'Legend' | 'Description'>;

export {
  Fieldset,
  FieldsetProps,
  FieldsetLegend,
  FieldsetLegendProps,
  FieldsetDescription,
  FieldsetDescriptionProps,
};
