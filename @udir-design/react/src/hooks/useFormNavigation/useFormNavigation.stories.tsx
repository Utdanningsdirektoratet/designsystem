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
  tags: ['alpha', 'udir'],
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

    return (
      <FormNavigation>
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
});
