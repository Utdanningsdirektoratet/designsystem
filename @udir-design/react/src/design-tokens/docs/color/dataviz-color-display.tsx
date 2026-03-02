import { Card } from 'src/components/card/Card';
import { Paragraph } from 'src/components/typography/paragraph/Paragraph';
import {
  getCategoricalColors,
  getSequentialDivergentColors,
  getSequentialMonochromaticColors,
} from 'src/utilities/dataVisualization';
import classes from './dataviz.module.css';

const datavisColors = getCategoricalColors().map((value, index) => ({
  number: String(index + 1),
  value,
}));

const datavisSeqMonoColors = getSequentialMonochromaticColors();
const datavisSeqDivergentColors = getSequentialDivergentColors();

export const DatavisColorDisplay = () => {
  return (
    <div className={classes.containerSm}>
      {datavisColors.map((color) => (
        <Card
          key={color.number}
          className={classes.swatchCard}
          style={{
            background: color.value,
            flexGrow: `calc(10 - (${color.number} * 2))`,
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
    <div className={classes.containerMd}>
      {datavisColors.map((color) => (
        <div
          key={color.number}
          className={classes.swatchBox}
          style={{ background: color.value }}
        >
          <Paragraph data-size="xs">{color.number}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export const DatavisSeqColorDisplay = () => {
  return (
    <div className={classes.containerNoGap}>
      <div className={classes.containerMd}>
        {datavisSeqMonoColors.map((color, index) => (
          <div
            key={index}
            className={classes.swatchBox}
            style={{ background: color }}
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
    <div className={classes.containerNoGap}>
      <div className={classes.containerMd}>
        {datavisSeqDivergentColors.map((color, index) => (
          <div
            key={index}
            className={classes.swatchBox}
            style={{ background: color }}
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
    <div className={classes.containerNoGap}>
      <div
        className={classes.gradient}
        style={{
          backgroundImage: `linear-gradient(to right, ${datavisSeqMonoColors[0]}, ${datavisSeqMonoColors[7]})`,
        }}
      />
    </div>
  );
};

export const DatavisDivGradient = () => {
  return (
    <div className={classes.containerNoGap}>
      <div
        className={classes.gradient}
        style={{
          backgroundImage: `linear-gradient(to right, ${datavisSeqDivergentColors.join(
            ', ',
          )})`,
        }}
      />
    </div>
  );
};
