import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  EXECUTIVE: {
    id: 'Executive',
    name: 'Rajesh Sharma',
    title: 'Chief Operations Officer (HQ)',
    badge: 'Executive HQ',
    badgeColor: 'orange',
    email: 'r.sharma@orebit.min.in',
    initials: 'RS',
    avatarGradient: 'from-[#F4A100] to-[#E67E22]',
    accentColor: '#F4A100',
    description: 'High-level national production trajectory, financial risk impact, and strategic AI decisions.'
  },
  SUPERVISOR: {
    id: 'Mine Supervisor',
    name: 'Vikram Singh',
    title: 'Pit Operations Lead (Zone Alpha)',
    badge: 'Mine Supervisor',
    badgeColor: 'blue',
    email: 'v.singh@orebit.min.in',
    initials: 'VS',
    avatarGradient: 'from-[#00B4D8] to-[#0077B6]',
    accentColor: '#00B4D8',
    description: 'Ground shift ROM yield, equipment RUL telematics warnings, and route queue re-dispatching.'
  }
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('orebit_user_role') || 'Executive';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('orebit_auth') === 'true' || true; // default true for demo
  });

  useEffect(() => {
    localStorage.setItem('orebit_user_role', role);
    localStorage.setItem('orebit_auth', isAuthenticated ? 'true' : 'false');
  }, [role, isAuthenticated]);

  const user = role === 'Executive' ? ROLES.EXECUTIVE : ROLES.SUPERVISOR;

  const login = (selectedRole = 'Executive') => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        login,
        logout,
        switchRole,
        ROLES
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
