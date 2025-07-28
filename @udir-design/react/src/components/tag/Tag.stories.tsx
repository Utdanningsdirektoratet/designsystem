import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, TagProps } from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--ds-size-4)',
    },
  },
  tags: ['beta'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Preview: Story = {
  args: {
    children: 'New',
  },
};

const sizes: TagProps['data-size'][] = ['sm', 'md', 'lg'];
export const Sizes: Story = {
  render: (args) => (
    <>
      {sizes.map((size) => (
        <Tag key={size} data-size={size} {...args}>
          {size}
        </Tag>
      ))}
    </>
  ),
};

const colorVariants = ['neutral', 'success', 'warning', 'danger', 'info'];

export const Colors: Story = {
  render: (args) => (
    <>
      {colorVariants.map((color) => (
        <Tag key={color} data-color={color as TagProps['data-color']} {...args}>
          {color}
        </Tag>
      ))}
    </>
  ),
};
