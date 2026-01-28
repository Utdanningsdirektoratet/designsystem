'use client';

import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { ToastViewport } from './ToastViewport';
import { type ToastOptions, toastStore } from './toastStore';

let root: Root | null = null;

function ensureViewportMounted(): void {
  if (typeof document === 'undefined') return;
  if (root) return;

  const id = 'uds-toast-root';
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  root = createRoot(container);
  root.render(<ToastViewport />);
}

type ToastVariantOptions = Omit<ToastOptions, 'message' | 'data-color'>;
type PromiseOptions = Omit<ToastOptions, 'message'> & {
  loading: string;
  success: string;
  error: string;
};

export const toast = {
  show(options: ToastOptions): string | undefined {
    if (typeof document === 'undefined') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[uds-toast] toast.show() called on the server.');
      }
      return undefined;
    }
    ensureViewportMounted();
    return toastStore.show(options);
  },

  dismiss(id: string): void {
    toastStore.dismiss(id);
  },

  clearAll(): void {
    toastStore.clearAll();
  },

  success(message: string, opt: ToastVariantOptions = {}): string | undefined {
    return toast.show({
      message,
      'data-color': 'success',
      ...opt,
    });
  },

  danger(message: string, opt: ToastVariantOptions = {}): string | undefined {
    return toast.show({
      message,
      'data-color': 'danger',
      ...opt,
    });
  },

  info(message: string, opt: ToastVariantOptions = {}): string | undefined {
    return toast.show({
      message,
      'data-color': 'info',
      ...opt,
    });
  },

  warning(message: string, opt: ToastVariantOptions = {}): string | undefined {
    return toast.show({
      message,
      'data-color': 'warning',
      ...opt,
    });
  },

  async promise<T>(
    action: () => Promise<T>,
    props: PromiseOptions,
  ): Promise<T> {
    const { loading, success, error, ...rest } = props;

    const id = toast.show({
      message: loading,
      busy: true,
      dismissable: false,
      ...rest,
    });

    try {
      const result = await action();
      if (id) {
        toast.success(success, { id, busy: false, dismissable: true });
      }
      return result;
    } catch (err) {
      if (id) {
        toast.danger(error, { id, busy: false, dismissable: true });
      }
      throw err;
    }
  },
};

export type ToastFn = typeof toast;
