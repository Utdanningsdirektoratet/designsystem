import {
  Select,
  type SelectProps,
  SelectOption,
  type SelectOptionProps,
  SelectOptgroup,
  type SelectOptgroupProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Select.displayName = 'Select';

export {
  Select,
  SelectProps,
  SelectOption,
  SelectOptionProps,
  SelectOptgroup,
  SelectOptgroupProps,
};
