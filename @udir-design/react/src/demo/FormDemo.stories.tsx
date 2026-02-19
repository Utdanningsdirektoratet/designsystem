import './demoSizing.css';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';
import preview from '.storybook/preview';
import { demoParameters } from './demoParameters';
import { FormDemo } from './pages/form-demo/FormDemo';

const meta = preview.meta({
  title: 'demo/Form Demo',
  component: FormDemo,
  parameters: {
    ...demoParameters,
    componentOrigin: {
      originator: 'self',
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
});

export const FormStory = meta.story({
  args: {
    'data-color-scheme': 'light',
  },
  decorators: [withScrollHashBehavior],
  render(args) {
    return <FormDemo {...args} />;
  },
});

export const FormPage2 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'project',
  },
});

export const FormPage3 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'documentation',
  },
});

export const FormPage4 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'deliver',
  },
});

export const FormPage5 = meta.story({
  ...FormStory.input,
  args: {
    'data-color-scheme': 'light',
    page: 'confirmation',
  },
});
