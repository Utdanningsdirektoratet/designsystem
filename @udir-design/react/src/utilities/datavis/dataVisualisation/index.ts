/**
 * Utilities for working with data visualisation colors from the design system.
 * These functions return CSS custom property references.
 *
 * @requires @udir-design/theme/datavis.css must be imported in your application
 */

/**
 * Gets the categorical color palette for data visualisation.
 * Returns CSS variable references that automatically update with theme changes.
 *
 * @returns Array of 8 CSS variable references
 *
 * @example
 * ```tsx
 * import { getCategoricalColors } from '@udir-design/react/beta/utilities';
 * import '@udir-design/theme/datavis.css';
 *
 * const colors = getCategoricalColors();
 * // ['var(--uds-data-color-categorical-1)', ...]
 * ```
 */
export function getCategoricalColors(): readonly string[] {
  return Array.from(
    { length: 8 },
    (_, i) => `var(--uds-data-color-categorical-${i + 1})`,
  );
}

/**
 * Gets the sequential monochromatic color palette for data visualisation.
 * Returns CSS variable reference.
 *
 * @returns Array of 8 CSS variable references from light to dark
 *
 * @example
 * ```tsx
 * import { getSequentialMonochromaticColors } from '@udir-design/react/beta/utilities';
 * import '@udir-design/theme/datavis.css';
 *
 * const colors = getSequentialMonochromaticColors();
 * // ['var(--uds-data-color-sequential-monochromatic-1)', ...]
 * ```
 */
export function getSequentialMonochromaticColors(): readonly string[] {
  return Array.from(
    { length: 8 },
    (_, i) => `var(--uds-data-color-sequential-monochromatic-${i + 1})`,
  );
}

/**
 * Anchor hex values for the monochromatic palette (light mode).
 * These mirror --uds-data-color-sequential-monochromatic-1 and -8.
 */
const MONOCHROMATIC_HEX_START = '#5ba27e';
const MONOCHROMATIC_HEX_END = '#0b1e15';

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
  );
}

function interpolateRgb(start: string, end: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(start);
  const [r2, g2, b2] = hexToRgb(end);
  return rgbToHex(r1 + t * (r2 - r1), g1 + t * (g2 - g1), b1 + t * (b2 - b1));
}

/**
 * Generates a sequential monochromatic color palette by interpolating between the
 * lightest and darkest palette anchors. Returns hex color strings.
 *
 * Unlike `getSequentialMonochromaticColors`, this function is not limited
 * to 8 colors and always returns resolved hex values rather than CSS variable
 * references. The anchor colors are fixed to the light mode palette.
 *
 * @param count - Number of colors to generate (minimum 1)
 * @returns Array of hex color strings from light to dark
 *
 * @example
 * ```tsx
 * import { generateSequentialMonochromaticColors } from '@udir-design/react/alpha/utilities';
 *
 * const colors = generateSequentialMonochromaticColors(10);
 * // ['#5ba27e', '#4f9272', ..., '#0b1e15']
 * ```
 */
export function generateSequentialMonochromaticColors(
  count: number,
): readonly string[] {
  if (count < 1) {
    throw new RangeError(`count must be at least 1, got ${count}`);
  }
  if (count === 1) return [MONOCHROMATIC_HEX_START];
  return Array.from({ length: count }, (_, i) =>
    interpolateRgb(
      MONOCHROMATIC_HEX_START,
      MONOCHROMATIC_HEX_END,
      i / (count - 1),
    ),
  );
}

/**
 * Gets the sequential divergent color palette for data visualisation.
 * Returns CSS variable reference.
 *
 * @returns Array of 7 CSS variable references
 *
 * @example
 * ```tsx
 * import { getSequentialDivergentColors } from '@udir-design/react/beta/utilities';
 * import '@udir-design/theme/datavis.css';
 *
 * const colors = getSequentialDivergentColors();
 * // ['var(--uds-data-color-sequential-divergent-1)', ...]
 * ```
 */
export function getSequentialDivergentColors(): readonly string[] {
  return Array.from(
    { length: 7 },
    (_, i) => `var(--uds-data-color-sequential-divergent-${i + 1})`,
  );
}
