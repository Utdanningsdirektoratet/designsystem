'use client';

import { useEffect, useState } from 'react';
import { DashboardDemo } from '@udir-design/demos/dashboard-demo/DashboardDemo';

export default function Index() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.setAttribute('data-color-scheme', colorMode);
  }, [colorMode]);
  return <DashboardDemo data-size="md" setColorMode={setColorMode} />;
}
