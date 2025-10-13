import { Button, Card, Paragraph } from 'src/components/beta';
import { FilesIcon } from '@udir-design/icons';
import styles from './codeBlock.module.css';

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
      <Card.Block>
        <pre className={styles.codeSection}>
          <code>{code}</code>
        </pre>
      </Card.Block>
    </Card>
  );
};
