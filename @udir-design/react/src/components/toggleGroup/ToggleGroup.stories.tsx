import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';
import { Card } from '@digdir/designsystemet-react';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['alpha'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Preview: Story = {
  args: {
    defaultValue: 'innboks',
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroup.Item value="innboks">Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value="utkast">Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value="arkiv">Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const ToggleGroupInColorContext: Story = {
  args: Preview.args,
  render: (args, context) => (
    <Card data-color="accent" variant="tinted">
      {Preview.render?.(args, context)}
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    await step(
      'Should have neutral color palette by default, no matter the surrounding color palette',
      async () => {
        const firstButton = within(canvasElement).getAllByRole('radio')[0];
        const expectedColor = getComputedStyle(firstButton).getPropertyValue(
          '--ds-color-neutral-base-default',
        );
        expect(firstButton).toHaveStyle(`background-color: ${expectedColor}`);
      },
    );
  },
};
