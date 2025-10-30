import {
  Dialog as DigdirDialog,
  DialogBlock,
  type DialogProps as DigdirDialogProps,
  DialogTrigger,
  DialogTriggerContext,
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

export { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext };
export type { DialogProps };
export type {
  DialogBlockProps,
  DialogTriggerContextProps,
  DialogTriggerProps,
} from '@digdir/designsystemet-react';
