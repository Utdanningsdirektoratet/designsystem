import type { Meta, StoryObj } from '@storybook/react';
import { React } from './react';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof React> = {
  component: React,
  title: 'React',
};
export default meta;
type Story = StoryObj<typeof React>;

export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to React!/gi)).toBeTruthy();
  },
};
