import React, { useState } from 'react';
import { CrisisProvider, useCrisis } from './context/CrisisContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ArchitectureModal } from './components/layout/ArchitectureModal';
import { DashboardView } from './components/views/DashboardView';
import { IncidentsView } from './components/views/IncidentsView';
import { IncidentDetailsView } from './components/views/IncidentDetailsView';
import { AIAnalysisView } from './components/views/AIAnalysisView';
import { ResourcesView } from './components/views/ResourcesView';
import { RoutesView } from './components/views/RoutesView';
import { HospitalsView } from './components/views/HospitalsView';
import { ResponsePlanView } from './components/views/ResponsePlanView';
import { ActivityLogView } from './components/views/ActivityLogView';

const MainContent: React.FC = () => {
  const { activeTab, selectedIncident } = useCrisis();
  const [incidentsSubView, setIncidentsSubView] = useState<'details' | 'list'>('details');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'incidents':
        return (
          <div className="space-y-4">
            {/* Sub-navigation bar between Dossier and Full Registry */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIncidentsSubView('details')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    incidentsSubView === 'details'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Incident Details ({selectedIncident.id})
                </button>
                <button
                  onClick={() => setIncidentsSubView('list')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    incidentsSubView === 'list'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All Active Incidents Registry
                </button>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Active Incident: <strong className="text-white">{selectedIncident.id}</strong>
              </span>
            </div>

            {incidentsSubView === 'details' ? <IncidentDetailsView /> : <IncidentsView />}
          </div>
        );
      case 'ai-analysis':
        return <AIAnalysisView />;
      case 'resources':
        return <ResourcesView />;
      case 'routes':
        return <RoutesView />;
      case 'hospitals':
        return <HospitalsView />;
      case 'response-plans':
        return <ResponsePlanView />;
      case 'activity-log':
        return <ActivityLogView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#070b14]">
      <div className="max-w-7xl mx-auto space-y-6">
        {renderView()}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <CrisisProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans">
        {/* Left Command Sidebar */}
        <Sidebar />

        {/* Right Operations Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <MainContent />
        </div>

        {/* Architecture / How It Works Modal */}
        <ArchitectureModal />
      </div>
    </CrisisProvider>
  );
}
