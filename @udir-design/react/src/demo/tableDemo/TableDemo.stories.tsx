import type { Meta, StoryObj } from '@storybook/react';
import { TableDemo } from './TableDemo';
import { useState } from 'react';
import { Size } from '@digdir/designsystemet-react';
import { Fieldset, ToggleGroup } from '../../components/alpha';
import classes from './showcase.module.css';

const meta: Meta<typeof TableDemo> = {
  title: 'Demo/Table Demo',
  component: TableDemo,
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

const sizes: Size[] = ['sm', 'md', 'lg'];
const colorModes = ['light', 'dark', 'auto'];

export const Simple: Story = {
  parameters: {
    customStyles: {
      padding: 0,
    },
  },
  render: function Render(args) {
    const [size, setSize] = useState<Size>('sm');
    const [colorMode, setColorMode] = useState('auto');
    return (
      <div>
        <div className={classes.controls} data-size="sm">
          <Fieldset>
            <Fieldset.Legend>
              Størrelse
              <code data-size="xs">(data-size)</code>
            </Fieldset.Legend>
            <ToggleGroup value={size} onChange={(val) => setSize(val as Size)}>
              {sizes.map((size) => (
                <ToggleGroup.Item key={size} value={size}>
                  {size}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </Fieldset>
          <Fieldset>
            <Fieldset.Legend>
              Fargemodus
              <code data-size="xs">(data-color-scheme)</code>
            </Fieldset.Legend>
            <ToggleGroup value={colorMode} onChange={setColorMode}>
              {colorModes.map((colorMode) => (
                <ToggleGroup.Item key={colorMode} value={colorMode}>
                  {colorMode}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </Fieldset>
        </div>
        <TableDemo {...args} data-size={size} data-color-scheme={colorMode} />
      </div>
    );
  },
};
