import React, { useState, useEffect } from 'react';
import Card from './Card';
import Badge from './Badge';
import StatusPill from './StatusPill';
import { 
  Truck, 
  Layers, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Navigation, 
  ShieldAlert,
  Zap,
  TrendingDown,
  Activity
} from 'lucide-react';

export const FleetDispatchVisualization = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isRerouted, setIsRerouted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/fleet-status')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load fleet status');
        setLoading(false);
      });
  }, []);

  const summary = data?.summary || {};

  const routes = [
    {
      id: 'route-1',
      name: 'Route Alpha (North Pit → Crusher A)',
      assignedDumpers: isRerouted ? ['HT-304'] : ['HT-304', 'HT-308', 'HT-310'],
      queueTimeMins: isRerouted ? 3.2 : 14.5,
      thresholdMins: 10.0,
      status: isRerouted ? 'Optimal' : 'Threshold Exceeded',
      destination: 'Primary Crusher A',
      shovel: 'Excavator EX-101'
    },
    {
      id: 'route-2',
      name: 'Route Beta (North Pit → Crusher B)',
      assignedDumpers: isRerouted ? ['HT-308', 'HT-310', 'HT-312'] : ['HT-312'],
      queueTimeMins: isRerouted ? 4.1 : 1.2,
      thresholdMins: 10.0,
      status: 'Optimal',
      destination: 'Primary Crusher B',
      shovel: 'Excavator EX-101'
    },
    {
      id: 'route-3',
      name: 'Route Gamma (South Pit → Waste Dump East)',
      assignedDumpers: ['HT-305'],
      queueTimeMins: 3.4,
      thresholdMins: 10.0,
      status: 'Optimal',
      destination: 'East Waste Dumps',
      shovel: 'Drill Rig DR-09'
    }
  ];

  const ex101Dumpers = isRerouted ? ['HT-304', 'HT-308'] : ['HT-304', 'HT-308', 'HT-310', 'HT-312'];

  return (
    <div className="space-y-6">
      {!isRerouted ? (
        <Card variant="orange" className="p-6 border-2 border-[#F4A100] shadow-glow-orange animate-pulse">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <StatusPill status="Proposed" />
                <Badge variant="orange" icon={AlertTriangle}>IDLE THRESHOLD EXCEEDED</Badge>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">
                Re-Route Suggestion: Crusher A Queue Delay Detected
              </h3>
              <p className="text-xs sm:text-sm text-[#A0AEC0]">
                Crusher A queue time (14.5 mins) exceeds the 10-minute threshold. Re-routing Haul Dumpers <span className="text-[#F4A100] font-mono font-bold">HT-308 & HT-310</span> to Crusher B reduces idle time by <span className="text-emerald-400 font-bold">11.3 mins per cycle</span>.
              </p>
            </div>

            <button
              onClick={() => setIsRerouted(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F4A100] hover:bg-[#F4A100]/90 text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-orange hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 fill-current" /> Apply Dispatch Re-Route
            </button>
          </div>
        </Card>
      ) : (
        <Card variant="default" className="p-6 border-2 border-emerald-500/60 bg-emerald-950/20 shadow-glow-blue">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <StatusPill status="Proposed" />
                <Badge variant="green" icon={CheckCircle2}>FLEET REBALANCED</Badge>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#F5F5F5]">
                Dispatch Re-Route Active: Fleet Load Balanced
              </h3>
              <p className="text-xs sm:text-sm text-[#A0AEC0]">
                Dumpers HT-308 & HT-310 successfully redirected to Crusher B. Average queue time reduced to <span className="text-emerald-400 font-bold">3.6 mins</span>.
              </p>
            </div>

            <button
              onClick={() => setIsRerouted(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B2A4A] hover:bg-slate-700 text-[#A0AEC0] border border-[#2C3E60] font-heading font-semibold text-xs transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Dispatch
            </button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Active Fleet Dumpers</span>
            <Truck className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#F5F5F5]">
            {loading ? '...' : `${summary.total_machines || 5} Machines`}
          </div>
          <p className="text-xs text-emerald-400 mt-1">{summary.overall_availability_pct || 87.7}% Availability</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Avg Route Queue Time</span>
            <Clock className="w-4 h-4 text-[#F4A100]" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#F4A100]">
            {isRerouted ? '3.6 Mins' : '6.4 Mins'}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">Target Threshold: &lt;10.0 mins</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Crusher A Queue Status</span>
            <AlertTriangle className={`w-4 h-4 ${isRerouted ? 'text-emerald-400' : 'text-rose-400'}`} />
          </div>
          <div className={`text-2xl font-extrabold font-heading ${isRerouted ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isRerouted ? '3.2 Mins' : '14.5 Mins'}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">{isRerouted ? 'Normal Load' : 'Threshold Exceeded'}</p>
        </Card>

        <Card variant="default">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Crusher B Queue Status</span>
            <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <div className="text-2xl font-extrabold font-heading text-[#00B4D8]">
            {isRerouted ? '4.1 Mins' : '1.2 Mins'}
          </div>
          <p className="text-xs text-[#A0AEC0] mt-1">Balanced Load</p>
        </Card>
      </div>

      <Card variant="blue" className="p-6">
        <h3 className="font-heading font-semibold text-lg text-[#F5F5F5] mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00B4D8]" /> Dumper-Shovel Operational Assignments
          </span>
          <StatusPill status="Proposed" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-3">
            <div className="flex items-center justify-between border-b border-[#2C3E60] pb-2">
              <div>
                <p className="font-heading font-bold text-base text-[#F5F5F5]">Excavator EX-101</p>
                <p className="text-xs text-[#00B4D8]">North Pit Alpha Zone</p>
              </div>
              <Badge variant="green" size="sm">Active Shovel</Badge>
            </div>

            <p className="text-xs text-[#A0AEC0]">Assigned Haul Dumpers:</p>
            <div className="grid grid-cols-2 gap-2">
              {ex101Dumpers.map(dumperId => (
                <div key={dumperId} className="p-2.5 rounded-lg bg-[#1B2A4A] border border-[#2C3E60] flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#F4A100] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#F4A100]" /> {dumperId}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Hauling</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-3">
            <div className="flex items-center justify-between border-b border-[#2C3E60] pb-2">
              <div>
                <p className="font-heading font-bold text-base text-[#F5F5F5]">Excavator EX-102</p>
                <p className="text-xs text-[#00B4D8]">Central Ridge Bench</p>
              </div>
              <Badge variant="blue" size="sm">Standby Shovel</Badge>
            </div>

            <p className="text-xs text-[#A0AEC0]">Assigned Haul Dumpers:</p>
            <div className="grid grid-cols-2 gap-2">
              {['HT-308', 'HT-312'].map(dumperId => (
                <div key={dumperId} className="p-2.5 rounded-lg bg-[#1B2A4A] border border-[#2C3E60] flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#00B4D8] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00B4D8]" /> {dumperId}
                  </span>
                  <span className="text-[10px] text-[#A0AEC0]">Dispatched</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FleetDispatchVisualization;
