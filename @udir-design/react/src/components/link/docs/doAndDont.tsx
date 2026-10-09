import { ExternalLinkIcon } from '@udir-design/icons';
import { Do, Dont, Stack } from '.storybook/docs/components';
import { Link } from '../Link';

export const LinkExExternalLinkIcon = () => {
  return (
    <Stack>
      <Do description="Bruk tekst for å forklare hva lenken leder til.">
        <ExExternalLinkIconDo />
      </Do>
      <Dont description="Ikke bruk ikon for eksterne lenker.">
        <ExExternalLinkIconDont />
      </Dont>
    </Stack>
  );
};

const ExExternalLinkIconDo = () => {
  return (
    <Link
      href="https://www.bufdir.no/barnevern/hjelpetiltak-i-hjemmet/"
      style={{ margin: 'var(--ds-size-2) 0' }}
    >
      Samarbeid med barnevernet (på bufdir.no)
    </Link>
  );
};

const ExExternalLinkIconDont = () => {
  return (
    <Link
      href="https://www.bufdir.no/barnevern/hjelpetiltak-i-hjemmet/"
      style={{ margin: 'var(--ds-size-2) 0' }}
    >
      <span>Samarbeid med barnevernet</span>
      <ExternalLinkIcon aria-hidden />
    </Link>
  );
};
