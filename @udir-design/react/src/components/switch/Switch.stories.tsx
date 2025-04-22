import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Card } from '@digdir/designsystemet-react';
import { expect, within } from '@storybook/test';

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
