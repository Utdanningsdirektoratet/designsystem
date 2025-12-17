import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import preview from '.storybook/preview';
import type { DecoratorType } from '.storybook/types';
import { FormNavigation } from 'src/components/formNavigation';
import type { UseFormNavigationProps } from './useFormNavigation';
import { useFormNavigation } from './useFormNavigation';

const meta = preview.meta<
  UseFormNavigationProps,
  DecoratorType,
  Partial<UseFormNavigationProps>
>({
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
});

export const Preview = meta.story({
  args: {
    value: 'info',
  },
  render(args) {
    const { getStepProps, getGroupProps } = useFormNavigation(args);

    const group = getGroupProps(['step1', 'step2']);
    const step1 = getStepProps({ stepId: 'step1', label: 'Første steg' });
    const step2 = getStepProps({ stepId: 'step2', label: 'Andre steg' });

    return (
      <FormNavigation>
        <FormNavigation.Step {...getStepProps('info')}>
          Infoside
        </FormNavigation.Step>
        <FormNavigation.Group title="Seksjon" {...group}>
          <FormNavigation.Step {...step1} />
          <FormNavigation.Step {...step2} />
        </FormNavigation.Group>
      </FormNavigation>
    );
  },
});
