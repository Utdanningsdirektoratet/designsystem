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
type Story = StoryObj<typeof FormDemo>;

export const FormStory: Story = {
  args: {
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
    'data-color-scheme': 'auto',
    page: 2,
  },
};

export const FormPage3: Story = {
  ...FormStory,
  args: {
    'data-color-scheme': 'auto',
    page: 3,
  },
};
