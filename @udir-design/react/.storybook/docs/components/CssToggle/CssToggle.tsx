import { Source } from '@storybook/addon-docs/blocks';
import { Unstyled } from '@storybook/addon-docs/blocks';
import { useState } from 'react';
import { CodeIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';

export function CssToggle({
  code,
  language = 'css',
  label = 'CSS kildekode',
}: {
  code: string;
  language?: 'css' | 'tsx';
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Unstyled>
      <Button variant="secondary" onClick={() => setOpen(!open)}>
        <CodeIcon aria-hidden />
        {open ? `Skjul ${label}` : `Vis ${label}`}
      </Button>
      {open && <Source code={code} language={language} />}
    </Unstyled>
  );
}
