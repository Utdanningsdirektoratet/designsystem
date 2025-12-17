type FormFieldsByStep<TStepId extends string, TFieldId extends string> = Record<
  TStepId,
  TFieldId[]
>;

/**
 * Define the grouping of form fields per step with proper typing.
 *
 * @param stepsDefinition An object where each key is a step id, and each value is an array of field ids
 * @returns The same object, but properly typed for use with other form utilities
 *
 * @example
 * const stepsDefinition = defineSteps({
 *   firstStep: ['question1', 'question2'],
 *   secondStep: ['question3']
 * });
 * type FormSteps = typeof stepsDefinition;
 * // equivalent to:
 * type FormSteps = {
 *   readonly firstStep: ["question1", "question2"];
 *   readonly secondStep: ["question3"];
 *   }
 */
export const defineSteps = <const T extends FormFieldsByStep<string, string>>(
  stepsDefinition: T,
) => stepsDefinition;

/**
 * Extract the `StepId` type from the result of {@link defineSteps}.
 *
 * @example
 * type FormSteps = typeof stepsDefinition; // where stepsDefinition is returned by defineSteps(...)
 * type StepId = GetStepId<FormSteps>
 * // equivalent to
 * type StepId = "firstStep" | "secondStep"
 */
export type GetStepId<T extends FormFieldsByStep<string, string>> =
  T extends FormFieldsByStep<infer StepId, string> ? StepId : never;

/**
 * Get the step ids from a steps definition
 *
 * @param stepsDefinition The object returned by {@link defineSteps}
 * @returns An array of step ids
 */
export const getStepIds = <T extends FormFieldsByStep<string, string>>(
  stepsDefinition: T,
) => Object.keys(stepsDefinition) as (keyof T)[];

/**
 * Extract the `FieldId` type from the result of {@link defineSteps}.
 *
 * @example
 * type FormSteps = typeof stepsDefinition; // where stepsDefinition is returned by defineSteps(...)
 * type FieldId = GetFieldId<FormSteps>
 * // equivalent to
 * type FieldId = "question1" | "question2" | "question3"
 */
export type GetFieldId<T extends FormFieldsByStep<string, string>> =
  T extends FormFieldsByStep<string, infer FieldId> ? FieldId : never;

/**
 * Get the field ids from a steps definition
 *
 * @param stepsDefinition The object returned by {@link defineSteps}
 * @returns An array of field ids
 */
export const getFieldIds = <T extends FormFieldsByStep<string, string>>(
  stepsDefinition: T,
) => Object.values(stepsDefinition).flat() as Array<T[keyof T][number]>;

/**
 * Create a lookup function which returns the step id for a given field id
 * @param stepsDefinition The object returned by {@link defineSteps}
 * @returns A lookup function `(field: FieldId) => StepId | undefined`
 *
 * @example
 * // let stepsDefinition be the object returned by defineSteps(...)
 * const findStepForField = makeStepFinder(stepsDefinition)
 * findStepForField("question3") // returns "secondStep"
 */
export function makeStepFinder<T extends FormFieldsByStep<string, string>>(
  stepsDefinition: T,
) {
  type StepId = keyof T;
  type FieldId = T[StepId][number];
  return function findStepForField(
    field: FieldId | (string & {}),
  ): StepId | undefined {
    for (const [stepId, fields] of Object.entries(stepsDefinition) as Array<
      [StepId, FieldId[]]
    >) {
      if (fields.includes(field as FieldId)) return stepId;
    }
  };
}
