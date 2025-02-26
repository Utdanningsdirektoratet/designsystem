import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip.Radio> = {
  component: Chip.Radio,
  tags: ['alpha'],
  parameters: {
    customStyles: { display: 'flex', gap: 'var(--ds-size-2)' },
  },
};

export default meta;
type Story = StoryObj<typeof Chip.Radio>;

export const Preview: Story = {
  render: (args) => (
    <>
      <Chip.Radio {...args} name="my-radio" value="nynorsk" defaultChecked>
        Nynorsk
      </Chip.Radio>
      <Chip.Radio {...args} name="my-radio" value="bokmål">
        Bokmål
      </Chip.Radio>
    </>
  ),
};

export const Checkbox: StoryObj<typeof Chip.Checkbox> = {
  render: (args) => <Chip.Checkbox {...args}>Nynorsk</Chip.Checkbox>,
};

export const Removable: StoryObj<typeof Chip.Removable> = {
  args: {
    'aria-label': 'Slett Norge',
  },
  render: (args) => <Chip.Removable {...args}>Norge</Chip.Removable>,
};

export const Button: StoryObj<typeof Chip.Button> = {
  render: (args) => (
    <>
      <Chip.Button {...args}>Søk etter nynorsk</Chip.Button>
      <Chip.Button {...args}>Søk etter bokmål</Chip.Button>
      <Chip.Button {...args}>Søk etter engelsk</Chip.Button>
    </>
  ),
};
