import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Search } from './Search';
import { useState } from 'react';
import {
  Chip,
  Divider,
  Field,
  Label,
  Paragraph,
  Skeleton,
} from '@udir-design/react/alpha';
import { assertExists } from '../../utilities/helpers/assertExists';

const meta: Meta<typeof Search> = {
  component: Search,
  tags: ['beta'],
  parameters: {
    layout: 'centered',
  },
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
  parameters: {
    customStyles: {
      minHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
  },
  render() {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSearchTerm(inputValue);
    };

    return (
      <>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-size-2)',
          }}
        >
          <Search>
            <Search.Input
              id="search-input-controlled"
              aria-label="Søk"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Search.Clear />
            <Search.Button type="submit" />
          </Search>
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-2)',
              alignItems: 'center',
            }}
          >
            <Paragraph data-size="sm">Hurtigsøk:</Paragraph>
            <Chip.Button
              onClick={() => {
                setInputValue('Læreplaner');
                setSearchTerm('Læreplaner');
              }}
            >
              Læreplaner
            </Chip.Button>
            <Chip.Button
              onClick={() => {
                setInputValue('Skole');
                setSearchTerm('Skole');
              }}
            >
              Skole
            </Chip.Button>
            <Chip.Button
              onClick={() => {
                setInputValue('Eksamen');
                setSearchTerm('Eksamen');
              }}
            >
              Eksamen
            </Chip.Button>
          </div>
        </form>
        {searchTerm && (
          <>
            <Divider style={{ marginTop: 'var(--ds-size-4)' }} />
            <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
              Søker etter: {searchTerm}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--ds-size-2)',
                  marginTop: 'var(--ds-size-4)',
                }}
              >
                <Skeleton variant="rectangle" height="150px" />
                <Skeleton variant="rectangle" width="200px" />
                <Skeleton variant="rectangle" />
                <Skeleton variant="rectangle" />
                <Skeleton variant="rectangle" />
                <Skeleton variant="rectangle" width="50px" />
              </div>
            </Paragraph>
          </>
        )}
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
      <Label>Søk i læreplaner</Label>
      <Search {...args}>
        <Search.Input id={context.id} name="cat-search" />
        <Search.Clear />
        <Search.Button />
      </Search>
    </Field>
  ),
};

export const Form: Story = {
  render() {
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
        {submittedValue && (
          <Paragraph data-size="md" style={{ marginTop: 'var(--ds-size-2)' }}>
            Søkeord: {submittedValue}
          </Paragraph>
        )}
      </>
    );
  },
};
