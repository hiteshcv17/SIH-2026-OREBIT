import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
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
import { SkeletonChart } from '../components/SkeletonLoader';
import ErrorEmptyState from '../components/ErrorEmptyState';
import ModelExplainerModal from '../components/ModelExplainerModal';
import { 
  Map as MapIcon, 
  Layers, 
  Compass, 
  Filter, 
  Eye, 
  EyeOff, 
  Activity, 
  Zap, 
  Database,
  Crosshair,
  BarChart2,
  Sliders,
  Sparkles,
  ArrowDown,
  Cpu,
  HelpCircle,
  Info,
  Globe
} from 'lucide-react';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

const createDrillholeIcon = (stage) => {
  const color = stage === 'G2' ? '#F4A100' : '#00B4D8';
  return L.divIcon({
    className: 'custom-drillhole-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 3px solid #0D1B2A;
        box-shadow: 0 0 14px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0D1B2A;
        font-weight: 800;
        font-size: 11px;
        font-family: Poppins, sans-serif;
      ">
        ${stage}
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });
};

const MINE_BOUNDARIES = [
  {
    id: 'pit-alpha',
    name: 'North Pit Alpha Zone',
    color: '#F4A100',
    coords: [
      [20.4820, 85.3170],
      [20.4930, 85.3170],
      [20.4930, 85.3270],
      [20.4820, 85.3270],
    ],
    area: '1.45 km²',
    oreType: 'Hematite / Manganese High Grade'
  },
  {
    id: 'central-ridge',
    name: 'Central Ridge Bench Zone',
    color: '#00B4D8',
    coords: [
      [20.4750, 85.3300],
      [20.4840, 85.3300],
      [20.4840, 85.3400],
      [20.4750, 85.3400],
    ],
    area: '1.12 km²',
    oreType: 'BIF / Goethitic Ore'
  },
  {
    id: 'south-ext',
    name: 'South Pit Extension',
    color: '#10B981',
    coords: [
      [20.4660, 85.3380],
      [20.4740, 85.3380],
      [20.4740, 85.3500],
      [20.4660, 85.3500],
    ],
    area: '1.80 km²',
    oreType: 'Specular Hematite / Blue Dust'
  }
];

