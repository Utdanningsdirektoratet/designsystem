import { FrequentQuestions } from './frequent-questions/FrequentQuestions';
import { Login } from './login/Login';
import { Shoppinglist } from './shoppinglist/Shoppinglist';
import styles from './DemoPage.module.scss';
import { UserTable } from './user-table/UserTable';

export type Props = {
  'data-color-scheme': 'auto' | 'dark' | 'light'; // TODO: type should come from @digdir, must be added there
  'data-size': 'sm' | 'md' | 'lg'; // TODO: type should come from @digdir, does not work as hoped to use Size from @digdir
};

export function DemoPage(props: Props) {
  return (
    <div className={styles.page} {...props}>
      <Shoppinglist />
      <Login />
      <FrequentQuestions />
      <UserTable />
    </div>
  );
}
