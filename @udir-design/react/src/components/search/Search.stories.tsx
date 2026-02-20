import { useDebounceCallback } from '@digdir/designsystemet-react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { assertExists } from '../../utilities/helpers/assertExists';
import { Chip } from '../chip/Chip';
import { Divider } from '../divider/Divider';
import { Field } from '../field/Field';
import { Skeleton } from '../skeleton/Skeleton';
import { Spinner } from '../spinner/Spinner';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Search } from './Search';

const meta = preview.meta({
  component: Search,
  tags: ['beta', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
  },
});

const onSubmit = fn<React.SubmitEventHandler<HTMLFormElement>>((e) => {
  e.preventDefault();
});

export const Preview = meta.story({
  render: (args) => (
    <form onSubmit={onSubmit}>
      <Search {...args}>
        <Search.Input aria-label="Søk" />
        <Search.Clear />
        <Search.Button />
      </Search>
    </form>
  ),
  play: async ({ canvasElement, step }) => {
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
      expect(onSubmit).not.toHaveBeenCalled();
      expect(input).toHaveValue('');
    });

    await step('Search button is rendered and clickable', async () => {
      const searchButton = assertExists(
        canvasElement.querySelector('button[type="submit"]'),
        'Search button not found',
      );
      await userEvent.click(searchButton);
      expect(onSubmit).toHaveBeenCalled();
    });

    await userEvent.keyboard('{Tab}');
  },
});

export const Controlled = meta.story({
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

    const handleSubmit = (e: React.SubmitEvent) => {
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
            <div style={{ margin: 'var(--ds-size-2) 0' }}>
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
            </div>
          </>
        )}
      </>
    );
  },
});

export const Variants = meta.story({
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
});

export const WithLabel = meta.story({
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
});

export const Form = meta.story({
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
});

export const LiveSearch = meta.story({
  parameters: {
    customStyles: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-size-2)',
    },
    docs: { source: { type: 'code' } },
  },
  render(args) {
    const [value, setValue] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
    const setSearchValueDebounced = useDebounceCallback(setSearchValue, 500);

    return (
      <>
        <Search {...args}>
          <Search.Input
            aria-label="Søk"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              setValue(newValue);
              // Don't search while typing
              setSearchValue('');
              // Search after stopped typing
              setSearchValueDebounced(newValue);
            }}
          />
          <Search.Clear />
        </Search>
        {searchValue !== '' && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-size-1)',
              alignItems: 'center',
            }}
          >
            <Spinner aria-hidden data-size="xs" />
            <span>Søker etter: {searchValue}</span>
          </div>
        )}
      </>
    );
  },
});
