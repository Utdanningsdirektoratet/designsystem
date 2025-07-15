import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { beforeAll, expect } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
  {
    async afterEach(storyContext) {
      const canvasElement = storyContext.canvasElement as HTMLElement;
      const decorators = canvasElement.querySelectorAll(
        '[data-storybook-decorator]',
      );
      const innerDecorator = Array.from(decorators).at(decorators.length - 1);
      const html = innerDecorator?.innerHTML || canvasElement.innerHTML;
      expect(html).toMatchSnapshot();
    },
  },
]);

beforeAll(project.beforeAll);
