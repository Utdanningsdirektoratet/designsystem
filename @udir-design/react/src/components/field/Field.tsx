import {
  Field as DigdirField,
  FieldAffix,
  FieldAffixes,
  FieldCounter,
  FieldDescription,
  type FieldDescriptionProps,
  type FieldProps as DigdirFieldProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type FieldProps = Omit<DigdirFieldProps, 'data-color'>;

const Field = DigdirField as ForwardRefExoticComponent<
  FieldProps & RefAttributes<ComponentRef<typeof DigdirField>>
> &
  Pick<typeof DigdirField, 'Affix' | 'Affixes' | 'Counter' | 'Description'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Field.displayName = 'Field';

export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription };
export type {
  FieldAffixProps,
  FieldAffixesProps,
  FieldCounterProps,
  FieldDescriptionProps,
  FieldProps,
} from '@digdir/designsystemet-react';
