import { Source } from '@storybook/addon-docs/blocks';
import { useState } from 'react';
import { Card } from 'src/components/card';
import { Textfield } from 'src/components/textfield';
import { Paragraph } from 'src/components/typography/paragraph';
import {
  generateSequentialDivergentColors,
  generateSequentialMonochromaticColors,
  getCategoricalColors,
} from 'src/utilities/datavis';
import classes from './datavis.module.css';

const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;

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

export const DatavisGenSeqDivColorDisplay = ({
  showCssSnippet = true,
}: {
  showCssSnippet?: boolean;
}) => {
  const [input, setInput] = useState('7');
  const nearestOdd = (n: number) => (n % 2 === 0 ? n + 1 : n);
  const parsed = Math.round(Number(input)) || 3;
  // Use `clamp` instead of nesting `Math.max(<minValue>, Math.min(<maxValue>, ...))`:
  // the React Compiler throws an internal invariant on a `Math.*` call whose argument
  // is another call. See oxc-project/oxc/pull/24128.
  const safeCount = clamp(nearestOdd(parsed), 3, 49);
  const generatedColors = generateSequentialDivergentColors(safeCount);
  return (
    <div className={classes.container}>
      <Textfield
        label="Antall farger (oddetall)"
        type="number"
        min={3}
        max={49}
        step={2}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onBlur={() => setInput(String(safeCount))}
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
  const colors = generateSequentialMonochromaticColors(2);

  return (
    <div className={classes.containerNoGap}>
      <div
        className={classes.gradient}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[colors.length - 1]})`,
        }}
      />
    </div>
  );
};

export const DatavisDivGradient = () => {
  const colors = generateSequentialDivergentColors(7);

  return (
    <div className={classes.containerNoGap}>
      <div
        className={classes.gradient}
        style={{
          backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        }}
      />
    </div>
  );
};
