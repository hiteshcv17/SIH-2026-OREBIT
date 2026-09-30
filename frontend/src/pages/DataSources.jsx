import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import StatusPill from '../components/StatusPill';
import { 
  Database, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Radio, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  FileCode,
  HardDrive
} from 'lucide-react';

const DATASETS = [
  {
    id: 'ds-001',
    name: 'Sentinel-2 Multispectral Imagery',
    category: 'Satellite Remote Sensing',
    provider: 'ESA Copernicus Open Access Hub',
    accessType: 'Public',
    accessBadge: 'Public / Open Access',
    accessColor: 'emerald',
    resolution: '10m – 20m (Bands 2,3,4,8,11,12)',
    refreshRate: 'Every 5 Days',
    format: 'GeoTIFF / COG (Cloud-Optimized)',
    status: 'Active / Synchronized',
    statusColor: 'emerald',
    description: 'High-resolution multispectral imagery for surface mineral alteration mapping, iron oxide band ratios (B11/B12), and baseline NDVI vegetation tracking.',
    usage: ['Mineral Alteration Index', 'Iron Oxide Band Ratios', 'Environmental Baseline', 'Pit Boundary Vegetation'],
    protocol: 'HTTPS REST / STAC API',
    schema: {
      provider: 'ESA Copernicus',
      crs: 'EPSG:4326 (WGS 84)',
      bands: ['B02 (Blue)', 'B03 (Green)', 'B04 (Red)', 'B08 (NIR)', 'B11 (SWIR-1)', 'B12 (SWIR-2)'],
      license: 'CC-BY-SA 4.0'
    }
  },
  {
    id: 'ds-002',
    name: 'ASTER Thermal Infrared & SWIR',
    category: 'Satellite Remote Sensing',
    provider: 'NASA Earthdata / LP DAAC',
    accessType: 'Public',
    accessBadge: 'Public / Open Access',
    accessColor: 'emerald',
    resolution: '15m (VNIR) – 90m (TIR)',
    refreshRate: 'Every 16 Days',
    format: 'HDF-EOS / NetCDF4',
    status: 'Active / Synchronized',
    statusColor: 'emerald',
    description: 'Advanced Spaceborne Thermal Emission and Reflection Radiometer data utilized for quartz index, carbonate/silicate discrimination, and land surface temperature calibration.',
    usage: ['Quartz Index Mapping', 'Carbonate vs Silicate Discrimination', 'Surface Temperature Thermal Anomaly'],
    protocol: 'NASA CMR Search API',
    schema: {
      provider: 'NASA LP DAAC',
      crs: 'UTM Zone 44N',
      swir_bands: ['Band 4 (1.65 µm)', 'Band 5 (2.165 µm)', 'Band 6 (2.205 µm)'],
      license: 'Public Domain (US Gov)'
    }
  },
  {
    id: 'ds-003',
    name: 'SRTM DEM (30m Elevation Model)',
    category: 'Elevation & Topography',
    provider: 'USGS / NASA JPL',
    accessType: 'Public',
    accessBadge: 'Public / Open Access',
    accessColor: 'emerald',
    resolution: '1 Arc-Second (~30m Grid)',
    refreshRate: 'Static Baseline',
    format: 'DTED Level 2 / GeoTIFF',
    status: 'Active / Verified',
    statusColor: 'emerald',
    description: 'Shuttle Radar Topography Mission digital elevation dataset providing baseline pit terrain elevation, bench slope contouring, and hydrological runoff modeling.',
    usage: ['Pit Contour Elevation', 'Haul Road Slope Assessment', 'Surface Runoff Hydrology'],
    protocol: 'USGS EarthExplorer WCS',
    schema: {
      provider: 'USGS / NASA',
      datum: 'EGM96 Vertical Datum',
      accuracy: 'Linear vertical error < 16m',
      license: 'Public Domain'
    }
  },
  {
    id: 'ds-004',
    name: 'NGDR Geoscientific Portal Data',
    category: 'Geological Repository',
    provider: 'Ministry of Mines / GSI (India)',
    accessType: 'Public',
    accessBadge: 'Public / Govt India',
    accessColor: 'blue',
    resolution: 'Regional (1:50,000 Mapping)',
    refreshRate: 'Quarterly Sync',
    format: 'ESRI Shapefile / OGC WMS/WFS',
    status: 'Active / Integrated',
    statusColor: 'emerald',
    description: 'National Geoscience Data Repository data incorporating regional aero-magnetic anomaly overlays, gravity survey maps, and legacy mineral concession boundary shapes.',
    usage: ['Regional Magnetic Anomaly', 'Gravimetric Survey Layers', 'Lease Boundary Verification'],
    protocol: 'OGC WFS 2.0.0 GeoJSON',
    schema: {
      provider: 'Geological Survey of India',
      crs: 'EPSG:32644 (UTM 44N)',
      datasets: ['Aero-Magnetic Anomaly', 'Gravity Survey', '1:50k Geology'],
      license: 'Government Open Data License (India)'
    }
  },
  {
    id: 'ds-005',
    name: 'Drillhole Assay & Lithology Logs',
    category: 'Subsurface Exploration',
    provider: 'Mining Lease Operator / Core Lab',
    accessType: 'Private',
    accessBadge: 'Private / Enterprise',
    accessColor: 'orange',
    resolution: '1.0m Downhole Core Interval',
    refreshRate: 'Post-Campaign Batch Upload',
    format: 'Structured JSON-REST / Parquet',
    status: 'Verified / Encrypted',
    statusColor: 'amber',
    description: 'Proprietary core drilling assay logs containing chemical concentrations (Mn%, Fe%, SiO2%, Al2O3%) and lithology classifications across 10 spatial boreholes.',
    usage: ['Downhole Ore Grade Cross-Sections', 'Resource Block Model Kriging', 'Shortfall Yield Prediction'],
    protocol: 'FastAPI /api/reserve-map Data Service',
    schema: {
      provider: 'OreBit Enterprise Core Storage',
      security: 'AES-256 Encrypted at Rest',
      elements: ['Mn_pct', 'Fe_pct', 'SiO2_pct', 'Al2O3_pct', 'Depth_m'],
      records: '10 Boreholes / 500 Core Samples'
    }
  },
  {
    id: 'ds-006',
    name: 'Equipment Telemetry & Fleet IoT',
    category: 'Real-Time SCADA & IoT',
    provider: 'On-Premise SCADA & Fleet CAN-bus Sensors',
    accessType: 'Private',
    accessBadge: 'Private / SCADA IoT',
    accessColor: 'orange',
    resolution: 'Sub-Second Edge Nodes',
    refreshRate: '15s Streaming Polling',
    format: 'JSON Telemetry Stream / MQTT',
    status: 'Live Streaming (15s)',
    statusColor: 'blue',
    description: 'Real-time telemetry stream from haul trucks, excavators, and drill rigs tracking operational health parameters, remaining useful life (RUL), and haul route idle queues.',
    usage: ['OEE % & Reliability Telematics', 'RUL < 15% PHM Alerting', 'Dynamic Fleet Dispatch Re-routing'],
    protocol: 'FastAPI /api/equipment-health Stream',
    schema: {
      provider: 'OreBit Telematics Edge Gateway',
      security: 'TLS 1.3 Transport Security',
      parameters: ['OEE_pct', 'RUL_pct', 'MTBF_hrs', 'MTTR_hrs', 'Idle_min'],
      nodes: '6 Active Dumpers / 3 Excavators'
    }
  }
];

