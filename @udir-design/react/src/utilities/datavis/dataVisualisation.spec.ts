import { describe, expect, it } from 'vitest';
import {
  generateMonochromaticColors,
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
  it('returns 8 colors by default', () => {
    expect(getSequentialMonochromaticColors()).toHaveLength(8);
  });

  it('returns all 8 colors as CSS variable references', () => {
    for (const color of getSequentialMonochromaticColors()) {
      expect(color).toMatch(
        /^var\(--uds-data-color-sequential-monochromatic-\d+\)$/,
      );
    }
  });

  it('returns colors numbered 1-8 in order when called with default', () => {
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

describe('generateMonochromaticColors', () => {
  it('returns correct number of colors', () => {
    expect(generateMonochromaticColors(10)).toHaveLength(10);
    expect(generateMonochromaticColors(1)).toHaveLength(1);
    expect(generateMonochromaticColors(8)).toHaveLength(8);
    expect(generateMonochromaticColors(14)).toHaveLength(14);
  });

  it('returns hex color strings', () => {
    for (const color of generateMonochromaticColors(10)) {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('starts with the lightest anchor color', () => {
    expect(generateMonochromaticColors(10)[0]).toBe('#5ba27e');
  });

  it('ends with the darkest anchor color', () => {
    const colors = generateMonochromaticColors(10);
    expect(colors[colors.length - 1]).toBe('#0b1e15');
  });

  it('returns just the start color when count is 1', () => {
    expect(generateMonochromaticColors(1)).toEqual(['#5ba27e']);
  });

  it('returns start and end when count is 2', () => {
    expect(generateMonochromaticColors(2)).toEqual(['#5ba27e', '#0b1e15']);
  });

  it('throws RangeError for count below 1', () => {
    expect(() => generateMonochromaticColors(0)).toThrow(RangeError);
  });
});
