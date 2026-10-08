import { useEffect, useState } from 'react';
import {
  Footer,
  Header,
  Heading,
  Paragraph,
  SkipLink,
} from '@udir-design/react';
import { AuthGate } from './AuthGate';
import { IllustrationGallery } from './IllustrationGallery';
import { AssetError, useAssetSource } from './assets';
import { readAuthConfig } from './auth';
import type { IllustrationCatalog } from './metadata';

const authConfig = readAuthConfig();

type CatalogState =
  | { status: 'loading' }
  | { status: 'ready'; catalog: IllustrationCatalog }
  | { status: 'denied' }
  | { status: 'error' };

function CatalogGallery() {
  const source = useAssetSource();
  const [state, setState] = useState<CatalogState>({ status: 'loading' });

  useEffect(() => {
    let current = true;
    source
      .catalog()
      .then((catalog) => current && setState({ status: 'ready', catalog }))
      .catch((error: unknown) => {
        const denied =
          error instanceof AssetError &&
          (error.status === 401 || error.status === 403);
        if (current) setState({ status: denied ? 'denied' : 'error' });
      });
    return () => {
      current = false;
    };
  }, [source]);

  if (state.status === 'ready')
    return <IllustrationGallery catalog={state.catalog} />;
  if (state.status === 'loading') return <Paragraph>Laster …</Paragraph>;
  return (
    <div>
      <Heading level={2}>
        {state.status === 'denied'
          ? 'Du har ikke tilgang'
          : 'Kunne ikke laste illustrasjonene'}
      </Heading>
      <Paragraph>
        {state.status === 'denied'
          ? 'Kontoen din har ikke tilgang til illustrasjonene. Ta kontakt hvis du mener dette er feil.'
          : 'Prøv å laste siden på nytt.'}
      </Paragraph>
    </div>
  );
}

export function App() {
  return (
    <>
      <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
      <Header applicationName="Illustrasjoner" />
      <main className="content" id="main-content">
        {authConfig ? (
          <AuthGate config={authConfig}>
            <CatalogGallery />
          </AuthGate>
        ) : (
          <CatalogGallery />
        )}
      </main>
      <Footer />
    </>
  );
}
