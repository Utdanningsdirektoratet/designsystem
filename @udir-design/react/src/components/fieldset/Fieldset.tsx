import {
  Fieldset as DigdirFieldset,
  FieldsetDescription,
  type FieldsetDescriptionProps,
  FieldsetLegend,
  type FieldsetLegendProps,
  type FieldsetProps as DigdirFieldsetProps,
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
  FieldsetDescription,
  FieldsetDescriptionProps,
  FieldsetLegend,
  FieldsetLegendProps,
  FieldsetProps,
};
