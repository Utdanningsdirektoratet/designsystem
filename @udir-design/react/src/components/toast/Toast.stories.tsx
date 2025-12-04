import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Toast } from './Toast';
import { toast } from './toasts';

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
      gap: '1rem',
      flexWrap: 'wrap',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Preview: Story = {
  args: {
    message: 'En ny rad ble lagt til',
    'data-color': 'info',
    'data-size': 'md',
    icon: true,
    timeout: false,
    onClose: () => console.log('Lukk toast'),
  },
  render: (args) => (
    <Toast {...args} style={{ position: 'relative', inset: 'initial' }} />
  ),
};

export const Variants: Story = {
  render: () => {
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => toast.info('Dette er en informasjonsmelding')}
        >
          Vis info
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.success('Handling fullført')}
        >
          Vis success
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.warning('Dette er en advarsel')}
        >
          Vis warning
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.danger('Noe gikk galt')}
        >
          Vis danger
        </Button>
      </>
    );
  },
};

export const AutoClose: Story = {
  render: () => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast('Jeg forsvinner', { timeout: 2000, dismissable: false })
        }
      >
        Vis timeout
      </Button>
    );
  },
};

export const Dismissable: Story = {
  render: () => {
    let counter = 1;
    return (
      <Button
        variant="secondary"
        onClick={() => {
          toast.success(`Toast nummer ${counter}`, {
            timeout: false,
          });
          counter += 1;
        }}
      >
        Vis dismissable
      </Button>
    );
  },
};

const mockApiCall = () =>
  new Promise<string>((resolve, reject) => {
    const succeed = Math.random() > 0.3;
    setTimeout(() => {
      succeed ? resolve('Data lagret') : reject(new Error('Feil oppstod'));
    }, 1500);
  });

export const Promises: Story = {
  render: () => {
    return (
      <Button
        variant="secondary"
        onClick={() =>
          toast.promise(mockApiCall, {
            loading: 'Lagrer…',
            success: 'Lagring fullført',
            error: 'Kunne ikke lagre',
          })
        }
      >
        Lagre eksamen
      </Button>
    );
  },
};

export const Updates: Story = {
  render: () => {
    return (
      <Button
        variant="secondary"
        onClick={async () => {
          const id = toast.info('Laster data…', {
            busy: true,
            dismissable: false,
          });
          try {
            await mockApiCall();
            if (id) {
              toast.success('Lasting fullført', {
                id,
                busy: false,
                dismissable: true,
              });
            }
          } catch {
            if (id) {
              toast.danger('Kunne ikke laste data', {
                id,
                busy: false,
                dismissable: true,
              });
            }
          }
        }}
      >
        Last data
      </Button>
    );
  },
};
