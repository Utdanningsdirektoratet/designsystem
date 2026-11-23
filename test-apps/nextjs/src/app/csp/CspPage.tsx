'use client';

import { useState } from 'react';
import { CspDemo } from '@udir-design/demos/csp-demo/CspDemo';
import { cspDemoProps } from '@udir-design/demos/csp-demo/cspDemoProps';
import { Button } from '@udir-design/react/alpha';

/**
 * Every component under a strict CSP, for `e2e/csp.spec.ts`. The button changes their props, to
 * check that updates add no inline styles either.
 */
export function CspPage() {
  const [changed, setChanged] = useState(false);
  return (
    <>
      <Button aria-pressed={changed} onClick={() => setChanged(true)}>
        Endre props
      </Button>
      <CspDemo {...(changed ? cspDemoProps.changed : cspDemoProps.initial)} />
    </>
  );
}
