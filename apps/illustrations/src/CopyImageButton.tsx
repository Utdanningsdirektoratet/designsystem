import { useState } from 'react';
import { ClipboardCheckmarkIcon, FilesIcon } from '@udir-design/icons';
import { Button } from '@udir-design/react';
import styles from './copyButton.module.css';

export function CopyImageButton({ url }: { url: string }) {
  const [copied, setCopied] = useState('');
  return (
    <Button
      variant="tertiary"
      aria-label="Kopier"
      data-size="sm"
      onMouseLeave={() => setTimeout(() => setCopied(''), 1000)}
      onClick={async () => {
        try {
          const blob = await (await fetch(url)).blob();
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(styles.copied);
        } catch {
          setCopied('');
        }
      }}
    >
      <span className={`${styles.stack} ${copied}`}>
        <FilesIcon aria-hidden />
        <ClipboardCheckmarkIcon aria-hidden />
      </span>
      Kopier
    </Button>
  );
}
