import {
  Select as SelectRoot,
  SelectOption,
  SelectOptgroup,
} from '@digdir/designsystemet-react';

type Select = typeof SelectRoot & {
  Option: typeof SelectOption;
  Optgroup: typeof SelectOptgroup;
};

const Select: Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Optgroup: SelectOptgroup,
});

Select.displayName = 'Select';

export { Select, SelectOption, SelectOptgroup };
export type {
  SelectProps,
  SelectOptionProps,
  SelectOptgroupProps,
} from '@digdir/designsystemet-react';
