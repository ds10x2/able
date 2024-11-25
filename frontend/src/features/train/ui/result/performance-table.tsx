import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Common from '@shared/styles/common';
import type { PerformanceMatrics } from '@features/train/types/analyze.type';

interface PerformanceTableProps {
  performanceMetrics?: PerformanceMatrics;
}

const PerformanceTable = ({
  performanceMetrics = { accuracy: 0, top5Accuracy: 0, precision: 0, recall: 0 },
}: PerformanceTableProps) => {
  const data = [
    { name: 'Accuracy', value: performanceMetrics.accuracy * 100 },
    { name: 'Top-5\nAccuracy', value: performanceMetrics.top5Accuracy * 100 },
    { name: 'Precision', value: performanceMetrics.precision * 100 },
    { name: 'Recall', value: performanceMetrics.recall * 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 15, right: 25, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: Common.fontSizes['2xs'] }}
          tickFormatter={(value) => parseFloat(value.toFixed(1)).toString()}
        />
        <YAxis type="category" dataKey="name" tick={{ fontSize: Common.fontSizes.xs }} />
        <Tooltip formatter={(value: number) => parseFloat(value.toFixed(1))} />
        <Bar dataKey="value" fill={Common.colors.primary} barSize={25} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceTable;
