import {
  Field as DigdirField,
  FieldAffix,
  type FieldAffixProps,
  FieldAffixes,
  type FieldAffixesProps,
  FieldCounter,
  type FieldCounterProps,
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

export {
  Field,
  FieldAffix,
  FieldAffixProps,
  FieldAffixes,
  FieldAffixesProps,
  FieldCounter,
  FieldCounterProps,
  FieldDescription,
  FieldDescriptionProps,
  FieldProps,
};
