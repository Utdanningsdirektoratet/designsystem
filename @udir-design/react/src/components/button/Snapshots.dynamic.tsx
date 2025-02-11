////////////////////////////////////
// THIS FILE IS CURRENTLY NOT IN USE
// It is kept here so we can re-use some of the logic to generate a single
// variant/state-story in the future, instead of using code generation.
////////////////////////////////////
import type { StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Preview } from './Button.stories';
import { createActionStateStories } from '../../../.storybook/utils/createActionStateStories';
import type { GeneratorMeta } from '@internal/dynamic-csf';

type Story = StoryObj<typeof Button>;

/**
 * Examples of the Button component with all possible combinations of `variant` and `color`
 *
 * These are mainly used for automatic testing.
 */
const meta: GeneratorMeta<typeof Button, Story> = {
  component: Button,
  componentPath: './Button.tsx',
  baseStory: Preview,
  variantProps: ['variant', 'color'],
  deriveStories: createActionStateStories,
};
export default meta;
