import type { HTMLAttributes } from 'react';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import styles from './DemoPage.module.scss';
import { BreadcrumbsDemo } from './breadcrumbs/BreadcrumbsDemo';
import { FrequentQuestions } from './frequent-questions/FrequentQuestions';
import { Login } from './login/Login';
import { Progress } from './progress/Progress';
import { Shoppinglist } from './shoppinglist/Shoppinglist';
import { UserTable } from './user-table/UserTable';

type Props = HTMLAttributes<HTMLDivElement>;

export function DemoPage(props: Props) {
  return (
    <div className={styles.page} {...props} data-size="">
      <BreadcrumbsDemo />
      <div className={styles.examples}>
        <Shoppinglist />
        <Login />
        <Progress />
        <FrequentQuestions />
        <UserTable />
      </div>
    </div>
  );
}
