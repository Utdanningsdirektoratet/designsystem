import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { WithInertInitialRender } from '.storybook/decorators/WithInertInitialRender';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { advancedCodeDocs } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button';
import { Textfield } from 'src/components/textfield';
import { ErrorSummary } from './ErrorSummary';
import { ErrorSummary as FakeErrorSummary } from './docs/FakeErrorSummary';
import { ErrorSummaryHeading } from './docs/FakeErrorSummaryHeading';
import { ErrorSummaryItem } from './docs/FakeErrorSummaryItem';
import { ErrorSummaryLink } from './docs/FakeErrorSummaryLink';
import { ErrorSummaryList } from './docs/FakeErrorSummaryList';

const meta = preview.meta({
  component: FakeErrorSummary,
  subcomponents: {
    'ErrorSummary.Heading': ErrorSummaryHeading,
    'ErrorSummary.Item': ErrorSummaryItem,
    'ErrorSummary.Link': ErrorSummaryLink,
    'ErrorSummary.List': ErrorSummaryList,
  },
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
    layout: 'centered',
  },
  decorators: [withScrollHashBehavior],
});

export const Preview = meta.story({
  decorators: WithInertInitialRender,
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
});

export const WithForm = meta.story({
  decorators: WithInertInitialRender,
  parameters: {
    customStyles: {
      display: 'grid',
      gap: 'var(--ds-size-4)',
      width: 'min(25rem, calc(100vw - var(--ds-size-8)))',
      maxWidth: '100%',
    },
  },
  render: (args) => {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('Abc');
    const firstNameError =
      firstName.trim().length < 2 ? 'Fornavn må være minst 2 tegn' : undefined;
    const phoneError = !/^\d+$/.test(phone.replaceAll(' ', ''))
      ? 'Telefonnummer kan kun inneholde siffer'
      : undefined;

    return (
      <>
        <Textfield
          label="Fornavn"
          id="fornavn"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          error={firstNameError}
        />

        <Textfield
          label="Telefon"
          id="telefon"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={phoneError}
        />

        {firstNameError || phoneError ? (
          <ErrorSummary {...args}>
            <ErrorSummary.Heading>
              For å gå videre må du rette opp følgende feil:
            </ErrorSummary.Heading>
            <ErrorSummary.List>
              {firstNameError ? (
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#fornavn">
                    {firstNameError}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              ) : null}
              {phoneError ? (
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#telefon">
                    {phoneError}
                  </ErrorSummary.Link>
                </ErrorSummary.Item>
              ) : null}
            </ErrorSummary.List>
          </ErrorSummary>
        ) : null}
      </>
    );
  },
});

export const ShowHide = meta.story({
  parameters: {
    docs: advancedCodeDocs,
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      placeItems: 'center',
      gap: 'var(--ds-size-4)',
    },
  },
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>
          {show ? 'Skjul feilmelding' : 'Send inn skjema'}
        </Button>
        {show && (
          <ErrorSummary data-testid="show-hide">
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
    await waitFor(() => expect(errorSummary).toHaveFocus());
  },
});
