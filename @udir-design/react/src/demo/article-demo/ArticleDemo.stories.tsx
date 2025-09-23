import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleDemo } from './ArticleDemo';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { demoParameters } from '../demoParameters';

const meta: Meta<typeof ArticleDemo> = {
  title: 'demo/Article Demo',
  component: ArticleDemo,
  decorators: [withScrollHashBehavior],
  parameters: {
    ...demoParameters,
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
    return <ArticleDemo {...args} />;
  },
};
