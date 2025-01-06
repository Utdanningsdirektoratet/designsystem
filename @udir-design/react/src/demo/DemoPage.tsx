import React, { type HTMLAttributes } from 'react';
import { FrequentQuestions } from './frequent-questions/FrequentQuestions';
import { Login } from './login/Login';
import { Shoppinglist } from './shoppinglist/Shoppinglist';
import styles from './DemoPage.module.scss';

type Props = HTMLAttributes<HTMLDivElement>;

export function DemoPage(props: Props) {
  return (
    <div className={styles.page} {...props}>
      <Shoppinglist />
      <Login />
      <FrequentQuestions />
    </div>
  );
}
