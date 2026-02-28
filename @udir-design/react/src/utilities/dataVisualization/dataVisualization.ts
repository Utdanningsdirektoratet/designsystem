/**
 * Utilities for working with data visualization colors from the design system.
 * These functions return CSS custom property references.
 *
 * @requires @udir-design/theme/dataviz.css must be imported in your application
 */

/**
 * Gets the categorical color palette for data visualization.
 * Returns CSS variable references that automatically update with theme changes.
 *
 * @returns Array of 8 CSS variable references
 *
 * @example
 * ```tsx
 * import { getCategoricalColors } from '@udir-design/react/utilities/dataVisualization/alpha';
 * import '@udir-design/theme/dataviz.css';
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
 * Gets the sequential monochromatic color palette for data visualization.
 * Returns CSS variable reference.
 *
 * @returns Array of 8 CSS variable references from light to dark
 *
 * @example
 * ```tsx
 * import { getSequentialMonochromaticColors } from '@udir-design/react/utilities/dataVisualization/alpha';
 * import '@udir-design/theme/dataviz.css';
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
 * Gets the sequential divergent color palette for data visualization.
 * Returns CSS variable reference.
 *
 * @returns Array of 7 CSS variable references
 *
 * @example
 * ```tsx
 * import { getSequentialDivergentColors } from '@udir-design/react/utilities/dataVisualization/alpha';
 * import '@udir-design/theme/dataviz.css';
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
