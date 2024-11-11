import type { StoryObj } from '@storybook/react';
import { Button } from './Button';
import { _Button } from './Button.stories';
import { createActionStateStories } from '../../.storybook/utils/createActionStateStories';
import { spaceForFocusStyleDecorator } from '../../.storybook/utils/spaceForFocusStyleDecorator';
import type { GeneratorMeta } from '@internal/dynamic-csf';

type Story = StoryObj<typeof Button>;

/**
 * Examples of the Button component with all possible combinations of `variant`, `color` and `size`
 *
 * These are mainly used for automatic testing.
 */
const meta: GeneratorMeta<typeof Button, Story> = {
  component: Button,
  componentPath: './Button.tsx',
  baseStory: _Button,
  variantProps: ['variant', 'color', 'size'],
  deriveStories: createActionStateStories,
  decorators: spaceForFocusStyleDecorator,
};
export default meta;
