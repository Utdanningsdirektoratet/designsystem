import type { StoryObj } from '@storybook/react';
import type {} from '@storybook/types';
import { userEvent, within, expect } from '@storybook/test';

declare module '@storybook/types' {
  type PseudoValue = boolean | string | string[];
  interface Parameters {
    pseudo?: {
      rootSelector?: string;
      hover?: PseudoValue;
      active?: PseudoValue;
      focus?: PseudoValue;
    };
  }
}

export function createActionStateStories<Story extends StoryObj>(story: Story) {
  const hovered: Story = {
    ...story,
    parameters: {
      pseudo: {
        hover: true,
      },
    },
  };

  const pressed: Story = {
    ...story,
    parameters: {
      pseudo: {
        active: true,
      },
    },
  };

  const focused: Story = {
    ...story,
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole('button');
      await userEvent.tab();
      expect(button).toHaveFocus();
    },
  };

  const disabled: Story = {
    ...story,
    args: {
      ...story.args,
      disabled: true,
    },
  };

  return {
    hovered,
    pressed,
    focused,
    disabled,
  } satisfies Record<string, Story>;
}
