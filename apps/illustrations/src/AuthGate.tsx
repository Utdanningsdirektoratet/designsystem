import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Button, Heading, Paragraph } from '@udir-design/react';
import { AssetContext } from './assets';
import { createSession } from './auth';
import type { AuthConfig, Session } from './auth';
import styles from './authGate.module.css';
import { createStorageSource } from './storage';

// One MSAL instance per page; React may run effects twice in development.
let session: Session | undefined;
function getSession(config: AuthConfig) {
  session ??= createSession(config);
  return session;
}

type State = 'loading' | 'signedOut' | 'signedIn' | 'error';

export function AuthGate({
  config,
  children,
}: {
  config: AuthConfig;
  children: ReactNode;
}) {
  const current = getSession(config);
  const [state, setState] = useState<State>('loading');
  const source = useMemo(
    () => createStorageSource(config, () => current.getToken()),
    [config, current],
  );

  useEffect(() => {
    current
      .init()
      .then((account) => setState(account ? 'signedIn' : 'signedOut'))
      .catch(() => setState('error'));
  }, [current]);

  if (state === 'signedIn')
    return <AssetContext value={source}>{children}</AssetContext>;

  return (
    <div className={styles.root}>
      {state === 'loading' ? <Paragraph>Logger inn …</Paragraph> : null}
      {state === 'signedOut' ? (
        <>
          <Heading level={2}>Logg inn for å se illustrasjonene</Heading>
          <Paragraph>
            Illustrasjonene er tilgjengelige for ansatte i
            Utdanningsdirektoratet.
          </Paragraph>
          <Button onClick={() => void current.login()}>Logg inn</Button>
        </>
      ) : null}
      {state === 'error' ? (
        <>
          <Heading level={2}>Innloggingen feilet</Heading>
          <Paragraph>Prøv å laste siden på nytt.</Paragraph>
          <Button onClick={() => window.location.reload()}>Last på nytt</Button>
        </>
      ) : null}
    </div>
  );
}
