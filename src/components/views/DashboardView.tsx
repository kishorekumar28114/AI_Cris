import React from 'react';
import { 
  Flame, 
  AlertTriangle, 
  ShieldCheck, 
  Building2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight,
  Activity,
  Waves
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { StylizedCrisisMap } from '../map/StylizedCrisisMap';
import { CrisisOptionSelector } from '../common/CrisisOptionSelector';

export const DashboardView: React.FC = () => {
  const { 
    incidents, 
    selectedIncident,
    selectIncident, 
    activityLogs, 
    resources, 
    hospitals, 
    responsePlan, 
    runAiAnalysis, 
    isAnalyzing 
  } = useCrisis();

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL').length;
  const availableResourcesCount = resources.filter(r => r.status === 'Available').length;
  const pendingPlansCount = responsePlan.approvalStatus === 'PENDING_APPROVAL' ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner with Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              OPERATIONAL SITUATION REPORT
            </span>
            <span className="text-xs text-slate-400 font-mono">SECTOR: WEST TAMIL NADU</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Emergency Operations Command Dashboard
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time crisis telemetry, multi-agent AI synthesis, and human-in-the-loop dispatch coordination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-950/50"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isAnalyzing ? 'Simulating Agents...' : `Run AI for ${selectedIncident.id}`}</span>
          </button>
        </div>
      </div>

      {/* 4 CRISES INTERACTIVE SELECTION OPTIONS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <CrisisOptionSelector 
          targetTab="incidents" 
          title="Select Crisis Option (Navigates to Incident Page)" 
          subtitle="(Single Source: crisesData.json)"
        />
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        {/* Active Incidents */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Active Incidents</span>
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              0{incidents.length}
            </span>
            <span className="text-[10px] text-amber-400 font-medium">Active</span>
          </div>
        </div>

        {/* Critical */}
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 hover:border-red-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-red-300 font-mono">Critical</span>
            <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-red-400 font-mono">
              0{criticalCount}
            </span>
            <span className="text-[10px] text-red-300/80 font-mono">High Priority</span>
          </div>
        </div>

        {/* Resources Available */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Resources Ready</span>
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              {availableResourcesCount.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-cyan-400 font-medium font-mono">Ready</span>
          </div>
        </div>

        {/* Hospitals Available */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Hospitals Prepped</span>
            <Building2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
              0{hospitals.length}
            </span>
            <span className="text-[10px] text-emerald-400 font-medium font-mono">In Network</span>
          </div>
        </div>

        {/* Response Plans Pending */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/50 transition-all col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-mono">Plans Pending</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">
              0{pendingPlansCount}
            </span>
            <span className="text-[10px] text-amber-300 font-medium">Awaiting Human</span>
          </div>
        </div>
      </div>

      {/* TACTICAL MAP PREVIEW SECTION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Live Tactical Map &bull; Sector Operations ({selectedIncident.location})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Interactive GIS Overview for {selectedIncident.id}
          </span>
        </div>
        <StylizedCrisisMap showRoutes={true} highlightRoute="both" />
      </div>

      {/* TWO COLUMN SECTION: ACTIVE INCIDENTS TABLE & LIVE ACTIVITY TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVE INCIDENTS TABLE (2 Columns on large screens) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                Active Incidents Monitor
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-cyan-300 border border-slate-700">
                  {incidents.length} Live Records
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any crisis option row to retrieve dynamic multi-agent analysis from <code className="text-cyan-400 font-mono">crisesData.json</code>.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                  <th className="pb-3 font-semibold">Incident</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Severity</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Reported</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {incidents.map((incident, idx) => {
                  const isSelected = incident.id === selectedIncident.id;
                  return (
                    <tr
                      key={incident.id}
                      onClick={() => selectIncident(incident.id, 'incidents')}
                      className={`cursor-pointer transition-colors group ${
                        isSelected ? 'bg-cyan-950/30' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="py-3.5 font-mono font-bold text-white group-hover:text-cyan-300 flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                        <span>Opt {idx + 1}: {incident.id}</span>
                      </td>
                      <td className="py-3.5 text-slate-300">
                        {incident.type}
                      </td>
                      <td className="py-3.5 text-slate-300 font-medium">
                        {incident.location}
                      </td>
                      <td className="py-3.5">
                        <SeverityBadge severity={incident.severity} size="sm" />
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={incident.status} />
                      </td>
                      <td className="py-3.5 text-slate-400 font-mono">
                        {incident.timeAgo}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              selectIncident(incident.id, 'incidents');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold transition-all shadow-sm"
                          >
                            <span>Incident Page</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              selectIncident(incident.id, 'ai-analysis');
                            }}
                            className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 text-[11px] font-medium transition-all border border-slate-700/60"
                            title={`Jump directly to AI Analysis for ${incident.id}`}
                          >
                            <span>AI Analysis</span>
                            <Sparkles className="h-3 w-3 text-purple-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* LIVE RESPONSE ACTIVITY TIMELINE (1 Column) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                Live Response Activity
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                REAL-TIME AUDIT
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Telemetry feed for target: <strong className="text-cyan-400">{selectedIncident.id}</strong> ({selectedIncident.title})
            </p>

            {/* Timeline Stream */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
              {activityLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <span
                    className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-slate-900 ${
                      log.severity === 'CRITICAL'
                        ? 'bg-red-500 ring-2 ring-red-500/30'
                        : log.severity === 'HIGH'
                        ? 'bg-amber-500'
                        : 'bg-cyan-500'
                    }`}
                  />
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {log.timestamp.slice(0, 5)}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {log.timeAgo}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
                    {log.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                    {log.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-center">
            <button
              onClick={() => selectIncident(selectedIncident.id, 'incidents')}
              className="w-full py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-colors border border-slate-700/60"
            >
              <span>Inspect Incident Dossier & Telemetry ({selectedIncident.id})</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
