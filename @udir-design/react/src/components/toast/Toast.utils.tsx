import type { SeverityColors } from '@digdir/designsystemet-react/colors';
import { createRoot } from 'react-dom/client';
import { Toast } from './Toast';

export type toastOptions = {
  id?: string;
  timeout?: number | false;
  icon?: boolean;
  dismissable?: boolean;
  'data-color'?: SeverityColors;
};

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);
const toasts = new Map<string, React.ReactNode>();
const render = () => root.render(Array.from(toasts.values() || []));

export function toast(message: string, opt?: toastOptions) {
  const id = opt?.id || `${Date.now()}`;

  const del = () => {
    toasts.delete(id);
    render();
  };

  toasts.set(
    id,
    <Toast
      {...opt}
      data-color={opt?.['data-color']}
      close={del}
      style={{ translate: `0px calc(-55px * ${toasts.size})` }}
    >
      {message}
    </Toast>,
  );
  render();

  return id;
}
