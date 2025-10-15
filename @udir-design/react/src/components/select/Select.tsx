import {
  Select,
  SelectOptgroup,
  type SelectOptgroupProps,
  SelectOption,
  type SelectOptionProps,
  type SelectProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Select.displayName = 'Select';

export {
  Select,
  SelectOptgroup,
  SelectOptgroupProps,
  SelectOption,
  SelectOptionProps,
  SelectProps,
};
