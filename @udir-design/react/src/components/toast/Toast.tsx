import type { Size } from '@digdir/designsystemet-react';
import type { SeverityColors } from '@digdir/designsystemet-react/colors';
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
  close: () => void;
  /**
   * Sets color and icon.
   *
   * @default 'info'
   */
  'data-color'?: SeverityColors;
  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @default 'md'
   */
  'data-size'?: Size;
  /**
   * If the user should be able
   * to dismiss the toast
   * @default false
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
};

/** React component */
export const Toast = forwardRef<HTMLDialogElement, ToastProps>(function Toast(
  {
    className,
    message,
    'data-color': color = 'info',
    close,
    icon = true,
    dismissable = false,
    timeout = 3000,
    ...rest
  },
  ref,
) {
  if (timeout) {
    setTimeout(() => {
      close();
    }, timeout);
  }

  return (
    <dialog
      className={cl(`uds-toast`, className)}
      data-color={color}
      data-icon={icon}
      data-dismissable={dismissable}
      data-timeout={timeout}
      ref={ref}
      {...rest}
    >
      <Paragraph>{message}</Paragraph>
      <Button aria-label="Lukk" variant="tertiary" onClick={() => close()}>
        <XMarkIcon aria-hidden />
      </Button>
    </dialog>
  );
});
