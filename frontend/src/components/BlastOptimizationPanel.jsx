import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';
import Card from './Card';
import Badge from './Badge';
import StatusPill from './StatusPill';
import { SkeletonChart } from './SkeletonLoader';
import ErrorEmptyState from './ErrorEmptyState';
import { 
  Flame, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  BarChart2,
  Zap,
  ArrowRight
} from 'lucide-react';

export const BlastOptimizationPanel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/blast-recommendations')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load blast optimization data');
        setLoading(false);
      });
  }, []);

  const blastRecords = data?.blast_analysis?.blast_records || [];

  const chartData = [
    {
      metric: 'Powder Factor (kg/t x100)',
      before: 35.5,
      after: 29.3,
      unit: 'kg/t',
      beforeRaw: '0.355',
      afterRaw: '0.293',
    },
    {
      metric: 'P80 Fragment Size (mm)',
      before: 380,
      after: 220,
      unit: 'mm',
      beforeRaw: '380 mm',
      afterRaw: '220 mm',
    },
    {
      metric: 'Oversize % (>500mm)',
      before: 29.0,
      after: 6.8,
      unit: '%',
      beforeRaw: '29.0%',
      afterRaw: '6.8%',
    },
    {
      metric: 'Optimum Yield % (10-300mm)',
      before: 62.8,
      after: 76.4,
      unit: '%',
      beforeRaw: '62.8%',
      afterRaw: '76.4%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="orange">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Powder Factor / Block</span>
            <Flame className="w-4 h-4 text-[#F4A100]" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold font-heading text-rose-400 line-through">0.355</span>
            <span className="text-2xl font-extrabold font-heading text-[#F4A100]">0.293</span>
            <span className="text-xs text-[#A0AEC0]">kg/t</span>
          </div>
          <p className="text-xs text-emerald-400 mt-1">-17.5% Powder Reduction</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Target P80 Fragmentation</span>
            <Sparkles className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold font-heading text-amber-400 line-through">380mm</span>
            <span className="text-2xl font-extrabold font-heading text-[#00B4D8]">220mm</span>
          </div>
          <p className="text-xs text-emerald-400 mt-1">Optimum Crusher Feed</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Oversize &gt; 500mm</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-emerald-400 mt-1">
            6.8% <span className="text-xs font-normal text-[#A0AEC0]">(Down from 29%)</span>
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">No Secondary Blasting Needed</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Crusher Throughput Gain</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#F5F5F5] mt-1">+18.5% TPH</div>
          <p className="text-xs text-emerald-400 mt-1">+320 Tons/hr Crusher Rate</p>
        </Card>
      </div>

      <Card variant="blue" className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <StatusPill status="Proposed" />
              <Badge variant="blue">Drone Photogrammetry</Badge>
            </div>
            <h3 className="font-heading font-bold text-lg text-[#F5F5F5]">
              Before vs After AI Blast Optimization Comparison
            </h3>
            <p className="text-xs text-[#A0AEC0]">
              Benchmarking powder factor, target P80 particle size, and oversize particle reduction.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-heading bg-[#0D1B2A] p-2 rounded-xl border border-[#2C3E60]">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="w-3 h-3 rounded bg-rose-500" /> Before Optimization
            </span>
            <span className="flex items-center gap-1.5 text-[#F4A100] font-semibold">
              <span className="w-3 h-3 rounded bg-[#F4A100]" /> After AI Tuning (Target)
            </span>
          </div>
        </div>

        {error && !data ? (
          <ErrorEmptyState
            title="Blast Optimization Service Offline"
            message={`Unable to fetch blast fragmentation logs: ${error}`}
            onRetry={() => {
              setLoading(true);
              setError(null);
              fetch('http://localhost:8000/api/blast-recommendations')
                .then(res => res.json())
                .then(resData => { setData(resData); setLoading(false); })
                .catch(err => { setError(err.message); setLoading(false); });
            }}
          />
        ) : (
          <div className="h-[340px] w-full">
            {loading ? (
              <SkeletonChart height="340px" title="Loading Blast Optimization Metrics..." />
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2C3E60" />
                <XAxis 
                  dataKey="metric" 
                  stroke="#A0AEC0" 
                  tick={{ fill: '#A0AEC0', fontSize: 11 }}
                />
                <YAxis 
                  stroke="#A0AEC0" 
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
                <Bar dataKey="before" fill="#EF4444" opacity={0.65} radius={[4, 4, 0, 0]} name="before" />
                <Bar dataKey="after" fill="#F4A100" radius={[4, 4, 0, 0]} name="after" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </Card>
    </div>
  );
};

export default BlastOptimizationPanel;
