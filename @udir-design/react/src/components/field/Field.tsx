import {
  Field as FieldRoot,
  FieldAffix,
  FieldAffixes,
  FieldCounter,
  FieldDescription,
  type FieldProps,
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

export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription };
export type {
  FieldAffixProps,
  FieldAffixesProps,
  FieldCounterProps,
  FieldDescriptionProps,
  FieldProps,
} from '@digdir/designsystemet-react';
