/* eslint-disable no-restricted-imports */
//@ts-expect-error example code
import { Pie } from 'react-chartjs-2';
import { getCategoricalColors } from '@udir-design/react/utilities/datavis/alpha';

export function MyChart() {
  const data = {
    labels: ['Norsk', 'Matematikk', 'Engelsk'],
    datasets: [
      {
        data: [85, 72, 91],
        backgroundColor: getCategoricalColors(),
        borderWidth: 0,
      },
    ],
  };

  return <Pie data={data} />;
}
