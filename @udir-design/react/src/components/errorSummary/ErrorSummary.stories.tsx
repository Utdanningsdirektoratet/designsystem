import {
  ErrorSummary,
  ErrorSummaryHeading,
  ErrorSummaryItem,
  ErrorSummaryList,
} from './ErrorSummary';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorSummary> = {
  component: ErrorSummary,
};

export default meta;
type Story = StoryObj<typeof ErrorSummary>;

export const Preview: Story = {
  render: (args) => (
    <ErrorSummary {...args}>
      <ErrorSummaryHeading>
        For å gå videre må du rette opp følgende feil:
      </ErrorSummaryHeading>
      <ErrorSummaryList>
        <ErrorSummaryItem href="#">
          Fødselsdato kan ikke være etter år 2005
        </ErrorSummaryItem>
        <ErrorSummaryItem href="#">
          Telefonnummer kan kun inneholde siffer
        </ErrorSummaryItem>
        <ErrorSummaryItem href="#">E-post må være gyldig</ErrorSummaryItem>
      </ErrorSummaryList>
    </ErrorSummary>
  ),
};
