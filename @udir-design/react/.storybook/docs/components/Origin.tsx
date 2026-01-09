import type { ComponentOrigin } from '.storybook/types';
import { Link } from 'src/components/link/Link';
import { Heading } from 'src/components/typography/heading/Heading';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';

export interface OriginProps extends ComponentOrigin {
  component: string;
}

export function OriginText({
  component,
  name,
  originator,
  details,
}: OriginProps) {
  const digdirText = ' bygger på arbeid gjort i Digdirs designsystem.';
  const navText = (
    <div style={{ display: 'inline' }}>
      {' bygger på '}
      <Link href="https://aksel.nav.no/komponenter/ikoner">
        Navs ikonbibliotek Aksel
      </Link>
      .
    </div>
  );
  const selfText = ' er utarbeidet av Udir.';
  const baseText =
    originator === 'digdir'
      ? digdirText
      : originator === 'nav'
        ? navText
        : selfText;

  const fullText = details ? (
    <>
      {baseText} {details}
    </>
  ) : (
    baseText
  );

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
        <code className="css-b5rkn5">{name ?? component}</code>
        {fullText}
      </Paragraph>
    </>
  );
}
