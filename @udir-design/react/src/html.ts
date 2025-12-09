import type { Color, Size } from '@digdir/designsystemet-types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
      'data-size'?: Size | (string & {});
      'data-color'?: Color | (string & {});
    }
  }
}
