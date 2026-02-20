import { useDebounceCallback } from '@digdir/designsystemet-react';
import { type InputEvent, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from '../button/Button';
import { Details } from '../details/Details';
import { Divider } from '../divider/Divider';
import { Field } from '../field/Field';
import { Spinner } from '../spinner/Spinner';
import { Label } from '../typography/label/Label';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { Suggestion } from './Suggestion';
import type {
  SuggestionItem,
  SuggestionMultipleProps,
  SuggestionSingleProps,
} from './Suggestion';

const meta = preview.meta({
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
      config: {
        rules: [
          // Axe can't find listbox inside shadow-dom, and thus thinks <data> elements
          // (chips for selected items) don't have an appropriate parent element
          {
            id: 'aria-required-parent',
            matches: (element) =>
              !(
                element instanceof HTMLDataElement &&
                element.className === 'ds-chip'
              ),
          },
          /* Axe does not like role="combobox" on input elements either */
          {
            id: 'aria-allowed-role',
            matches: (element) => !(element instanceof HTMLInputElement),
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
});

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

export const Preview = meta.story({
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
});

export const ControlledSingle = meta.story({
  render: (args, ctx) => {
    const [value, setValue] = useState<string>('');

    return (
      <>
        <Field>
          <Label>Velg destinasjon</Label>
          <Suggestion
            {...(args as SuggestionSingleProps)}
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
  play: async ({ canvasElement, step }) => {
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
  },
});

export const ControlledMultiple = meta.story({
  render: (args, ctx) => {
    const [value, setValue] = useState<string[]>(['Oslo']);
    return (
      <>
        <Field>
          <Label>Velg destinasjoner</Label>
          <Suggestion
            {...(args as SuggestionMultipleProps)}
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
  play: async ({ canvasElement, step }) => {
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
  },
});

export const ControlledIndependentLabelValue = meta.story({
  render: (args, ctx) => {
    const [item, setItem] = useState<SuggestionItem | null>(DATA_PEOPLE[0]);

    return (
      <>
        <Field>
          <Label>Velg person</Label>
          <Suggestion
            {...(args as SuggestionSingleProps)}
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
});

export const CustomFilterAlt1 = meta.story({
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
});

export const CustomFilterAlt2 = meta.story({
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
});

export const AlwaysShowAll = meta.story({
  render: (args, ctx) => {
    const [value, setValue] = useState<string | undefined>('Sogndal');
    return (
      <Field>
        <Label>Viser alle options også når valgt</Label>
        <Suggestion
          {...(args as SuggestionSingleProps)}
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
});

export const FetchExternal = meta.story({
  render: (args, ctx) => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState<string[] | null>(null);

    const handleInput = (event: InputEvent<HTMLInputElement>) => {
      const value = encodeURIComponent(event.currentTarget.value.trim());
      setValue(event.currentTarget.value);
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
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
});

export const Multiple = Preview.extend({ args: { multiple: true } });

export const DefaultValue = meta.story({
  render(args, ctx) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion
          {...(args as SuggestionSingleProps)}
          defaultSelected={'Sogndal'}
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
});

export const InDetails = meta.story({
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
});
