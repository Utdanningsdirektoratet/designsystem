import type { Meta, StoryObj } from '@storybook/react-vite';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { demoParameters } from '../demoParameters';
import { ArticleDemo } from './ArticleDemo';

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
    'data-color-scheme': 'auto',
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
};
