import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Search } from './Search';
import { useState } from 'react';
import { Button, Divider, Field, Label, Paragraph } from '../alpha';
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
        'Clear button not found',
      );
      await userEvent.click(clearButton);
      expect(input).toHaveValue('');
    });

    await step('Search button is rendered and clickable', async () => {
      const searchButton = assertExists(
        canvasElement.querySelector('button[type="submit"]'),
        'Search button not found',
      );
      await userEvent.click(searchButton);
      expect(args.onClick).toHaveBeenCalled();
    });
    await userEvent.keyboard('{Tab}');
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    return (
      <>
        <Search>
          <Search.Input
            aria-label="Søk"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Search.Clear />
          <Search.Button />
        </Search>

        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Du har skrevet inn: {value}
        </Paragraph>
        <Button onClick={() => setValue('Pizza')}>Jeg vil ha Pizza</Button>
      </>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div>
      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
      </Search>

      <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
        <Search.Button />
      </Search>

      <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

      <Search>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
        <Search.Button variant="secondary" />
      </Search>
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args, context) => (
    <Field>
      <Label>Søk etter katter</Label>
      <Search {...args}>
        <Search.Input id={context.id} name="cat-search" />
        <Search.Clear />
        <Search.Button />
      </Search>
    </Field>
  ),
};

export const Form: Story = {
  render: function Render() {
    const [value, setValue] = useState<string>();
    const [submittedValue, setSubmittedValue] = useState<string>();

    return (
      <>
        <form
          onSubmit={(e) => {
            // Prevent navigation from Storybook
            e.preventDefault();
            setSubmittedValue(value);
          }}
        >
          <Search>
            <Search.Input
              aria-label="Søk"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Search.Clear />
            <Search.Button />
          </Search>
        </form>

        <Paragraph data-size="md" style={{ marginTop: 'var(--ds-size-2)' }}>
          Submitted value: {submittedValue}
        </Paragraph>
      </>
    );
  },
};
