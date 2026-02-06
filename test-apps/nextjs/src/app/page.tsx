'use client';

import { Button, ProgressBar } from '@udir-design/react/alpha';
import styles from './page.module.scss';

export default function Index() {
  return (
    <div className={styles.page}>
      <h1>Test app for Next.js setup with @udir-design/react</h1>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
      <ProgressBar max={10} value={1} />
    </div>
  );
}
