import type { SeverityColors } from '@digdir/designsystemet-react/colors';
import cl from 'clsx/lite';
import { type HTMLAttributes, forwardRef } from 'react';
import { XMarkIcon } from '@udir-design/icons';
import './toast.css';
import { Button } from '../button/Button';
import { Paragraph } from '../typography/paragraph/Paragraph';

export type ToastProps = HTMLAttributes<HTMLElement> & {
  /**
   * Sets color and icon.
   *
   * @default 'info'
   */
  'data-color'?: SeverityColors;
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
  /**
   * Function for closing the toast
   */
  close: () => void;
};

/** React component */
export const Toast = forwardRef<HTMLDialogElement, ToastProps>(function Toast(
  {
    className,
    children,
    'data-color': color,
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
      <Paragraph>{children}</Paragraph>
      <Button aria-label="Lukk" variant="tertiary" onClick={() => close()}>
        <XMarkIcon aria-hidden />
      </Button>
    </dialog>
  );
});
