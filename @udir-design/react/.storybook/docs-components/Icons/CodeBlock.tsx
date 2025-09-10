import { Heading } from 'src/components/alpha';
import { Button, Card } from 'src/components/beta';
import { FilesIcon } from '@udir-design/icons';

interface Props {
  heading: string;
  code: string;
}

export const CodeBlock = ({ heading, code }: Props) => {
  return (
    <Card>
      <Card.Block
        style={{
          backgroundColor: '#EEEEEE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--ds-size-4)',
        }}
      >
        <Heading level={3}>{heading}</Heading>
        <Button variant="tertiary" aria-label="Kopier" icon>
          <FilesIcon />
        </Button>
      </Card.Block>
      <Card.Block>
        <pre>
          <code
            style={{
              fontFamily: 'courier new',
              backgroundColor: '#fff',
              padding: '2px',
              fontSize: '105%',
            }}
          >
            {code}
          </code>
        </pre>
      </Card.Block>
    </Card>
  );
};
