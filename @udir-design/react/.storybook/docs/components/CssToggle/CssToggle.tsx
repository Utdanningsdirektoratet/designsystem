import { Source } from '@storybook/addon-docs/blocks';
import { Unstyled } from '@storybook/addon-docs/blocks';
import { useState } from 'react';
import { CodeIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';

export function CssToggle({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Unstyled>
      <Button variant="secondary" onClick={() => setOpen(!open)}>
        <CodeIcon aria-hidden />
        {open ? 'Skjul CSS kildekode' : 'Vis CSS kildekode'}
      </Button>
      {open && <Source code={code} language="css" />}
    </Unstyled>
  );
}
