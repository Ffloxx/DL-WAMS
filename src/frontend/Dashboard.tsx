import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { IncidentLogs } from '../components/IncidentLogs';
import { IncidentDetailsSidebar } from '../components/IncidentDetailsSidebar';
import { IncidentLogsPage } from './IncidentLogsPage';
import { CameraGridPage } from './CameraGridPage';
import { AnalyticsPage } from './AnalyticsPage';
import { SettingsPage } from './SettingsPage';
import { StaffManagementPage } from './StaffManagementPage';

export type TabName = 'Camera Grid' | 'Incident Logs' | 'Analytics' | 'Staff Management' | 'Settings';
export type CameraView = '2x2' | '3x3';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Staff Management');

  const handleLogout = () => {
    alert("System Logout sequence initiated. Terminating session...");
  };

  const handleLockdown = () => {
    if (window.confirm("WARNING: Are you sure you want to initiate a FULL FACILITY LOCKDOWN?")) {
      alert("LOCKDOWN INITIATED. All external doors sealed. Alarm system activated.");
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'Incident Logs':
        return <IncidentLogsPage />;
      case 'Camera Grid':
        return <CameraGridPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Staff Management':
        return <StaffManagementPage />;
      case 'Settings':
        return <SettingsPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b101a] text-slate-200 overflow-hidden font-sans">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      {renderPage()}

      <aside className={`border-l border-slate-800 bg-[#0f1522] flex flex-col shrink-0 ${activeTab === 'Incident Logs' ? 'w-[350px]' : 'w-80'}`}>
        {activeTab === 'Incident Logs' ? (
          <IncidentDetailsSidebar />
        ) : (
          <IncidentLogs onInitiateLockdown={handleLockdown} />
        )}
      </aside>
    </div>
  );
};
