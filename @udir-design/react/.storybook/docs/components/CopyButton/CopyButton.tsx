import { useState } from 'react';
import { ClipboardCheckmarkIcon, FilesIcon } from '@udir-design/icons';
import { Button } from 'src/components/button';
import styles from './copyButton.module.css';

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState('');
  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(styles.copied);
    } catch {
      setCopied('');
    }
  };
  return (
    <Button
      variant="tertiary"
      aria-label="Kopier"
      data-size="sm"
      onMouseLeave={() => setTimeout(() => setCopied(''), 1000)}
      onClick={handleClick}
    >
      <span className={`${styles.stack} ${copied}`}>
        <FilesIcon aria-hidden />
        <ClipboardCheckmarkIcon aria-hidden />
      </span>
      Kopier
    </Button>
  );
};
