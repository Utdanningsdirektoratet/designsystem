import React from 'react';
import { Button } from '../../../../components/button/Button';
import { Link } from '../../../../components/link/Link';
import { Textfield } from '../../../../components/textfield/Textfield';
import { Tooltip } from '../../../../components/tooltip/Tooltip';
import { Heading } from '../../../../components/typography/heading/Heading';
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
