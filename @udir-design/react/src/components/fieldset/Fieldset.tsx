import {
  Fieldset as DigdirFieldset,
  FieldsetDescription,
  type FieldsetDescriptionProps,
  FieldsetLegend,
  type FieldsetLegendProps,
  type FieldsetProps as DigdirFieldsetProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type FieldsetProps = Omit<DigdirFieldsetProps, 'data-color'>;
const Fieldset = DigdirFieldset as ForwardRefExoticComponent<
  FieldsetProps & RefAttributes<ComponentRef<typeof DigdirFieldset>>
> &
  Pick<typeof DigdirFieldset, 'Legend' | 'Description'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Fieldset.displayName = 'Fieldset';

export type { FieldsetDescriptionProps, FieldsetLegendProps, FieldsetProps };
export { Fieldset, FieldsetDescription, FieldsetLegend };
