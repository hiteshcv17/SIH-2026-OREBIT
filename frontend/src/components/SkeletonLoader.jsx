import React from 'react';

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`p-6 rounded-2xl bg-[#1B2A4A]/60 border border-[#2C3E60] space-y-4 animate-pulse ${className}`}>
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 bg-[#2C3E60] rounded" />
        <div className="w-5 h-5 bg-[#2C3E60] rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-7 w-36 bg-[#2C3E60] rounded" />
        <div className="h-3 w-48 bg-[#2C3E60]/70 rounded" />
      </div>
      <div className="h-2 w-full bg-[#0D1B2A] rounded-full overflow-hidden border border-[#2C3E60]">
        <div className="h-full bg-[#2C3E60] w-2/3" />
      </div>
    </div>
  );
};

export const SkeletonChart = ({ height = '380px', title = 'Loading Chart Telemetry...' }) => {
  return (
    <div 
      className="p-6 rounded-2xl bg-[#1B2A4A]/60 border border-[#2C3E60] flex flex-col justify-between animate-pulse"
      style={{ minHeight: height }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-5 w-56 bg-[#2C3E60] rounded" />
          <div className="h-3 w-72 bg-[#2C3E60]/70 rounded" />
        </div>
        <div className="h-8 w-24 bg-[#2C3E60] rounded-xl" />
      </div>

      <div className="flex-1 flex items-end justify-between gap-3 pt-6 pb-2 px-4">
        {[40, 65, 80, 50, 90, 70, 85, 60, 75, 55, 95, 65].map((h, i) => (
          <div 
            key={i} 
            className="w-full bg-gradient-to-t from-[#0D1B2A] via-[#2C3E60]/50 to-[#2C3E60] rounded-t-lg transition-all duration-300"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="pt-4 border-t border-[#2C3E60]/50 flex justify-between items-center text-xs text-[#A0AEC0]">
        <div className="h-3 w-32 bg-[#2C3E60] rounded" />
        <div className="h-3 w-24 bg-[#2C3E60] rounded" />
      </div>
    </div>
  );
};

export const SkeletonList = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-[#1B2A4A]/60 border border-[#2C3E60] space-y-4 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-[#2C3E60] rounded" />
              <div className="h-3 w-24 bg-[#2C3E60]/70 rounded" />
            </div>
            <div className="h-6 w-16 bg-[#2C3E60] rounded-full" />
          </div>

          <div className="p-3 rounded-xl bg-[#0D1B2A] space-y-2 border border-[#2C3E60]">
            <div className="h-3 w-40 bg-[#2C3E60] rounded" />
            <div className="h-3 w-full bg-[#2C3E60]/60 rounded-full" />
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#2C3E60]">
            <div className="h-8 bg-[#2C3E60]/60 rounded" />
            <div className="h-8 bg-[#2C3E60]/60 rounded" />
            <div className="h-8 bg-[#2C3E60]/60 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default {
  SkeletonCard,
  SkeletonChart,
  SkeletonList
};
