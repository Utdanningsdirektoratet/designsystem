import preview from '.storybook/preview';
import { demoParameters } from '../demoParameters';
import { DemoPage } from './DemoPage';

const meta = preview.meta({
  title: 'demo/Page Demo',
  component: DemoPage,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'digdir',
    },
  },
});

export const PageStory = meta.story({
  args: {
    'data-color-scheme': 'light',
  },
});
