import type { Meta, StoryObj } from '@storybook/react-vite';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { demoParameters } from './demoParameters';
import { ArticleDemo } from './pages/article-demo/ArticleDemo';
import { FooterDemo } from './pages/footer';
import { HeaderDemo } from './pages/header';

const meta: Meta<typeof ArticleDemo> = {
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
};

export default meta;
type Story = StoryObj<typeof ArticleDemo>;

export const ArticleStory: Story = {
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return (
      <>
        <HeaderDemo applicationName="Artikkeldemo" />
        <ArticleDemo {...args} />
        <FooterDemo />
      </>
    );
  },
};
