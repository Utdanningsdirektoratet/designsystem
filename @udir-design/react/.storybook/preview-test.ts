import type { StoryContext } from '@storybook/react-vite';
import type { ExpectStatic } from 'vitest';

// Conditionally import vitest, otherwise it will crash while running Storybook regularly
let expect: ExpectStatic | undefined;
(async function importExpectInTestMode() {
  if (import.meta.env.MODE !== 'test') {
    return;
  }
  expect = (await import('vitest')).expect;
})();

// These used to be defined in vitest.setup.ts, but with Storybook 10 CSF factories that no longer works
export const testLifecycleHooks =
  import.meta.env.MODE !== 'test'
    ? {}
    : {
        async beforeEach(storyContext: StoryContext) {
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
          if (!expect) {
            throw new Error('expect function not imported');
          }
          const canvasElement = storyContext.canvasElement as HTMLElement;
          const decorators = canvasElement.querySelectorAll(
            '[data-storybook-decorator]',
          );
          const innerDecorator = Array.from(decorators).at(
            decorators.length - 1,
          );
          const html = innerDecorator?.innerHTML || canvasElement.innerHTML;
          expect(html).toMatchSnapshot();

          storyContext.reporting.addReport({
            type: 'snapshot',
            status: 'passed',
            result: 'Story matched baseline snapshot',
          });
        },
      };
