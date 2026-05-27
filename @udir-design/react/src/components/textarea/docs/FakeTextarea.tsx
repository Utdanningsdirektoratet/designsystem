import type { FunctionComponent } from 'react';
import type { TextareaProps } from '../Textarea';

export const Textarea: FunctionComponent<
  TextareaProps & {
    disabled?: TextareaProps['disabled'];
    readOnly?: TextareaProps['readOnly'];
    rows?: TextareaProps['rows'];
    cols?: TextareaProps['cols'];
  }
> = () => null;
