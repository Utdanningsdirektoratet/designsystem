import { describe, expect, it } from 'vitest';
import {
  generateSequentialMonochromaticColors,
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

  it('returns the same array each call', () => {
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

  it('returns the same array each call', () => {
    expect(getSequentialMonochromaticColors()).toEqual(
      getSequentialMonochromaticColors(),
    );
  });
});

describe('generateSequentialMonochromaticColors', () => {
  it('returns correct number of colors', () => {
    expect(generateSequentialMonochromaticColors(10)).toHaveLength(10);
    expect(generateSequentialMonochromaticColors(1)).toHaveLength(1);
    expect(generateSequentialMonochromaticColors(8)).toHaveLength(8);
    expect(generateSequentialMonochromaticColors(14)).toHaveLength(14);
  });

  it('returns hex color strings', () => {
    for (const color of generateSequentialMonochromaticColors(10)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('starts with the lightest anchor color', () => {
    expect(generateSequentialMonochromaticColors(10)[0]).toBe('#5ba27e');
  });

  it('ends with the darkest anchor color', () => {
    const colors = generateSequentialMonochromaticColors(10);
    expect(colors[colors.length - 1]).toBe('#0b1e15');
  });

  it('returns just the start color when count is 1', () => {
    expect(generateSequentialMonochromaticColors(1)).toEqual(['#5ba27e']);
  });

  it('returns start and end when count is 2', () => {
    expect(generateSequentialMonochromaticColors(2)).toEqual([
      '#5ba27e',
      '#0b1e15',
    ]);
  });

  it('throws RangeError for count below 1', () => {
    expect(() => generateSequentialMonochromaticColors(0)).toThrow(RangeError);
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

  it('returns the same array each call', () => {
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

  it('sets title style to correct CSS variable and font size', () => {
    const { title } = getHighchartsTheme();
    expect(title?.style?.fontWeight).toBe('600');
  });

  it('sets subtitle style to correct CSS variable and font size', () => {
    const { subtitle } = getHighchartsTheme();
    expect(subtitle?.style?.fontSize).toBe('1rem');
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

  it('returns the same theme each call', () => {
    expect(getHighchartsTheme()).toEqual(getHighchartsTheme());
  });
});