const BASEMAP_PROVIDERS = {
  satellite: {
    name: 'Satellite Terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  },
  dark: {
    name: 'Dark Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
  },
  street: {
    name: 'Street Topo',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  }
};

export const ReserveMap = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [viewMode, setViewMode] = useState('map'); // 'map' | 'cross-section'
  const [selectedHoleId, setSelectedHoleId] = useState('DH-G2-0101');
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showBoreholes, setShowBoreholes] = useState(true);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [basemap, setBasemap] = useState('satellite');

  const fetchReserveData = () => {
    fetch('http://localhost:8000/api/reserve-map')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load reserve map data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReserveData();
  }, []);

  const gridPoints = data?.satellite_reserves?.grid_points || [];
  const drillholes = data?.drillhole_logs?.drillholes || [];
  const selectedHole = drillholes.find(dh => dh.hole_id === selectedHoleId) || drillholes[0];

  const chartData = selectedHole?.intervals?.flatMap((interval) => {
    return [
      {
        depth: `${interval.from_m}m`,
        depthNum: interval.from_m,
        fe_grade: interval.fe_pct,
        sio2: interval.sio2_pct,
        al2o3: interval.al2o3_pct,
        lithology: interval.lithology,
      },
      {
        depth: `${interval.to_m}m`,
        depthNum: interval.to_m,
        fe_grade: interval.fe_pct,
        sio2: interval.sio2_pct,
        al2o3: interval.al2o3_pct,
        lithology: interval.lithology,
      },
    ];
  }) || [];

  return (
    <div className="space-y-6">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <StatusPill status="Implemented" />
            <span className="text-xs text-[#A0AEC0] font-heading font-semibold">2D GIS & Downhole Assays</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#F5F5F5]">
            GIS Reserve Map & Cross-Section Viewer
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEC0]">
            2D spatial prospectivity heatmap and downhole ore grade cross-sectional profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsModelModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F4A100] to-[#E67E22] text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-orange hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Cpu className="w-4 h-4 fill-current" />
            <span>AI Model Explainer</span>
            <HelpCircle className="w-3.5 h-3.5 opacity-80" />
          </button>

          <div className="flex items-center gap-2 bg-[#1B2A4A] p-1 rounded-xl border border-[#2C3E60]">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-[#F4A100] text-[#0D1B2A] shadow-glow-orange'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> 2D Map View
            </button>
            <button
              onClick={() => setViewMode('cross-section')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all ${
                viewMode === 'cross-section'
                  ? 'bg-[#00B4D8] text-[#0D1B2A] shadow-glow-blue'
                  : 'text-[#A0AEC0] hover:text-[#F5F5F5]'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Cross-Section Profile
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'map' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card variant="flat" className="lg:col-span-3 p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00B4D8]" />
                <span className="text-xs font-heading font-semibold text-[#F5F5F5]">Layer Controls:</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowBoundaries(!showBoundaries)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold border transition-all ${
                    showBoundaries 
                      ? 'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/50 shadow-sm' 
                      : 'bg-[#1B2A4A] text-[#A0AEC0] border-[#2C3E60]'
                  }`}
                >
                  {showBoundaries ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  Mine Boundaries
                </button>

                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold border transition-all ${
                    showHeatmap 
                      ? 'bg-[#F4A100]/20 text-[#F4A100] border-[#F4A100]/50 shadow-sm' 
                      : 'bg-[#1B2A4A] text-[#A0AEC0] border-[#2C3E60]'
                  }`}
                >
                  {showHeatmap ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  Prospectivity Heatmap
                </button>

                <button
                  onClick={() => setShowBoreholes(!showBoreholes)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold border transition-all ${
                    showBoreholes 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm' 
                      : 'bg-[#1B2A4A] text-[#A0AEC0] border-[#2C3E60]'
                  }`}
                >
                  {showBoreholes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  Boreholes (G2/G3)
                </button>

                {/* Basemap Tile Layer Selector */}
                <div className="flex items-center gap-1 bg-[#0D1B2A] p-1 rounded-lg border border-[#2C3E60]">
                  <Globe className="w-3.5 h-3.5 text-[#F4A100] ml-1" />
                  <button
                    onClick={() => setBasemap('satellite')}
                    className={`px-2 py-0.5 text-[11px] font-heading font-semibold rounded ${
                      basemap === 'satellite' ? 'bg-[#F4A100] text-[#0D1B2A]' : 'text-[#A0AEC0] hover:text-white'
                    }`}
                  >
                    Satellite
                  </button>
                  <button
                    onClick={() => setBasemap('dark')}
                    className={`px-2 py-0.5 text-[11px] font-heading font-semibold rounded ${
                      basemap === 'dark' ? 'bg-[#00B4D8] text-[#0D1B2A]' : 'text-[#A0AEC0] hover:text-white'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setBasemap('street')}
                    className={`px-2 py-0.5 text-[11px] font-heading font-semibold rounded ${
                      basemap === 'street' ? 'bg-slate-300 text-[#0D1B2A]' : 'text-[#A0AEC0] hover:text-white'
                    }`}
                  >
                    Topo
                  </button>
                </div>
              </div>
            </Card>

            <Card variant="flat" className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#A0AEC0] font-heading">Mine Center</p>
                <p className="text-xs font-mono font-bold text-[#F4A100]">20.480° N, 85.330° E</p>
              </div>
              <Crosshair className="w-5 h-5 text-[#00B4D8]" />
            </Card>
          </div>

          {error && !data ? (
            <ErrorEmptyState
              title="GIS Reserve Map Data Unavailable"
              message={`Error fetching spatial telemetry: ${error}`}
              onRetry={fetchReserveData}
            />
          ) : (
            <Card variant="blue" padding="p-2" className="overflow-hidden relative min-h-[550px] shadow-2xl">
              {loading ? (
                <SkeletonChart height="550px" title="Loading 2D GIS Prospectivity Layers..." />
              ) : (
                <MapContainer
                  center={[20.4800, 85.3300]}
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: '550px', width: '100%', borderRadius: '10px' }}
                >
                  <TileLayer
                    attribution={BASEMAP_PROVIDERS[basemap].attribution}
                    url={BASEMAP_PROVIDERS[basemap].url}
                  />

                  {showBoundaries && MINE_BOUNDARIES.map(boundary => (
                    <Polygon
                      key={boundary.id}
                      positions={boundary.coords}
                      pathOptions={{
                        color: boundary.color,
                        fillColor: boundary.color,
                        fillOpacity: 0.15,
                        weight: 2,
                        dashArray: '4, 4'
                      }}
                    >
                      <Tooltip sticky>
                        <div className="font-sans text-xs space-y-1">
                          <p className="font-heading font-bold text-[#F4A100]">{boundary.name}</p>
                          <p className="text-[11px] text-slate-300">Area: {boundary.area}</p>
                          <p className="text-[11px] text-[#00B4D8]">{boundary.oreType}</p>
                        </div>
                      </Tooltip>
                    </Polygon>
                  ))}

                  {showHeatmap && gridPoints.map(point => {
                    const prob = point.reserve_probability || 0.5;
                    const color = prob >= 0.85 ? '#F4A100' : prob >= 0.70 ? '#00B4D8' : '#64748B';
                    return (
                      <CircleMarker
                        key={point.id}
                        center={[point.lat, point.lng]}
                        radius={prob * 18}
                        pathOptions={{
                          color: color,
                          fillColor: color,
                          fillOpacity: 0.65,
                          weight: 1.5
                        }}
                      >
                        <Tooltip>
                          <div className="font-sans text-xs space-y-1">
                            <p className="font-heading font-bold text-[#F5F5F5]">{point.zone_name}</p>
                            <p className="text-[#F4A100] font-mono">Mn / Fe Grade: {point.iron_grade_pct}%</p>
                            <p className="text-[#00B4D8]">Probability: {(prob * 100).toFixed(0)}%</p>
                          </div>
                        </Tooltip>
                      </CircleMarker>
                    );
                  })}

                  {showBoreholes && drillholes.map(dh => (
                    <Marker
                      key={dh.hole_id}
                      position={[dh.lat, dh.lng]}
                      icon={createDrillholeIcon(dh.stage)}
                    >
                      <Popup className="custom-dark-popup">
                        <div className="space-y-2 p-1 min-w-[220px]">
                          <div className="flex items-center justify-between border-b border-[#2C3E60] pb-1.5">
                            <span className="font-heading font-bold text-sm text-[#F5F5F5]">{dh.hole_id}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              dh.stage === 'G2' ? 'bg-[#F4A100]/20 text-[#F4A100]' : 'bg-[#00B4D8]/20 text-[#00B4D8]'
                            }`}>
                              Stage {dh.stage}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#A0AEC0]">Zone:</span>
                              <span className="text-[#F5F5F5] font-semibold">{dh.pit_zone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#A0AEC0]">Peak Mn / Fe Grade:</span>
                              <span className="text-[#F4A100] font-mono font-bold">
                                {dh.intervals?.[1]?.fe_pct || 64.5}% Grade
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedHoleId(dh.hole_id);
                              setViewMode('cross-section');
                            }}
                            className="w-full mt-2 py-1 px-2 rounded bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-[#0D1B2A] text-xs font-heading font-semibold transition-colors text-center cursor-pointer"
                          >
                            View Cross-Section Chart →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </Card>
          )}
        </div>
      )}

      {viewMode === 'cross-section' && (
        <div className="space-y-6">
          <Card variant="orange" className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <StatusPill status="Implemented" />
                  <Badge variant="blue">UNFC G2/G3 Assays</Badge>
                </div>
                <h2 className="text-xl font-bold font-heading text-[#F5F5F5]">
                  Downhole Ore Grade Cross-Sectional Profile
                </h2>
                <p className="text-xs text-[#A0AEC0]">
                  Visualizing manganese / iron grade %, silica (SiO2%), and alumina (Al2O3%) variations by depth downhole.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-heading text-[#A0AEC0] whitespace-nowrap">Select Borehole:</label>
                <select
                  value={selectedHoleId}
                  onChange={(e) => setSelectedHoleId(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-[#0D1B2A] border border-[#F4A100]/50 text-[#F5F5F5] font-heading text-sm font-semibold focus:outline-none focus:border-[#F4A100] shadow-glow-orange cursor-pointer"
                >
                  {drillholes.map(dh => (
                    <option key={dh.hole_id} value={dh.hole_id}>
                      {dh.hole_id} ({dh.stage} - {dh.pit_zone})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {selectedHole && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="default" padding="p-4">
                <span className="text-xs text-[#A0AEC0] font-heading">Borehole & Zone</span>
                <p className="text-lg font-bold font-heading text-[#F5F5F5] mt-1">{selectedHole.hole_id}</p>
                <p className="text-xs text-[#00B4D8]">{selectedHole.pit_zone}</p>
              </Card>

              <Card variant="default" padding="p-4">
                <span className="text-xs text-[#A0AEC0] font-heading">Exploration Stage</span>
                <p className="text-lg font-bold font-heading text-[#F4A100] mt-1">Stage {selectedHole.stage}</p>
                <p className="text-xs text-[#A0AEC0]">CRIRSCO / UNFC Compliant</p>
              </Card>

              <Card variant="default" padding="p-4">
                <span className="text-xs text-[#A0AEC0] font-heading">Peak Ore Grade</span>
                <p className="text-lg font-bold font-heading text-emerald-400 mt-1">
                  {Math.max(...(selectedHole.intervals?.map(i => i.fe_pct) || [0]))}% Fe / Mn
                </p>
                <p className="text-xs text-[#A0AEC0]">High-Grade Ore Zone</p>
              </Card>

              <Card variant="default" padding="p-4">
                <span className="text-xs text-[#A0AEC0] font-heading">Total Depth & Azimuth</span>
                <p className="text-lg font-bold font-heading text-[#00B4D8] mt-1">
                  {selectedHole.total_depth_m} meters
                </p>
                <p className="text-xs text-[#A0AEC0]">Dip: {selectedHole.dip}° | Azimuth: {selectedHole.azimuth}°</p>
              </Card>
            </div>
          )}

          <Card variant="blue" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-lg text-[#F5F5F5] flex items-center gap-2">
                <ArrowDown className="w-5 h-5 text-[#F4A100]" /> Downhole Grade Profile (Depth 0m → {selectedHole?.total_depth_m}m)
              </h3>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#F4A100]">
                  <span className="w-3 h-3 rounded bg-[#F4A100]" /> Fe / Mn Grade %
                </span>
                <span className="flex items-center gap-1.5 text-[#00B4D8]">
                  <span className="w-3 h-3 rounded bg-[#00B4D8]" /> SiO2 (Silica) %
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-3 rounded bg-slate-400" /> Al2O3 (Alumina) %
                </span>
              </div>
            </div>

            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2C3E60" />
                  <XAxis 
                    dataKey="depth" 
                    stroke="#A0AEC0" 
                    tick={{ fill: '#A0AEC0', fontSize: 12, fontFamily: 'Inter' }}
                  />
                  <YAxis 
                    stroke="#A0AEC0" 
                    domain={[0, 80]}
                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
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
                  <Area 
                    type="monotone" 
                    dataKey="fe_grade" 
                    fill="#F4A100" 
                    stroke="#F4A100" 
                    fillOpacity={0.25} 
                    strokeWidth={3} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sio2" 
                    stroke="#00B4D8" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#00B4D8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="al2o3" 
                    stroke="#94A3B8" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Model Output Architecture Explainer Modal */}
      <ModelExplainerModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
      />
    </div>
  );
};

export default ReserveMap;
