import {
  Field as DigdirField,
  type FieldProps as DigdirFieldProps,
  FieldAffix,
  type FieldAffixProps,
  FieldCounter,
  type FieldCounterProps,
  FieldDescription,
  type FieldDescriptionProps,
  FieldAffixes,
  type FieldAffixesProps,
} from '@digdir/designsystemet-react';
import { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type FieldProps = Omit<DigdirFieldProps, 'data-color'>;

const Field = DigdirField as ForwardRefExoticComponent<
  FieldProps & RefAttributes<ComponentRef<typeof DigdirField>>
> &
  Pick<typeof DigdirField, 'Affix' | 'Affixes' | 'Counter' | 'Description'>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Field.displayName = 'Field';

export {
  Field,
  FieldProps,
  FieldAffix,
  FieldAffixProps,
  FieldCounter,
  FieldCounterProps,
  FieldDescription,
  FieldDescriptionProps,
  FieldAffixes,
  FieldAffixesProps,
};
