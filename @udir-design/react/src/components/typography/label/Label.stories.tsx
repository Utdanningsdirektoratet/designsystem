import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ['beta', '!autodocs', 'digdir'],
  parameters: {
    componentOrigin: {
      originator: 'digdir',
    },
  },
  title: 'Components/Typography/Label',
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Preview: Story = {
  args: {
    children: 'Vennligst skriv inn fødselsnummer. 11 tegn',
    weight: 'medium',
  },
};
