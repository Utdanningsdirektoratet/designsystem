'use client';

import { useSyncExternalStore } from 'react';
import { Toast } from './Toast';
import { type ToastData, toastStore } from './toastStore';

export type ToastViewportProps = {
  gap?: number; // rem between toasts
};

export function ToastViewport({ gap = 0.5 }: ToastViewportProps) {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    () => [] as ToastData[],
  );

  if (typeof document === 'undefined') return null;

  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          dismissable={toast.dismissable}
          icon={toast.icon}
          timeout={toast.timeout}
          busy={toast.busy}
          data-color={toast['data-color']}
          style={{
            translate: `0 calc(-1 * (${gap}rem + 100%) * ${index})`,
          }}
          onClose={() => toastStore.dismiss(toast.id)}
          onAnimationEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.animationName === 'uds-toast-timeout')
              event.currentTarget.close();
            if (event.animationName === 'uds-toast-close') {
              toastStore.dismiss(toast.id);
            }
          }}
        />
      ))}
    </>
  );
}
