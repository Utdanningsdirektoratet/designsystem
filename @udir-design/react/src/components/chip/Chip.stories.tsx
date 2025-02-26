import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';
import { expect, fn, within } from '@storybook/test';

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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const inputNynorsk = canvas.getByRole('radio', { name: 'Nynorsk' });
    const inputBokmal = canvas.getByRole('radio', { name: 'Bokmål' });

    await step('Render label and input as native element', async () => {
      const label = canvas.getByLabelText('Nynorsk');
      expect(label).toBeInTheDocument();
      expect(inputNynorsk).toBeInTheDocument();
    });

    await step('Select Nynorsk', async () => {
      inputNynorsk.click();
      expect(inputNynorsk).toBeChecked();
      expect(inputBokmal).not.toBeChecked();
    });

    await step('Select Bokmal', async () => {
      inputBokmal.click();
      expect(inputNynorsk).not.toBeChecked();
      expect(inputBokmal).toBeChecked();
    });
  },
};

export const Checkbox: StoryObj<typeof Chip.Checkbox> = {
  render: (args) => <Chip.Checkbox {...args}>Nynorsk</Chip.Checkbox>,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('checkbox');

    await step('Render label and input as native element', async () => {
      const label = canvas.getByLabelText('Nynorsk');
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    await step('Toggle checkbox', async () => {
      input.click();
      expect(input).toBeChecked();
      input.click();
      expect(input).not.toBeChecked();
    });
  },
};

export const Removable: StoryObj<typeof Chip.Removable> = {
  args: {
    'aria-label': 'Slett Norge',
    onClick: fn(),
  },
  render: (args) => <Chip.Removable {...args}>Norge</Chip.Removable>,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Render label and button as native element', async () => {
      const label = canvas.getByText('Norge');
      expect(label).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    await step('Remove chip', async () => {
      button.click();
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};

export const Button: StoryObj<typeof Chip.Button> = {
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <>
      <Chip.Button {...args}>Søk etter nynorsk</Chip.Button>
      <Chip.Button {...args}>Søk etter bokmål</Chip.Button>
      <Chip.Button {...args}>Søk etter engelsk</Chip.Button>
    </>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await step('Render label and button as native element', async () => {
      const label = canvas.getByText('Søk etter nynorsk');
      expect(label).toBeInTheDocument();
      expect(buttons).toHaveLength(3);
    });

    await step('Click button', async () => {
      buttons[1].click();
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};
