import {
  Popover as DigdirPopover,
  type PopoverProps,
  PopoverTrigger,
  PopoverTriggerContext,
} from '@digdir/designsystemet-react';

const Popover: typeof DigdirPopover = Object.assign(DigdirPopover, {
  Trigger: DigdirPopover.Trigger,
  TriggerContext: DigdirPopover.TriggerContext,
});

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Popover.displayName = 'Popover';

export { Popover, PopoverTrigger, PopoverTriggerContext };
export type { PopoverProps };
export type {
  PopoverTriggerContextProps,
  PopoverTriggerProps,
} from '@digdir/designsystemet-react';
