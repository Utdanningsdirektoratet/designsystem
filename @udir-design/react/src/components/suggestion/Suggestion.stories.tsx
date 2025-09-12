import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { type ChangeEvent, useState } from 'react';
import {
  Button,
  Divider,
  Field,
  Label,
  Paragraph,
  Spinner,
  Details,
  Suggestion,
  SuggestionMultipleProps,
  SuggestionSingleProps,
  SuggestionItem,
} from '@udir-design/react/alpha';
import { useDebounceCallback } from '@digdir/designsystemet-react';

const meta: Meta<typeof Suggestion> = {
  component: Suggestion,
  tags: ['alpha', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
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

type Story<T extends { multiple: boolean } = { multiple: false }> = StoryObj<
  T['multiple'] extends true ? SuggestionMultipleProps : SuggestionSingleProps
>;

async function testSuggestion(el: HTMLElement) {
  /* wait for role to be added */
  const input = await waitFor(() => within(el).getByRole('combobox'));
  /* When in test mode, open suggestion by focusing input */
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

const DATA_PEOPLE = [
  { label: 'Lars', value: '#004' },
  { label: 'James', value: '#007' },
  { label: 'Nina', value: '#113' },
  { label: 'Tove', value: '#110' },
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

export const ControlledSingle: Story = {
  render: (args, ctx) => {
    const [value, setValue] = useState<string>('');

    return (
      <>
        <Field>
          <Label>Velg destinasjon</Label>
          <Suggestion
            {...args}
            selected={value}
            onSelectedChange={(item) => setValue(item?.value ?? '')}
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
          Valgte reisemål: {value}
        </Paragraph>

        <Button
          onClick={() => {
            setValue('Sogndal');
          }}
        >
          Sett reisemål til Sogndal
        </Button>
      </>
    );
  },
};

ControlledSingle.play = async ({ canvasElement, step }) => {
  const input = await waitFor(() =>
    within(canvasElement).getByRole('combobox'),
  );
  const resultText = within(canvasElement).getByText('Valgte reisemål:', {
    exact: false,
  });
  const button = within(canvasElement).getByText('Sett reisemål', {
    exact: false,
    selector: 'button',
  });

  await step('Initial state is empty', async () => {
    await expect(resultText).toHaveTextContent(/^Valgte reisemål:$/);
    await waitFor(() => expect(input).toHaveValue(''));
  });

  await step('Controlled state change renders correctly', async () => {
    await userEvent.click(button);
    await expect(resultText).toHaveTextContent('Sogndal');
    await waitFor(() => expect(input).toHaveValue('Sogndal'));
  });
};

export const ControlledMultiple: Story<{ multiple: true }> = {
  render: (args, ctx) => {
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

ControlledMultiple.play = async ({ canvasElement, step }) => {
  const getChipValues = async () =>
    waitFor(() =>
      within(canvasElement)
        .getAllByLabelText('Press to remove', { exact: false })
        .filter((el) => el instanceof HTMLDataElement)
        .map((x) => x.value),
    );
  const resultText = within(canvasElement).getByText('Valgte reisemål:', {
    exact: false,
  });
  const button = within(canvasElement).getByText('Sett reisemål', {
    exact: false,
    selector: 'button',
  });

  await step('Initial state is rendered correctly', async () => {
    await expect(resultText).toHaveTextContent('Oslo');
    await expect(await getChipValues()).toContain('Oslo');
  });

  await step('Controlled state change renders correctly', async () => {
    await userEvent.click(button);
    await expect(resultText).toHaveTextContent('Sogndal');
    await expect(resultText).toHaveTextContent('Stavanger');
    const chipValues = await getChipValues();
    await expect(chipValues).toContain('Sogndal');
    await expect(chipValues).toContain('Stavanger');
  });
};

export const ControlledIndependentLabelValue: Story = {
  render: (args, ctx) => {
    const [item, setItem] = useState<SuggestionItem | undefined>(
      DATA_PEOPLE[0],
    );

    return (
      <>
        <Field>
          <Label>Velg person</Label>
          <Suggestion
            {...args}
            selected={item}
            onSelectedChange={setItem}
            filter={false}
          >
            <Suggestion.Input id={ctx.id} />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty>Tomt</Suggestion.Empty>
              {DATA_PEOPLE.map(({ label, value }) => (
                <Suggestion.Option key={value} label={label} value={value}>
                  {label}
                </Suggestion.Option>
              ))}
            </Suggestion.List>
          </Suggestion>
        </Field>
        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <div style={{ margin: 'var(--ds-size-2) 0' }}>
          Valgt person:
          <pre
            style={{
              fontSize: 14,
              whiteSpace: 'pre-wrap',
              width: 400,
            }}
          >
            {JSON.stringify(item)}
          </pre>
        </div>

        <Button
          onClick={() => {
            setItem(DATA_PEOPLE[2]);
          }}
          variant="secondary"
        >
          Sett Nina
        </Button>
      </>
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
  render: (args, ctx) => {
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
  render: (args, ctx) => {
    const [value, setValue] = useState<string | undefined>('Sogndal');
    return (
      <Field>
        <Label>Viser alle options også når valgt</Label>
        <Suggestion
          {...args}
          selected={value}
          filter={false}
          onSelectedChange={(item) => setValue(item?.value)}
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
  render: (args, ctx) => {
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

FetchExternal.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};

export const Multiple: Story<{ multiple: true }> = {
  ...(Preview as Story<{ multiple: true }>),
  args: { multiple: true },
};

export const DefaultValue: Story = {
  render(args, ctx) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion {...args} defaultSelected={'Sogndal'}>
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

export const InDetails: Story = {
  render: (args, ctx) => {
    return (
      <Details>
        <Details.Summary>Åpne details som har overflow: clip;</Details.Summary>
        <Details.Content>
          <Field>
            <Label>Velg en destinasjon</Label>
            <Suggestion {...args} autoFocus>
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
        </Details.Content>
      </Details>
    );
  },
};
