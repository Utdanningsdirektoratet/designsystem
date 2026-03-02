/* eslint-disable no-restricted-imports */
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getHighchartsTheme } from '@udir-design/react/utilities/dataVisualization/alpha';
import '@udir-design/theme/dataviz.css';
import 'highcharts/i18n/nb-NO'; // Norsk språkpakke

Highcharts.setOptions(getHighchartsTheme());

export function MyChart() {
  const options: Highcharts.Options = {
    chart: { type: 'pie' },
    title: { text: 'Prøveresultater' },
    series: [
      {
        type: 'pie',
        name: 'Antall',
        data: [
          { name: 'Bestått', y: 300 },
          { name: 'Ikke bestått', y: 50 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
