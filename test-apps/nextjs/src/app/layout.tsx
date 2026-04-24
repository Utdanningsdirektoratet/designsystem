'use client';

import '@udir-design/react/style.css';
import '@udir-design/theme/datavis.css';
import './global.css';
import { DemoBanner, SkipLink } from 'src/components/*';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <head>
        <title>Testapp</title>
        <link
          rel="preload stylesheet"
          as="style"
          href="https://altinncdn.no/fonts/inter/v4/inter.css"
        />
      </head>
      <body>
        <DemoBanner>
          <SkipLink href="#main-content">Hopp til hovedinnholdet</SkipLink>
          <Header />
          <main className="content" id="main-content">
            {children}
          </main>
          <Footer className="footer" />
        </DemoBanner>
      </body>
    </html>
  );
}
