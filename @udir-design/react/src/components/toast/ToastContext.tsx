import type { SeverityColors } from '@digdir/designsystemet-react/colors';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Toast, type ToastProps } from './Toast';

export type ToastOptions = {
  id?: string;
  message: string;
  timeout?: number | false;
  icon?: boolean;
  dismissable?: boolean;
  'data-color'?: SeverityColors;
};

export class ToastContext {
  private toasts: ToastProps[] = [];
  private root: Root;

  constructor() {
    const toastContainer = document.createElement('div') as HTMLDivElement;
    toastContainer.ariaLive = 'polite';
    document.body.appendChild(toastContainer);
    this.root = createRoot(toastContainer);
    toastContainer.id = 'uds-toast__container';
  }

  public show(options: ToastOptions): void {
    const toastId = `${Date.now()}`;
    const toast: ToastProps = {
      id: toastId,
      ...options, // if id is provided it will override generated id
      close: () => this.destroy(options.id ?? toastId),
    };

    this.toasts = [toast, ...this.toasts];
    this.render();
  }

  public destroy(id: string): void {
    this.toasts = this.toasts.filter((toast: ToastProps) => toast.id !== id);
    this.render();
  }

  private render(): void {
    const toastsList = this.toasts.map((toastProps: ToastProps, index) => (
      <Toast
        key={toastProps.id}
        {...toastProps}
        style={{ translate: `0px calc(-55px * ${index})` }}
      />
    ));
    this.root.render(toastsList);
  }
}

export const toast = new ToastContext();
