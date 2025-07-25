import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, TagProps } from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['alpha'],
  parameters: {
    customStyles: { justifyContent: 'start' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Preview: Story = {
  args: {
    children: 'Ny',
  },
};

const sizes: TagProps['data-size'][] = ['sm', 'md', 'lg'];
export const Sizes: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-size-2)',
        }}
      >
        {sizes.map((size) => (
          <Tag key={size} data-size={size} {...args}>
            {size}
          </Tag>
        ))}
      </div>
    );
  },
};

const colors: TagProps['data-color'][] = [
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
  'accent',
  'support1',
  'support2',
];

export const Colors: Story = {
  render: (args) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--ds-size-2)',
          height: '100%',
          width: '100%',
        }}
      >
        {colors.map((color) => (
          <Tag key={color} data-color={color} {...args}>
            {color}
          </Tag>
        ))}
      </div>
    );
  },
};
