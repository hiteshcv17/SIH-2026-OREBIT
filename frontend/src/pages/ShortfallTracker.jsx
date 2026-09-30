import React, { useState, useEffect } from 'react';
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
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatusPill from '../components/StatusPill';
import ShortfallRiskHeatmapWidget from '../components/ShortfallRiskHeatmapWidget';
import { SkeletonChart } from '../components/SkeletonLoader';
import ErrorEmptyState from '../components/ErrorEmptyState';
import ShortfallExplainerModal from '../components/ShortfallExplainerModal';
import { 
  Target, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Filter, 
  Activity, 
  ArrowDownRight, 
  Sparkles,
  ShieldAlert,
  Radio,
  Cpu,
  HelpCircle
} from 'lucide-react';

export const ShortfallTracker = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const [filterMode, setFilterMode] = useState('30');
  const [isForecasterModalOpen, setIsForecasterModalOpen] = useState(false);

  const fetchShortfallData = () => {
    fetch('http://localhost:8000/api/shortfall-forecast')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(resData => {
        setData(resData);
        setLastRefreshed(new Date().toLocaleTimeString());
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load shortfall forecast data');
        setLoading(false);
      });
  };

  // Automated 15-second polling for live demo streaming
  useEffect(() => {
    fetchShortfallData();
    const interval = setInterval(fetchShortfallData, 15000);
    return () => clearInterval(interval);
  }, []);

  const rawRecords = data?.production_forecast?.records || [];

  const processedRecords = rawRecords.map(r => {
    const target = r.target_tons || 15000;
    const actual = r.actual_tons || 0;
    const gapTons = target - actual;
    const gapPct = ((gapTons / target) * 100);

    let riskLevel = 'green';
    let riskLabel = 'Low Risk (<5% Gap)';
    let riskColor = '#10B981';

    if (gapPct > 15) {
      riskLevel = 'red';
      riskLabel = 'High Risk (>15% Gap)';
      riskColor = '#EF4444';
    } else if (gapPct >= 5) {
      riskLevel = 'amber';
      riskLabel = 'Moderate Risk (5-15% Gap)';
      riskColor = '#F59E0B';
    }

    const formattedDate = r.date ? r.date.substring(5) : '';

    return {
      ...r,
      formattedDate,
      gapTons,
      gapPct: Math.max(0, parseFloat(gapPct.toFixed(1))),
      riskLevel,
      riskLabel,
      riskColor,
    };
  });

  const filteredRecords = processedRecords.filter(r => {
    if (filterMode === '7') return processedRecords.indexOf(r) >= processedRecords.length - 7;
    if (filterMode === '14') return processedRecords.indexOf(r) >= processedRecords.length - 14;
    if (filterMode === 'risk') return r.riskLevel === 'red' || r.riskLevel === 'amber';
    return true;
  });

  const greenDays = processedRecords.filter(r => r.riskLevel === 'green').length;
  const amberDays = processedRecords.filter(r => r.riskLevel === 'amber').length;
  const redDays = processedRecords.filter(r => r.riskLevel === 'red').length;

  const totalTarget = filteredRecords.reduce((acc, curr) => acc + curr.target_tons, 0);
  const totalActual = filteredRecords.reduce((acc, curr) => acc + curr.actual_tons, 0);
  const totalShortfall = totalTarget - totalActual;
  const avgGapPct = totalTarget > 0 ? ((totalShortfall / totalTarget) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Implemented" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Live Polling 15s (Last pulse: {lastRefreshed})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
            Production Trend & Shortfall Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            30-day daily target output vs AI-predicted ROM yield with color-coded risk bands.
          </p>
        </div>

        <button
          onClick={() => setIsForecasterModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F4A100] to-[#E67E22] text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-orange hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Cpu className="w-4 h-4 fill-current" />
          <span>AI Forecaster Explainer</span>
          <HelpCircle className="w-3.5 h-3.5 opacity-80" />
        </button>
      </div>

      <ShortfallRiskHeatmapWidget />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Total Target Output</span>
            <Target className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#F5F5F5]">
            {loading ? '...' : `${(totalTarget / 1000).toFixed(1)}k MT`}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">Planned Production Goal</p>
        </Card>

        <Card variant="orange">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">AI ROM Yield</span>
            <Activity className="w-4 h-4 text-[#F4A100]" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#F4A100]">
            {loading ? '...' : `${(totalActual / 1000).toFixed(1)}k MT`}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">Actual / Predicted Tonnage</p>
        </Card>

        <Card variant={totalShortfall > 15000 ? 'orange' : 'default'}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Cumulative Shortfall</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-rose-400">
            {loading ? '...' : `-${(totalShortfall / 1000).toFixed(1)}k MT`}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">{avgGapPct}% average gap</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Risk Band Summary</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {greenDays} Green
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {amberDays} Amber
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
              {redDays} Red
            </span>
          </div>
          <p className="text-xs text-[#A0AEC0] mt-2">Last 30 days breakdown</p>
        </Card>
      </div>

      <Card variant="blue" className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-heading font-semibold text-lg text-[#F5F5F5] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00B4D8]" /> 30-Day Target vs AI ROM Yield Comparison
            </h3>
            <p className="text-xs text-[#A0AEC0]">
              Bar graph comparing daily target output vs actual ROM yield with color-coded risk indicators.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-[#0D1B2A] p-1 rounded-xl border border-[#2C3E60]">
            <button
              onClick={() => setFilterMode('30')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                filterMode === '30'
                  ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              All 30 Days
            </button>
            <button
              onClick={() => setFilterMode('14')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                filterMode === '14'
                  ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              Last 14 Days
            </button>
            <button
              onClick={() => setFilterMode('7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                filterMode === '7'
                  ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setFilterMode('risk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                filterMode === 'risk'
                  ? 'bg-[#F4A100] text-[#0D1B2A] shadow-glow-orange'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              <Filter className="w-3 h-3 inline mr-1" /> Risk Days Only
            </button>
          </div>
        </div>

        {error && !data ? (
          <ErrorEmptyState
            title="Shortfall Forecast Data Stream Error"
            message={`Failed to fetch production telemetry: ${error}`}
            onRetry={fetchShortfallData}
          />
        ) : (
          <div className="h-[380px] w-full">
            {loading ? (
              <SkeletonChart height="380px" title="Loading 30-Day Shortfall Forecast Data..." />
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredRecords}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2C3E60" />
                <XAxis 
                  dataKey="formattedDate" 
                  stroke="#A0AEC0" 
                  tick={{ fill: '#A0AEC0', fontSize: 11 }}
                />
                <YAxis 
                  stroke="#A0AEC0" 
                  domain={[10000, 16500]}
                  tick={{ fill: '#A0AEC0', fontSize: 11 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1B2A4A',
                    borderColor: '#00B4D8',
                    borderRadius: '8px',
                    color: '#F5F5F5',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                  }}
                />
                <Bar 
                  dataKey="target_tons" 
                  fill="#00B4D8" 
                  opacity={0.3} 
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual_tons" 
                  stroke="#F4A100" 
                  strokeWidth={3} 
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    const fill = payload?.riskColor || '#F4A100';
                    return (
                      <circle
                        key={props.key}
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={fill}
                        stroke="#0D1B2A"
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
      </Card>

      {/* Shortfall Forecaster Architecture Explainer Modal */}
      <ShortfallExplainerModal
        isOpen={isForecasterModalOpen}
        onClose={() => setIsForecasterModalOpen(false)}
      />
    </div>
  );
};

export default ShortfallTracker;
