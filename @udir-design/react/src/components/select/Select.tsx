import {
  Select,
  SelectOptgroup,
  SelectOption,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Select.displayName = 'Select';

export { Select, SelectOptgroup, SelectOption };
export type {
  SelectOptgroupProps,
  SelectOptionProps,
  SelectProps,
} from '@digdir/designsystemet-react';
