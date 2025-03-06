import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Divider,
  Fieldset,
  Paragraph,
  Radio,
  ValidationMessage,
} from '../alpha';
import { useRadioGroup, UseRadioGroupProps } from '../../alpha';
import { expect, fn, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Radio> = {
  component: Radio,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Preview: Story = {
  args: {
    label: 'Radio',
    description: 'Description',
    disabled: false,
    readOnly: false,
    value: 'value',
    onChange: fn(),
    onClick: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio');

    await step('Radio label and description are rendered', async () => {
      const label = canvas.getByLabelText(args.label as string);
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
      }
    );
  },
};

export const AriaLabel: Story = {
  args: {
    value: 'value',
    'aria-label': 'Radio',
  },
};

export const Group: StoryObj<UseRadioGroupProps> = {
  args: {
    name: 'my-group',
    readOnly: false,
    disabled: false,
    value: 'sjokolade',
  },
  render: function Render(args) {
    const { getRadioProps, validationMessageProps } = useRadioGroup({
      ...args,
    });

    return (
      <Fieldset>
        <Fieldset.Legend>Hvilken iskremsmak er best?</Fieldset.Legend>
        <Fieldset.Description>
          Velg din favorittsmak blant alternativene.
        </Fieldset.Description>
        <Radio label="Vanilje" {...getRadioProps('vanilje')} />
        <Radio
          label="Jordbær"
          description="Jordbær er best"
          {...getRadioProps('jordbær')}
        />
        <Radio label="Sjokolade" {...getRadioProps('sjokolade')} />
        <Radio
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

export const Controlled: StoryObj<UseRadioGroupProps> = {
  render: function Render(args) {
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
          <Radio label="Bare ost" {...getRadioProps('ost')} />
          <Radio
            label="Dobbeldekker"
            description="Chorizo spesial med kokkens luksuskylling"
            {...getRadioProps('dobbeldekker')}
          />
          <Radio label="Flammen" {...getRadioProps('flammen')} />
          <Radio label="Snadder" {...getRadioProps('snadder')} />
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
};

export const Inline: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Kontaktes på e-post?</Fieldset.Legend>
      <Fieldset.Description>
        Bekreft om du ønsker å bli kontaktet per e-post.
      </Fieldset.Description>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }}
      >
        <Radio name="my-inline" label="Ja" value="ja" />
        <Radio name="my-inline" label="Nei" value="nei" />
      </div>
    </Fieldset>
  ),
};
