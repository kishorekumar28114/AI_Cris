import React from 'react';
import { 
  Play, 
  RefreshCw, 
  ShieldAlert, 
  Bell, 
  User, 
  Info,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';

export const Header: React.FC = () => {
  const { 
    loadDemoIncident, 
    simulateCrisisUpdate, 
    isCrisisUpdateSimulated,
    setIsArchitectureModalOpen,
    crisisNotification,
    dismissCrisisNotification,
    runAiAnalysis,
    isAnalyzing
  } = useCrisis();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#070b14]/95 backdrop-blur-md">
      {/* Primary Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-3 gap-3">
        {/* Left: Title & Subtitle */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              AI CRISIS COMMAND CENTER
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                PROTOTYPE SIMULATION
              </span>
            </h1>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            A Multi-Agent Framework for Intelligent and Adaptive Disaster Response Coordination
          </p>
        </div>

        {/* Right: Actions & Demo presentation controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick AI Run Simulator Button */}
          <button
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
              isAnalyzing 
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-950/50 hover:shadow-purple-900/40'
            }`}
            title="Sequentially executes all 7 specialized AI agents"
          >
            {isAnalyzing ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-300" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-purple-200" />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}</span>
          </button>

          {/* Simulate Crisis Update Button */}
          <button
            onClick={simulateCrisisUpdate}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isCrisisUpdateSimulated
                ? 'bg-orange-950/40 text-orange-300 border-orange-500/40 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border-amber-500/30 hover:border-amber-500/60'
            }`}
            title="Demonstrates dynamic resource reassignment when a new emergency arises"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>Simulate Crisis Update</span>
          </button>

          {/* Demo Mode Button */}
          <button
            onClick={loadDemoIncident}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/40 transition-colors shadow-sm"
            title="Preload Coimbatore Flood demo scenario (INC-1024)"
          >
            <Play className="h-3.5 w-3.5 text-cyan-400" />
            <span>Load Demo Incident</span>
          </button>

          {/* Architecture Explainer */}
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            title="How The AI Works Architecture"
          >
            <Info className="h-4 w-4" />
          </button>

          {/* User coordinator profile */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              <User className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 leading-none">Emergency Coordinator</p>
              <p className="text-[10px] text-slate-400 font-mono">EOC Terminal #04</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reactive notification banner (when simulations or actions happen) */}
      {crisisNotification && crisisNotification.visible && (
        <div 
          className={`flex items-center justify-between px-6 py-2 border-t text-xs transition-all ${
            crisisNotification.type === 'critical'
              ? 'bg-red-950/60 border-red-500/40 text-red-200'
              : crisisNotification.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {crisisNotification.type === 'critical' ? (
              <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
            ) : crisisNotification.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Bell className="h-4 w-4 text-cyan-400 shrink-0" />
            )}
            <span className="font-semibold">{crisisNotification.title}:</span>
            <span className="text-slate-300">{crisisNotification.message}</span>
          </div>
          <button
            onClick={dismissCrisisNotification}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800/50"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
