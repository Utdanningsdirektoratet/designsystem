import { Paragraph } from 'src/components/alpha';
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
          padding: 'var(--ds-size-2)',
          paddingInline: 'var(--ds-size-6)',
          maxHeight: '80px',
        }}
      >
        <Paragraph style={{ marginBlock: '0px' }}>{heading}</Paragraph>
        <Button
          variant="tertiary"
          aria-label="Kopier"
          data-size="sm"
          icon
          style={{ marginTop: '0px' }}
        >
          <FilesIcon />
        </Button>
      </Card.Block>
      <Card.Block style={{ overflow: 'auto' }}>
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
