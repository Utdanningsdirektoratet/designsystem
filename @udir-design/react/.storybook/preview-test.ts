import type { StoryContext } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

// These used to be defined in vitest.setup.ts, but with Storybook 10 CSF factories that no longer works
export const testLifecycleHooks = {
  async beforeEach(storyContext: StoryContext) {
    const expect = globalThis.vitestExpect;
    if (!expect) {
      return;
    }
    /*
     * Modify the step function to automatically add the step label as a report when it succeeds
     */
    const { step, reporting } = storyContext;
    storyContext.step = async (label, play) => {
      await step(label, play);
      reporting.addReport({
        type: 'interaction',
        status: 'passed',
        result: label,
      });
    };
  },
  async afterEach(storyContext: StoryContext) {
    const viteExpect = globalThis.vitestExpect;
    if (!viteExpect) {
      return;
    }

    const canvasElement = removeDecorators(storyContext.canvasElement);

    /*
     * In some cases, we have to wait for @digdir/designsystemet-web to do some work
     * before we can take snapshots, otherwise the snapshots are flaky. When relevant
     * for the current story, we check the condition we need to proceed inside of
     * `await waitFor(() => { ... })`
     */

    const labelWithinField = canvasElement.querySelector('ds-field label');
    if (labelWithinField) {
      await waitFor(() => {
        expect(
          labelWithinField,
          'label within ds-field should automatically get a for="..." attribute',
        ).toHaveAttribute('for');
      });
    }

    const fieldWithCheckboxOrRadio = canvasElement.querySelector(
      'ds-field:has(input:is([type="checkbox"], [type="radio"]))',
    );
    if (fieldWithCheckboxOrRadio) {
      await waitFor(() => {
        expect(
          fieldWithCheckboxOrRadio,
          'ds-field with a checkbox or radio should automatically get a data-clickdelegatefor="..." attribute',
        ).toHaveAttribute('data-clickdelegatefor');
      });
    }

    const errorSummary = canvasElement.querySelector('ds-error-summary');
    if (errorSummary) {
      await waitFor(() => {
        expect(
          errorSummary,
          'ds-error-summary should automatically get an accessible name',
        ).toHaveAccessibleName();
      });
    }

    const tab = canvasElement.querySelector('ds-tab');
    if (tab) {
      await waitFor(() => {
        expect(
          tab,
          'ds-tab should automatically get an aria-selected attribute',
        ).toHaveAttribute('aria-selected');
      });
    }

    const tooltip = canvasElement.querySelector('[data-tooltip]');
    if (tooltip) {
      await waitFor(() => {
        expect(tooltip).toHaveAccessibleName();
      });
    }

    const modalTriggerButton = canvasElement.querySelector(
      'button[command="show-modal"]',
    );
    if (modalTriggerButton) {
      await waitFor(() => {
        expect(
          modalTriggerButton,
          'buttons that trigger a modal should have an aria-haspopup="dialog" attribute',
        ).toHaveAttribute('aria-haspopup', 'dialog');
      });
    }

    const inputWithinSuggestion = canvasElement.querySelector(
      'ds-suggestion input',
    );
    if (inputWithinSuggestion) {
      await waitFor(() => {
        expect(
          inputWithinSuggestion.getAttribute('placeholder'),
          'input in ds-suggestion should automatically get a non-empty placeholder',
        ).not.toBeOneOf([null, '']);
      });
    }

    const toggleGroup = canvasElement.querySelector('[data-toggle-group]');
    if (toggleGroup) {
      await waitFor(() => {
        expect(toggleGroup).toHaveAttribute('aria-label');
      });
    }

    const html = canvasElement.innerHTML;
    viteExpect(html).toMatchSnapshot();

    storyContext.reporting.addReport({
      type: 'snapshot',
      status: 'passed',
      result: 'Story matched baseline snapshot',
    });
  },
};

function removeDecorators(canvasElement: HTMLElement) {
  const decorators = canvasElement.querySelectorAll<HTMLElement>(
    '[data-storybook-decorator]',
  );
  const innerDecorator =
    Array.from(decorators).at(decorators.length - 1) ?? canvasElement;
  return innerDecorator;
}
