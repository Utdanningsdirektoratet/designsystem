import type { StoryObj } from '@storybook/react-vite';
import type {} from 'storybook/internal/types';
import { expect, userEvent, within } from 'storybook/test';

export function createActionStateStories<Story extends StoryObj>(story: Story) {
  const hovered: Story = {
    ...story,
    tags: [...(story.tags ?? []), 'pseudo-state'],
    parameters: {
      pseudo: {
        hover: true,
      },
    },
  };

  const pressed: Story = {
    ...story,
    tags: [...(story.tags ?? []), 'pseudo-state'],
    parameters: {
      pseudo: {
        active: true,
      },
    },
  };

  const focused: Story = {
    ...story,
    tags: [...(story.tags ?? []), 'pseudo-state'],
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
