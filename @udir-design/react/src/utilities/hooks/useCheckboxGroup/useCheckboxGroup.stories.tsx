import type { StoryContext } from '@storybook/react-vite';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { formatReactSource } from '.storybook/utils/sourceTransformers';
import { Button } from 'src/components/button/Button';
import { Checkbox } from 'src/components/checkbox/Checkbox';
import { Chip } from 'src/components/chip/Chip';
import { Divider } from 'src/components/divider/Divider';
import { Fieldset } from 'src/components/fieldset/Fieldset';
import { Table } from 'src/components/table';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import { ValidationMessage } from 'src/components/typography/validationMessage/ValidationMessage';
import {
  type UseCheckboxGroupProps,
  useCheckboxGroup,
} from './useCheckboxGroup';

const meta = preview.meta<
  UseCheckboxGroupProps,
  DecoratorType,
  Partial<UseCheckboxGroupProps>
>({
  title: 'Utilities/useCheckboxGroup',
  tags: ['beta'],
  parameters: {
    componentOrigin: { originator: 'digdir' },
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    name: {
      table: { type: { summary: 'string' } },
      description:
        'Name of all checkboxes. If no name is passed, an auto-generated name will be created.',
    },
    value: {
      description: 'Array of values of selected checkboxes',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string[]' },
      },
    },
    onChange: {
      description: 'Callback when selected checkboxes changes',
      table: {
        type: {
          summary:
            '(nextValue: string[], prevValue: string[], event: ChangeEvent<HTMLInputElement>) => void;',
        },
      },
    },
    error: {
      table: { type: { summary: 'string | ReactNode' } },
      description: 'Shared error message for all checkboxes.',
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set disabled state of all checkboxes',
    },
    readOnly: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set read only state of all checkboxes',
    },
    required: {
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
      description: 'Set required state of all checkboxes',
    },
  },
});

export const Default = meta.story({
  render(args, context) {
    const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
      value: ['epost'],
      ...args,
    });

    return (
      <Fieldset>
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
          {...getCheckboxProps({ value: 'sms' })}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
});

const GroupBase = {
  args: {
    name: 'my-group',
    disabled: false,
    error: '',
  } as UseCheckboxGroupProps,
  render(
    args: UseCheckboxGroupProps,
    context: StoryContext<UseCheckboxGroupProps>,
  ) {
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

export const Group = meta.story(GroupBase);

export const WithError = meta.story({
  args: {
    ...GroupBase.args,
    name: 'my-error',
    error: 'Du må velge minst to kontaktalternativ', // TODO: useCheckbox when hook is ready
  },
  render: GroupBase.render,
});

export const ReadOnly = meta.story({
  args: {
    ...GroupBase.args,
    name: 'my-readonly',
    readOnly: true,
  },
  render: GroupBase.render,
});

export const Disabled = meta.story({
  args: {
    ...GroupBase.args,
    name: 'my-disabled',
    disabled: true,
  },
  render: GroupBase.render,
});

export const IndeterminateInTable = meta.story({
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
});

type Choices = {
  [key: string]: {
    label: string;
  };
};

export const Controlled = meta.story({
  render: (args, context) => {
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
  parameters: {
    customStyles: {
      display: 'flex',
      gap: 'var(--ds-size-4)',
      flexDirection: 'column',
    },
    docs: { source: { type: 'code', transform: formatReactSource } },
  },
});
