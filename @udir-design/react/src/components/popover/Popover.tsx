import {
  Popover,
  type PopoverProps,
  PopoverTriggerContext,
  type PopoverTriggerContextProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Popover.displayName = 'Popover';

export {
  Popover,
  PopoverProps,
  PopoverTriggerContext,
  PopoverTriggerContextProps,
  PopoverTrigger,
  PopoverTriggerProps,
};
