import React from 'react';
import { Heading, Textfield, Tooltip, Link, Button } from '../../index';
import styles from './Login.module.scss';

export function Login() {
  return (
    <div>
      <Heading>Opprett ny bruker</Heading>
      <Textfield
        label="Navn"
        placeholder="Ola Normann"
        className={styles.userField}
      />
      <Textfield
        type="email"
        label="E-post"
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
