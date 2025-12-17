import { FormNavigation as FormNavigationRoot } from './FormNavigation';
import { FormNavigationGroup } from './FormNavigationGroup';
import { FormNavigationStep } from './FormNavigationStep';

type FormNavigation = typeof FormNavigationRoot & {
  Group: typeof FormNavigationGroup;
  Step: typeof FormNavigationStep;
};

const FormNavigation: FormNavigation = Object.assign(FormNavigationRoot, {
  Group: FormNavigationGroup,
  Step: FormNavigationStep,
});

FormNavigation.Group.displayName = 'FormNavigation.Group';
FormNavigation.Step.displayName = 'FormNavigation.Step';

export type { FormNavigationProps } from './FormNavigation';
export type { FormNavigationGroupProps } from './FormNavigationGroup';
export type { FormNavigationStepProps } from './FormNavigationStep';
export { FormNavigation, FormNavigationGroup, FormNavigationStep };
