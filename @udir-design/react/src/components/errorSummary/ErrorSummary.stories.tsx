import { useEffect, useRef, useState } from 'react';
import { Button, Textfield } from '@udir-design/react/alpha';
import { ErrorSummary } from './ErrorSummary';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof ErrorSummary> = {
  component: ErrorSummary,
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
  },
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

export const ShowHide: Story = {
  render(args) {
    const [show, setShow] = useState(false);
    const summaryRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (show) {
        summaryRef.current?.focus();
      }
    }, [show]);

    return (
      <>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            marginBottom: 'var(--ds-size-4)',
          }}
        >
          <Button onClick={() => setShow(!show)}>
            {show ? 'Skjul' : 'Send inn skjema'}
          </Button>
        </div>
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
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    const errorSummary = canvas.getByTestId('show-hide');
    await expect(errorSummary).toBeVisible();
    await expect(errorSummary).toHaveFocus();
  },
};
