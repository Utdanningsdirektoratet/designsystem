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
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { useLanguageVariable } from '../../hooks/useLanguageVariable';
import './dialog.css';

type DialogProps = Omit<DigdirDialogProps, 'data-color' | 'asChild'>;

const DialogRoot = forwardRef<ComponentRef<typeof DigdirDialog>, DialogProps>(
  function Dialog({ closeButton, ...rest }, ref) {
    const [dialogRef, defaultCloseLabel] =
      useLanguageVariable<HTMLDialogElement>(
        '--udsc-dialog-close-label',
        'Lukk dialogvindu',
      );
    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    return (
      <DigdirDialog
        closeButton={closeButton ?? defaultCloseLabel}
        {...rest}
        ref={dialogRef}
      />
    );
  },
);

const Dialog: ForwardRefExoticComponent<
  DialogProps & RefAttributes<ComponentRef<typeof DigdirDialog>>
> &
  Pick<typeof DigdirDialog, 'Block' | 'TriggerContext' | 'Trigger'> =
  Object.assign(DialogRoot, {
    Block: DialogBlock,
    Trigger: DialogTrigger,
    TriggerContext: DialogTriggerContext,
  });

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Dialog.displayName = 'Dialog';

export type {
  DialogBlockProps,
  DialogProps,
  DialogTriggerContextProps,
  DialogTriggerProps,
};
export { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext };
