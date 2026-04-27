/* eslint-disable no-restricted-imports */
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { getHighchartsTheme } from '@udir-design/react/utilities/datavis/alpha';
import { getSequentialMonochromaticColors } from '@udir-design/react/utilities/datavis/alpha';
import '@udir-design/theme/datavis.css';
import 'highcharts/i18n/nb-NO'; // Norsk språkpakke

Highcharts.setOptions(getHighchartsTheme());
const seq = getSequentialMonochromaticColors();

export function MyChart() {
  const options: Highcharts.Options = {
    chart: { type: 'heatmap' },
    colorAxis: {
      min: 0,
      max: 100,
      stops: [
        [0.0, seq[0]],
        [0.2, seq[1]],
        [0.4, seq[2]],
        [0.6, seq[3]],
        [0.8, seq[4]],
        [1.0, seq[5]],
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
