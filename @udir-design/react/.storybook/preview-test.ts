import type { StoryContext } from '@storybook/react-vite';

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
    const expect = globalThis.vitestExpect;
    if (!expect) {
      return;
    }
    const canvasElement = storyContext.canvasElement as HTMLElement;
    const decorators = canvasElement.querySelectorAll(
      '[data-storybook-decorator]',
    );
    const innerDecorator = Array.from(decorators).at(decorators.length - 1);
    const html = innerDecorator?.innerHTML || canvasElement.innerHTML;
    expect(html).toMatchSnapshot();

    storyContext.reporting.addReport({
      type: 'snapshot',
      status: 'passed',
      result: 'Story matched baseline snapshot',
    });
  },
};
