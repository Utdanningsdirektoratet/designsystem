import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, waitFor, within } from 'storybook/test';
import { type ChangeEvent, useState } from 'react';
import { Suggestion, type SuggestionValues } from './Suggestion';
import {
  Button,
  Divider,
  Field,
  Label,
  Paragraph,
  Spinner,
} from '@udir-design/react/alpha';
import { useDebounceCallback } from '@digdir/designsystemet-react';

const meta: Meta<typeof Suggestion> = {
  component: Suggestion,
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
    customStyles: {
      /* add height by default */
      height: '320px',
    },
    a11y: {
      // TODO: these rules should be enabled after figuring out why they occur.
      // for some reason it says `aria-expanded` is not allowed
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: false,
          },
          /* It does not like role="combobox" either */
          {
            id: 'aria-allowed-role',
            enabled: false,
          },
        ],
      },
    },
  },
  play: async (ctx) => {
    const storyRoot = ctx.canvasElement;
    // Refactored out the play function for easier reuse in the InModal story
    await testSuggestion(storyRoot);
  },
};

export default meta;

type Story = StoryObj<typeof Suggestion>;

async function testSuggestion(el: HTMLElement) {
  /* When in test mode, open suggestion by focusing input */
  const input = await waitFor(() => within(el).getByRole('combobox'));
  await userEvent.click(input);
}

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
];

export const Preview: Story = {
  render(args, ctx) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion {...args}>
          <Suggestion.Input id={ctx.id} />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Tomt</Suggestion.Empty>
            {DATA_PLACES.map((place) => (
              <Suggestion.Option key={place} label={place} value={place}>
                {place}
                <div>Kommune</div>
              </Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};

export const Multiple: Story = {
  ...Preview,
  args: { multiple: true },
};

export const Controlled: Story = {
  render(args, ctx) {
    const [value, setValue] = useState<string[]>(['Oslo']);

    return (
      <>
        <Field>
          <Label>Velg destinasjoner</Label>
          <Suggestion
            {...args}
            selected={value}
            onSelectedChange={(items) =>
              setValue(items.map((item) => item.value))
            }
          >
            <Suggestion.Input id={ctx.id} />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty>Tomt</Suggestion.Empty>
              {DATA_PLACES.map((place) => (
                <Suggestion.Option key={place} label={place} value={place}>
                  {place}
                  <div>Kommune</div>
                </Suggestion.Option>
              ))}
            </Suggestion.List>
          </Suggestion>
        </Field>
        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Valgte reisemål: {value.join(', ')}
        </Paragraph>

        <Button
          onClick={() => {
            setValue(['Sogndal']);
          }}
        >
          Sett reisemål til Sogndal
        </Button>
      </>
    );
  },
};

export const ControlledMultiple: Story = {
  render(args, ctx) {
    const [value, setValue] = useState<string[]>(['Oslo']);

    return (
      <>
        <Field>
          <Label>Velg destinasjoner</Label>
          <Suggestion
            {...args}
            multiple
            selected={value}
            onSelectedChange={(items) =>
              setValue(items.map((item) => item.value))
            }
          >
            <Suggestion.Input id={ctx.id} />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty>Tomt</Suggestion.Empty>
              {DATA_PLACES.map((place) => (
                <Suggestion.Option key={place} label={place} value={place}>
                  {place}
                  <div>Kommune</div>
                </Suggestion.Option>
              ))}
            </Suggestion.List>
          </Suggestion>
        </Field>
        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Valgte reisemål: {value.join(', ')}
        </Paragraph>

        <Button
          onClick={() => {
            setValue(['Sogndal', 'Stavanger']);
          }}
        >
          Sett reisemål til Sogndal, Stavanger
        </Button>
      </>
    );
  },
};

export const DefaultValue: Story = {
  render(args, ctx) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion {...args} defaultValue={['Sogndal']}>
          <Suggestion.Input id={ctx.id} />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Tomt</Suggestion.Empty>
            {DATA_PLACES.map((place) => (
              <Suggestion.Option key={place}>{place}</Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};

export const CustomFilterAlt1: Story = {
  render(args, ctx) {
    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <Suggestion
          {...args}
          filter={({ index, input }) =>
            !input.value || index === Number(input.value) - 1
          }
        >
          <Suggestion.Input id={ctx.id} />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Tomt</Suggestion.Empty>
            {DATA_PLACES.map((label) => (
              <Suggestion.Option key={label} value={label.toLowerCase()}>
                {label}
              </Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};

export const CustomFilterAlt2: Story = {
  render(args, ctx) {
    const [value, setValue] = useState('');

    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <Suggestion {...args} filter={false}>
          <Suggestion.Input
            id={ctx.id}
            onInput={({ currentTarget }) => setValue(currentTarget.value)}
          />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Tomt</Suggestion.Empty>
            {DATA_PLACES.filter(
              (_, index) => !value || index === Number(value) - 1,
            ).map((label) => (
              <Suggestion.Option key={label}>{label}</Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};

export const AlwaysShowAll: Story = {
  render(args, ctx) {
    const [value, setValue] = useState<SuggestionValues>('Sogndal');

    return (
      <Field>
        <Label>Viser alle options også når valgt</Label>
        <Suggestion
          {...args}
          selected={value}
          filter={false}
          onSelectedChange={(values) => setValue(values)}
        >
          <Suggestion.Input id={ctx.id} />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty>Tomt</Suggestion.Empty>
            {DATA_PLACES.map((place) => (
              <Suggestion.Option key={place}>{place}</Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};

export const FetchExternal: Story = {
  render(args, ctx) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<string[] | null>(null);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      const value = encodeURIComponent(event.target.value.trim());
      setValue(event.target.value);
      setOptions(null); // Clear options

      if (!value) return;

      debounced(value);
    };

    const apiCall = async (value: string) => {
      const api = `https://restcountries.com/v2/name/${value}?fields=name`;
      const countries = await (await fetch(api)).json();
      setOptions(
        Array.isArray(countries) ? countries.map(({ name }) => name) : [],
      );
    };

    const debounced = useDebounceCallback(apiCall, 500);

    return (
      <Field lang="en">
        <Label>Search for countries (in english)</Label>
        <Suggestion {...args} filter={false}>
          <Suggestion.Input id={ctx.id} onInput={handleInput} />
          <Suggestion.Clear />
          <Suggestion.List singular="%d country" plural="%d countries">
            {value ? (
              <Suggestion.Empty>
                {options ? (
                  'Ingen treff'
                ) : (
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Spinner aria-hidden="true" data-size="sm" /> Laster...
                  </span>
                )}
              </Suggestion.Empty>
            ) : null}
            {options?.map((option) => (
              <Suggestion.Option key={option}>{option}</Suggestion.Option>
            ))}
          </Suggestion.List>
        </Suggestion>
      </Field>
    );
  },
};
