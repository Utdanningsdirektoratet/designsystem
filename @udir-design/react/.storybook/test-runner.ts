import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';
import type {} from 'vitest/globals';

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */

const config: TestRunnerConfig = {
  tags: {
    exclude: ['pseudo-state'],
  },
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    // For some reason, story-level tags don't seem to be included in index.json.
    // Fix that by looking up the tags in the storyContext.
    if (storyContext.tags.some((x) => x === 'pseudo-state')) {
      return;
    }
    /*
     * Accessibility testing
     */
    await checkA11y(
      page,
      '#storybook-root',
      {
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      },
      false,
      'v2'
    );

    /*
     * Snapshot testing
     */
    // The #storybook-root element wraps the story. We might also have added a decorator
    // to e.g. wrap the component in some spacing to account for outlines, but we don't
    // want to include the decorator in the snapshot
    const decorator = page.locator('.storybook-decorator');
    const storybookRoot = page.locator('#storybook-root');

    const innerHTML = await decorator.or(storybookRoot).last().innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};

export default config;
