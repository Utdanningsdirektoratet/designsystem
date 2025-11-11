import { FormNavigationGroup as FormNavigationGroupRoot } from './FormNavigationGroup';
import { FormNavigationGroupStep } from './FormNavigationGroupStep';

type FormNavigationProps = typeof FormNavigationGroupRoot & {
  Step: typeof FormNavigationGroupStep;
};

const FormNavigationGroup: FormNavigationProps = Object.assign(
  FormNavigationGroupRoot,
  {
    Step: FormNavigationGroupStep,
  },
);

FormNavigationGroup.Step.displayName = 'FormNavigationGroup.Step';

export type { FormNavigationGroupProps } from './FormNavigationGroup';
export type { FormNavigationGroupStepProps } from './FormNavigationGroupStep';
export { FormNavigationGroup, FormNavigationGroupStep };
