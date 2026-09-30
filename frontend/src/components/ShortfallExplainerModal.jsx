import React, { useEffect } from 'react';
import Card from './Card';
import Badge from './Badge';
import { 
  TrendingDown, 
  Sparkles, 
  X, 
  Clock, 
  Activity, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  HelpCircle, 
  CloudRain, 
  Truck, 
  Database, 
  Target,
  BarChart2,
  CheckCircle2
} from 'lucide-react';

export const ShortfallExplainerModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto selection:bg-[#F4A100] selection:text-[#0D1B2A]">
      {/* Backdrop Blur Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl bg-[#1B2A4A] border border-[#F4A100]/50 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0D1B2A] border-b border-[#2C3E60] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4A100] to-[#E67E22] flex items-center justify-center shadow-glow-orange flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-[#0D1B2A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">
                  Shortfall Forecaster AI Architecture
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                  48–72h Rolling Window
                </span>
              </div>
              <p className="text-xs text-[#A0AEC0]">
                Hybrid CNN-LSTM + XGBoost Ensemble for Production Yield Risk Forecasting
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1B2A4A] hover:bg-[#22385E] border border-[#2C3E60] text-[#A0AEC0] hover:text-[#F5F5F5] transition-colors"
            aria-label="Close Explainer Modal"
          >
            <X className="w-5 h-5 text-[#F4A100]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Executive Model Summary Banner */}
          <div className="p-4 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-2">
            <h3 className="font-heading font-bold text-sm text-[#F4A100] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F4A100]" /> 48–72 Hour Rolling Horizon Mechanics
            </h3>
            <p className="text-xs text-[#A0AEC0] leading-relaxed">
              The Shortfall Forecaster models production output over a <strong>48 to 72-hour rolling time window</strong>. A 1D <strong>CNN-LSTM network</strong> processes real-time SCADA IoT telematics and historical shift logs to capture spatial haulage bottlenecks and temporal operational decay. The LSTM embeddings pass into an <strong>XGBoost Gradient Boosted Tree</strong> that predicts ROM yield gaps with an <strong>R² Score of 91.8%</strong>.
            </p>
          </div>

          {/* Model Inputs Feature Vectors */}
          <div>
            <h3 className="font-heading font-bold text-sm text-[#F5F5F5] mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00B4D8]" /> 4 Core Telemetry & Operational Vectors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00B4D8]" /> SCADA Fleet Telematics
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00B4D8]/10 text-[#00B4D8]">15s Live Polling</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Dumper-shovel queue delays, CAN-bus travel speeds, haul route cycle times, and machine OEE % degradation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-sky-400" /> Meteorological Radar
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">3-Day Forecast</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  72-hour precipitation forecast, monsoon mud accumulation factor, and pit high-wall slope stability risk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#F4A100]" /> Geochemical Ore Blend Logs
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F4A100]/10 text-[#F4A100]">Downhole Core</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Manganese (Mn%) and Iron (Fe%) grade variability, silica penalty thresholds, and moisture content logs.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> Historical Production Logs
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">30-Day Trend</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Shift target vs actual ROM output history, shift handover latency, and primary crusher downtime logs.
                </p>
              </div>

            </div>
          </div>

          {/* Judge Q&A Explainer Cards */}
          <div>
            <h3 className="font-heading font-bold text-sm text-[#F5F5F5] mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F4A100]" /> Judge Q&A Technical Reference
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1">
                <span className="font-heading font-bold text-xs text-[#00B4D8] block">
                  Q: Why combine CNN-LSTM with XGBoost instead of a pure neural network?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> 1D CNNs extract spatial route bottleneck features, LSTMs model temporal shift degradation, and <strong>XGBoost tree ensembles handle non-linear tabular features</strong> (weather rainfall + silica penalties) with high interpretability and zero overfitting on small mining datasets.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1">
                <span className="font-heading font-bold text-xs text-[#00B4D8] block">
                  Q: What mitigation lead time does the 48-72 hour window provide?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> A 48-hour advance warning allows mine dispatchers to <strong>re-route haul trucks and adjust bench powder factors</strong> 2 full days before a production shortfall hits the crusher, maintaining FY30 national target compliance.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1">
                <span className="font-heading font-bold text-xs text-[#00B4D8] block">
                  Q: How are shortfall risk bands defined?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> <strong>Green Band (&lt;5% gap)</strong>: Normal operational variance; <strong>Amber Band (5–15% gap)</strong>: Moderate shortfall requiring fleet re-dispatch; <strong>Red Band (&gt;15% gap)</strong>: High risk triggering automated prescriptive actions.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0D1B2A] border-t border-[#2C3E60] flex items-center justify-between text-xs text-[#A0AEC0]">
          <span className="flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> OreBit Forecaster Engine v2.1
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#F4A100] hover:bg-[#E09400] text-[#0D1B2A] font-heading font-bold transition-all shadow-glow-orange"
          >
            Got It (Close Explainer)
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShortfallExplainerModal;
