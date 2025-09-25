import {
  Fieldset as DigdirFieldset,
  type FieldsetProps as DigdirFieldsetProps,
  FieldsetDescription,
  type FieldsetDescriptionProps,
  FieldsetLegend,
  type FieldsetLegendProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type FieldsetProps = Omit<DigdirFieldsetProps, 'data-color'>;
const Fieldset = DigdirFieldset as ForwardRefExoticComponent<
  FieldsetProps & RefAttributes<ComponentRef<typeof DigdirFieldset>>
> &
  Pick<typeof DigdirFieldset, 'Legend' | 'Description'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Fieldset.displayName = 'Fieldset';

export {
  Fieldset,
  FieldsetProps,
  FieldsetLegend,
  FieldsetLegendProps,
  FieldsetDescription,
  FieldsetDescriptionProps,
};
