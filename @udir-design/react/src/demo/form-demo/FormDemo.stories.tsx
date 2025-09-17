import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormDemo } from './FormDemo';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import { demoChromaticModes } from '../demoChromaticModes';

const meta: Meta<typeof FormDemo> = {
  title: 'Demo/Form Demo',
  component: FormDemo,
  parameters: {
    layout: 'fullscreen',
    customStyles: {
      padding: 0,
    },
    chromatic: { modes: demoChromaticModes },
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
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
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
    page: 2,
  },
};

export const FormPage3: Story = {
  ...FormStory,
  args: {
    'data-size': 'md',
    'data-color-scheme': 'auto',
    page: 3,
  },
};
