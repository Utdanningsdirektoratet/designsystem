import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Preview: Story = {
  args: {
    href: 'https://www.udir.no/',
    children: 'Gå til udir.no',
  },
};
