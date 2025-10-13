import { FilesIcon } from '@udir-design/icons';
import styles from './codeBlock.module.css';
import { Card } from 'src/components/card/Card';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { Button } from 'src/components/button/Button';

interface Props {
  heading: string;
  code: string;
}

export const CodeBlock = ({ heading, code }: Props) => {
  return (
    <Card className={styles.root}>
      <Card.Block className={styles.headerSection}>
        <Paragraph>{heading}</Paragraph>
        <Button
          variant="tertiary"
          aria-label="Kopier"
          data-size="sm"
          icon
          onClick={() => navigator.clipboard.writeText(code)}
        >
          <FilesIcon />
        </Button>
      </Card.Block>
      <Card.Block className={styles.codeSection}>
        <pre>
          <code>{code}</code>
        </pre>
      </Card.Block>
    </Card>
  );
};
