import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Common from '@shared/styles/common';

interface LossData {
  epoch: string;
  training: number;
  validation: number;
}
interface LossGraphProps {
  lossData: LossData[];
}

const LossGraph = ({ lossData }: LossGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={lossData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={Common.colors.gray200} />
        <XAxis
          dataKey="epoch"
          tick={{ fontSize: Common.fontSizes['2xs'] }}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          domain={['auto', 'auto']}
          tick={{ fontSize: Common.fontSizes.xs }}
          tickFormatter={(value) => parseFloat(value.toFixed(3)).toString()}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            parseFloat(value.toFixed(3)),
            name,
          ]}
        />
        <Legend
          verticalAlign="top"
          align="right"
          height={40}
          iconSize={10}
          formatter={(value) => (
            <span style={{ color: Common.colors.graphDetail, fontSize: Common.fontSizes.xs }}>{value}</span>
          )}
          payload={[
            { value: 'Smoothed training loss', type: 'circle', color: Common.colors.primary },
            { value: 'Smoothed validation loss', type: 'line', color: Common.colors.red },
          ]}
        />
        <Line
          type="monotone"
          dataKey="training"
          stroke={Common.colors.primary}
          strokeWidth={2}
          dot={false}
          name="Smoothed training loss"
          animationDuration={600}
        />
        <Line
          type="monotone"
          dataKey="validation"
          stroke={Common.colors.red}
          strokeWidth={2}
          dot={false}
          name="Smoothed validation loss"
          animationDuration={600}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LossGraph;
