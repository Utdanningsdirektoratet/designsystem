import { Heading } from 'src/components/typography/heading';
import { Paragraph } from 'src/components/typography/paragraph';
import type { PageProps } from '../FormDemo';

export const DeliverPage = ({ isSubmitSuccessful }: PageProps) => {
  return (
    <>
      <Heading level={2}>Innsending</Heading>
      <Paragraph>
        {isSubmitSuccessful
          ? 'Du har allerede sendt inn søknaden.'
          : 'Send inn søknaden.'}
      </Paragraph>
    </>
  );
};
