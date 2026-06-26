import {
  Tooltip as DigdirTooltip,
  type TooltipProps as DigdirTooltipProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type TooltipProps = Omit<DigdirTooltipProps, 'open' | 'type'>;

const Tooltip = DigdirTooltip as ForwardRefExoticComponent<
  TooltipProps & RefAttributes<ComponentRef<typeof DigdirTooltip>>
>;

export type { TooltipProps };
export { Tooltip };
