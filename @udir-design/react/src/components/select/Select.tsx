import {
  Select as SelectRoot,
  SelectOptgroup,
  SelectOption,
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

export { Select, SelectOptgroup, SelectOption };
export type {
  SelectOptgroupProps,
  SelectOptionProps,
  SelectProps,
} from '@digdir/designsystemet-react';
