import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Fieldset } from '../alpha';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof Switch> = {
  component: Switch,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Preview: Story = {
  args: {
    label: 'En bryter',
  },
  render: (args, context) => <Switch {...args} id={context.id} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const toggleSwitch = canvas.getByRole('switch');

    await step('Switch is rendered and initially off', async () => {
      expect(toggleSwitch).toBeInTheDocument();
      expect(toggleSwitch).not.toBeChecked();
    });

    await step('User can toggle the switch on and off', async () => {
      await userEvent.click(toggleSwitch);
      expect(toggleSwitch).toBeChecked();
      await userEvent.click(toggleSwitch);
      expect(toggleSwitch).not.toBeChecked();
    });
  },
};

export const Checked: Story = {
  ...Preview,
  args: { ...Preview.args, checked: true },
  play: () => {
    // Do nothing
  },
};

export const Group: Story = {
  render: ({ 'aria-label': a, 'aria-labelledby': b, ...args }, context) => (
    <Fieldset>
      <Fieldset.Legend>Skru av/på en eller flere innstillinger</Fieldset.Legend>
      <Switch
        label="Innstilling 1"
        description="Beskrivelse av innstilling"
        value="alt1"
        checked
        {...args}
        id={context.id + '-1'}
      />
      <Switch
        label="Innstilling 2"
        value="alt2"
        {...args}
        id={context.id + '-2'}
      />
      <Switch
        label="Innstilling 3"
        value="alt3"
        {...args}
        id={context.id + '-3'}
      />
      <Switch
        label="Innstilling 4"
        value="alt4"
        description="Du mangler rettigheter for denne instillingen"
        readOnly
        {...args}
        id={context.id + '-4'}
      />
    </Fieldset>
  ),
};

export const GroupEnd: Story = {
  ...Group,
  args: {
    position: 'end',
  },
};
