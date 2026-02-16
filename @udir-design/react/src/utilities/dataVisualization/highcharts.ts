/**
 * Highcharts theme configuration using Udir design system colors and typography.
 *
 * @requires @udir-design/theme/dataviz.css must be imported in your application
 */

import type * as Highcharts from 'highcharts';
import { getCategoricalColors } from './dataVisualization';

/**
 * Gets a Highcharts theme configuration object based on Udir design system.
 * Apply this to your Highcharts options to ensure consistent styling across all charts.
 *
 * The theme includes:
 * - Categorical color palette from design tokens
 * - Typography matching the design system
 *
 * **Language support:** Import Highcharts language packs separately based on your needs:
 * ```tsx
 * import 'highcharts/i18n/nb-NO'; // Norwegian Bokmål
 * ```
 *
 * @returns Partial Highcharts options object to merge with your chart configuration
 *
 * @example
 * ```tsx
 * import Highcharts from 'highcharts';
 * import HighchartsReact from 'highcharts-react-official';
 * import { getHighchartsTheme } from '@udir-design/react/utilities/dataVisualization/alpha';
 * import '@udir-design/theme/dataviz.css';
 * import 'highcharts/i18n/nb-NO'; // Optional: for Norwegian
 *
 * const theme = getHighchartsTheme();
 *
 * const chartOptions: Highcharts.Options = {
 *   ...theme,
 *   chart: {
 *     ...theme.chart,
 *     type: 'pie',
 *   },
 *   series: [{
 *     type: 'pie',
 *     data: [1, 2, 3],
 *   }],
 * };
 *
 * <HighchartsReact highcharts={Highcharts} options={chartOptions} />
 * ```
 */
export function getHighchartsTheme(): Partial<Highcharts.Options> {
  const categoricalColors = getCategoricalColors();

  return {
    colors: [...categoricalColors],
    chart: {
      style: {
        fontFamily: 'var(--ds-font-family)',
      },
      backgroundColor: 'transparent',
    },
    title: {
      style: {
        fontSize: '1.25rem',
        fontWeight: '600',
      },
    },
    subtitle: {
      style: {
        fontSize: '1rem',
      },
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      enabled: true,
      keyboardNavigation: {
        enabled: true,
        order: ['container', 'series'],
      },
    },
  };
}
