import { Header, SkipLink, Footer } from '@udir-design/react';
import { IllustrationGallery } from './IllustrationGallery';
import { metadata } from './metadata';

export function App() {
  return (
    <>
      <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
      <Header applicationName="Illustrasjoner" />
      <main className="content" id="main-content">
        <IllustrationGallery catalog={metadata} />
      </main>
      <Footer />
    </>
  );
}
