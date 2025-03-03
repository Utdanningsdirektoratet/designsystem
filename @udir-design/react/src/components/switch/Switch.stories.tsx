import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Card } from '@digdir/designsystemet-react';
import { expect, within } from 'storybook/test';
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

export const SwitchInColorContext: Story = {
  args: {
    label: 'Radio',
    description: 'Description',
    checked: true,
    id: 'switch-in-color-context',
  },
  render: (args) => (
    <Card data-color="accent" variant="tinted">
      <Switch {...args} />
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const element = within(canvasElement).getByRole('switch');
        const expectedColor = getComputedStyle(element).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        await expect(element).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
};
