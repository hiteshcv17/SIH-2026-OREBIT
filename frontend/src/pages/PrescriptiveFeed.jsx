import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatusPill from '../components/StatusPill';
import BlastOptimizationPanel from '../components/BlastOptimizationPanel';
import { 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Wrench, 
  CloudRain, 
  Flame, 
  Truck, 
  Filter, 
  Plus, 
  RotateCcw,
  Check,
  Ban,
  Clock,
  ArrowRight,
  TrendingUp,
  BarChart2
} from 'lucide-react';

const INITIAL_RECOMMENDATIONS = [
  {
    id: 'REC-2026-001',
    category: 'Maintenance Scheduling',
    categoryIcon: Wrench,
    title: 'Urgent Sub-System Inspection for Haul Truck HT-304',
    description: 'Telemetry indicates Transmission Oil Temp at 91.2°C and Remaining Useful Life (RUL) at 12%. Immediate 2-hour preventative overhaul avoids catastrophic breakdown.',
    impact: '+$34,000 Saved Downtime',
    confidence: '97% Match',
    priority: 'CRITICAL',
    status: 'pending',
    timestamp: 'Just now',
  },
  {
    id: 'REC-2026-002',
    category: 'Weather-Adaptive Bench Selection',
    categoryIcon: CloudRain,
    title: 'Shift Excavator EX-101 to High-Wall Bench 410',
    description: 'Radar predicts 35mm monsoon rainfall in 4 hours. Shifting excavation from South Pit low bench prevents pit flooding and maintains high-grade ore flow.',
    impact: '+580 Tons Ore Secured',
    confidence: '94% Match',
    priority: 'HIGH',
    status: 'pending',
    timestamp: '12 mins ago',
  },
  {
    id: 'REC-2026-003',
    category: 'Fleet Dispatch',
    categoryIcon: Truck,
    title: 'Dynamic Reroute: Dispatch 4 Haul Trucks to Crusher B',
    description: 'Primary Crusher A is experiencing a 15-minute queue delay. Redirecting 4 haul trucks reduces idle fuel consumption by 14% and optimizes throughput.',
    impact: '-14% Fuel Consumption',
    confidence: '98% Match',
    priority: 'HIGH',
    status: 'pending',
    timestamp: '28 mins ago',
  },
  {
    id: 'REC-2026-004',
    category: 'Blast Tuning',
    categoryIcon: Flame,
    title: 'Adjust Powder Factor on Central Bench 395',
    description: 'Drone photogrammetry indicates P80 size of 380mm (excessive oversize). Increasing emulsion powder factor by 0.04 kg/t improves fragmentation yield.',
    impact: '+18% Primary Crusher TPH',
    confidence: '91% Match',
    priority: 'MEDIUM',
    status: 'pending',
    timestamp: '1 hour ago',
  },
  {
    id: 'REC-2026-005',
    category: 'Maintenance Scheduling',
    categoryIcon: Wrench,
    title: 'Replace Rotary Bearing on Drill Rig DR-09',
    description: 'Vibration telematics at 0.22 mm/s exceed 0.15 threshold. Scheduled replacement during shift change prevents unprogrammed downtime.',
    impact: '+6.5 hrs Operating Uptime',
    confidence: '89% Match',
    priority: 'MEDIUM',
    status: 'pending',
    timestamp: '2 hours ago',
  },
];

