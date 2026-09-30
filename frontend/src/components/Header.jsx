import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Badge from './Badge';
import { 
  Clock, 
  Calendar, 
  Activity, 
  Layers,
  Bell,
  User,
  Radio,
  TrendingDown,
  ShieldAlert,
  Flame,
  CheckCircle2,
  X,
  ExternalLink,
  LogOut,
  ChevronDown,
  Briefcase,
  HardHat,
  RefreshCw,
  Menu
} from 'lucide-react';

const RECENT_ALERTS = [
  {
    id: 'alt-001',
    type: 'shortfall',
    title: 'Shortfall Risk Spike Detected',
    message: 'Route Alpha shortfall risk spiked to 18.7% (-2,800 MT gap projected for Tue).',
    timestamp: '4 mins ago',
    read: false,
    path: '/shortfall-tracker',
    icon: TrendingDown,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'alt-002',
    type: 'rul',
    title: 'RUL Critical Warning (<15%)',
    message: 'Haul Truck HT-304 RUL fell to 12% (Transmission Oil Temp 91.2°C). Urgent PHM overhaul needed.',
    timestamp: '14 mins ago',
    read: false,
    path: '/equipment-health',
    icon: ShieldAlert,
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10 border-rose-500/30'
  },
  {
    id: 'alt-003',
    type: 'blast',
    title: 'Blast Fragmentation Oversize Alert',
    message: 'Bench 380 blast yielded 29% oversize (>500mm P80). Secondary blasting recommended.',
    timestamp: '32 mins ago',
    read: false,
    path: '/prescriptive-feed',
    icon: Flame,
    iconColor: 'text-[#F4A100]',
    bgColor: 'bg-[#F4A100]/10 border-[#F4A100]/30'
  }
];

