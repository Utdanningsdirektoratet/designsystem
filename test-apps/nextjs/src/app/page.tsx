'use client';

import { Button, Heading } from '@udir-design/react/alpha';
import styles from './page.module.scss';

export default function Index() {
  return (
    <div className={styles.page}>
      <Heading level={1}>
        Test app for Next.js setup with @udir-design/react
      </Heading>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
    </div>
  );
}
