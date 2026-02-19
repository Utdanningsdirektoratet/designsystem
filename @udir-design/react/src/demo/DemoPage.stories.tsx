import './demoSizing.css';
import preview from '.storybook/preview';
import { DemoPage } from '../../demo-pages/page-demo/DemoPage';
import { demoParameters } from './demoParameters';
import type { DemoProps } from './demoProps';

const meta = preview.meta({
  title: 'demo/Page Demo',
  component: DemoPage as React.FC<DemoProps>,
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
