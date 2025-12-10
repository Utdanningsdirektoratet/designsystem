import type { Meta, StoryObj } from '@storybook/react-vite';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { FormNavigation } from 'src/components/formNavigation';
import { useFormNavigation } from './useFormNavigation';

const meta: Meta = {
  title: 'Utilities/useFormNavigation',

  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    chromatic: { disableSnapshot: true },
    customStyles: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
    },
  },
  decorators: [withResponsiveDataSize],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Initial active step ID',
      table: {
        type: { summary: 'TId | null' },
        defaultValue: { summary: 'null' },
      },
    },

    onChange: {
      description: 'Called when the active step changes',
      action: 'onChange',
      control: false,
      table: {
        type: { summary: '(nextId: TId, prevId: TId | null) => void' },
      },
    },

    order: {
      control: { type: 'object' },
      description:
        'Define the order of the steps. If not provided, the order will be determined by the order of `getStepProps` calls.',
      table: {
        type: { summary: 'TId[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof useFormNavigation>;

export const Preview: Story = {
  args: {},
  render(args) {
    const { getStepProps, getGroupProps } = useFormNavigation({
      value: 'info',
    });

    const group = getGroupProps(['step1', 'step2']);

    return (
      <FormNavigation {...args}>
        <FormNavigation.Step {...getStepProps('info')}>
          Infoside
        </FormNavigation.Step>
        <FormNavigation.Group title="Seksjon" {...group}>
          <FormNavigation.Step {...getStepProps('step1')}>
            Første steg
          </FormNavigation.Step>
          <FormNavigation.Step {...getStepProps('step2')}>
            Andre steg
          </FormNavigation.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
};
