import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Fieldset } from '../alpha';

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
};

export const Checked: Story = {
  ...Preview,
  args: { ...Preview.args, checked: true },
};

export const Group: Story = {
  render: ({ 'aria-label': a, 'aria-labelledby': b, ...args }) => (
    <Fieldset>
      <Fieldset.Legend>Skru av/på en eller flere innstillinger</Fieldset.Legend>
      <Switch
        label="Innstilling 1"
        description="Beskrivelse av innstilling"
        value="alt1"
        checked
        {...args}
      />
      <Switch label="Innstilling 2" value="alt2" {...args} />
      <Switch label="Innstilling 3" value="alt3" {...args} />
      <Switch
        label="Innstilling 4"
        value="alt4"
        description="Du mangler rettigheter for denne instillingen"
        readOnly
        {...args}
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
