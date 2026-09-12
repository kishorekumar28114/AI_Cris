import React from 'react';
import { 
  LayoutDashboard, 
  AlertCircle, 
  Cpu, 
  Truck, 
  Route, 
  Hospital, 
  FileCheck, 
  History, 
  Activity,
  Radio,
  ExternalLink
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import type { NavigationTab } from '../../types/crisis';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, responsePlan, incidents, setIsArchitectureModalOpen } = useCrisis();

  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'incidents', label: 'Incidents', icon: AlertCircle, badge: incidents.length },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Cpu },
    { id: 'resources', label: 'Resources', icon: Truck },
    { id: 'routes', label: 'Routes', icon: Route },
    { id: 'hospitals', label: 'Hospitals', icon: Hospital },
    { 
      id: 'response-plans', 
      label: 'Response Plans', 
      icon: FileCheck, 
      badge: responsePlan.approvalStatus === 'PENDING_APPROVAL' ? '1 Pending' : undefined 
    },
    { id: 'activity-log', label: 'Activity Log', icon: History },
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between border-r border-slate-800 bg-[#070b14] text-slate-200">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Radio className="h-5 w-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                AI CRISIS
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  COMMAND
                </span>
              </h1>
              <p className="text-[10px] tracking-wider text-slate-400 font-mono">
                OPERATIONS CENTER
              </p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 leading-tight border-l-2 border-cyan-500/40 pl-2 font-mono">
            Multi-Agent Disaster Coordination
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Command Modules
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-950/50'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
                      typeof item.badge === 'string'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/60">
        <button
          onClick={() => setIsArchitectureModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 transition-colors text-xs font-medium group"
        >
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-indigo-400" />
            <span>How The AI Works</span>
          </div>
          <ExternalLink className="h-3 w-3 text-indigo-400 opacity-60 group-hover:opacity-100" />
        </button>

        <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-mono">System Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Operational
            </span>
          </div>
          <p className="mt-1.5 text-[10px] text-slate-400 leading-normal">
            7 AI Agents Synchronized
          </p>
        </div>

        <div className="text-[10px] text-slate-400 font-mono text-center">
          Prototype Simulation &bull; Decision Support
        </div>
      </div>
    </aside>
  );
};
