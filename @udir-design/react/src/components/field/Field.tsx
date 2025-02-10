import {
  Field,
  type FieldProps,
  FieldAffix,
  type FieldAffixProps,
  FieldCounter,
  type FieldCounterProps,
  FieldDescription,
  type FieldDescriptionProps,
  FieldAffixes,
  type FieldAffixesProps,
} from '@digdir/designsystemet-react';

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
