import { type InputEvent, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Button } from 'src/components/button';
import { Details } from 'src/components/details';
import { Divider } from 'src/components/divider';
import { Field } from 'src/components/field';
import { Spinner } from 'src/components/spinner';
import { Label } from 'src/components/typography/label';
import { Paragraph } from 'src/components/typography/paragraph';
import { useDebounceCallback } from 'src/utilities/useDebounceCallback';
import { Suggestion } from './Suggestion';
import type {
  SuggestionItem,
  SuggestionMultipleProps,
  SuggestionSingleProps,
} from './Suggestion';
import { Suggestion as FakeSuggestion } from './docs/FakeSuggestion';
import { SuggestionClear } from './docs/FakeSuggestionClear';
import { SuggestionEmpty } from './docs/FakeSuggestionEmpty';
import { SuggestionInput } from './docs/FakeSuggestionInput';
import { SuggestionList } from './docs/FakeSuggestionList';
import { SuggestionOption } from './docs/FakeSuggestionOption';
import { SuggestionToggle } from './docs/FakeSuggestionToggle';

const meta = preview.meta({
  component: FakeSuggestion,
  subcomponents: {
    'Suggestion.Clear': SuggestionClear,
    'Suggestion.Empty': SuggestionEmpty,
    'Suggestion.Input': SuggestionInput,
    'Suggestion.List': SuggestionList,
    'Suggestion.Option': SuggestionOption,
    'Suggestion.Toggle': SuggestionToggle,
  },
  tags: ['digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
      details: 'Vi har fjernet mulighet for fargevalg.',
    },
    layout: 'centered',
    customStyles: {
      story: {
        /* add height by default when viewing a single story */
        height: '320px',
      },
    },
    a11y: {
      config: {
        rules: [
          // Axe can't find listbox inside shadow-dom, and thus thinks <data> elements
          // (chips for selected items) don't have an appropriate parent element
          {
            id: 'aria-required-parent',
            matches: (element) => !(element instanceof HTMLDataElement),
          },
          /* Axe does not like role="combobox" on input elements either */
          {
            id: 'aria-allowed-role',
            matches: (element) => !(element instanceof HTMLInputElement),
          },
          /* The option for creating a new value gets its accessible name from
           * `--dsc-suggestion-create-text`. Axe doesn't take generated content
           * into account when computing accessible names but the name is
           * present in the accessibility tree, so this is a false positive. */
          {
            id: 'aria-toggle-field-name',
            matches: (element) => !element.matches('u-option[data-create]'),
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
  const toggle = within(el).queryByRole('button', { name: 'Valg' });

  if (toggle) {
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  } else {
    /* When in test mode, open suggestion by focusing input */
    await userEvent.click(input);
  }
}

/**
 * Types a value that doesn't match any option, leaving the option for creating
 * a new value as the only one in the list
 */
async function typeUnknownValue(el: HTMLElement, value: string) {
  const input = await waitFor(() => within(el).getByRole('combobox'));
  await userEvent.clear(input);
  await userEvent.type(input, value);

  /* Chips for selected values also have `role="option"`, and options that
   * don't match the input are `aria-hidden`, so the option to create a new
   * value is the only `u-option` left in the a11y tree */
  const options = within(el)
    .getAllByRole('option')
    .filter((option) => option.matches('u-option'));
  await expect(options).toHaveLength(1);

  return { input, createOption: options[0] };
}

const getChipValues = (el: HTMLElement) =>
  waitFor(() =>
    within(el)
      .getAllByLabelText('Press to remove', { exact: false })
      .filter((chip) => chip instanceof HTMLDataElement)
      .map((chip) => chip.value),
  );

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
  parameters: {
    layout: 'none',
    chromatic: {
      modes: { desktop: { viewport: { height: '430px' } } },
    },
    customStyles: {
      width: 300,
      justifySelf: 'center',
      story: {
        height: 430,
      },
    },
  },
  render(args) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion {...args}>
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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

export const Creatable = Preview.extend({
  args: { creatable: true },
  play: async ({ canvasElement, step }) => {
    await step(
      'Typing an unknown value shows the option to add it',
      async () => {
        const { createOption } = await typeUnknownValue(
          canvasElement,
          'Finnes ikke',
        );

        await expect(createOption).toHaveAttribute(
          'data-create',
          'Legg til "Finnes ikke"',
        );
      },
    );
  },
});

export const ControlledSingle = meta.story({
  render: (args) => {
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
            <Suggestion.Input />
            <Suggestion.Toggle />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty />
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

export const ControlledSingleCreatable = ControlledSingle.extend({
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: { creatable: true },
  play: async ({ canvasElement, step }) => {
    await step('Created value becomes the controlled selection', async () => {
      const { input, createOption } = await typeUnknownValue(
        canvasElement,
        'Finnes ikke',
      );
      await userEvent.click(createOption);

      const resultText = within(canvasElement).getByText('Valgte reisemål:', {
        exact: false,
      });
      await expect(resultText).toHaveTextContent('Finnes ikke');
      await waitFor(() => expect(input).toHaveValue('Finnes ikke'));
    });
  },
});

export const ControlledMultiple = meta.story({
  render: (args) => {
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
            <Suggestion.Input />
            <Suggestion.Toggle />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty />
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
    const resultText = within(canvasElement).getByText('Valgte reisemål:', {
      exact: false,
    });
    const button = within(canvasElement).getByText('Sett reisemål', {
      exact: false,
      selector: 'button',
    });

    await step('Initial state is rendered correctly', async () => {
      await expect(resultText).toHaveTextContent('Oslo');
      await expect(await getChipValues(canvasElement)).toContain('Oslo');
    });

    await step('Controlled state change renders correctly', async () => {
      await userEvent.click(button);
      await expect(resultText).toHaveTextContent('Sogndal');
      await expect(resultText).toHaveTextContent('Stavanger');
      const chipValues = await getChipValues(canvasElement);
      await expect(chipValues).toContain('Sogndal');
      await expect(chipValues).toContain('Stavanger');
    });
  },
});

export const ControlledMultipleCreatable = ControlledMultiple.extend({
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: { creatable: true },
  play: async ({ canvasElement, step }) => {
    await step(
      'Created value is added to the controlled selection',
      async () => {
        const { createOption } = await typeUnknownValue(
          canvasElement,
          'Finnes ikke',
        );
        await userEvent.click(createOption);

        const resultText = within(canvasElement).getByText('Valgte reisemål:', {
          exact: false,
        });
        await expect(resultText).toHaveTextContent('Oslo');
        await expect(resultText).toHaveTextContent('Finnes ikke');
        await expect(await getChipValues(canvasElement)).toEqual([
          'Oslo',
          'Finnes ikke',
        ]);
      },
    );
  },
});

export const ControlledIndependentLabelValue = meta.story({
  render: (args) => {
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
            <Suggestion.Input />
            <Suggestion.Toggle />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty />
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
  render(args) {
    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <Suggestion
          {...args}
          filter={({ index, input }) =>
            !input.value || index === Number(input.value) - 1
          }
        >
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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
  parameters: {
    layout: 'none',
    customStyles: {
      width: 300,
      justifySelf: 'center',
      story: {
        height: 430,
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Field>
        <Label>Skriv inn et tall mellom 1-6</Label>
        <Suggestion {...args} filter={false}>
          <Suggestion.Input
            onInput={({ currentTarget }) => setValue(currentTarget.value)}
          />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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
  parameters: {
    layout: 'none',
    customStyles: {
      width: 320,
      justifySelf: 'center',
      story: {
        height: 430,
      },
    },
  },
  render: (args) => {
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
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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
  render: (args) => {
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
      try {
        const api = `https://api.first.org/data/v1/countries?q=${value}&limit=10`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const { data } = (await response.json()) as {
          data: Record<string, { country: string }>;
        };
        setOptions(Object.values(data).map(({ country }) => country));
      } catch {
        setOptions([]);
      }
    };

    const debounced = useDebounceCallback(apiCall, 500);

    return (
      <Field lang="en">
        <Label>Search for countries (in english)</Label>
        <Suggestion {...args} filter={false}>
          <Suggestion.Input onInput={handleInput} />
          <Suggestion.Toggle />
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

export const MultipleCreatable = Multiple.extend({
  args: { creatable: true },
  play: async ({ canvasElement, step }) => {
    await step('Several values can be created in a row', async () => {
      const first = await typeUnknownValue(canvasElement, 'Finnes ikke');
      await userEvent.click(first.createOption);

      const second = await typeUnknownValue(canvasElement, 'Heller ikke');
      await userEvent.click(second.createOption);

      await expect(await getChipValues(canvasElement)).toEqual([
        'Finnes ikke',
        'Heller ikke',
      ]);
    });
  },
});

export const MultipleCount = meta.story({
  render(args) {
    return (
      <Field>
        <Label>Velg destinasjoner</Label>
        <Suggestion
          {...(args as SuggestionMultipleProps)}
          multiple
          display="count"
          defaultSelected={['Oslo', 'Sogndal']}
        >
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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

export const DefaultValue = meta.story({
  render(args) {
    return (
      <Field>
        <Label>Velg en destinasjon</Label>
        <Suggestion
          {...(args as SuggestionSingleProps)}
          defaultSelected={'Sogndal'}
        >
          <Suggestion.Input />
          <Suggestion.Toggle />
          <Suggestion.Clear />
          <Suggestion.List>
            <Suggestion.Empty />
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
  render: (args) => {
    return (
      <Details>
        <Details.Summary>Åpne details som har overflow: clip;</Details.Summary>
        <Details.Content>
          <Field>
            <Label>Velg en destinasjon</Label>
            <Suggestion {...args} autoFocus>
              <Suggestion.Input />
              <Suggestion.Toggle />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty />
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
