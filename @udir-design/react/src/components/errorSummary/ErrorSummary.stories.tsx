import { useState } from 'react';
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
    customStyles: {
      display: 'grid',
      gap: 'var(--ds-size-4)',
    },
  },
  render: (args) => {
    const [firstName, setFirstName] = useState('');
    const [telephone, setTelephone] = useState('');

    const firstNameError =
      firstName.trim().length < 2 ? 'Fornavn må være minst 2 tegn' : '';
    const telephoneError = !/^\d{8,}$/.test(telephone.trim())
      ? 'Telefonnummer må ha minst 8 siffer'
      : '';

    const hasErrors = Boolean(firstNameError || telephoneError);

    return (
      <>
        <Textfield
          label="Fornavn"
          id="fornavn"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={firstNameError || undefined}
        />

        <Textfield
          label="Telefon"
          id="telefon"
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          error={telephoneError || undefined}
        />

        {hasErrors && (
          <ErrorSummary {...args}>
            <ErrorSummary.Heading>
              For å gå videre må du rette opp følgende feil:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {firstNameError && (
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#fornavn">
                    {firstNameError}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              )}
              {telephoneError && (
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#telefon">
                    {telephoneError}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              )}
            </ErrorSummary.List>
          </ErrorSummary>
        )}
      </>
    );
  },
};

export const ShowHide: Story = {
  render(args) {
    const [show, setShow] = useState(false);
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
            {show ? 'Skjul feilmelding' : 'Send inn skjema'}
          </Button>
        </div>
        {show && (
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
                  Telefonnummer ma ha minst 8 siffer
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
    const errorSummary = canvas.getByRole('alert');
    await expect(errorSummary).toBeVisible();
  },
};
