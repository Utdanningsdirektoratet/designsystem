import { useEffect, useRef, useState } from 'react';
import { Button, Textfield } from '@udir-design/react/beta';
import { ErrorSummary } from './ErrorSummary';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { formatReactSource } from '.storybook/utils/sourceTransformers';

const meta: Meta<typeof ErrorSummary> = {
  component: ErrorSummary,
  tags: ['beta'],
  parameters: {
    layout: 'centered',
  },
  decorators: [withScrollHashBehavior],
};

export default meta;

type Story = StoryObj<typeof ErrorSummary>;

export const Preview: Story = {
  render: (args) => (
    <ErrorSummary {...args}>
      <ErrorSummary.Heading>
        For å gå videre må du rette opp følgende feil:
      </ErrorSummary.Heading>
      <ErrorSummary.List>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">
            Fødselsdato kan ikke være etter år 2005
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">
            Telefonnummer kan kun inneholde siffer
          </ErrorSummary.Link>
        </ErrorSummary.Item>
        <ErrorSummary.Item>
          <ErrorSummary.Link href="#">E-post må være gyldig</ErrorSummary.Link>
        </ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary>
  ),
};

export const WithForm: Story = {
  parameters: {
    customStyles: { display: 'grid', gap: 'var(--ds-size-4)' },
  },
  render: (args) => (
    <>
      <Textfield
        label="Fornavn"
        id="fornavn"
        error="Fornavn må være minst 2 tegn"
      />

      <Textfield
        label="Telefon"
        id="telefon"
        type="tel"
        error="Telefonnummer kan kun inneholde siffer"
      />

      <ErrorSummary {...args}>
        <ErrorSummary.Heading>
          For å gå videre må du rette opp følgende feil:
        </ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#fornavn">
              Fornavn må være minst 2 tegn
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#telefon">
              Telefonnummer kan kun inneholde siffer
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    </>
  ),
};

export const ShowHide: StoryFn<typeof ErrorSummary> = (args) => {
  const [show, setShow] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (show) {
      summaryRef.current?.focus();
    }
  }, [show]);

  return (
    <>
      <Button onClick={() => setShow(!show)}>
        {show ? 'Skjul feilmelding' : 'Send inn skjema'}
      </Button>
      {show && (
        <ErrorSummary data-testid="show-hide" ref={summaryRef}>
          <ErrorSummary.Heading>
            For å gå videre må du rette opp følgende feil:
          </ErrorSummary.Heading>
          <ErrorSummary.List>
            <ErrorSummary.Item>
              <ErrorSummary.Link href="#fornavn">
                Fornavn må være minst 2 tegn
              </ErrorSummary.Link>
            </ErrorSummary.Item>
            <ErrorSummary.Item>
              <ErrorSummary.Link href="#telefon">
                Telefonnummer kan kun inneholde siffer
              </ErrorSummary.Link>
            </ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary>
      )}
    </>
  );
};
ShowHide.play = async (ctx) => {
  const canvas = within(ctx.canvasElement);
  const button = canvas.getByRole('button');
  await userEvent.click(button);
  const errorSummary = canvas.getByTestId('show-hide');
  await expect(errorSummary).toBeVisible();
  await expect(errorSummary).toHaveFocus();
};
ShowHide.parameters = {
  docs: { source: { type: 'code', transform: formatReactSource } },
  customStyles: {
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    gap: 'var(--ds-size-4)',
  },
};
