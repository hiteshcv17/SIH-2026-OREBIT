import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';

export const ShortfallChart = ({
  records = [],
  height = 320,
  showLegend = true,
  className = '',
}) => {
  if (!records || records.length === 0) {
    return (
      <div className={`flex items-center justify-[#A0AEC0] text-sm h-64 border border-dashed border-[#2C3E60] rounded-xl p-6 ${className}`}>
        No shortfall production records available for display.
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} data-testid="shortfall-chart-container">
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={records} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2C3E60" opacity={0.5} />
          <XAxis 
            dataKey="formattedDate" 
            stroke="#A0AEC0" 
            tick={{ fill: '#A0AEC0', fontSize: 11 }}
            axisLine={{ stroke: '#2C3E60' }}
          />
          <YAxis 
            stroke="#A0AEC0" 
            tick={{ fill: '#A0AEC0', fontSize: 11 }}
            axisLine={{ stroke: '#2C3E60' }}
            tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
          />
          <RechartsTooltip 
            contentStyle={{ 
              backgroundColor: '#0D1B2A', 
              borderColor: '#2C3E60', 
              borderRadius: '0.75rem',
              color: '#F5F5F5',
              fontSize: '12px'
            }}
            formatter={(value, name) => [
              `${value.toLocaleString()} Tons`, 
              name === 'actual_tons' ? 'Actual Yield' : 'Target Quota'
            ]}
          />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36} 
              wrapperStyle={{ fontSize: '12px', color: '#A0AEC0' }} 
            />
          )}
          <Bar 
            dataKey="actual_tons" 
            name="Actual Yield (Tons)" 
            fill="#00B4D8" 
            radius={[4, 4, 0, 0]} 
          />
          <Line 
            type="monotone" 
            dataKey="target_tons" 
            name="Target Quota (Tons)" 
            stroke="#F4A100" 
            strokeWidth={3} 
            dot={{ r: 3, fill: '#F4A100' }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShortfallChart;
