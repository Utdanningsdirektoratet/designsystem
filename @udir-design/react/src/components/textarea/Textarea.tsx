/* Import Field's css here, otherwise it will not always be loaded in Storybook due to Textarea using Digdir's field directly */
import '../field/field.css';
import { Textarea, type TextareaProps } from '@digdir/designsystemet-react';

export type { TextareaProps };
export { Textarea };
