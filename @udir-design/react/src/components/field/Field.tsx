import {
  Field as FieldRoot,
  type FieldProps,
  FieldAffix,
  FieldCounter,
  FieldDescription,
  FieldAffixes,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type Field = ForwardRefExoticComponent<
  Omit<FieldProps, 'data-color'> & RefAttributes<ComponentRef<typeof FieldRoot>>
> & {
  Affix: typeof FieldAffix;
  Affixes: typeof FieldAffixes;
  Counter: typeof FieldCounter;
  Description: typeof FieldDescription;
};

const Field: Field = Object.assign(FieldRoot, {
  Affix: FieldAffix,
  Affixes: FieldAffixes,
  Counter: FieldCounter,
  Description: FieldDescription,
});

Field.displayName = 'Field';

export { Field, FieldAffix, FieldCounter, FieldDescription, FieldAffixes };
export type {
  FieldProps,
  FieldAffixProps,
  FieldAffixesProps,
  FieldCounterProps,
  FieldDescriptionProps,
} from '@digdir/designsystemet-react';
