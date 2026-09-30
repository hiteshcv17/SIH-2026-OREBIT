import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { 
  Layers, 
  UserCheck, 
  ShieldAlert, 
  Briefcase, 
  HardHat, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, ROLES } = useAuth();
  const [selectedRole, setSelectedRole] = useState('Executive');
  const [email, setEmail] = useState('r.sharma@orebit.min.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'Executive') {
      setEmail('r.sharma@orebit.min.in');
    } else {
      setEmail('v.singh@orebit.min.in');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };

  const handleQuickDemoLogin = (roleId) => {
    login(roleId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#F5F5F5] flex flex-col justify-between selection:bg-[#F4A100] selection:text-[#0D1B2A] relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F4A100]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="px-6 py-5 border-b border-[#2C3E60]/60 flex items-center justify-between relative z-10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4A100] to-[#00B4D8] flex items-center justify-center shadow-glow-orange">
            <Layers className="w-6 h-6 text-[#0D1B2A]" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-[#F5F5F5] tracking-tight flex items-center gap-2">
              OreBit
              <span className="text-[10px] font-semibold font-sans px-2 py-0.5 rounded bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/30">
                PROD v1.0
              </span>
            </h1>
            <p className="text-xs text-[#A0AEC0]">Intelligent Mining Operations System</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#00B4D8] bg-[#1B2A4A] px-3 py-1.5 rounded-lg border border-[#2C3E60]">
          <Sparkles className="w-3.5 h-3.5 text-[#F4A100]" />
          <span>Demo Authentication Node</span>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero / Persona Overview Column */}
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/30 text-xs font-heading font-semibold">
                <UserCheck className="w-3.5 h-3.5" /> Role-Based Intelligence Access
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#F5F5F5] tracking-tight leading-tight">
                Select Your Operating Persona
              </h2>
              <p className="text-sm text-[#A0AEC0] leading-relaxed">
                OreBit dynamically tailors executive KPIs, spatial reserve maps, and equipment telemetry based on your organizational role.
              </p>
            </div>

            {/* Persona Selection Cards */}
            <div className="space-y-3">
              {/* Executive Persona */}
              <div 
                onClick={() => handleRoleSelect('Executive')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === 'Executive'
                    ? 'bg-[#1B2A4A] border-[#F4A100] shadow-glow-orange'
                    : 'bg-[#1B2A4A]/50 hover:bg-[#1B2A4A] border-[#2C3E60] opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/30 mt-0.5">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">{ROLES.EXECUTIVE.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F4A100]/20 text-[#F4A100] border border-[#F4A100]/30">
                        {ROLES.EXECUTIVE.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#A0AEC0] leading-snug">{ROLES.EXECUTIVE.description}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#00B4D8]">User: {ROLES.EXECUTIVE.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickDemoLogin('Executive');
                        }}
                        className="text-xs font-heading font-bold text-[#F4A100] hover:underline flex items-center gap-1"
                      >
                        Quick Demo Login <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mine Supervisor Persona */}
              <div 
                onClick={() => handleRoleSelect('Mine Supervisor')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === 'Mine Supervisor'
                    ? 'bg-[#1B2A4A] border-[#00B4D8] shadow-glow-blue'
                    : 'bg-[#1B2A4A]/50 hover:bg-[#1B2A4A] border-[#2C3E60] opacity-80'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30 mt-0.5">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">{ROLES.SUPERVISOR.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/30">
                        {ROLES.SUPERVISOR.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#A0AEC0] leading-snug">{ROLES.SUPERVISOR.description}</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#00B4D8]">User: {ROLES.SUPERVISOR.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickDemoLogin('Mine Supervisor');
                        }}
                        className="text-xs font-heading font-bold text-[#00B4D8] hover:underline flex items-center gap-1"
                      >
                        Quick Demo Login <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card Column */}
          <div className="md:col-span-6">
            <Card variant="default" className="p-6 sm:p-8 bg-[#1B2A4A]/90 backdrop-blur-xl border-[#2C3E60] shadow-2xl relative">
              <div className="mb-6 space-y-1">
                <h3 className="text-xl font-bold font-heading text-[#F5F5F5] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#F4A100]" /> System Sign-In
                </h3>
                <p className="text-xs text-[#A0AEC0]">
                  Authenticating as <span className="font-bold text-[#F4A100]">{selectedRole}</span>
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-heading text-[#A0AEC0] mb-1.5">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#A0AEC0]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#0D1B2A] border border-[#2C3E60] rounded-xl text-xs text-[#F5F5F5] focus:outline-none focus:border-[#00B4D8] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading text-[#A0AEC0] mb-1.5">Security Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-[#A0AEC0]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#0D1B2A] border border-[#2C3E60] rounded-xl text-xs text-[#F5F5F5] focus:outline-none focus:border-[#00B4D8] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl font-heading font-bold text-sm text-[#0D1B2A] transition-all flex items-center justify-center gap-2 shadow-lg ${
                      selectedRole === 'Executive'
                        ? 'bg-[#F4A100] hover:bg-[#E09400] shadow-glow-orange'
                        : 'bg-[#00B4D8] hover:bg-[#0096B4] shadow-glow-blue'
                    }`}
                  >
                    <span>Enter OreBit Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Demo Hint Footer */}
              <div className="mt-6 pt-4 border-t border-[#2C3E60]/50 flex items-center justify-between text-[11px] text-[#A0AEC0]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mock Auth Enabled</span>
                </div>
                <span className="font-mono text-[10px]">FastAPI Gateway: Ready</span>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-[#2C3E60]/50 text-center text-xs text-[#A0AEC0] relative z-10">
        OreBit Intelligent Mining Monorepo Platform • Phase 19 Role-Based Access Framework
      </footer>
    </div>
  );
};

export default Login;
