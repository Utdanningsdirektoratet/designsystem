import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Checkbox,
  Divider,
  Fieldset,
  Paragraph,
  Table,
  UseCheckboxGroupProps,
  ValidationMessage,
  useCheckboxGroup,
} from '../../alpha';
import { expect, fn, userEvent, within } from '@storybook/test';

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
    await Promise.resolve(); // ensure fieldObserver has had time to connect the elements
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await step('Label and description are rendered', async () => {
      const label = canvas.getByText(args.label as string);
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

    await step(
      'onChange callback is called when checkbox is toggled',
      async () => {
        await userEvent.click(checkbox);
        expect(args.onChange).toHaveBeenCalled();
      },
    );
  },
};

export const AriaLabel: Story = {
  args: {
    value: 'value',
    'aria-label': 'Checkbox',
    id: 'checkbox-aria-label',
  },
};

export const Group: GroupStory = {
  args: {
    name: 'my-group',
    disabled: false,
    error: '',
  },
  render: function Render(args, context) {
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
          Velg alle alternativene som er relevante for deg.
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

export const Controlled: GroupStory = {
  render: function Render(args, context) {
    const { getCheckboxProps, validationMessageProps, value, setValue } =
      useCheckboxGroup({
        name: 'my-controlled',
        ...args,
      });

    const toggle = (haystack: string[], needle: string) =>
      haystack.includes(needle)
        ? haystack.filter((value) => value !== needle)
        : haystack.concat(needle);

    return (
      <>
        <Fieldset>
          <Fieldset.Legend>
            Skal du reise til noen av disse landene?
          </Fieldset.Legend>
          <Fieldset.Description>
            Velg alle landene du skal innom.
          </Fieldset.Description>
          <Checkbox
            id={context.id + '-kroatia'}
            label="Kroatia"
            {...getCheckboxProps('-kroatia')}
          />
          <Checkbox
            id={context.id + '-slovakia'}
            label="Slovakia"
            {...getCheckboxProps('slovakia')}
          />
          <Checkbox
            id={context.id + '-hobbsyssel'}
            label="Hobsyssel"
            {...getCheckboxProps('hobsyssel')}
          />
        </Fieldset>
        <ValidationMessage {...validationMessageProps} />
        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />
        <Paragraph style={{ margin: 'var(--ds-size-2) 0' }}>
          Du har valgt: {value.toString()}
        </Paragraph>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setValue(toggle(value, 'kroatia'))}>
            Toggle Kroatia
          </Button>
          <Button onClick={() => setValue(toggle(value, 'hobsyssel'))}>
            Toggle Hobsyssel
          </Button>
        </div>
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

export const InTable: GroupStory = {
  render: function Render(args, context) {
    const { getCheckboxProps } = useCheckboxGroup({
      name: 'my-checkbox',
      ...args,
    });
    return (
      <Table>
        <colgroup>
          {/* ensure the first column only takes up the necessary space */}
          <col style={{ width: '1px' }} />
          <col />
        </colgroup>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>
              <Checkbox
                id={context.id + '-all'}
                aria-label="Select all"
                {...getCheckboxProps({
                  allowIndeterminate: true,
                  value: 'all',
                })}
              />
            </Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[1, 2, 3, 4].map((row) => (
            <Table.Row key={row}>
              <Table.Cell>
                <Checkbox
                  id={context.id + '-' + row}
                  aria-label={`Check ${row}`}
                  {...getCheckboxProps(`${row}`)}
                />
              </Table.Cell>
              <Table.Cell>Content</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const ContentEx1: Story = {
  render: (context) => (
    <Fieldset>
      <Fieldset.Legend>
        Hvor lenge har du jobbet i det offentlige?
      </Fieldset.Legend>
      <Checkbox id={context.id + '-0-3'} label="I under ett år" value="0-3" />
      <Checkbox id={context.id + '-1-3'} label="Fra 1-3 år" value="1-3" />
      <Checkbox id={context.id + '->3'} label="Mer enn 3 år" value="3+" />
    </Fieldset>
  ),
};

export const ContentEx2: Story = {
  render: (context) => (
    <Fieldset>
      <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
      <Checkbox
        id={context.id + '-selvstendige'}
        label="Jeg liker å jobbe med selvstendige oppgaver"
        value="selvstendige"
      />
      <Checkbox
        id={context.id + '-moter'}
        label="Jeg elsker møter"
        value="moter"
      />
      <Checkbox
        id={context.id + '-lunsj'}
        label="Lunsjen er best"
        value="lunsj"
      />
      <Checkbox
        id={context.id + '-kolleger'}
        label="Jeg liker å møte kolleger"
        value="kolleger"
      />
    </Fieldset>
  ),
};

export const ContentEx3: Story = {
  render: (context) => (
    <Fieldset>
      <Fieldset.Legend>Hva liker du best med jobben din?</Fieldset.Legend>
      <Checkbox
        id={context.id + '-selvstendige'}
        label="Selvstendige oppgaver"
        value="selvstendige"
      />
      <Checkbox id={context.id + '-moter'} label="Møter" value="moter" />
      <Checkbox id={context.id + '-lunsj'} label="Lunsj" value="lunsj" />
      <Checkbox
        id={context.id + '-kolleger'}
        label="Kolleger"
        value="kolleger"
      />
    </Fieldset>
  ),
};
