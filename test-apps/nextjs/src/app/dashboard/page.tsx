'use client';

import { useState } from 'react';
import { DashboardDemo } from '@udir-design/demos/dashboard-demo/DashboardDemo';

export default function Index() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  return (
    <DashboardDemo
      data-size="md"
      data-color-scheme={colorMode}
      setColorMode={setColorMode}
    />
  );
}
