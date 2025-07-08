import {
  Dialog as DigdirDialog,
  type DialogProps as DigdirDialogProps,
  DialogBlock,
  type DialogBlockProps,
  DialogTriggerContext,
  type DialogTriggerContextProps,
  DialogTrigger,
  type DialogTriggerProps,
} from '@digdir/designsystemet-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type DialogProps = Omit<DigdirDialogProps, 'data-color'>;

const Dialog = DigdirDialog as ForwardRefExoticComponent<
  DialogProps & RefAttributes<HTMLDialogElement>
> &
  Pick<typeof DigdirDialog, 'Block' | 'TriggerContext' | 'Trigger'>;

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
