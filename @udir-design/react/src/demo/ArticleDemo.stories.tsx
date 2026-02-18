import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { demoParameters } from './demoParameters';
import { ArticleDemo } from './pages/article-demo/ArticleDemo';

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
    'data-color-scheme': 'light',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: '800px',
      },
    },
  },
  render(args) {
    return <ArticleDemo {...args} />;
  },
});
