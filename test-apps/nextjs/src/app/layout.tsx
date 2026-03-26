'use client';

import '@udir-design/react/style.css';
import '@udir-design/theme/datavis.css';
import './global.css';
import { DemoBanner } from 'src/components/*';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <body>
        <DemoBanner>
          <Header />
          <div className="content">{children}</div>
          <Footer className="footer" />
        </DemoBanner>
      </body>
    </html>
  );
}
