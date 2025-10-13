import React from 'react';
import styles from './Login.module.scss';
import { Heading } from 'src/components/typography/heading/Heading';
import { Textfield } from 'src/components/textfield/Textfield';
import { Tooltip } from 'src/components/tooltip/Tooltip';
import { Link } from 'src/components/link/Link';
import { Button } from 'src/components/button/Button';

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
