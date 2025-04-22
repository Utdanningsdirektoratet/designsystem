import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  Divider,
  Fieldset,
  Paragraph,
  Radio,
  ValidationMessage,
  useRadioGroup,
  UseRadioGroupProps,
} from '@udir-design/react/alpha';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Radio>;
type GroupStory = StoryObj<UseRadioGroupProps>;

export const Preview: Story = {
  args: {
    label: 'Radio',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    onClick: fn(),
    id: 'radio-preview',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio');

    await step('Radio label and description are rendered', async () => {
      const label = await waitFor(() =>
        canvas.getByLabelText(args.label as string),
      );
      expect(label).toBeInTheDocument();
      const description = canvas.getByText(args.description as string);
      expect(description).toBeInTheDocument();
    });

    await step('Radio is rendered with the correct initial state', async () => {
      expect(radio).toBeInTheDocument();
      expect(radio).not.toBeChecked();
    });

    await step(
      "Radio calls onChange and onClick when it's checked",
      async () => {
        await userEvent.click(radio);
        expect(radio).toBeChecked();
        expect(args.onClick).toHaveBeenCalled();
        expect(args.onChange).toHaveBeenCalled();
      },
    );
  },
};

export const AriaLabel: Story = {
  args: {
    value: 'value',
    'aria-label': 'Radio',
    id: 'radio-aria-label',
  },
};

export const Group: GroupStory = {
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: 'sjokolade',
  },
  render(args, context) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Hvilken iskremsmak er best?</Fieldset.Legend>
        <Fieldset.Description>
          Velg din favorittsmak blant alternativene.
        </Fieldset.Description>
        <Radio
          id={context.id + '-vanilje'}
          label="Vanilje"
          {...getRadioProps('vanilje')}
        />
        <Radio
          id={context.id + '-jordbær'}
          label="Jordbær"
          description="Jordbær er best"
          {...getRadioProps('jordbær')}
        />
        <Radio
          id={context.id + '-sjokolade'}
          label="Sjokolade"
          {...getRadioProps('sjokolade')}
        />
        <Radio
          id={context.id + '-spiser-ikke-is'}
          label="Jeg spiser ikke iskrem"
          {...getRadioProps('spiser-ikke-is')}
        />
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    );
  },
};

export const WithError = {
  args: {
    ...Group.args,
    error: 'Du må velge jordbær fordi det smaker best',
    name: 'my-error',
  },
  render: Group.render,
};

export const Controlled: GroupStory = {
  render(args, context) {
    const { value, setValue, getRadioProps } = useRadioGroup({
      ...args,
    });

    return (
      <>
        <Fieldset>
          <Fieldset.Legend>Velg pizza</Fieldset.Legend>
          <Fieldset.Description>
            Alle pizzaene er laget på våre egne nybakte bunner og serveres med
            kokkens egen osteblanding og tomatsaus.
          </Fieldset.Description>
          <Radio
            id={context.id + '-ost'}
            label="Bare ost"
            {...getRadioProps('ost')}
          />
          <Radio
            id={context.id + '-dobbeldekker'}
            label="Dobbeldekker"
            description="Chorizo spesial med kokkens luksuskylling"
            {...getRadioProps('dobbeldekker')}
          />
          <Radio
            id={context.id + '-flammen'}
            label="Flammen"
            {...getRadioProps('flammen')}
          />
          <Radio
            id={context.id + '-snadder'}
            label="Snadder"
            {...getRadioProps('snadder')}
          />
        </Fieldset>

        <Divider style={{ marginTop: 'var(--ds-size-4)' }} />

        <Paragraph style={{ marginBlock: 'var(--ds-size-2)' }}>
          Du har valgt: {value}
        </Paragraph>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setValue('flammen')}>Velg Flammen</Button>
          <Button onClick={() => setValue('snadder')}>Velg Snadder</Button>
        </div>
      </>
    );
  },
};

export const ReadOnly = {
  args: { ...Group.args, readOnly: true, name: 'my-readonly' },
  render: Group.render,
};

export const Disabled = {
  args: { ...Group.args, disabled: true, name: 'my-disabled' },
  render: Group.render,
  parameters: {
    // Disabled inputs don't pass text contrast requirements
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export const Inline: Story = {
  render: (context) => (
    <Fieldset>
      <Fieldset.Legend>Kontaktes på e-post?</Fieldset.Legend>
      <Fieldset.Description>
        Bekreft om du ønsker å bli kontaktet per e-post.
      </Fieldset.Description>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }}
      >
        <Radio
          id={context.id + '-inline-ja'}
          name="my-inline"
          label="Ja"
          value="ja"
        />
        <Radio
          id={context.id + '-inline-nei'}
          name="my-inline"
          label="Nei"
          value="nei"
        />
      </div>
    </Fieldset>
  ),
};

export const RadioInColorContext: Story = {
  args: {
    label: 'Radio',
    description: 'Description',
    checked: true,
    id: 'radio-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Radio {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const radio = within(canvasElement).getByRole('radio');
        const expectedColor = getComputedStyle(radio).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(radio).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
};
