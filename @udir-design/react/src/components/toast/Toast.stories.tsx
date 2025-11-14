import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Toast } from './Toast';
import { toast } from './Toast.utils';

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
    'data-color': 'info',
    dismissable: false,
    'data-size': 'md',
    icon: true,
    timeout: 3000,
  },
  render: (args) => <Toast {...args}>En ny rad ble lagt til</Toast>,
};

export const AutoClose: Story = {
  render: () => {
    return <Button onClick={() => toast('Jeg blir borte')}>Åpne toast</Button>;
  },
};

export const Dismissable: Story = {
  render: () => {
    return (
      <Button
        onClick={() =>
          toast('Du kan lukke meg', {
            dismissable: true,
            timeout: false,
            'data-color': 'success',
          })
        }
      >
        Åpne toast
      </Button>
    );
  },
};
