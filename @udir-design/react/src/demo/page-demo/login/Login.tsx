import React from 'react';
import {
  Heading,
  Textfield,
  Tooltip,
  Link,
  Button,
} from '@udir-design/react/alpha';
import styles from './Login.module.scss';

export function Login() {
  return (
    <div>
      <Heading>Opprett ny bruker</Heading>
      <Textfield
        label="Navn"
        id="name"
        placeholder="Ola Normann"
        className={styles.userField}
      />
      <Textfield
        type="email"
        label="E-post"
        id="email"
        placeholder="ola@norge.no"
        className={styles.userField}
      />
      <Tooltip content="Trykk for å få hjelp">
        <Link href="#">Glemt passord?</Link>
      </Tooltip>
      <Button className={styles.userButton}>Opprett ny bruker</Button>
    </div>
  );
}
