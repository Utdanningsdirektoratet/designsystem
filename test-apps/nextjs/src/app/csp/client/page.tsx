'use client';

import dynamic from 'next/dynamic';

// Rendered only in the browser, to check client-side rendering under a strict CSP
const CspPage = dynamic(
  () => import('../CspPage').then((module) => module.CspPage),
  { ssr: false },
);

export default function Index() {
  return <CspPage />;
}
