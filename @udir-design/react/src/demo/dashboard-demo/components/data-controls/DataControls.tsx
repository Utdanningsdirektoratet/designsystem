import { DownloadIcon } from '@udir-design/icons';
import { Button } from 'src/components/button/Button';
import { ToggleGroup } from 'src/components/toggleGroup/ToggleGroup';
import classes from './DataControls.module.css';

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
