import type { Meta, StoryObj } from '@storybook/react-vite';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { demoParameters } from '../demoParameters';
import { FormDemo } from './FormDemo';

const meta: Meta<typeof FormDemo> = {
  title: 'demo/Form Demo',
  component: FormDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
      demo: true,
    },
    customStyles: {
      margin: '0 1rem',
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-role',
            enabled: true,
            // Exclude the combobox element from this check because of Suggestion
            // TODO: this selector should be removed after https://github.com/dequelabs/axe-core/issues/4672 have propagated to @storybook/addon-a11y.
            selector: ':not([role="combobox"])',
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormDemo> & {
  args: {
    'data-size'?: string;
    'data-color-scheme'?: string;
    page?: string;
  };
};

export const FormStory: Story = {
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
  },
  decorators: [withScrollHashBehavior],
  render(args) {
    return <FormDemo {...args} />;
  },
};

export const FormPage2: Story = {
  ...FormStory,
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
    page: 'ranking',
  },
};

export const FormPage3: Story = {
  ...FormStory,
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
    page: 'finish',
  },
};

export const FormPage4: Story = {
  ...FormStory,
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
    page: 'deliver',
  },
};
