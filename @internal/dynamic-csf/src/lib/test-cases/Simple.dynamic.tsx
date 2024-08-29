import type { StoryObj } from '@storybook/react';
import { Button } from './Button';
import { GeneratorMeta } from '../types';

type Story = StoryObj<typeof Button>;

const _Button: Story = { args: { children: 'Button' } };

/**
 * This metadata JSDoc should still be present in the output
 */
const meta: GeneratorMeta<typeof Button, Story> = {
  component: Button,
  componentPath: './Button.tsx',
  baseStory: _Button,
  variantProps: ['variant', 'fullWidth'],
  tags: ['snapshot'],
};
export default meta;
