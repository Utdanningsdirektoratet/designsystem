import { describe, expect, it } from 'vitest';
import {
  getCategoricalColors,
  getSequentialDivergentColors,
  getSequentialMonochromaticColors,
} from './dataVisualisation';
import { getHighchartsTheme } from './highcharts';

describe('getCategoricalColors', () => {
  it('returns 8 categorical CSS-colorvalues', () => {
    expect(getCategoricalColors()).toHaveLength(8);
  });

  it('returns a list of 8 categorical CSS-colorvalues', () => {
    for (const color of getCategoricalColors()) {
      expect(color).toMatch(/^var\(--uds-data-color-categorical-\d+\)$/);
    }
  });

  it('returns colors numbered 1-8 in order', () => {
    getCategoricalColors().forEach((color, i) => {
      expect(color).toBe(`var(--uds-data-color-categorical-${i + 1})`);
    });
  });

  it('returns the same color sequence each call', () => {
    expect(getCategoricalColors()).toEqual(getCategoricalColors());
  });
});

describe('getSequentialMonochromaticColors', () => {
  it('returns 8 sequential monochromatic CSS-colorvalues', () => {
    expect(getSequentialMonochromaticColors()).toHaveLength(8);
  });

  it('returns a list of 8 sequential monochromatic CSS-colorvalues', () => {
    for (const color of getSequentialMonochromaticColors()) {
      expect(color).toMatch(
        /^var\(--uds-data-color-sequential-monochromatic-\d+\)$/,
      );
    }
  });

  it('returns colors numbered 1-8 in order', () => {
    getSequentialMonochromaticColors().forEach((color, i) => {
      expect(color).toBe(
        `var(--uds-data-color-sequential-monochromatic-${i + 1})`,
      );
    });
  });

  it('returns the same color sequence each call', () => {
    expect(getSequentialMonochromaticColors()).toEqual(
      getSequentialMonochromaticColors(),
    );
  });
});

describe('getSequentialDivergentColors', () => {
  it('returns 7 sequential divergent CSS-colorvalues', () => {
    expect(getSequentialDivergentColors()).toHaveLength(7);
  });

  it('returns a list of 7 sequential divergent CSS-colorvalues', () => {
    for (const color of getSequentialDivergentColors()) {
      expect(color).toMatch(
        /^var\(--uds-data-color-sequential-divergent-\d+\)$/,
      );
    }
  });

  it('returns colors numbered 1-7 in order', () => {
    getSequentialDivergentColors().forEach((color, i) => {
      expect(color).toBe(`var(--uds-data-color-sequential-divergent-${i + 1})`);
    });
  });

  it('returns the same color sequence each call', () => {
    expect(getSequentialDivergentColors()).toEqual(
      getSequentialDivergentColors(),
    );
  });
});

describe('getHighchartsTheme', () => {
  it('uses all 8 categorical CSS-colorvalues', () => {
    const { colors } = getHighchartsTheme();
    expect(colors).toEqual([...getCategoricalColors()]);
  });

  it('sets chart font family to correct CSS variable', () => {
    const theme = getHighchartsTheme();
    expect(theme.chart?.style?.fontFamily).toBe('var(--ds-font-family)');
  });

  it('sets transparent background for chart', () => {
    expect(getHighchartsTheme().chart?.backgroundColor).toBe('transparent');
  });

  it('sets correct title style', () => {
    const { title } = getHighchartsTheme();
    expect(title?.style).toEqual({
      fontSize: '1.25rem',
      fontWeight: '600',
    });
  });

  it('sets correct subtitle style', () => {
    const { subtitle } = getHighchartsTheme();
    expect(subtitle?.style).toEqual({
      fontSize: '1rem',
    });
  });

  it('disables credits', () => {
    expect(getHighchartsTheme().credits?.enabled).toBe(false);
  });

  it('enables accessibility with keyboard navigation', () => {
    const { accessibility } = getHighchartsTheme();
    expect(accessibility?.enabled).toBe(true);
    expect(accessibility?.keyboardNavigation?.enabled).toBe(true);
    expect(accessibility?.keyboardNavigation?.order).toEqual([
      'container',
      'series',
    ]);
  });

  it('returns a fresh colors array each call', () => {
    const theme = getHighchartsTheme();

    theme.colors?.push('mutated');

    expect(getHighchartsTheme().colors).toEqual([...getCategoricalColors()]);
  });

  it('returns equivalent theme values each call', () => {
    expect(getHighchartsTheme()).toEqual(getHighchartsTheme());
  });
});
