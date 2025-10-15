import {
  Dialog as DigdirDialog,
  DialogBlock,
  type DialogBlockProps,
  type DialogProps as DigdirDialogProps,
  DialogTrigger,
  DialogTriggerContext,
  type DialogTriggerContextProps,
  type DialogTriggerProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';
import './dialog.css';

type DialogProps = Omit<DigdirDialogProps, 'data-color'>;

const Dialog = DigdirDialog as ForwardRefExoticComponent<
  DialogProps & RefAttributes<ComponentRef<typeof DigdirDialog>>
> &
  Pick<typeof DigdirDialog, 'Block' | 'TriggerContext' | 'Trigger'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Dialog.displayName = 'Dialog';

export {
  Dialog,
  DialogBlock,
  DialogBlockProps,
  DialogProps,
  DialogTrigger,
  DialogTriggerContext,
  DialogTriggerContextProps,
  DialogTriggerProps,
};
