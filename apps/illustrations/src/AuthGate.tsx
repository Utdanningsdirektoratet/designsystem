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

type State = 'loading' | 'signedIn' | 'error';

const attemptKey = 'illustrations-login-attempted';

// Shared so React's double effect in development redirects only once.
let started: Promise<boolean> | undefined;
function start(current: Session) {
  started ??= current.init().then(async (account) => {
    if (account) {
      sessionStorage.removeItem(attemptKey);
      return true;
    }
    // Coming back from a redirect without an account would otherwise loop.
    if (sessionStorage.getItem(attemptKey)) throw new Error('Login failed.');
    sessionStorage.setItem(attemptKey, '1');
    await current.login();
    return false;
  });
  return started;
}

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
    start(current)
      .then((signedIn) => {
        if (signedIn) setState('signedIn');
      })
      .catch(() => setState('error'));
  }, [current]);

  if (state === 'signedIn')
    return <AssetContext value={source}>{children}</AssetContext>;

  return (
    <div className={styles.root}>
      {state === 'error' ? (
        <>
          <Heading level={2}>Innloggingen feilet</Heading>
          <Paragraph>Prøv å laste siden på nytt.</Paragraph>
          <Button
            onClick={() => {
              sessionStorage.removeItem(attemptKey);
              window.location.reload();
            }}
          >
            Last på nytt
          </Button>
        </>
      ) : null}
    </div>
  );
}
