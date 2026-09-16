import './demoSizing.css';
import { expect, userEvent, within } from 'storybook/test';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { FormDemo } from '../../demo-pages/form-demo/FormDemo';
import { demoParameters } from './demoParameters';
import type { DemoProps } from './demoProps';

const meta = preview.meta({
  title: 'demo/Form Demo',
  component: FormDemo as React.FC<DemoProps>,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      margin: '0 1rem',
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-role',
            enabled: true,
            // Exclude the combobox element from this check because of Suggestion
            // TODO: this selector should be removed after https://github.com/dequelabs/axe-core/issues/4672 have propagated to @storybook/addon-a11y.
            selector: ':not([role="combobox"])',
          },
        ],
      },
    },
  },
});

export const FormStory = meta.story({
  args: {
    'data-color-scheme': 'light',
  },
  decorators: [withScrollHashBehavior],
  render(args) {
    return <FormDemo {...args} />;
  },
});

export const FormPage2 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'project',
  },
});

export const FormPage3 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'documentation',
  },
});

/**
 * A file the user could not attach stays in the list, survives a visit to
 * another page, and stops the form from being sent.
 */
export const FormPage3WithFileError = FormPage3.extend({
  parameters: {
    // The interactions leave the page in a state the visual snapshot should not
    // be taken from; the assertions below are what this story is for.
    chromatic: { disableSnapshot: true },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await step('A file that is turned away stays in the list', async () => {
      // Over the 25 MB limit the page sets. A file of the wrong type would be
      // filtered out by `upload` before it reached the input.
      await userEvent.upload(
        input,
        new File([new Uint8Array(26_000_000)], 'notat.pdf', {
          type: 'application/pdf',
        }),
      );

      await expect(canvas.getByText('notat.pdf')).toBeInTheDocument();
      await expect(canvas.getByText('Filen er for stor')).toBeInTheDocument();
    });

    // The demo renders a navigation for wide screens and one for narrow, so
    // each step label appears more than once.
    const goTo = (step: string) =>
      userEvent.click(canvas.getAllByRole('button', { name: step })[0]);

    await step('It is still there after visiting another page', async () => {
      // The page unmounts, so the list only survives because the form holds it.
      await goTo('Prosjektet');
      await expect(canvas.queryByText('notat.pdf')).not.toBeInTheDocument();

      await goTo('Dokumentasjon');
      await expect(canvas.getByText('notat.pdf')).toBeInTheDocument();
    });

    await step('It stops the form from being sent', async () => {
      await goTo('Innsending');
      await userEvent.click(
        canvas.getAllByRole('button', { name: 'Send inn skjema' })[0],
      );

      // Validation knows about it, so it reaches the error summary too.
      await expect(
        canvas.getAllByText(
          'Noen av vedleggene har feil. Feilen står på vedlegget det gjelder.',
        ).length,
      ).toBeGreaterThan(0);
    });
  },
});

export const FormPage4 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'deliver',
  },
});

export const FormPage5 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'confirmation',
  },
});
