import { Source } from '@storybook/addon-docs/blocks';
import { useState } from 'react';
import { Card } from 'src/components/card';
import { Textfield } from 'src/components/textfield';
import { Paragraph } from 'src/components/typography/paragraph';
import {
  generateSequentialDivergentColors,
  generateSequentialMonochromaticColors,
  getCategoricalColors,
  getSequentialDivergentColors,
  getSequentialMonochromaticColors,
} from 'src/utilities/datavis';
import classes from './datavis.module.css';

function generateCssSnippet(colors: readonly string[], prefix: string): string {
  const vars = colors
    .map((hex, i) => `  ${prefix}-${i + 1}: ${hex};`)
    .join('\n');
  return `:root {\n${vars}\n}`;
}

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

export const DatavisGenSeqColorDisplay = ({
  showCssSnippet = true,
}: {
  showCssSnippet?: boolean;
}) => {
  const [count, setCount] = useState(7);
  const safeCount = Math.max(1, count);
  const generatedColors = generateSequentialMonochromaticColors(safeCount);
  return (
    <div className={classes.container}>
      <Textfield
        label="Antall farger"
        type="number"
        min={1}
        max={50}
        value={count}
        onChange={(e) => setCount(Number(e.currentTarget.value))}
        data-size="sm"
        size={5}
      />
      <div className={classes.swatchGrid}>
        {generatedColors.map((color, index) => (
          <div
            key={index}
            className={classes.swatchBox}
            style={{ background: color }}
          >
            <Paragraph data-size="xs">{index + 1}</Paragraph>
          </div>
        ))}
      </div>
      {showCssSnippet && (
        <Source
          code={generateCssSnippet(generatedColors, '--datavis-mono')}
          language="css"
        />
      )}
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

export const DatavisGenSeqDivColorDisplay = ({
  showCssSnippet = true,
}: {
  showCssSnippet?: boolean;
}) => {
  const [count, setCount] = useState(7);
  const safeCount = Math.max(3, count);
  const generatedColors = generateSequentialDivergentColors(safeCount);
  return (
    <div className={classes.container}>
      <Textfield
        label="Antall farger"
        type="number"
        min={3}
        max={50}
        value={count}
        onChange={(e) => setCount(Number(e.currentTarget.value))}
        data-size="sm"
        size={5}
      />
      <div className={classes.swatchGrid}>
        {generatedColors.map((color, index) => (
          <div
            key={index}
            className={classes.swatchBox}
            style={{ background: color }}
          >
            <Paragraph data-size="xs">{index + 1}</Paragraph>
          </div>
        ))}
      </div>
      {showCssSnippet && (
        <Source
          code={generateCssSnippet(generatedColors, '--datavis-divergent')}
          language="css"
        />
      )}
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
