/* eslint-disable no-restricted-imports */
//@ts-expect-error example code
import { Cell, Pie, PieChart } from 'recharts';
import { getCategoricalColors } from '@udir-design/react/utilities/dataVisualization/alpha';

export function MyChart() {
  const data = [
    { name: 'Norsk', value: 85 },
    { name: 'Matematikk', value: 72 },
    { name: 'Engelsk', value: 91 },
  ];

  const colors = getCategoricalColors();

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value">
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
