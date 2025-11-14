import { Heading } from '../../../components/typography/heading/Heading';
import { Paragraph } from '../../../components/typography/paragraph/Paragraph';
import styles from './color.module.css';
import type { ColorInfo } from './colors';
import { brandColors, severityColors } from './colors';

interface ColorDisplayProps {
  colorPalette: ColorInfo[];
}

export const ColorDisplay = ({ colorPalette }: ColorDisplayProps) => {
  return (
    <div className={styles.root}>
      {colorPalette.map((color) => (
        <div key={color.name}>
          <Heading level={4} data-size="xs">
            {color.name}
          </Heading>
          {color.description && (
            <Paragraph className={styles.description}>
              {color.description}
            </Paragraph>
          )}
          <div className={styles.semanticGrid}>
            {color.semantics.map((category) => (
              <div className={styles.valueGrid}>
                <Paragraph className={styles.category}>
                  {category.name}
                </Paragraph>
                <div className={styles.shadesContainer}>
                  {category.shades.map((shade) => (
                    <div key={shade.value} className={styles.colorContainer}>
                      <div
                        key={shade.value}
                        style={{ backgroundColor: shade.value }}
                        className={styles.colorSquare}
                      />
                      <Paragraph>{shade.name}</Paragraph>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const BrandColors = () => {
  return <ColorDisplay colorPalette={brandColors} />;
};

export const SeverityColors = () => {
  return <ColorDisplay colorPalette={severityColors} />;
};
