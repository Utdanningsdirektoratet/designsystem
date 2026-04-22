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
      href="https://www.udir.no/eksamen-og-prover/eksamen/"
      style={{ margin: 'var(--ds-size-2) 0' }}
    >
      Se info om eksamen på Udir.no
    </Link>
  );
};

const ExExternalLinkIconDont = () => {
  return (
    <Link
      href="https://www.udir.no/eksamen-og-prover/eksamen/"
      style={{ margin: 'var(--ds-size-2) 0' }}
    >
      <span>Info om eksamen</span>
      <ExternalLinkIcon aria-hidden />
    </Link>
  );
};
