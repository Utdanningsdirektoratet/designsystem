import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Toast } from './Toast';
import { toast } from './ToastContext';

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['alpha', 'udir'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    customStyles: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Preview: Story = {
  args: {
    message: 'En ny rad ble lagt til',
    'data-color': 'info',
    dismissable: false,
    'data-size': 'md',
    icon: true,
    timeout: false,
    close: () => console.log('Lukk toast'),
  },
  render: (args) => (
    <Toast {...args} style={{ position: 'relative', inset: 'initial' }} />
  ),
};

export const AutoClose: Story = {
  render: () => {
    return (
      <Button onClick={() => toast.show({ message: 'Jeg blir borte' })}>
        Åpne toast
      </Button>
    );
  },
};

export const Dismissable: Story = {
  render: () => {
    let counter = 1;
    return (
      <Button
        onClick={() => {
          toast.show({
            message: `Toast nummer ${counter}`,
            dismissable: true,
            'data-color': 'success',
          });
          counter += 1;
        }}
      >
        Åpne toast
      </Button>
    );
  },
};
