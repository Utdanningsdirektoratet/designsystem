import preview from '.storybook/preview';
import { Heading } from './Heading';

const meta = preview.meta({
  component: Heading,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  argTypes: {
    'data-size': {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
  title: 'Components/Typography/Heading',
});

export const Preview = meta.story({
  args: {
    children: 'Heading',
  },
});
