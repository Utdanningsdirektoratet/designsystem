import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleDemo } from './ArticleDemo';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';

const meta: Meta<typeof ArticleDemo> = {
  title: 'demo/Article Demo',
  component: ArticleDemo,
  decorators: [withScrollHashBehavior],
};

export default meta;
type Story = StoryObj<typeof ArticleDemo>;

export const ArticleStory: Story = {
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
  },
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  render(args) {
    return <ArticleDemo {...args} />;
  },
};
