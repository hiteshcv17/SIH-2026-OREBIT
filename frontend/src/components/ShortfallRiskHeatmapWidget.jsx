import React, { useState } from 'react';
import Card from './Card';
import Badge from './Badge';
import StatusPill from './StatusPill';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

const NEXT_7_DAYS_FORECAST = [
  {
    dateStr: '2026-09-27',
    dayName: 'Sun',
    dayNumber: '27',
    monthName: 'Sep',
    targetTons: 15000,
    predictedTons: 14800,
    gapTons: 200,
    gapPct: 1.3,
    risk: 'green',
    action: 'Maintain standard shovel allocation at North Pit Alpha.',
    confidence: '98%',
  },
  {
    dateStr: '2026-09-28',
    dayName: 'Mon',
    dayNumber: '28',
    monthName: 'Sep',
    targetTons: 15000,
    predictedTons: 13800,
    gapTons: 1200,
    gapPct: 8.0,
    risk: 'amber',
    action: 'Increase Excavator EX-101 feed rate by 5% to offset haul delays.',
    confidence: '94%',
  },
  {
    dateStr: '2026-09-29',
    dayName: 'Tue',
    dayNumber: '29',
    monthName: 'Sep',
    targetTons: 15000,
    predictedTons: 12200,
    gapTons: 2800,
    gapPct: 18.7,
    risk: 'red',
    action: 'CRITICAL: Bypass Crusher B bottleneck & activate standby Haul Truck HT-308.',
    confidence: '96%',
  },
  {
    dateStr: '2026-09-30',
    dayName: 'Wed',
    dayNumber: '30',
    monthName: 'Sep',
    targetTons: 15000,
    predictedTons: 14900,
    gapTons: 100,
    gapPct: 0.7,
    risk: 'green',
    action: 'Optimal grade blend achieved. No intervention required.',
    confidence: '99%',
  },
  {
    dateStr: '2026-10-01',
    dayName: 'Thu',
    dayNumber: '01',
    monthName: 'Oct',
    targetTons: 15000,
    predictedTons: 13400,
    gapTons: 1600,
    gapPct: 10.7,
    risk: 'amber',
    action: 'Adjust blast pattern fragmentation at South Bench 380.',
    confidence: '91%',
  },
  {
    dateStr: '2026-10-02',
    dayName: 'Fri',
    dayNumber: '02',
    monthName: 'Oct',
    targetTons: 15000,
    predictedTons: 15100,
    gapTons: -100,
    gapPct: 0.0,
    risk: 'green',
    action: 'Exceeding target tonnage by +100 MT.',
    confidence: '97%',
  },
  {
    dateStr: '2026-10-03',
    dayName: 'Sat',
    dayNumber: '03',
    monthName: 'Oct',
    targetTons: 15000,
    predictedTons: 12500,
    gapTons: 2500,
    gapPct: 16.7,
    risk: 'red',
    action: 'CRITICAL: Scheduled maintenance on Primary Crusher CR-02.',
    confidence: '95%',
  },
];

export const ShortfallRiskHeatmapWidget = () => {
  const [selectedDay, setSelectedDay] = useState(NEXT_7_DAYS_FORECAST[2]);

  const getRiskStyles = (risk) => {
    switch (risk) {
      case 'red':
        return {
          bg: 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/60 shadow-glow-orange',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
          indicator: '#EF4444',
          label: 'High Risk (>15% Gap)',
        };
      case 'amber':
        return {
          bg: 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/60 shadow-sm',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
          indicator: '#F59E0B',
          label: 'Moderate Risk (5-15% Gap)',
        };
      case 'green':
      default:
        return {
          bg: 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/60 shadow-sm',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
          indicator: '#10B981',
          label: 'Low Risk (<5% Gap)',
        };
    }
  };

  return (
    <Card variant="orange" className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StatusPill status="Proposed" />
            <Badge variant="blue">7-Day Calendar Matrix</Badge>
          </div>
          <h3 className="font-heading font-bold text-lg text-[#F5F5F5]">
            Shortfall Risk Calendar (Next 7 Days)
          </h3>
          <p className="text-xs text-[#A0AEC0]">
            GitHub contribution-style heatmap predicting daily shortfall risk and AI-driven mitigation actions.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-heading">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-3 h-3 rounded bg-emerald-500" /> Low (&lt;5%)
          </span>
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <span className="w-3 h-3 rounded bg-amber-500" /> Mod (5-15%)
          </span>
          <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <span className="w-3 h-3 rounded bg-rose-500" /> High (&gt;15%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 mb-6">
        {NEXT_7_DAYS_FORECAST.map((day) => {
          const styles = getRiskStyles(day.risk);
          const isSelected = selectedDay.dateStr === day.dateStr;

          return (
            <div
              key={day.dateStr}
              onClick={() => setSelectedDay(day)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-between min-h-[110px] relative overflow-hidden group ${styles.bg} ${
                isSelected ? 'ring-2 ring-[#F4A100] scale-105 z-10 shadow-glow-orange' : ''
              }`}
            >
              <div className="text-center">
                <p className="text-[11px] font-heading font-semibold text-[#A0AEC0] uppercase tracking-wider">{day.dayName}</p>
                <p className="text-lg font-bold font-heading text-[#F5F5F5]">{day.dayNumber}</p>
                <p className="text-[10px] text-[#A0AEC0]">{day.monthName}</p>
              </div>

              <div className="mt-2 text-center">
                <span 
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ color: styles.indicator, backgroundColor: '#0D1B2A' }}
                >
                  {day.gapPct > 0 ? `-${day.gapPct}%` : 'OK'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="p-4 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-bold text-[#F5F5F5]">
                {selectedDay.dayName}, {selectedDay.monthName} {selectedDay.dayNumber}, 2026 Forecast
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-heading font-bold ${getRiskStyles(selectedDay.risk).badge}`}>
                {getRiskStyles(selectedDay.risk).label}
              </span>
            </div>

            <p className="text-sm font-heading font-semibold text-[#F4A100] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Action: {selectedDay.action}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono border-t md:border-t-0 pt-2 md:pt-0 border-[#2C3E60] w-full md:w-auto justify-between">
            <div>
              <p className="text-[#A0AEC0]">Target Output</p>
              <p className="text-[#00B4D8] font-bold">{selectedDay.targetTons.toLocaleString()} MT</p>
            </div>
            <div>
              <p className="text-[#A0AEC0]">Predicted ROM</p>
              <p className="text-[#F4A100] font-bold">{selectedDay.predictedTons.toLocaleString()} MT</p>
            </div>
            <div>
              <p className="text-[#A0AEC0]">Shortfall Gap</p>
              <p className="text-rose-400 font-bold">-{selectedDay.gapTons.toLocaleString()} MT</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ShortfallRiskHeatmapWidget;
