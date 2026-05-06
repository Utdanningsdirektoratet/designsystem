import { FormSummary as FormSummaryRoot } from './FormSummary';
import { FormSummaryField } from './FormSummaryField';
import { FormSummaryFields } from './FormSummaryFields';
import { FormSummarySection } from './FormSummarySection';

type FormSummary = typeof FormSummaryRoot & {
  Fields: typeof FormSummaryFields;
  Field: typeof FormSummaryField;
  Section: typeof FormSummarySection;
};

const FormSummary: FormSummary = Object.assign(FormSummaryRoot, {
  Fields: FormSummaryFields,
  Field: FormSummaryField,
  Section: FormSummarySection,
});

FormSummary.Fields.displayName = 'FormSummary.Fields';
FormSummary.Field.displayName = 'FormSummary.Field';
FormSummary.Section.displayName = 'FormSummary.Section';

export type { FormSummaryProps } from './FormSummary';
export type { FormSummaryFieldsProps } from './FormSummaryFields';
export type { FormSummaryFieldProps } from './FormSummaryField';
export type { FormSummarySectionProps } from './FormSummarySection';

export { FormSummary, FormSummaryField, FormSummaryFields, FormSummarySection };
