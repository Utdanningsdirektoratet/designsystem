/* eslint-disable no-restricted-imports */
import {
  type GetFieldId,
  type GetStepId,
  defineSteps,
  getFieldIds,
  getStepIds,
  makeStepFinder,
} from '@udir-design/react/utilities/form/alpha';

export const steps = defineSteps({
  firstStep: ['question1', 'question2'],
  secondStep: ['question3'],
});

export type StepId = GetStepId<typeof steps>;
// type StepId = "firstStep" | "secondStep"
export type FieldId = GetFieldId<typeof steps>;
// type FieldId = "question1" | "question2" | "question3"

export const stepIds = getStepIds(steps);
export const fieldIds = getFieldIds(steps);

const findStepForField = makeStepFinder(steps);

export const question3Step = findStepForField('question3');
// const question3Step = 'secondStep';
