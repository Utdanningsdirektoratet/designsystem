import preview from '.storybook/preview';
import { Link } from 'src/components/link';

const meta = preview.meta({
  title: 'patterns/Merking av lenker',
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: (
        <>
          Tekst og eksempler er tilpasset Udir.{' '}
          <Link href="https://designsystemet.no/no/patterns/external-links">
            Se Digdirs mønster om merking av lenker
          </Link>
          .
        </>
      ),
    },
  },
});

export const Metadata = meta.story({
  tags: ['!dev', '!test'],
  render: () => <></>,
});
