import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Map, 
  Target, 
  Activity, 
  Zap, 
  Database,
  Settings,
  ChevronRight,
  ShieldAlert,
  X
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Executive Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    badge: 'HQ',
    badgeColor: 'orange',
  },
  {
    name: 'Reserve Map',
    path: '/reserve-map',
    icon: Map,
    badge: 'Spatial',
    badgeColor: 'blue',
  },
  {
    name: 'Shortfall Tracker',
    path: '/shortfall-tracker',
    icon: Target,
    badge: 'Live',
    badgeColor: 'orange',
  },
  {
    name: 'Equipment Health',
    path: '/equipment-health',
    icon: Activity,
    badge: 'Telematics',
    badgeColor: 'blue',
  },
  {
    name: 'Prescriptive Feed',
    path: '/prescriptive-feed',
    icon: Zap,
    badge: 'AI Feed',
    badgeColor: 'orange',
  },
  {
    name: 'Data Sources',
    path: '/data-sources',
    icon: Database,
    badge: 'Open Data',
    badgeColor: 'blue',
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    badge: null,
    badgeColor: null,
  },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-4 selection:bg-[#F4A100] selection:text-[#0D1B2A]">
      <div className="space-y-6">
        <div className="px-2 flex items-center justify-between">
          <p className="text-[11px] font-bold font-heading uppercase tracking-widest text-[#A0AEC0]">
            Core Modules
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#A0AEC0] hover:text-[#F5F5F5] lg:hidden"
              aria-label="Close Mobile Navigation"
            >
              <X className="w-4 h-4 text-[#F4A100]" />
            </button>
          )}
        </div>

        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-3 rounded-xl font-heading text-sm transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1B2A4A] to-[#22385E] text-[#F5F5F5] font-semibold border-l-4 border-[#F4A100] shadow-md'
                      : 'text-[#A0AEC0] hover:text-[#F5F5F5] hover:bg-[#1B2A4A]/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-[#F4A100]'
                            : 'text-[#A0AEC0] group-hover:text-[#00B4D8]'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold ${
                            isActive
                              ? 'bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/40'
                              : item.badgeColor === 'orange'
                              ? 'bg-[#F4A100]/10 text-[#F4A100]'
                              : 'bg-[#00B4D8]/10 text-[#00B4D8]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? 'opacity-100 text-[#F4A100]' : 'text-[#A0AEC0]'
                        }`}
                      />
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 p-3.5 rounded-xl bg-[#1B2A4A]/70 border border-[#2C3E60] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-heading font-semibold text-[#F5F5F5] flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#F4A100]" /> Executive Node
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <p className="text-[11px] text-[#A0AEC0] leading-snug">
          OreBit Phase 20 Responsive Layout Pass operational.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#0D1B2A] border-r border-[#2C3E60] min-h-[calc(100vh-61px)] hidden lg:flex flex-col justify-between">
        {sidebarContent}
      </aside>

      {/* Mobile & Tablet Slide-Over Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" 
            onClick={onClose} 
          />

          {/* Sliding Drawer Container */}
          <aside className="relative w-72 bg-[#0D1B2A] border-r border-[#2C3E60] h-full shadow-2xl z-10 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
