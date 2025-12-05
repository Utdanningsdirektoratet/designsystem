import type { Size } from '@digdir/designsystemet-react';
import type { SeverityColors } from '@digdir/designsystemet-react/colors';

export type ToastOptions = {
  id?: string;
  message: string;
  timeout?: number | false; // ms; false = no auto-close
  dismissable?: boolean;
  icon?: boolean;
  busy?: boolean;
  onClose?: () => void;
  'data-color'?: SeverityColors;
  'data-size'?: Size;
};

export type ToastData = ToastOptions & {
  id: string;
  createdAt: number;
};

type Listener = () => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners = new Set<Listener>();

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): ToastData[] => this.toasts;

  private emit(): void {
    for (const listener of this.listeners) listener();
  }

  show = (options: ToastOptions): string => {
    const id =
      options.id ??
      `${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;

    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    const existing =
      existingIndex !== -1 ? this.toasts[existingIndex] : undefined;

    const toast: ToastData = {
      icon: true,
      timeout: 3000,
      dismissable: true,
      ...existing,
      ...options,
      id,
      createdAt: existing?.createdAt ?? Date.now(),
    };

    if (existingIndex !== -1) {
      const next = [...this.toasts];
      next[existingIndex] = toast;
      this.toasts = next;
    } else {
      this.toasts = [toast, ...this.toasts];
    }

    this.emit();
    return id;
  };

  dismiss = (id: string): void => {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.emit();
  };

  clearAll = (): void => {
    this.toasts = [];
    this.emit();
  };
}

export const toastStore = new ToastStore();
