import { DownloadIcon } from '@udir-design/icons';
import classes from './DataControls.module.css';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import { Button } from 'src/components/button/Button';

type DataControlsProps = {
  value: string;
  setValue: (value: string) => void;
};

export const DataControls = ({ value, setValue }: DataControlsProps) => {
  return (
    <div className={classes.container}>
      <ToggleGroup defaultValue={value} onChange={setValue}>
        <ToggleGroup.Item value="graph">Vis som graf</ToggleGroup.Item>
        <ToggleGroup.Item value="table">Vis som tabell</ToggleGroup.Item>
      </ToggleGroup>
      <Button variant="tertiary">
        <DownloadIcon aria-hidden />
        Last ned PDF
      </Button>
    </div>
  );
};
