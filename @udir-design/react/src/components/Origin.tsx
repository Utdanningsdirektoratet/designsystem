import { Divider, Link } from './beta';
import { Paragraph } from './typography';

interface Props {
  component: string;
  digdir: boolean;
  details?: string;
}

export function OriginText({ component, digdir, details: description }: Props) {
  const baseText = digdir
    ? ' bygger på en komponent fra Digdir.'
    : ' er egenutviklet.';

  const fullText = description ? `${baseText} ${description}` : baseText;

  return (
    <>
      <Divider />
      <Paragraph>
        <Link href="#">
          <code>{component}</code>
        </Link>
        {fullText}
      </Paragraph>
    </>
  );
}
