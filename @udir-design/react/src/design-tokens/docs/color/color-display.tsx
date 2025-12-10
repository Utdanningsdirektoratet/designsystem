import { Paragraph } from '../../../components/typography/paragraph/Paragraph';
import { ColorLight } from './color-previews';

type Props = {
  colorPalette: string[];
};

export const ColorDisplay = ({ colorPalette }: Props) => {
  console.log('colorPalette', colorPalette);
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-size-4)',
        flexWrap: 'wrap',
      }}
    >
      {colorPalette.map((colorValue) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          key={colorValue}
        >
          <ColorLight key={colorValue} colorVariable={colorValue} />
          <Paragraph>{colorValue}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export const identityColors = ['#76C69D', '#303030', '#BED5E8', '#E5CEAE'];

export const brandColors = [
  'var(--ds-color-accent-base-default)',
  'var(--ds-color-neutral-base-default)',
  'var(--ds-color-support1-base-default)',
  'var(--ds-color-support2-base-default)',
];

export const severityColors = [
  'var(--ds-color-info-base-default)',
  'var(--ds-color-success-base-default)',
  'var(--ds-color-danger-base-default)',
  'var(--ds-color-warning-base-default)',
];
