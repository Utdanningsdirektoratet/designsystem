import type { SeverityColors } from '@digdir/designsystemet-types';
import cl from 'clsx/lite';
import { type HTMLAttributes, forwardRef } from 'react';
import { XMarkIcon } from '@udir-design/icons';
import './toast.css';
import { Button } from '../button/Button';
import { Paragraph } from '../typography/paragraph/Paragraph';

export type ToastProps = HTMLAttributes<HTMLDialogElement> & {
  /**
   * Message to be displayed
   * in the toast
   */
  message: string;
  /**
   * Function for closing the toast
   */
  onClose: () => void;
  /**
   * Sets color and icon.
   *
   * @default 'info'
   */
  'data-color'?: SeverityColors;
  /**
   * If the user should be able
   * to dismiss the toast
   * @default true
   */
  dismissable?: boolean;
  /**
   * Duration for the toast to
   * be displayed
   * @default 3000
   */
  timeout?: number | false;
  /**
   * If there should be an
   * icon to the left
   * @default true
   */
  icon?: boolean;
  /** If the toast is in a busy state
   * @default false
   */
  busy?: boolean;
};

/** React component */
export const Toast = forwardRef<HTMLDialogElement, ToastProps>(function Toast(
  {
    className,
    message,
    'data-color': color = 'info',
    onClose,
    icon = true,
    dismissable = true,
    timeout = 3000,
    busy = false,
    ...rest
  },
  ref,
) {
  return (
    <dialog
      open
      className={cl(`uds-toast`, className)}
      aria-busy={busy}
      data-color={color}
      data-icon={icon}
      data-dismissable={dismissable}
      data-timeout={timeout}
      ref={ref}
      style={{ '--uds-toast-timeout': `${timeout}ms` } as React.CSSProperties}
      {...rest}
    >
      <Paragraph>{message}</Paragraph>
      <Button aria-label="Lukk" variant="tertiary" onClick={() => onClose()}>
        <XMarkIcon aria-hidden />
      </Button>
    </dialog>
  );
});
