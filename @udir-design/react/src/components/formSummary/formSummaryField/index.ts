import { FormSummaryField as FieldRoot } from './FormSummaryField';
import { FormSummaryFieldAnswer } from './FormSummaryFieldAnswer';
import { FormSummaryFieldLabel } from './FormSummaryFieldLabel';

type FieldProps = typeof FieldRoot & {
  Label: typeof FormSummaryFieldLabel;
  Answer: typeof FormSummaryFieldAnswer;
};

const FormSummaryField: FieldProps = Object.assign(FieldRoot, {
  Label: FormSummaryFieldLabel,
  Answer: FormSummaryFieldAnswer,
});

FormSummaryField.Label.displayName = 'FormSummary.Field.Label';
FormSummaryField.Answer.displayName = 'FormSummary.Field.Answer';

export type { FormSummaryFieldProps } from './FormSummaryField';
export type { FormSummaryFieldLabelProps } from './FormSummaryFieldLabel';
export type { FormSummaryFieldAnswerProps } from './FormSummaryFieldAnswer';

export { FormSummaryField, FormSummaryFieldAnswer, FormSummaryFieldLabel };