export const DataSources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accessFilter, setAccessFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredDatasets = DATASETS.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAccess = 
      accessFilter === 'All' ? true :
      accessFilter === 'Public' ? item.accessType === 'Public' :
      accessFilter === 'Private' ? item.accessType === 'Private' :
      accessFilter === 'Live' ? item.status.includes('Live') : true;

    return matchesSearch && matchesAccess;
  });

  const publicCount = DATASETS.filter(d => d.accessType === 'Public').length;
  const privateCount = DATASETS.filter(d => d.accessType === 'Private').length;
  const liveCount = DATASETS.filter(d => d.status.includes('Live')).length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Implemented" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">Transparency & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5] flex items-center gap-3">
            <Database className="w-7 h-7 text-[#00B4D8]" />
            Data Sources Framework
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            Complete transparency registry of satellite remote sensing, public geoscientific portals, and private enterprise telemetry integrations.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="default" className="p-4 border-l-4 border-l-[#00B4D8]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading text-[#A0AEC0]">Total Datasets</span>
            <Database className="w-4 h-4 text-[#00B4D8]" />
          </div>
          <p className="text-2xl font-bold font-heading text-[#F5F5F5] mt-1">{DATASETS.length}</p>
          <span className="text-[10px] text-[#A0AEC0] font-mono">100% Registered</span>
        </Card>

        <Card variant="default" className="p-4 border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading text-[#A0AEC0]">Public / Open Access</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-heading text-emerald-400 mt-1">{publicCount}</p>
          <span className="text-[10px] text-[#A0AEC0] font-mono">ESA, NASA, USGS, NGDR</span>
        </Card>

        <Card variant="default" className="p-4 border-l-4 border-l-[#F4A100]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading text-[#A0AEC0]">Private Enterprise</span>
            <Lock className="w-4 h-4 text-[#F4A100]" />
          </div>
          <p className="text-2xl font-bold font-heading text-[#F4A100] mt-1">{privateCount}</p>
          <span className="text-[10px] text-[#A0AEC0] font-mono">Drill Logs & SCADA Telemetry</span>
        </Card>

        <Card variant="default" className="p-4 border-l-4 border-l-sky-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading text-[#A0AEC0]">Real-Time Streaming</span>
            <Radio className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <p className="text-2xl font-bold font-heading text-sky-400 mt-1">{liveCount}</p>
          <span className="text-[10px] text-[#A0AEC0] font-mono">15s Active Polling Bridge</span>
        </Card>
      </div>

      {/* Filter and Search Controls */}
      <Card variant="default" className="p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#A0AEC0]" />
            <input
              type="text"
              placeholder="Search datasets, providers, or usage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0D1B2A] border border-[#2C3E60] rounded-xl text-xs text-[#F5F5F5] placeholder-[#A0AEC0] focus:outline-none focus:border-[#00B4D8]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-[#A0AEC0] hidden sm:block" />
            <span className="text-xs font-heading text-[#A0AEC0] hidden sm:block">Access Type:</span>
            {['All', 'Public', 'Private', 'Live'].map((filter) => (
              <button
                key={filter}
                onClick={() => setAccessFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                  accessFilter === filter
                    ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                    : 'bg-[#1B2A4A] text-[#A0AEC0] hover:text-[#F5F5F5] hover:bg-[#22385E]'
                }`}
              >
                {filter === 'All' ? 'All Datasets' : filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Primary Data Sources Framework Table */}
      <Card variant="default" className="overflow-hidden p-0">
        <div className="p-4 bg-[#0D1B2A] border-b border-[#2C3E60] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#F4A100]" />
            <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">Data Sources Framework Registry</h3>
          </div>
          <span className="text-xs font-mono text-[#A0AEC0]">Showing {filteredDatasets.length} of {DATASETS.length} Datasets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C3E60] bg-[#1B2A4A]/50 text-[11px] font-heading uppercase text-[#A0AEC0] tracking-wider">
                <th className="py-3 px-4">Dataset & Provider</th>
                <th className="py-3 px-4">Access Type</th>
                <th className="py-3 px-4">Spatial / Temporal Resolution</th>
                <th className="py-3 px-4">Update Frequency</th>
                <th className="py-3 px-4">Integration Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C3E60]/50 text-xs">
              {filteredDatasets.map((ds) => {
                const isExpanded = expandedId === ds.id;
                return (
                  <React.Fragment key={ds.id}>
                    <tr 
                      onClick={() => toggleExpand(ds.id)}
                      className={`hover:bg-[#22385E]/50 transition-colors cursor-pointer ${
                        isExpanded ? 'bg-[#1B2A4A]/80' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg mt-0.5 ${
                            ds.accessType === 'Public' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-[#F4A100]/10 text-[#F4A100] border border-[#F4A100]/30'
                          }`}>
                            {ds.accessType === 'Public' ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-heading font-bold text-[#F5F5F5] flex items-center gap-2">
                              {ds.name}
                            </div>
                            <div className="text-[11px] text-[#A0AEC0] font-sans flex items-center gap-1.5 mt-0.5">
                              <span>{ds.provider}</span>
                              <span>•</span>
                              <span className="text-[#00B4D8]">{ds.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          ds.accessType === 'Public'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-[#F4A100]/10 text-[#F4A100] border-[#F4A100]/30'
                        }`}>
                          {ds.accessType === 'Public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {ds.accessBadge}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[#F5F5F5]">
                        {ds.resolution}
                      </td>

                      <td className="py-3.5 px-4 font-sans text-[#A0AEC0]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#00B4D8]" />
                          <span>{ds.refreshRate}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-heading font-bold ${
                          ds.status.includes('Live')
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 animate-pulse'
                            : ds.status.includes('Verified')
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {ds.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button 
                          className="p-1.5 rounded-lg bg-[#0D1B2A] hover:bg-[#22385E] text-[#A0AEC0] hover:text-[#F5F5F5] border border-[#2C3E60]"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(ds.id);
                          }}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#F4A100]" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Details Row */}
                    {isExpanded && (
                      <tr className="bg-[#0D1B2A]/90 border-b border-[#2C3E60]">
                        <td colSpan={6} className="p-4 sm:p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-xs text-[#F4A100] uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5" /> Dataset Overview
                              </h4>
                              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                                {ds.description}
                              </p>
                              <div className="pt-1">
                                <span className="text-[11px] font-heading font-semibold text-[#F5F5F5] block mb-1">Target Application Modules:</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {ds.usage.map((u, idx) => (
                                    <span key={idx} className="px-2 py-0.5 rounded bg-[#1B2A4A] text-[#00B4D8] border border-[#2C3E60] text-[10px] font-mono">
                                      {u}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-xs text-[#00B4D8] uppercase tracking-wider flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5" /> Technical Pipeline & Protocol
                              </h4>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <span className="text-[#A0AEC0] block">Ingestion Protocol:</span>
                                  <span className="font-mono text-[#F5F5F5]">{ds.protocol}</span>
                                </div>
                                <div>
                                  <span className="text-[#A0AEC0] block">Payload Format:</span>
                                  <span className="font-mono text-[#F4A100]">{ds.format}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-heading font-semibold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <FileCode className="w-3.5 h-3.5" /> Data Schema & Metadata
                              </h4>
                              <div className="bg-[#0D1B2A] p-3 rounded-xl border border-[#2C3E60] font-mono text-[11px] text-[#A0AEC0] space-y-1">
                                {Object.entries(ds.schema).map(([key, value]) => (
                                  <div key={key} className="flex justify-between border-b border-[#2C3E60]/30 py-0.5 last:border-none">
                                    <span className="text-[#00B4D8]">{key}:</span>
                                    <span className="text-[#F5F5F5] text-right truncate max-w-[160px]">
                                      {Array.isArray(value) ? value.join(', ') : value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* System Governance & Security Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2 text-[#F5F5F5]">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Data Governance & Security Compliance
          </h3>
          <ul className="space-y-2.5 text-xs text-[#A0AEC0]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Open Access Alignment:</strong> All satellite layers (Sentinel-2, ASTER, SRTM) strictly follow ESA Copernicus & NASA Open Data policy.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Encrypted Lease Protection:</strong> Proprietary borehole drill logs are stored in AES-256 encrypted volumes on local monorepo backend.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>OGC Geospatial Standards:</strong> Spatial WMS/WFS layers conform strictly to Open Geospatial Consortium specifications.</span>
            </li>
          </ul>
        </Card>

        <Card variant="default">
          <h3 className="font-heading font-semibold text-base mb-3 flex items-center gap-2 text-[#F5F5F5]">
            <Globe className="w-5 h-5 text-[#00B4D8]" /> Public Portals & Geospatial Integrations
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0D1B2A] border border-[#2C3E60] flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-[#F5F5F5] block">NGDR Portal (Govt of India)</span>
                <span className="text-[11px] text-[#A0AEC0]">National Geoscience Data Repository</span>
              </div>
              <span className="px-2 py-1 rounded bg-[#00B4D8]/20 text-[#00B4D8] font-mono text-[10px] font-bold">WFS 2.0</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0D1B2A] border border-[#2C3E60] flex items-center justify-between">
              <div>
                <span className="font-heading font-bold text-[#F5F5F5] block">ESA Copernicus Open Access Hub</span>
                <span className="text-[11px] text-[#A0AEC0]">Sentinel-2 Multispectral Hub</span>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">STAC API</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataSources;
