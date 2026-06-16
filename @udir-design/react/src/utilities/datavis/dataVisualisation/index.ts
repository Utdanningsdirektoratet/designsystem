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
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

/* ---- Oklab conversion (Björn Ottosson) ---- */

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(c: number): number {
  const s = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  return s * 255;
}

function linearRgbToOklab(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLinearRgb(
  L: number,
  a: number,
  b: number,
): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function interpolateOklab(start: string, end: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(start).map(srgbToLinear) as [
    number,
    number,
    number,
  ];
  const [r2, g2, b2] = hexToRgb(end).map(srgbToLinear) as [
    number,
    number,
    number,
  ];
  const [L1, a1, ob1] = linearRgbToOklab(r1, g1, b1);
  const [L2, a2, ob2] = linearRgbToOklab(r2, g2, b2);

  const L = L1 + t * (L2 - L1);
  const a = a1 + t * (a2 - a1);
  const ob = ob1 + t * (ob2 - ob1);

  const [lr, lg, lb] = oklabToLinearRgb(L, a, ob);
  return rgbToHex(linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb));
}

/**
 * Generates a sequential monochromatic color palette by interpolating between the
 * lightest and darkest palette anchors in the Oklab perceptual color space.
 * Returns hex color strings with perceptually uniform lightness steps.
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
 * // ['#5ba27e', '#519470', ..., '#0b1e15']
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
    interpolateOklab(
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
