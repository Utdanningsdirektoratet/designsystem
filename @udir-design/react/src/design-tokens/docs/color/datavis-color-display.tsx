import { Card } from 'src/components/card/Card';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import {
  getCategoricalColors,
  getSequentialDivergentColors,
  getSequentialMonochromaticColors,
} from 'src/utilities/dataVisualization';

const datavisColors = getCategoricalColors().map((value, index) => ({
  number: String(index + 1),
  value,
}));

const datavisSeqMonoColors = getSequentialMonochromaticColors();
const datavisSeqDivergentColors = getSequentialDivergentColors();

export const DatavisColorDisplay = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        gap: 'var(--ds-size-1)',
        flexWrap: 'wrap',
        marginBlockEnd: 'var(--ds-size-8)',
      }}
    >
      {datavisColors.map((color) => (
        <Card
          style={{
            background: color.value,
            flexGrow: `calc(10 - (${color.number} * 2))`,
            color: 'var(--ds-color-neutral-base-contrast-default)',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            minHeight: '5rem',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          {color.number}
        </Card>
      ))}
    </div>
  );
};

export const DatavisValueColorDisplay = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        gap: 'var(--ds-size-3)',
        flexWrap: 'wrap',
        marginBlockEnd: 'var(--ds-size-8)',
      }}
    >
      {datavisColors.map((color) => (
        <div
          style={{
            background: color.value,
            color: 'var(--ds-color-neutral-base-contrast-default)',
            padding: 'var(--ds-size-3) var(--ds-size-3)',
            display: 'flex',
            width: 'var(--ds-size-22)',
            minHeight: '7rem',
            justifySelf: 'stretch',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="xs">{color.number}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export const DatavisSeqColorDisplay = () => {
  return (
    <div style={{ marginBlockEnd: 'var(--ds-size-8)' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: 'var(--ds-size-3)',
          flexWrap: 'wrap',
        }}
      >
        {datavisSeqMonoColors.map((color, index) => (
          <div
            style={{
              background: color,
              color: 'var(--ds-color-neutral-base-contrast-default)',
              padding: 'var(--ds-size-3) var(--ds-size-3)',
              display: 'flex',
              width: 'var(--ds-size-22)',
              minHeight: '7rem',
              justifySelf: 'stretch',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="xs">{index + 1}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DatavisSeqDivColorDisplay = () => {
  return (
    <div style={{ marginBlockEnd: 'var(--ds-size-8)' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: 'var(--ds-size-3)',
          flexWrap: 'wrap',
        }}
      >
        {datavisSeqDivergentColors.map((color, index) => (
          <div
            style={{
              background: color,
              color: 'var(--ds-color-neutral-base-contrast-default)',
              padding: 'var(--ds-size-3) var(--ds-size-3)',
              display: 'flex',
              width: 'var(--ds-size-22)',
              minHeight: '7rem',
              justifySelf: 'stretch',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="xs">{index + 1}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DatavisGradient = () => {
  return (
    <div
      style={{
        width: '100%',
        marginBlockEnd: 'var(--ds-size-8)',
      }}
    >
      <div
        style={{
          minHeight: '5rem',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundImage: `linear-gradient(to right, ${datavisSeqMonoColors[0]}, ${datavisSeqMonoColors[7]})`,
        }}
      />
    </div>
  );
};

export const DatavisDivGradient = () => {
  return (
    <div
      style={{
        width: '100%',
        marginBlockEnd: 'var(--ds-size-8)',
      }}
    >
      <div
        style={{
          minHeight: '5rem',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundImage: `linear-gradient(to right, ${datavisSeqDivergentColors[0]}, ${datavisSeqDivergentColors[1]}, ${datavisSeqDivergentColors[2]}, ${datavisSeqDivergentColors[3]}, ${datavisSeqDivergentColors[4]}, ${datavisSeqDivergentColors[5]}, ${datavisSeqDivergentColors[6]})`,
        }}
      />
    </div>
  );
};
