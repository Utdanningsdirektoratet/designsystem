import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';
import { expect, fn, userEvent, within } from '@storybook/test';
import { assertExists } from '../../utilities/helpers/assertExists';

const meta: Meta<typeof Search> = {
  component: Search,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Preview: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <Search {...args}>
      <Search.Input aria-label="Søk" />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox');

    await step('Search input is rendered', async () => {
      expect(input).toBeInTheDocument();
    });

    await step('User can type in the search input', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, 'Test search');
      expect(input).toHaveValue('Test search');
    });

    await step('Clicking clear button clears the search input', async () => {
      const clearButton = assertExists(
        canvasElement.querySelector('button[type="reset"]'),
        'Clear button not found'
      );
      await userEvent.click(clearButton);
      expect(input).toHaveValue('');
    });

    await step('Search button is rendered and clickable', async () => {
      const searchButton = assertExists(
        canvasElement.querySelector('button[type="submit"]'),
        'Search button not found'
      );
      await userEvent.click(searchButton);
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};
