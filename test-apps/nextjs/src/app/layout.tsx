'use client';

import '@udir-design/react/style.css';
import './global.css';
import { TestFooter as Footer } from './components/TestFooter';
import { TestHeader as Header } from './components/TestHeader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="content">{children}</div>
        <Footer className="footer" />
      </body>
    </html>
  );
}
