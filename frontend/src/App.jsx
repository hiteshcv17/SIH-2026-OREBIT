import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import ReserveMap from './pages/ReserveMap';
import ShortfallTracker from './pages/ShortfallTracker';
import EquipmentHealth from './pages/EquipmentHealth';
import PrescriptiveFeed from './pages/PrescriptiveFeed';
import DataSources from './pages/DataSources';
import SettingsPage from './pages/Settings';
import Login from './pages/Login';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ExecutiveDashboard />} />
            <Route path="reserve-map" element={<ReserveMap />} />
            <Route path="shortfall-tracker" element={<ShortfallTracker />} />
            <Route path="equipment-health" element={<EquipmentHealth />} />
            <Route path="prescriptive-feed" element={<PrescriptiveFeed />} />
            <Route path="data-sources" element={<DataSources />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
