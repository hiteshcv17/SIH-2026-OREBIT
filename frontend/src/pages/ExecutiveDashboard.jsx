import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatusPill from '../components/StatusPill';
import ShortfallRiskHeatmapWidget from '../components/ShortfallRiskHeatmapWidget';
import { SkeletonCard } from '../components/SkeletonLoader';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  Zap, 
  Map as MapIcon, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles,
  Radio,
  Briefcase,
  HardHat,
  Truck,
  Flame,
  RefreshCw
} from 'lucide-react';

export const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const { user, role, switchRole } = useAuth();
  const [telemetry, setTelemetry] = useState(null);
  const [shortfallData, setShortfallData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchDashboardData = () => {
    Promise.all([
      fetch('http://localhost:8000/api/equipment-health').then(r => r.json()),
      fetch('http://localhost:8000/api/shortfall-forecast').then(r => r.json())
    ])
      .then(([eqRes, sfRes]) => {
        setTelemetry(eqRes);
        setShortfallData(sfRes);
        setLastRefreshed(new Date().toLocaleTimeString());
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading dashboard data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  const rawFleet = telemetry?.equipment?.fleet || [];
  const isExec = role === 'Executive';

  return (
    <div className="space-y-8">
      {/* Dynamic Persona Role Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isExec 
          ? 'bg-[#1B2A4A]/90 border-[#F4A100]/40 shadow-glow-orange' 
          : 'bg-[#1B2A4A]/90 border-[#00B4D8]/40 shadow-glow-blue'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isExec ? 'bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/40' : 'bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40'
          }`}>
            {isExec ? <Briefcase className="w-5 h-5" /> : <HardHat className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#F5F5F5]">
                {isExec ? 'HQ Executive Command Perspective' : 'Field Operations Supervisor Perspective'}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isExec ? 'bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/30' : 'bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30'
              }`}>
                {user.badge}
              </span>
            </div>
            <p className="text-xs text-[#A0AEC0]">
              {isExec 
                ? 'Emphasizing national FY30 target run-rate (3.5 MT), financial shortfall gap risk, and strategic AI decisions.' 
                : 'Emphasizing current shift ROM yield, equipment PHM machine warnings, and haul route queue delays.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs text-[#A0AEC0] font-heading hidden lg:inline">Toggle View:</span>
          <div className="flex rounded-xl bg-[#0D1B2A] p-1 border border-[#2C3E60]">
            <button
              onClick={() => switchRole('Executive')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                isExec ? 'bg-[#F4A100] text-[#0D1B2A] shadow-sm' : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Executive
            </button>
            <button
              onClick={() => switchRole('Mine Supervisor')}
              className={`px-3 py-1 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                !isExec ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-sm' : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" /> Supervisor
            </button>
          </div>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Implemented" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Live Telemetry Stream (15s Pulse: {lastRefreshed})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
            {isExec ? 'Executive Operations Command Center' : 'Mine Operations Ground Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            {isExec 
              ? 'Executive summary aggregating national production trajectory, shortfall risk, PHM telematics, and AI recommendations.' 
              : 'Pit-level operational feed for ground supervisors tracking active shift output, haulage queues, and machine health.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={isExec ? "orange" : "blue"} icon={Sparkles}>
            {isExec ? 'FY30 National Goal Active' : 'Shift 1 Active (Zone Alpha)'}
          </Badge>
        </div>
      </div>

      {/* Dynamic Role KPI Cards Row */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI Card 1 */}
        {isExec ? (
          <Card variant="orange" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Production Trajectory</span>
              <Target className="w-4 h-4 text-[#F4A100]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-heading text-[#F5F5F5]">2.35 MT</span>
                <span className="text-xs font-mono font-bold text-[#F4A100]">→ 3.5 MT by FY30</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-[#A0AEC0] mb-1">
                  <span>Current FY26 Run-Rate</span>
                  <span>67.1% of FY30 Target</span>
                </div>
                <div className="w-full h-2 bg-[#0D1B2A] rounded-full overflow-hidden border border-[#2C3E60]">
                  <div className="h-full bg-[#F4A100] rounded-full shadow-glow-orange" style={{ width: '67.1%' }} />
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card variant="blue" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Today's Shift ROM Target</span>
              <Layers className="w-4 h-4 text-[#00B4D8]" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold font-heading text-[#F5F5F5]">8,450 MT</span>
                <span className="text-xs font-mono font-bold text-[#00B4D8]">Target: 9,200 MT</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-[#A0AEC0] mb-1">
                  <span>Shift Progress (6.5 hrs)</span>
                  <span className="text-emerald-400 font-bold">91.8% Achieved</span>
                </div>
                <div className="w-full h-2 bg-[#0D1B2A] rounded-full overflow-hidden border border-[#2C3E60]">
                  <div className="h-full bg-[#00B4D8] rounded-full shadow-glow-blue" style={{ width: '91.8%' }} />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* KPI Card 2 */}
        {isExec ? (
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Shortfall Risk Level</span>
              <TrendingDown className="w-4 h-4 text-amber-400" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold font-heading text-amber-400">Moderate Risk</span>
              </div>
              <p className="text-xs text-[#A0AEC0] font-mono">
                Current Gap: <span className="text-rose-400 font-bold">-1,240 MT</span> (91.7% compliance)
              </p>
            </div>
          </Card>
        ) : (
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Haul Route Dispatch Queue</span>
              <Truck className="w-4 h-4 text-[#F4A100]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold font-heading text-[#F4A100]">14.2 min Queue</span>
              </div>
              <p className="text-xs text-rose-400 font-mono font-semibold">
                Shovel SH-02 Bottleneck (&gt;10m idle)
              </p>
            </div>
          </Card>
        )}

        {/* KPI Card 3 */}
        {isExec ? (
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Machines RUL &lt; 15% Warning</span>
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-heading text-rose-400">2 Machines</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  HT-304 (12%)
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  DR-09 (14%)
                </span>
              </div>
            </div>
          </Card>
        ) : (
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Urgent PHM Overhaul Alerts</span>
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-heading text-rose-400">HT-304 Critical</span>
              </div>
              <p className="text-xs text-[#A0AEC0] font-mono">
                Trans Temp: <span className="text-rose-400 font-bold">91.2°C</span> (High Vibration)
              </p>
            </div>
          </Card>
        )}

        {/* KPI Card 4 */}
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">
              {isExec ? 'Open Prescriptive Actions' : 'Field Shift Actions'}
            </span>
            <Zap className="w-4 h-4 text-[#00B4D8]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold font-heading text-[#00B4D8]">
                {isExec ? '5 Strategic Actions' : '3 Re-dispatch Actions'}
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-semibold">
              {isExec ? '+$56,500 Total Impact' : 'Immediate Pit Re-balance Ready'}
            </p>
          </div>
        </Card>
      </div>
    )}

      {/* Phase 9 Shortfall Risk Heatmap Widget */}
      <ShortfallRiskHeatmapWidget />

      {/* Bottom Row: Quick Access Module Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GIS Reserve Map Quick Card */}
        <Card variant="blue" className="p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="blue" icon={MapIcon}>2D GIS Engine</Badge>
              <StatusPill status="Implemented" size="sm" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">GIS Reserve Map Viewer</h3>
            <p className="text-xs text-[#A0AEC0]">
              Interactive satellite prospectivity heatmap, UNFC G2/G3 borehole logs, and downhole ore grade cross-sections.
            </p>
          </div>

          <button
            onClick={() => navigate('/reserve-map')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-blue flex items-center justify-center gap-2"
          >
            Launch GIS Reserve Map <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* PHM Equipment Telemetry Alerts Quick Card */}
        <Card variant="orange" className="p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="orange" icon={ShieldAlert}>PHM Alert Core</Badge>
              <StatusPill status="Implemented" size="sm" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">Equipment PHM Telematics</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/50 flex justify-between items-center">
                <span className="font-heading font-bold text-rose-300">Haul Truck HT-304</span>
                <span className="font-mono text-rose-400 font-bold">12% RUL</span>
              </div>
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/50 flex justify-between items-center">
                <span className="font-heading font-bold text-rose-300">Drill Rig DR-09</span>
                <span className="font-mono text-rose-400 font-bold">14% RUL</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/equipment-health')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#F4A100] hover:bg-[#F4A100]/90 text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-orange flex items-center justify-center gap-2"
          >
            Open Equipment Health & Dispatch <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

        {/* AI Prescriptive Action Feed Quick Card */}
        <Card variant="default" className="p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="blue" icon={Zap}>AI Prescriptive Feed</Badge>
              <StatusPill status="Proposed" size="sm" />
            </div>
            <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">High-Impact Prescriptive Feed</h3>
            <p className="text-xs text-[#A0AEC0]">
              5 open actions for maintenance, monsoon bench shifting, powder factor tuning, and dumper dispatch.
            </p>
          </div>

          <button
            onClick={() => navigate('/prescriptive-feed')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#1B2A4A] hover:bg-[#22385E] text-[#F5F5F5] border border-[#2C3E60] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            Review AI Prescriptive Actions <ArrowRight className="w-4 h-4" />
          </button>
        </Card>

      </div>
    </div>
  );
};

export default ExecutiveDashboard;

