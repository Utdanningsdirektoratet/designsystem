import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Fieldset,
  Paragraph,
  Table,
  UseCheckboxGroupProps,
  ValidationMessage,
  useCheckboxGroup,
  Chip,
} from '@udir-design/react/alpha';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;
type GroupStory = StoryObj<UseCheckboxGroupProps>;

export const Preview: Story = {
  args: {
    label: 'Checkbox label',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    id: 'checkbox-preview',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await step('Label and description are rendered', async () => {
      const label = await waitFor(() => canvas.getByText(args.label as string));
      expect(label).toBeInTheDocument();

      const description = canvas.getByText(args.description as string);
      expect(description).toBeInTheDocument();
    });

    await step('Checkbox is rendered with the correct role', async () => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });

    await step('User can toggle the checkbox', async () => {
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      await userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    await step('Check keyboard toggle', async () => {
      checkbox.focus();
      await userEvent.keyboard(' ');
      expect(checkbox).toBeChecked();
      await userEvent.keyboard(' ');
      expect(checkbox).not.toBeChecked();
    });

    await step(
      'onChange callback is called when checkbox is toggled',
      async () => {
        await userEvent.click(checkbox);
        expect(args.onChange).toHaveBeenCalled();
      },
    );

    userEvent.tab();
  },
};

export const Group: GroupStory = {
  args: {
    name: 'my-group',
    disabled: false,
    error: '',
  },
  render(args, context) {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ['epost'],
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>
          Hvordan vil du helst at vi skal kontakte deg?
        </Fieldset.Legend>
        <Fieldset.Description>
          Velg de alternativene som er relevante for deg.
        </Fieldset.Description>
        <Checkbox
          id={context.id + '-email'}
          label="E-post"
          {...getCheckboxProps('epost')}
        />
        <Checkbox
          id={context.id + '-telefon'}
          label="Telefon"
          {...getCheckboxProps('telefon')}
        />
        <Checkbox
          id={context.id + '-sms'}
          label="SMS"
          {...getCheckboxProps('sms')}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
};

export const OneOption: Story = {
  args: {
    label: 'Jeg bekrefter at jeg er over 18 år',
    value: 'samtykke',
  },
  render: (args, context) => (
    <Fieldset>
      <Fieldset.Legend>Bekreft at du er over 18 år</Fieldset.Legend>
      <Fieldset.Description>
        For at vi skal kunne sende deg opplysningen du ber om, må du bekrefte at
        du er myndig.
      </Fieldset.Description>
      <Checkbox id={context.id} {...args} />
    </Fieldset>
  ),
};

export const WithError: GroupStory = {
  args: {
    ...Group.args,
    name: 'my-error',
    error: 'Du må velge minst to kontaktalternativ', // TODO: useCheckbox when hook is ready
  },
  render: Group.render,
};

type Choices = {
  [key: string]: {
    label: string;
  };
};

export const Controlled: GroupStory = {
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-4)',
      flexDirection: 'column',
    },
  },
  render(args, context) {
    const choices: Choices = {
      barnehage: { label: 'Barnehage' },
      grunnskole: { label: 'Grunnskole' },
      videregaende: { label: 'Videregående' },
    };
    const { getCheckboxProps, validationMessageProps, value, setValue } =
      useCheckboxGroup({
        name: 'my-controlled',
        value: ['barnehage', 'videregaende'],
        ...args,
      });

    const toggle = (haystack: string[], needle: string) =>
      haystack.includes(needle)
        ? haystack.filter((value) => value !== needle)
        : haystack.concat(needle);

    const isFiltered = value.length > 0;

    return (
      <>
        <Fieldset>
          <Fieldset.Legend>Utdanningsnivå</Fieldset.Legend>
          {Object.entries(choices).map(([value, { label }]) => (
            <Checkbox
              key={value}
              id={`${context.id}-${value}`}
              label={label}
              {...getCheckboxProps(value)}
            />
          ))}
        </Fieldset>
        <ValidationMessage {...validationMessageProps} />
        <Divider />
        <Paragraph>(Annet innhold)</Paragraph>
        <Divider />
        <div style={{ display: 'flex', gap: 'var(--ds-size-2)' }}>
          <Paragraph>
            {isFiltered ? 'Viser innhold for:' : 'Viser alt innhold'}
          </Paragraph>
          {isFiltered &&
            value.map((v) => (
              <Chip.Removable
                key={v}
                aria-label={`Slett ${choices[v].label}`}
                onClick={() => setValue(toggle(value, v))}
              >
                {choices[v].label}
              </Chip.Removable>
            ))}
        </div>
        {isFiltered && (
          <Button
            style={{ width: 'fit-content' }}
            variant="secondary"
            onClick={() => setValue([])}
          >
            Tøm filtre
          </Button>
        )}
      </>
    );
  },
};

export const ReadOnly: GroupStory = {
  args: {
    ...Group.args,
    name: 'my-readonly',
    readOnly: true,
  },
  render: Group.render,
};

export const Disabled: GroupStory = {
  args: {
    ...Group.args,
    name: 'my-disabled',
    disabled: true,
  },
  render: Group.render,
};

export const IndeterminateInTable: GroupStory = {
  render(args, context) {
    const { getCheckboxProps } = useCheckboxGroup({
      name: context.id,
      value: ['2', '3'],
      ...args,
    });
    const people = [
      { id: 1, name: 'Lise Nordmann', education: 'Barnehage' },
      { id: 2, name: 'Ola Nordmann', education: 'Grunnskole' },
      { id: 3, name: 'Kari Nordmann', education: 'Videregående' },
      { id: 4, name: 'Per Nordmann', education: 'Barnehage' },
    ];
    return (
      <Table>
        <colgroup>
          {/* ensure the first column only takes up the necessary space */}
          <col style={{ width: '1px' }} />
          <col style={{ width: '10em' }} />
          <col />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                id={context.id + '-all'}
                aria-label="Velg alle"
                {...getCheckboxProps({
                  allowIndeterminate: true,
                  value: 'all',
                })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Navn</Table.HeaderCell>
            <Table.HeaderCell>Utdanningsnivå</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {people.map((person) => (
            <Table.Row key={person.name}>
              <Table.Cell>
                <Checkbox
                  id={`${context.id}-${person.id}`}
                  aria-labelledby={`${context.id}-${person.id}-name`}
                  {...getCheckboxProps(person.id.toString())}
                />
              </Table.Cell>
              <Table.Cell id={`${context.id}-${person.id}-name`}>
                {person.name}
              </Table.Cell>
              <Table.Cell>{person.education}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const CheckboxInColorContext: Story = {
  args: {
    label: 'Checkbox label',
    description: 'Description',
    checked: true,
    id: 'checkbox-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Checkbox {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const checkbox = within(canvasElement).getByRole('checkbox');
        const expectedColor = getComputedStyle(checkbox).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(checkbox).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
};

export const Focused: Story = {
  args: Preview.args,
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};
