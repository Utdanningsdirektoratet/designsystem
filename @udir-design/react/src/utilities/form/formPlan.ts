// -----------------------------
// Form plan types
// -----------------------------

import type { FormNavigationStepProps } from '../../components/formNavigation';
import { defineSteps, getStepIds, makeStepFinder } from './navigation';

export type FormNavigationVariant = NonNullable<
  FormNavigationStepProps['variant']
>;

export type FormPlanStep<TStepId extends string, TFieldId extends string> = {
  id: TStepId;
  title: string;
  fields: readonly { name: TFieldId; label: string }[];
  variant?: FormNavigationVariant;
};

export type FormPlanSection<
  TSectionTitle extends string,
  TStepId extends string,
  TFieldId extends string,
> = {
  sectionTitle: TSectionTitle;
  steps: readonly FormPlanStep<TStepId, TFieldId>[];
};

export type FormPlanItem<
  TSectionTitle extends string,
  TStepId extends string,
  TFieldId extends string,
> =
  | FormPlanSection<TSectionTitle, TStepId, TFieldId>
  | FormPlanStep<TStepId, TFieldId>;

export type FormPlan<
  TSectionTitle extends string,
  TStepId extends string,
  TFieldId extends string,
> = readonly FormPlanItem<TSectionTitle, TStepId, TFieldId>[];

// -----------------------------
// Core builder
// -----------------------------

export function defineFormPlan<
  const P extends FormPlan<string, string, string>,
>(plan: P) {
  type StepId =
    | Extract<P[number], { id: string }>['id']
    | Extract<P[number], { sectionTitle: string }>['steps'][number]['id'];

  type FieldId =
    | Extract<P[number], { id: string }>['fields'][number]['name']
    | Extract<
        P[number],
        { sectionTitle: string }
      >['steps'][number]['fields'][number]['name'];

  type Step = {
    id: StepId;
    title: string;
    fields: readonly { name: FieldId; label: string }[];
    variant?: FormNavigationVariant;
  };

  const orderedSteps = plan.flatMap((item) =>
    'steps' in item ? item.steps : [item],
  ) as unknown as Step[];

  const stepById = new Map<StepId, Step>();

  for (const step of orderedSteps) {
    stepById.set(step.id, step);
  }

  const fieldsByStep = defineSteps(
    Object.fromEntries(
      orderedSteps.map((step) => [step.id, step.fields.map((f) => f.name)]),
    ) as Record<StepId, FieldId[]>,
  );

  const defaultValues = Object.fromEntries(
    orderedSteps.flatMap((step) =>
      step.fields.map((f) => [f.name, ''] as const),
    ),
  ) as Record<FieldId, string>;

  const stepIds = getStepIds(fieldsByStep);
  const findStepForField = makeStepFinder(fieldsByStep);

  const getStep = (id: StepId) => stepById.get(id);

  return {
    plan,

    fieldsByStep,
    defaultValues,

    stepIds,
    findStepForField,

    getStep,
  } as const;
}
