import './field.css';
import {
  Field as DigdirField,
  FieldAffix,
  type FieldAffixProps,
  FieldAffixes,
  type FieldAffixesProps,
  FieldCounter as DigdirFieldCounter,
  type FieldCounterProps as DigdirFieldCounterProps,
  FieldDescription,
  type FieldDescriptionProps,
  type FieldProps as DigdirFieldProps,
} from '@digdir/designsystemet-react';
import type {
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type FieldProps = Omit<DigdirFieldProps, 'data-color' | 'asChild'>;

type FieldCounterProps = Omit<DigdirFieldCounterProps, 'hint'>;

const Field = DigdirField as ForwardRefExoticComponent<
  FieldProps & RefAttributes<ComponentRef<typeof DigdirField>>
> &
  Pick<typeof DigdirField, 'Affix' | 'Affixes' | 'Description'> & {
    Counter: typeof FieldCounter;
  };

const FieldCounter = DigdirFieldCounter as ForwardRefExoticComponent<
  FieldCounterProps & RefAttributes<ComponentRef<typeof DigdirFieldCounter>>
>;

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Field.displayName = 'Field';

export type {
  FieldAffixProps,
  FieldAffixesProps,
  FieldCounterProps,
  FieldDescriptionProps,
  FieldProps,
};
export { Field, FieldAffix, FieldAffixes, FieldCounter, FieldDescription };
