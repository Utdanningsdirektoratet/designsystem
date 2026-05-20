import {
  type UseRadioGroupProps as UseRadioGroupPropsDigdir,
  useRadioGroup as useRadioGroupDigdir,
} from '@digdir/designsystemet-react';
import type { RadioProps } from '../../../components/radio/Radio';

type UseRadioGroupProps = UseRadioGroupPropsDigdir &
  Pick<RadioProps, 'variant'>;

type UseRadioGroupReturn = ReturnType<typeof useRadioGroupDigdir>;
const useRadioGroup = (props?: UseRadioGroupProps): UseRadioGroupReturn => {
  const { onChange: _1, error: _2, ...groupProps } = props || {};
  const { getRadioProps: getRadioPropsDigdir, ...rest } =
    useRadioGroupDigdir(props);
  const getRadioProps: typeof getRadioPropsDigdir = (propsOrValue) => ({
    ...(groupProps as ReturnType<typeof getRadioPropsDigdir>),
    ...getRadioPropsDigdir(propsOrValue),
  });
  return { ...rest, getRadioProps };
};
export type { UseRadioGroupProps, UseRadioGroupReturn };
export { useRadioGroup };
