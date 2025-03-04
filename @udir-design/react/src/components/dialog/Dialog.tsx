import {
  Dialog,
  type DialogProps,
  DialogBlock,
  type DialogBlockProps,
  DialogTriggerContext,
  type DialogTriggerContextProps,
  DialogTrigger,
  type DialogTriggerProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Dialog.displayName = 'Dialog';

export {
  Dialog,
  DialogProps,
  DialogBlock,
  DialogBlockProps,
  DialogTriggerContext,
  DialogTriggerContextProps,
  DialogTrigger,
  DialogTriggerProps,
};
