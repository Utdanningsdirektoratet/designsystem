import type { Meta, StoryObj } from '@storybook/react-vite';
import { TasklistIcon } from '@udir-design/icons';
import { withResponsiveDataSize } from '.storybook/decorators/withResponsiveDataSize';
import { useFormNavigation } from '../../utilities/hooks/useFormNavigation/useFormNavigation';
import { FormDemo } from './FormNavigationExample';
import { FormNavigation, FormNavigationItem } from '.';

const meta: Meta<typeof FormNavigation> = {
  component: FormNavigation,
  tags: ['alpha'],
  parameters: {
    componentOrigin: {
      originator: 'self',
    },
    layout: 'fullscreen',
  },
  decorators: [withResponsiveDataSize],
};

export default meta;
type Story = StoryObj<typeof FormNavigation>;

export const Preview: Story = {
  args: { title: 'Form navigation', icon: <TasklistIcon aria-hidden /> },
  render: (args) => (
    <FormNavigation {...args}>
      <FormNavigation.Item>Item 1</FormNavigation.Item>
      <FormNavigation.Item>Item 2</FormNavigation.Item>
    </FormNavigation>
  ),
};

export const FormNavigationStory: Story = {
  args: {
    title: 'Form navigation',
    icon: <TasklistIcon aria-hidden />,
  },
  render(args) {
    const { getItemProps } = useFormNavigation({ value: 0 });
    return (
      <FormNavigation {...args}>
        <FormNavigationItem {...getItemProps(0)}>Person</FormNavigationItem>
        <FormNavigationItem {...getItemProps(1)}>Vedlegg</FormNavigationItem>
        <FormNavigationItem {...getItemProps(2)}>
          Bekreftelser
        </FormNavigationItem>
        <FormNavigationItem {...getItemProps(3)}>
          Oppsummering
        </FormNavigationItem>
      </FormNavigation>
    );
  },
};

export const FormNavigationExample: Story = {
  args: { title: 'Form navigation', icon: <TasklistIcon aria-hidden /> },
  render() {
    return <FormDemo data-size={'sm'} data-color-scheme={'auto'} />;
  },
};
