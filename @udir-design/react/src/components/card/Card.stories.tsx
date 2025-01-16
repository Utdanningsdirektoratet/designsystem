import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardBlock } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Preview: Story = {
  args: {
    children: <CardBlock>Innhold til kort</CardBlock>,
  },
};
