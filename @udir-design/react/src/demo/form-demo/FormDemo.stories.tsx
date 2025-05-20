import type { Meta, StoryObj } from '@storybook/react';
import { FormDemo } from './FormDemo';
import { useState } from 'react';
import { Size } from '@digdir/designsystemet-react';
import { Controls } from '../controls/Controls';
import classes from './FormDemo.module.css';
import { withScrollHashBehavior } from '.storybook/decorators/withScrollHashBehavior';

const meta: Meta<typeof FormDemo> = {
  title: 'Demo/Form Demo',
  component: FormDemo,
  parameters: {
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
  decorators: [withScrollHashBehavior],
  render(args) {
    const [size, setSize] = useState<Size>('sm');
    const [colorMode, setColorMode] = useState('auto');
    return (
      <div className={classes.root}>
        <Controls
          size={size}
          colorMode={colorMode}
          setSize={setSize}
          setColorMode={setColorMode}
        />
        <FormDemo {...args} data-size={size} data-color-scheme={colorMode} />
      </div>
    );
  },
};
