'use client';

import { Heading, Paragraph, Prose } from '@udir-design/react/alpha';
import styles from './page.module.scss';

export default function Index() {
  return (
    <Prose className={styles.page}>
      <Heading level={1} data-size="xl">
        Testapplikasjon med Next.js
      </Heading>
      <Paragraph>
        Denne applikasjonen inneholder en rekke demosider for Udirs designsystem
        i et oppsett som bruker Next.js. Du kan navigere mellom disse i menyen i
        toppfeltet.
      </Paragraph>
    </Prose>
  );
}
