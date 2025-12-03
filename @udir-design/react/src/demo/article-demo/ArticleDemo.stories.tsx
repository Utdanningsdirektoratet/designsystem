import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { demoParameters } from '../demoParameters';
import { ArticleDemo } from './ArticleDemo';

const meta = preview.meta({
  title: 'demo/Article Demo',
  component: ArticleDemo,
  decorators: [withScrollHashBehavior],
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
      details: 'Eksempelet er hentet fra udir.no',
    },
  },
});

export const ArticleStory = meta.story({
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return <ArticleDemo {...args} />;
  },
});
