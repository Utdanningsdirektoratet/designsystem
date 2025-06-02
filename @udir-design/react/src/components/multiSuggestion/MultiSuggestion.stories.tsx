import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { type ChangeEvent, useState } from 'react';
import {
  MultiSuggestion,
  Button,
  Divider,
  Field,
  Label,
  Paragraph,
  Spinner,
} from '@udir-design/react/alpha';
import { useDebounceCallback } from '@digdir/designsystemet-react';

type Story = StoryObj<typeof MultiSuggestion>;

export default {
  component: MultiSuggestion,
  tags: ['alpha'],
  parameters: {
    layout: 'centered',
    customStyles: {
      /* add height by default */
      minHeight: '500px',
    },
    a11y: {
      // TODO: this rule should be enabled after https://github.com/dequelabs/axe-core/issues/4672 have propagated to @storybook/addon-a11y.
      config: {
        rules: [
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
    await testMultiSuggestion(storyRoot);
  },
} satisfies Meta;

async function testMultiSuggestion(el: HTMLElement) {
  /* When in test mode, open MultiSuggestion by focusing input */
  const input = within(el).getByRole('combobox');
  await userEvent.click(input);
}

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Stavanger',
  'Brønnøysund',
  'Trondheim',
  'Bergen',
];

export const Preview: Story = {
  render: (args, ctx) => {
    return (
      <MultiSuggestion {...args}>
        <MultiSuggestion.Chips />
        <MultiSuggestion.Input id={ctx.id} />
        <MultiSuggestion.Clear />
        <MultiSuggestion.List>
          <MultiSuggestion.Empty>Tomt</MultiSuggestion.Empty>
          {DATA_PLACES.map((place) => (
            <MultiSuggestion.Option key={place} value={place}>
              {place}
              <div>Kommune</div>
            </MultiSuggestion.Option>
          ))}
        </MultiSuggestion.List>
      </MultiSuggestion>
    );
  },
};

export const Controlled: Story = {
  render: (args, ctx) => {
    const [value, setValue] = useState<string[]>(['Oslo']);

    return (
      <>
        <Field>
          <Label>Velg reisemål du vil besøke</Label>
          <MultiSuggestion {...args} value={value} onValueChange={setValue}>
            <MultiSuggestion.Chips
              render={(e) => {
                return e.text;
              }}
            />
            <MultiSuggestion.Input id={ctx.id} />
            <MultiSuggestion.Clear />
            <MultiSuggestion.List>
              <MultiSuggestion.Empty>Tomt</MultiSuggestion.Empty>
              {DATA_PLACES.map((place) => (
                <MultiSuggestion.Option key={place} value={place}>
                  {place}
                  <div>Kommune</div>
                </MultiSuggestion.Option>
              ))}
            </MultiSuggestion.List>
          </MultiSuggestion>
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

export const CustomFilterAlt1: Story = {
  render: (args, ctx) => {
    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <MultiSuggestion
          {...args}
          filter={({ index, input }) => {
            console.log(!input.value || index === Number(input.value) - 1);
            return !input.value || index === Number(input.value) - 1;
          }}
        >
          <MultiSuggestion.Chips />
          <MultiSuggestion.Input id={ctx.id} />
          <MultiSuggestion.Clear />
          <MultiSuggestion.List>
            <MultiSuggestion.Empty>Tomt</MultiSuggestion.Empty>
            {DATA_PLACES.map((text) => (
              <MultiSuggestion.Option key={text} value={text.toLowerCase()}>
                {text}
              </MultiSuggestion.Option>
            ))}
          </MultiSuggestion.List>
        </MultiSuggestion>
      </Field>
    );
  },
};

export const CustomFilterAlt2: Story = {
  render: (args, ctx) => {
    const [value, setValue] = useState('');

    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <MultiSuggestion {...args} filter={false}>
          <MultiSuggestion.Chips />
          <MultiSuggestion.Input
            id={ctx.id}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <MultiSuggestion.Clear />
          <MultiSuggestion.List>
            <MultiSuggestion.Empty>Tomt</MultiSuggestion.Empty>
            {DATA_PLACES.filter(
              (_, index) => !value || index === Number(value) - 1,
            ).map((text) => (
              <MultiSuggestion.Option key={text}>{text}</MultiSuggestion.Option>
            ))}
          </MultiSuggestion.List>
        </MultiSuggestion>
      </Field>
    );
  },
};

export const AlwaysShowAll: Story = {
  render: (args, ctx) => {
    const [value, setValue] = useState('Sogndal');

    return (
      <Field>
        <Label>Viser alle options også når valgt</Label>
        <MultiSuggestion {...args} filter={false}>
          <MultiSuggestion.Chips />
          <MultiSuggestion.Input
            id={ctx.id}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <MultiSuggestion.Clear />
          <MultiSuggestion.List>
            <MultiSuggestion.Empty>Tomt</MultiSuggestion.Empty>
            {DATA_PLACES.map((place) => (
              <MultiSuggestion.Option key={place}>
                {place}
              </MultiSuggestion.Option>
            ))}
          </MultiSuggestion.List>
        </MultiSuggestion>
      </Field>
    );
  },
};

export const FetchExternal: Story = {
  render: (args, ctx) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<string[] | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const isTyping = (event.nativeEvent as InputEvent).inputType;
      const value = encodeURIComponent(event.target.value.trim());
      setValue(event.target.value);

      if (!isTyping) return; // Prevent API call if clicking on items in list
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
        <MultiSuggestion {...args} filter={false}>
          <MultiSuggestion.Chips />
          <MultiSuggestion.Input
            id={ctx.id}
            value={value}
            onChange={handleChange}
          />
          <MultiSuggestion.Clear />
          <MultiSuggestion.List singular="%d country" plural="%d countries">
            {!!value && (
              <MultiSuggestion.Empty>
                {options ? (
                  'Ingen treff'
                ) : (
                  <span
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Spinner aria-hidden="true" data-size="sm" /> Laster...
                  </span>
                )}
              </MultiSuggestion.Empty>
            )}
            {options?.map((option) => (
              <MultiSuggestion.Option key={option}>
                {option}
              </MultiSuggestion.Option>
            ))}
          </MultiSuggestion.List>
        </MultiSuggestion>
      </Field>
    );
  },
};
