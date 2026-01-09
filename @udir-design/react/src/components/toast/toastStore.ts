import type { SeverityColors } from '@digdir/designsystemet-types';

/**
 * Config options for showing a toast
 */
export type ToastOptions = {
  /**
   * Optional ID for updating/dismissing.
   */
  id?: string;
  /**
   * Message to be displayed.
   */
  message: string;
  /**
   * Auto-dismiss timeout in milliseconds.
   * Set to false to disable auto-close.
   */
  timeout?: number | false;
  /**
   * If the user should be able
   * to dismiss the toast.
   */
  dismissable?: boolean;
  /**
   * If an icon should be shown.
   */
  icon?: boolean;
  /**
   * If the toast is in a busy state.
   */
  busy?: boolean;
  /**
   * Function for closing the toast.
   */
  onClose?: () => void;
  /**
   * Data attribute for setting color and icon.
   */
  'data-color'?: SeverityColors;
};

/**
 * Internal toast representation stored in the ToastStore.
 * Extends ToastOptions with guaranteed fields.
 */
export type ToastData = ToastOptions & {
  /**
   * Unique toast ID
   */
  id: string;
  /**
   * Timestamp when the toast was created
   */
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
