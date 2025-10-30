import {
  Switch as DigdirSwitch,
  type SwitchProps as DigdirSwitchProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type SwitchProps = Omit<DigdirSwitchProps, 'data-color'>;

const Switch = DigdirSwitch as ForwardRefExoticComponent<
  SwitchProps & RefAttributes<ComponentRef<typeof DigdirSwitch>>
>;

export type { SwitchProps };
export { Switch };