export const PrescriptiveFeed = () => {
  const [items, setItems] = useState(INITIAL_RECOMMENDATIONS);
  const [activeTab, setActiveTab] = useState('feed');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleApprove = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'approved',
          actionTimestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
      }
      return item;
    }));
  };

  const handleOverride = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'overridden',
          actionTimestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
      }
      return item;
    }));
  };

  const handleReset = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'pending', actionTimestamp: null };
      }
      return item;
    }));
  };

  const handleSimulateNew = () => {
    const newId = `REC-2026-00${items.length + 1}`;
    const newRecommendation = {
      id: newId,
      category: 'Fleet Dispatch',
      categoryIcon: Truck,
      title: 'Automated Speed Adjustment on Haul Road 2',
      description: 'Telemetry detected road surface degradation near Curve 4. Capping speed at 25 km/h extends tire life by 220 operating hours.',
      impact: '+$8,500 Tire Life Saved',
      confidence: '95% Match',
      priority: 'HIGH',
      status: 'pending',
      timestamp: 'Just now',
    };
    setItems(prev => [newRecommendation, ...prev]);
  };

  const filteredItems = items.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const pendingCount = items.filter(i => i.status === 'pending').length;
  const approvedCount = items.filter(i => i.status === 'approved').length;
  const overriddenCount = items.filter(i => i.status === 'overridden').length;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-heading bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-heading bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/40">HIGH PRIORITY</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-heading bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40">MEDIUM</span>;
      case 'LOW':
      default:
        return <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-heading bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">LOW</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Proposed" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Autonomous AI Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
            AI Prescriptive Action & Blast Optimization Engine
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            Real-time operational recommendations and AI powder factor & P80 fragmentation tuning.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#1B2A4A] p-1 rounded-xl border border-[#2C3E60] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
              activeTab === 'feed'
                ? 'bg-[#F4A100] text-[#0D1B2A] shadow-glow-orange'
                : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> AI Action Feed
          </button>

          <button
            onClick={() => setActiveTab('blast-optimization')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
              activeTab === 'blast-optimization'
                ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Blast Optimization Panel
          </button>
        </div>
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Total Recommendations</span>
                <Sparkles className="w-4 h-4 text-[#F4A100]" />
              </div>
              <div className="text-2xl font-extrabold font-heading text-[#F5F5F5]">{items.length}</div>
              <p className="text-xs text-[#A0AEC0] mt-1">Generated by AI Prescriptive Core</p>
            </Card>

            <Card variant="orange">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Pending Review</span>
                <Clock className="w-4 h-4 text-[#F4A100]" />
              </div>
              <div className="text-2xl font-extrabold font-heading text-[#F4A100]">{pendingCount}</div>
              <p className="text-xs text-[#A0AEC0] mt-1">Awaiting dispatch operator action</p>
            </Card>

            <Card variant="default">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Approved Actions</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold font-heading text-emerald-400">{approvedCount}</div>
              <p className="text-xs text-[#A0AEC0] mt-1">Dispatched to mine control</p>
            </Card>

            <Card variant="default">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Overridden Actions</span>
                <XCircle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-extrabold font-heading text-slate-300">{overriddenCount}</div>
              <p className="text-xs text-[#A0AEC0] mt-1">Manual operator overrides</p>
            </Card>
          </div>

          <div className="space-y-4">
            {filteredItems.map(item => {
              const CategoryIcon = item.categoryIcon;
              const isApproved = item.status === 'approved';
              const isOverridden = item.status === 'overridden';
              const isPending = item.status === 'pending';

              return (
                <Card
                  key={item.id}
                  variant={isApproved ? 'blue' : item.priority === 'CRITICAL' ? 'orange' : 'default'}
                  className={`p-6 transition-all duration-300 relative ${
                    isApproved
                      ? 'border-emerald-500/60 bg-[#1B2A4A]/90 shadow-glow-blue'
                      : isOverridden
                      ? 'opacity-70 bg-[#0D1B2A] border-slate-700'
                      : ''
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {getPriorityBadge(item.priority)}
                        <span className="flex items-center gap-1 text-xs font-heading font-semibold text-[#00B4D8] bg-[#00B4D8]/15 px-2.5 py-0.5 rounded-md border border-[#00B4D8]/30">
                          <CategoryIcon className="w-3.5 h-3.5" />
                          {item.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold font-heading text-[#F5F5F5] flex items-center gap-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#A0AEC0] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-heading font-bold text-[#F4A100] bg-[#F4A100]/10 px-3 py-1 rounded-lg border border-[#F4A100]/30 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Projected Impact: {item.impact}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#2C3E60]">
                      {isPending && (
                        <div className="flex items-center gap-2 w-full lg:w-auto">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95"
                          >
                            <Check className="w-4 h-4 stroke-[3]" /> Approve Action
                          </button>

                          <button
                            onClick={() => handleOverride(item.id)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B2A4A] hover:bg-slate-700 text-[#A0AEC0] hover:text-rose-400 border border-[#2C3E60] font-heading font-semibold text-xs transition-all"
                          >
                            <Ban className="w-3.5 h-3.5" /> Override
                          </button>
                        </div>
                      )}

                      {isApproved && (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-heading text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Action Approved at {item.actionTimestamp}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'blast-optimization' && (
        <BlastOptimizationPanel />
      )}
    </div>
  );
};

export default PrescriptiveFeed;
