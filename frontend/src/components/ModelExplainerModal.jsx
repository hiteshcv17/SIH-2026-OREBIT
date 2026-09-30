import React, { useEffect } from 'react';
import Card from './Card';
import Badge from './Badge';
import { 
  Cpu, 
  Sparkles, 
  X, 
  Layers, 
  Globe, 
  Database, 
  CheckCircle2, 
  HelpCircle, 
  BarChart2, 
  ShieldCheck, 
  Radio, 
  FileCode,
  Zap,
  Target
} from 'lucide-react';

export const ModelExplainerModal = ({ isOpen, onClose }) => {
  // Handle ESC key press to close modal
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
      <div className="relative w-full max-w-4xl bg-[#1B2A4A] border border-[#00B4D8]/50 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0D1B2A] border-b border-[#2C3E60] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4A100] to-[#00B4D8] flex items-center justify-center shadow-glow-orange flex-shrink-0">
              <Cpu className="w-5 h-5 text-[#0D1B2A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-heading text-[#F5F5F5]">
                  Reserve Predictor AI Architecture
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  94.2% ROC-AUC
                </span>
              </div>
              <p className="text-xs text-[#A0AEC0]">
                Hybrid CNN + Spatial Random Forest Ensemble for 2D Mineral Prospectivity Score Generation
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
              <Sparkles className="w-4 h-4 text-[#F4A100]" /> How the Prospectivity Score is Calculated
            </h3>
            <p className="text-xs text-[#A0AEC0] leading-relaxed">
              The OreBit Reserve Predictor fuses <strong>multi-spectral satellite remote sensing data</strong> with <strong>ground-truth borehole core assays</strong>. A 2D Convolutional Neural Network (CNN) extracts spatial surface alteration features, which are fed into a <strong>Spatial Random Forest Regressor</strong> to compute high-precision 2D prospectivity probabilities (0.0 to 1.0) and grade concentration estimates across a 10m x 10m grid.
            </p>
          </div>

          {/* Model Inputs Feature Matrix */}
          <div>
            <h3 className="font-heading font-bold text-sm text-[#F5F5F5] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00B4D8]" /> 5 Multi-Source Input Features
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" /> Sentinel-2 Imagery
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">10m-20m</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  B11/B12 iron oxide absorption band ratio, clay alteration indices, and baseline vegetation (NDVI).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" /> ASTER Thermal & SWIR
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">15m-90m</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Quartz index mapping, carbonate vs silicate discrimination, and land surface thermal anomalies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" /> SRTM 30m DEM
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">30m Grid</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Digital elevation model slope gradient, bench topography contours, and surface hydrology runoff.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#00B4D8]" /> NGDR Geophysics
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00B4D8]/10 text-[#00B4D8]">Regional</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Ministry of Mines regional aero-magnetic anomaly map overlays and gravimetric survey datasets.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1.5 col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#F4A100]" /> UNFC G2/G3 Borehole Assays
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F4A100]/10 text-[#F4A100]">1.0m Downhole Core</span>
                </div>
                <p className="text-[11px] text-[#A0AEC0] leading-snug">
                  Downhole manganese (Mn%), iron (Fe%), silica (SiO2%), and alumina (Al2O3%) chemical concentrations used for 3D kriging ground truth calibration.
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
                  Q: How do you prevent spatial over-fitting in satellite mineral prediction?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> We utilize <strong>5-Fold Spatial Block Cross-Validation</strong> (buffering test drillholes by 250m) to ensure the model generalizes across unexplored mine lease sectors rather than memorizing nearby core assays.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1">
                <span className="font-heading font-bold text-xs text-[#00B4D8] block">
                  Q: What is the spatial resolution of the prospectivity heatmap grid?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> The prospectivity grid evaluates <strong>10m x 10m spatial cells</strong>, aligning Sentinel-2 Band 2/3/4 resolutions directly with bench blasting block dimensions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0D1B2A] border border-[#2C3E60] space-y-1">
                <span className="font-heading font-bold text-xs text-[#00B4D8] block">
                  Q: What model validation metrics were achieved?
                </span>
                <p className="text-xs text-[#A0AEC0] leading-snug">
                  <strong>A:</strong> The model achieves a <strong>94.2% Area Under the ROC Curve (ROC-AUC)</strong> for classifying high-grade ore reserves vs waste, with a Mean Absolute Error (MAE) of 1.42% Fe on downhole assays.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0D1B2A] border-t border-[#2C3E60] flex items-center justify-between text-xs text-[#A0AEC0]">
          <span className="flex items-center gap-1.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> OreBit AI Model Registry v1.4
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

export default ModelExplainerModal;
