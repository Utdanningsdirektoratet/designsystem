import {
  type UseCheckboxGroupProps as UseCheckboxGroupPropsDigdir,
  useCheckboxGroup as useCheckboxGroupDigdir,
} from '@digdir/designsystemet-react';
import type { CheckboxProps } from '../../../components/checkbox/Checkbox';
import type { MergeRight } from '../../type-utils';

type UseCheckboxGroupProps = MergeRight<
  Omit<
    CheckboxProps,
    'aria-label' | 'aria-labelledby' | 'data-size' | 'data-indeterminate'
  >,
  UseCheckboxGroupPropsDigdir
>;

type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroupDigdir>;
const useCheckboxGroup = (
  props?: UseCheckboxGroupProps,
): UseCheckboxGroupReturn => {
  const { onChange: _1, error: _2, ...groupProps } = props || {};
  const { getCheckboxProps: getCheckboxPropsDigdir, ...rest } =
    useCheckboxGroupDigdir(props);
  const getCheckboxProps: typeof getCheckboxPropsDigdir = (propsOrValue) => ({
    ...(groupProps as ReturnType<typeof getCheckboxPropsDigdir>),
    ...getCheckboxPropsDigdir(propsOrValue),
  });
  return { ...rest, getCheckboxProps };
};
export type { UseCheckboxGroupProps, UseCheckboxGroupReturn };
export { useCheckboxGroup };
