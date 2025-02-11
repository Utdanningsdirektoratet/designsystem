import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['alpha'],
};
export default meta;
export type Story = StoryObj<typeof Button>;

export const _Button: Story = {
  args: {
    children: 'Action',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    expect(button).toBeTruthy();
    expect(canvas.getByText(args.children as string)).toBeTruthy();
  },
};
