import type { SeverityColors } from '@digdir/designsystemet-types';

export type ToastOptions = {
  id?: string;
  message: string;
  timeout?: number | false; // ms; false = no auto-close
  dismissable?: boolean;
  icon?: boolean;
  busy?: boolean;
  onClose?: () => void;
  'data-color'?: SeverityColors;
};

export type ToastData = ToastOptions & {
  id: string;
  createdAt: number;
};

type Listener = () => void;
let toastCounter = 0;

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
    const id = options.id ?? `toast-${++toastCounter}`;

    const existing = this.toasts.find((t) => t.id === id);

    const toast: ToastData = {
      icon: true,
      timeout: 3000,
      dismissable: true,
      ...existing,
      ...options,
      id,
      createdAt: existing?.createdAt ?? Date.now(),
    };

    // If a toast with this ID exists, update it; otherwise insert a new one (immutably).
    if (existing) {
      this.toasts = this.toasts.map((t) => (t.id === existing.id ? toast : t));
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
