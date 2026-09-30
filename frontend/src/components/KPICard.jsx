import React from 'react';
import Card from './Card';
import StatusPill from './StatusPill';

export const KPICard = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up',
  icon: Icon,
  status,
  className = '',
}) => {
  const trendColors = {
    up: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    down: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    warning: 'text-[#F4A100] bg-[#F4A100]/10 border-[#F4A100]/30',
    neutral: 'text-[#00B4D8] bg-[#00B4D8]/10 border-[#00B4D8]/30',
  };

  return (
    <Card className={`relative overflow-hidden transition-all hover:border-[#F4A100]/40 ${className}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-2 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] text-[#F4A100]">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-heading font-semibold text-[#A0AEC0] uppercase tracking-wider">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-[#A0AEC0]/70 font-sans">{subtitle}</p>
            )}
          </div>
        </div>
        {status && <StatusPill status={status} size="sm" />}
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <div className="text-2xl font-heading font-bold text-[#F5F5F5] tracking-tight">
          {value}
        </div>
        {trend && (
          <span
            className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-md border ${
              trendColors[trendType] || trendColors.neutral
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
};

export default KPICard;
