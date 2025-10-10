import { Do, Dont, Stack } from '.storybook/docs/components';
import { Chip } from '@udir-design/react/beta';

/*
 * Dos and donts
 */

export const ChipEx1 = () => {
  return (
    <Stack style={{ margin: 'var(--ds-size-8) 0' }}>
      <Do description="Ein gruppe med Chip plasseres horisontalt, om det er mange skal de brytes over fleire linjer">
        <Ex1Do />
      </Do>
      <Dont description="Unngå å plassere Chip vertikalt">
        <Ex1Dont />
      </Dont>
    </Stack>
  );
};

/*
 * Examples
 */

const Ex1Do = () => {
  return (
    <Stack>
      <Chip.Checkbox>Alna</Chip.Checkbox>
      <Chip.Checkbox>Bjerke</Chip.Checkbox>
      <Chip.Checkbox>Frogner</Chip.Checkbox>
    </Stack>
  );
};

const Ex1Dont = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Chip.Checkbox>Alna</Chip.Checkbox>
      <Chip.Checkbox>Bjerke</Chip.Checkbox>
      <Chip.Checkbox>Frogner</Chip.Checkbox>
    </div>
  );
};
