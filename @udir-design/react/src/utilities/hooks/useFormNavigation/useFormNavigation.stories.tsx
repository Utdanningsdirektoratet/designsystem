import type { Meta, StoryObj } from '@storybook/react-vite';
import { InformationSquareIcon } from '@udir-design/icons';
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
    const { getStepProps } = useFormNavigation({ value: 'infoside' });
    return (
      <FormNavigation {...args}>
        <FormNavigation.Step {...getStepProps('infoside')}>
          <InformationSquareIcon aria-hidden />
          Infoside
        </FormNavigation.Step>
        <FormNavigation.Group title="Navigasjonsgruppe">
          <FormNavigation.Group.Step {...getStepProps('step 1')}>
            Steg 1
          </FormNavigation.Group.Step>
          <FormNavigation.Group.Step {...getStepProps('step 2')}>
            Steg 2
          </FormNavigation.Group.Step>
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
};
