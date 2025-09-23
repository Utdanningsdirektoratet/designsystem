import { ComponentOrigin } from '.storybook/types/parameters';
import { Heading, Paragraph } from '../../src/components/typography';

export interface OriginProps extends ComponentOrigin {
  component: string;
}

export function OriginText({ component, originator, details }: OriginProps) {
  const baseText =
    originator === 'digdir'
      ? ' bygger på en komponent fra Digdirs designsystem.'
      : ' er egenutviklet.';

  const fullText = details ? `${baseText} ${details}` : baseText;

  return (
    <>
      <Heading
        level={2}
        data-size="md"
        className="sb-unstyled"
        style={{
          marginTop: 'var(--ds-size-5)',
          marginBottom: 'var(--ds-size-2)',
        }}
      >
        Kilde
      </Heading>
      <Paragraph className="sb-unstyled">
        <code className="css-b5rkn5">{component}</code>
        {fullText}
      </Paragraph>
    </>
  );
}
