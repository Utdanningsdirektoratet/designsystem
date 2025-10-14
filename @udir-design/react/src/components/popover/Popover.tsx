import {
  Popover as DigdirPopover,
  type PopoverProps,
  PopoverTrigger,
  PopoverTriggerContext,
  type PopoverTriggerContextProps,
  type PopoverTriggerProps,
} from '@digdir/designsystemet-react';

const Popover: typeof DigdirPopover = Object.assign(DigdirPopover, {
  Trigger: DigdirPopover.Trigger,
  TriggerContext: DigdirPopover.TriggerContext,
});

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Popover.displayName = 'Popover';

export {
  Popover,
  PopoverProps,
  PopoverTrigger,
  PopoverTriggerContext,
  PopoverTriggerContextProps,
  PopoverTriggerProps,
};
