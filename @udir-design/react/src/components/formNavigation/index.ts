import { FormNavigation as FormNavigationRoot } from './FormNavigation';
import { FormNavigationStep } from './FormNavigationStep';
import { FormNavigationGroup } from './formNavigationGroup';

type FormNavigationProps = typeof FormNavigationRoot & {
  Group: typeof FormNavigationGroup;
  Step: typeof FormNavigationStep;
};

const FormNavigation: FormNavigationProps = Object.assign(FormNavigationRoot, {
  Group: FormNavigationGroup,
  Step: FormNavigationStep,
});

FormNavigation.Group.displayName = 'FormNavigation.Group';
FormNavigation.Step.displayName = 'FormNavigation.Step';

export type { FormNavigationProps } from './FormNavigation';
export type { FormNavigationGroupProps } from './formNavigationGroup';
export type { FormNavigationStepProps } from './FormNavigationStep';
export { FormNavigation, FormNavigationGroup, FormNavigationStep };
