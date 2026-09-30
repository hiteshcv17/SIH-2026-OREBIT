import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatusPill from '../components/StatusPill';
import { Settings, Sliders, Database, Key, Server, ArrowRight, ShieldCheck } from 'lucide-react';

export const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Implemented" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">System Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
            Settings & System Preferences
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            Manage monorepo API endpoints, IoT sampling rates, and thresholds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2 text-[#F5F5F5]">
            <Server className="w-4 h-4 text-[#00B4D8]" /> API & Service Connections
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A0AEC0] mb-1 font-heading">FastAPI Backend URL</label>
              <input
                type="text"
                readOnly
                value="http://localhost:8000"
                className="w-full px-3 py-2 rounded-lg bg-[#0D1B2A] border border-[#2C3E60] font-mono text-[#F4A100]"
              />
            </div>
            <div>
              <label className="block text-[#A0AEC0] mb-1 font-heading">Environment</label>
              <input
                type="text"
                readOnly
                value="Development / Monorepo"
                className="w-full px-3 py-2 rounded-lg bg-[#0D1B2A] border border-[#2C3E60] font-sans text-[#F5F5F5]"
              />
            </div>
          </div>
        </Card>

        <Card variant="default">
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2 text-[#F5F5F5]">
            <Sliders className="w-4 h-4 text-[#F4A100]" /> Telemetry & Refresh Rate
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A0AEC0] mb-1 font-heading">Live Clock Refresh Rate</label>
              <span className="font-mono text-[#00B4D8]">1,000 ms (1 Hz)</span>
            </div>
            <div>
              <label className="block text-[#A0AEC0] mb-1 font-heading">Prescriptive AI Interval</label>
              <span className="font-mono text-[#F4A100]">15 seconds</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Sources Framework Registry Navigation Card */}
      <Card variant="default" className="border-l-4 border-l-[#00B4D8] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-base text-[#F5F5F5] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#00B4D8]" /> Data Sources & Transparency Registry
            </h3>
            <p className="text-xs text-[#A0AEC0] max-w-xl">
              Inspect public and private dataset integrations (Sentinel-2, ASTER, SRTM DEM, NGDR, drill logs, fleet SCADA telematics) with live access badges and security encryption standards.
            </p>
          </div>

          <button
            onClick={() => navigate('/data-sources')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#1B2A4A] hover:from-[#0096B4] text-[#F5F5F5] font-heading font-bold text-xs flex items-center gap-2 shadow-glow-blue flex-shrink-0"
          >
            <span>Open Data Sources Registry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
