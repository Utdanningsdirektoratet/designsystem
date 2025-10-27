import { FormNavigation as FormNavigationRoot } from './FormNavigation';
import { FormNavigationItem } from './FormNavigationItem';

type FormNavigationProps = typeof FormNavigationRoot & {
  Item: typeof import('./FormNavigationItem').FormNavigationItem;
};

const FormNavigation: FormNavigationProps = Object.assign(FormNavigationRoot, {
  Item: FormNavigationItem,
});

FormNavigation.Item.displayName = 'FormNavigation.Item';

export type { FormNavigationProps } from './FormNavigation';
export type { FormNavigationItemProps } from './FormNavigationItem';
export { FormNavigation, FormNavigationItem };
