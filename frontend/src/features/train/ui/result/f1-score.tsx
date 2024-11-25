import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import Common from '@shared/styles/common';

interface F1ScoreProps {
  f1Score: number;
}

const F1Score = ({ f1Score }: F1ScoreProps) => {
  const data = [
    { name: 'Score', value: f1Score },
    { name: 'Remaining', value: 100 - f1Score },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} innerRadius="50%" outerRadius="95%" startAngle={90} endAngle={-270} dataKey="value">
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index == 0 ? Common.colors.graphDetail : Common.colors.gray500}
              fillOpacity={index === 0 ? 1 : 0.1}
            />
          ))}
        </Pie>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={Common.fontSizes.xl}
          fontWeight={Common.fontWeights.medium}
          fill="#000000"
        >
          {f1Score}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default F1Score;
