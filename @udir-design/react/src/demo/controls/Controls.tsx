import { Size } from '@digdir/designsystemet-react';
import { Fieldset, ToggleGroup } from '../../alpha';
import classes from './Controls.module.css';

const sizes: Size[] = ['sm', 'md', 'lg'];
const colorModes = ['light', 'dark', 'auto'];

type ControlsProps = {
  size: Size;
  colorMode: string;
  setSize: (size: Size) => void;
  setColorMode: (colorMode: string) => void;
};

export const Controls = ({
  size,
  colorMode,
  setSize,
  setColorMode,
}: ControlsProps) => {
  return (
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
  );
};
