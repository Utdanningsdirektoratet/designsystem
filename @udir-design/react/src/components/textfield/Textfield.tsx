/* Import Field's css here, otherwise it will not always be loaded in Storybook due to Textfield using Digdir's field directly */
import '../field/field.css';
import { Textfield, type TextfieldProps } from '@digdir/designsystemet-react';

export type { TextfieldProps };
export { Textfield };
