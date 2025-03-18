import {
  Switch as DigdirSwitch,
  type SwitchProps as DigdirSwitchProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent } from 'react';

type SwitchProps = Omit<DigdirSwitchProps, 'data-color'>;

const Switch = DigdirSwitch as ForwardRefExoticComponent<SwitchProps>;

export { Switch, SwitchProps };