export const Header = ({ isMobileMenuOpen, onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const { user, role, switchRole, logout, ROLES } = useAuth();
  const [time, setTime] = useState(new Date());
  const [apiOnline, setApiOnline] = useState(true);
  const [lastPulse, setLastPulse] = useState(new Date().toLocaleTimeString());

  // Notification dropdown state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [alerts, setAlerts] = useState(RECENT_ALERTS);

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 15-second polling interval
  useEffect(() => {
    const pollHealth = () => {
      fetch('http://localhost:8000/health')
        .then(res => {
          if (res.ok) {
            setApiOnline(true);
            setLastPulse(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          } else {
            setApiOnline(false);
          }
        })
        .catch(() => setApiOnline(false));
    };

    pollHealth();
    const pollInterval = setInterval(pollHealth, 15000);
    return () => clearInterval(pollInterval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const handleAlertClick = (alert) => {
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, read: true } : a));
    setIsNotificationsOpen(false);
    navigate(alert.path);
  };

  const handleRoleToggle = (newRole) => {
    switchRole(newRole);
    setIsUserMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-[#0D1B2A]/90 backdrop-blur-xl border-b border-[#2C3E60] px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        {/* Mobile / Tablet Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl bg-[#1B2A4A] border border-[#2C3E60] text-[#A0AEC0] hover:text-[#F5F5F5] lg:hidden flex items-center justify-center transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-[#F4A100]" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F4A100] to-[#00B4D8] flex items-center justify-center shadow-glow-orange">
            <Layers className="w-5 h-5 text-[#0D1B2A]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#F5F5F5] tracking-tight leading-none flex items-center gap-2">
              OreBit
              <span className="text-[10px] font-semibold font-sans px-2 py-0.5 rounded bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/30">
                PROD
              </span>
            </h1>
            <p className="text-xs text-[#A0AEC0] hidden sm:block">Intelligent Mining Operations</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Real-time Polling Telemetry Pulse Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1B2A4A]/80 border border-[#2C3E60]">
          {apiOnline ? (
            <>
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-emerald-400 font-heading leading-tight">Live Stream 15s</span>
                <span className="text-[9px] text-[#A0AEC0] font-mono leading-tight">Pulse: {lastPulse}</span>
              </div>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-xs font-semibold text-rose-400 font-heading">Offline Mode</span>
            </>
          )}
        </div>

        {/* Live Date & Time Counter */}
        <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-[#1B2A4A]/90 border border-[#2C3E60] shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-[#A0AEC0] hidden lg:flex">
            <Calendar className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-[#2C3E60] hidden lg:inline">|</span>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F4A100]">
            <Clock className="w-3.5 h-3.5 text-[#F4A100]" />
            <span className="tracking-widest">{formattedTime}</span>
          </div>
        </div>

        {/* Notification Bell Dropdown Section */}
        <div className="relative" ref={dropdownRef}>
          <button 
            aria-label="Notifications"
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsUserMenuOpen(false);
            }}
            className={`p-2 rounded-lg border transition-all relative ${
              isNotificationsOpen 
                ? 'bg-[#1B2A4A] text-[#F4A100] border-[#F4A100]/60 shadow-glow-orange' 
                : 'bg-[#1B2A4A]/80 hover:bg-[#22385E] border-[#2C3E60] text-[#A0AEC0] hover:text-[#F5F5F5]'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[#F5F5F5] font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Interactive Dropdown Menu */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#1B2A4A] border border-[#00B4D8]/50 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3.5 bg-[#0D1B2A] border-b border-[#2C3E60] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#F4A100]" />
                  <span className="font-heading font-bold text-sm text-[#F5F5F5]">High-Priority Alerts</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold font-mono">
                      {unreadCount} Unread
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-heading font-semibold text-[#00B4D8] hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#2C3E60]/50 p-1">
                {alerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div
                      key={alert.id}
                      onClick={() => handleAlertClick(alert)}
                      className={`p-3 rounded-xl transition-all cursor-pointer hover:bg-[#22385E]/80 border ${
                        alert.bgColor
                      } ${!alert.read ? 'ring-1 ring-[#F4A100]/40' : 'opacity-80'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#0D1B2A] border border-[#2C3E60] flex-shrink-0 mt-0.5">
                          <Icon className={`w-4 h-4 ${alert.iconColor}`} />
                        </div>

                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-xs text-[#F5F5F5]">{alert.title}</span>
                            <span className="text-[10px] font-mono text-[#A0AEC0]">{alert.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#A0AEC0] leading-snug">{alert.message}</p>
                          <div className="pt-1 flex items-center gap-1 text-[11px] font-heading font-semibold text-[#00B4D8] hover:text-[#F4A100]">
                            Jump to Module <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-2.5 bg-[#0D1B2A] border-t border-[#2C3E60] text-center">
                <span className="text-[11px] font-heading text-[#A0AEC0]">
                  Connected to Real-Time AI Telemetry Bridge
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Live Role Switcher Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-[#1B2A4A]/80 hover:bg-[#22385E] border border-[#2C3E60] transition-all cursor-pointer"
          >
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${user.avatarGradient} border border-[#F5F5F5]/20 flex items-center justify-center text-xs font-bold text-[#0D1B2A] font-heading shadow-sm`}>
              {user.initials}
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-xs font-bold font-heading text-[#F5F5F5] leading-tight flex items-center gap-1">
                {user.name}
              </span>
              <span className={`text-[9px] font-mono leading-tight font-semibold ${
                role === 'Executive' ? 'text-[#F4A100]' : 'text-[#00B4D8]'
              }`}>
                {user.badge}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#A0AEC0]" />
          </button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#1B2A4A] border border-[#00B4D8]/50 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3.5 bg-[#0D1B2A] border-b border-[#2C3E60]">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${user.avatarGradient} flex items-center justify-center text-sm font-bold text-[#0D1B2A] font-heading`}>
                    {user.initials}
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-[#F5F5F5] block leading-tight">{user.name}</span>
                    <span className="text-xs text-[#A0AEC0] block leading-tight">{user.title}</span>
                  </div>
                </div>
              </div>

              {/* Live Persona Role Switcher */}
              <div className="p-3 space-y-2 border-b border-[#2C3E60]">
                <div className="flex items-center justify-between text-[11px] font-heading uppercase text-[#A0AEC0] font-bold">
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 text-[#00B4D8]" /> Switch Persona View
                  </span>
                  <span className="text-[9px] font-mono text-[#F4A100]">Live Demo</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleRoleToggle('Executive')}
                    className={`p-2 rounded-xl border text-xs font-heading font-bold flex flex-col items-center gap-1 transition-all ${
                      role === 'Executive'
                        ? 'bg-[#F4A100]/20 text-[#F4A100] border-[#F4A100] shadow-glow-orange'
                        : 'bg-[#0D1B2A] text-[#A0AEC0] hover:text-[#F5F5F5] border-[#2C3E60]'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Executive</span>
                  </button>

                  <button
                    onClick={() => handleRoleToggle('Mine Supervisor')}
                    className={`p-2 rounded-xl border text-xs font-heading font-bold flex flex-col items-center gap-1 transition-all ${
                      role === 'Mine Supervisor'
                        ? 'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8] shadow-glow-blue'
                        : 'bg-[#0D1B2A] text-[#A0AEC0] hover:text-[#F5F5F5] border-[#2C3E60]'
                    }`}
                  >
                    <HardHat className="w-4 h-4" />
                    <span>Supervisor</span>
                  </button>
                </div>
              </div>

              {/* Logout Option */}
              <div className="p-2 bg-[#0D1B2A]">
                <button
                  onClick={handleLogoutClick}
                  className="w-full px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-heading font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </span>
                  <span className="text-[10px] font-mono">End Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

