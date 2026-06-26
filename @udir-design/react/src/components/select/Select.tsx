import {
  Select as DigdirSelect,
  SelectOptgroup,
  type SelectOptgroupProps,
  SelectOption,
  type SelectOptionProps,
  type SelectProps as DigdirSelectProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type SelectProps = Omit<DigdirSelectProps, 'readOnly'>;

const Select = DigdirSelect as ForwardRefExoticComponent<
  SelectProps & RefAttributes<ComponentRef<typeof DigdirSelect>>
> &
  Pick<typeof DigdirSelect, 'Optgroup' | 'Option'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Select.displayName = 'Select';

export type { SelectOptgroupProps, SelectOptionProps, SelectProps };
export { Select, SelectOptgroup, SelectOption };
