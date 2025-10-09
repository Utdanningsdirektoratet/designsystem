import React from 'react';
import { Button } from 'src/components/button/Button';
import { Link } from 'src/components/link/Link';
import { Textfield } from 'src/components/textfield/Textfield';
import { Tooltip } from 'src/components/tooltip/Tooltip';
import { Heading } from 'src/components/typography/heading/Heading';
import styles from './Login.module.scss';

export function Login() {
  return (
    <div>
      <Heading>Opprett ny bruker</Heading>
      <Textfield
        label="Navn"
        id="name"
        placeholder="Ola Normann"
        autoComplete="name"
        className={styles.userField}
      />
      <Textfield
        type="email"
        label="E-post"
        id="email"
        placeholder="ola@norge.no"
        autoComplete="email"
        className={styles.userField}
      />
      <Tooltip content="Trykk for å få hjelp">
        <Link href="#">Glemt passord?</Link>
      </Tooltip>
      <Button className={styles.userButton}>Opprett ny bruker</Button>
    </div>
  );
}
