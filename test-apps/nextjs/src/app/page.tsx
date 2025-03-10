'use client';

import styles from './page.module.scss';
import { Button } from '@udir-design/react/alpha';

export default function Index() {
  return (
    <div className={styles.page}>
      <h1>Test app for Next.js setup with @udir-design/react</h1>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
    </div>
  );
}
