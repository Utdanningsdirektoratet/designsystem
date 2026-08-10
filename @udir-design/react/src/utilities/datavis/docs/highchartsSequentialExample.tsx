/* eslint-disable no-restricted-imports */
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { getHighchartsTheme } from '@udir-design/react/beta/utilities';
import 'highcharts/i18n/nb-NO'; // Norsk språkpakke

Highcharts.setOptions(getHighchartsTheme());

// Forutsetter at du har lagt til CSS-variablene i ditt stilark.
// Se «Sekvensiell monokromatisk palett» over for å generere dem.
const colors = Array.from(
  { length: 6 },
  (_, i) => `var(--datavis-mono-${i + 1})`,
);

export function MyChart() {
  const options: Highcharts.Options = {
    chart: { type: 'heatmap' },
    colorAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.0, colors[0]],
        [0.2, colors[1]],
        [0.4, colors[2]],
        [0.6, colors[3]],
        [0.8, colors[4]],
        [1.0, colors[5]],
      ],
    },
    series: [
      {
        type: 'heatmap',
        data: [
          [0, 0, 12],
          [1, 0, 55],
          [2, 0, 90],
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
