import type { ComponentOrigin } from '.storybook/types/parameters';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

export interface OriginProps extends ComponentOrigin {
  component: string;
}

export function OriginText({
  component,
  originator,
  details,
  demo,
}: OriginProps) {
  const digdirText = demo
    ? ' er basert på et eksempel fra Digdir.'
    : ' bygger på en komponent fra Digdirs designsystem.';
  const selfText = ' er egenutviklet.';
  const navText = ' bygger på Navs designsystem';
  const baseText =
    originator === 'digdir'
      ? digdirText
      : originator === 'nav'
        ? navText
        : selfText;

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
