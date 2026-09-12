import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users, 
  CloudRain, 
  Building, 
  CheckCircle, 
  Camera, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StylizedCrisisMap } from '../map/StylizedCrisisMap';

export const IncidentDetailsView: React.FC = () => {
  const { selectedIncident, incidents, selectIncident, setActiveTab, runAiAnalysis, isAnalyzing } = useCrisis();

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-lg font-extrabold text-white">
                {selectedIncident.id}
              </span>
              <span className="text-slate-600">|</span>
              <span className="font-bold text-slate-200 text-base uppercase">
                {selectedIncident.title}
              </span>
              <SeverityBadge severity={selectedIncident.severity} size="md" />
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                <span>Location: {selectedIncident.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Reported: {selectedIncident.reportedTime} ({selectedIncident.timeAgo})</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>STATUS: AI ANALYSIS COMPLETE</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('ai-analysis');
                runAiAnalysis();
              }}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-950/50"
            >
              <Cpu className="h-4 w-4" />
              <span>{isAnalyzing ? 'Simulating Analysis...' : 'Run Agent Analysis'}</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-analysis')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-950/40"
            >
              <span>View Multi-Agent Reasoning</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Incident Switcher (Tabs) */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 self-center mr-1">Switch Incident:</span>
          {incidents.map(inc => (
            <button
              key={inc.id}
              onClick={() => selectIncident(inc.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedIncident.id === inc.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {inc.id} ({inc.type} - {inc.location})
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Left Side (Incident Information & Evidence) | Right Side (Tactical Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT SIDE: Incident Information (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Metadata Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
              <AlertTriangle className="h-4 w-4 text-cyan-400" />
              Incident Dossier &bull; Telemetry
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <span>Incident Type</span>
                </span>
                <span className="font-semibold text-white font-mono">{selectedIncident.type}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>Location</span>
                </span>
                <span className="font-semibold text-slate-200 font-mono">{selectedIncident.location}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  <span>Estimated Affected People</span>
                </span>
                <span className="font-bold text-red-400 font-mono">{selectedIncident.affectedPeople}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Urgency Rating</span>
                </span>
                <span className="font-bold text-red-400 font-mono uppercase">{selectedIncident.urgency}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-slate-400" />
                  <span>Infrastructure Impact</span>
                </span>
                <span className="font-semibold text-amber-400 font-mono uppercase">{selectedIncident.infrastructureImpact}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-2">
                  <CloudRain className="h-3.5 w-3.5 text-slate-400" />
                  <span>Weather Condition</span>
                </span>
                <span className="font-medium text-cyan-300 font-mono">{selectedIncident.weatherCondition}</span>
              </div>
            </div>
          </div>

          {/* Citizen Evidence Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Camera className="h-4 w-4 text-emerald-400" />
                Verified Citizen Evidence
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                <CheckCircle className="h-3 w-3" />
                EXIF Authenticated
              </span>
            </div>

            {/* Stylized Visual Mock Image Placeholder */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-700 bg-gradient-to-b from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-end p-4">
              {/* Visual simulated flooded road graphics */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent flex items-end">
                <div className="w-full h-8 bg-blue-600/30 backdrop-blur-xs border-t border-cyan-400/40 flex items-center justify-around px-4">
                  <span className="text-[9px] font-mono text-cyan-300">WATER LEVEL SENSOR: +1.2m</span>
                  <span className="text-[9px] font-mono text-cyan-300">GEO: 11.0168° N, 76.9558° E</span>
                </div>
              </div>

              {/* Water mark tag */}
              <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-slate-700/80 text-xs">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Citizen Video Still #SOS-9182</span>
                </p>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {selectedIncident.evidenceSummary}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Verification Engine: Evidence Agent v2.4</span>
              <span className="text-emerald-400 font-semibold">Confidence: 98%</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Situational Command Map (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Tactical Incident Grid &bull; Situational Map
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live spatial coordinates showing incident epicenter, unit dispatches, and hospital destinations.
                </p>
              </div>
              <span className="text-xs text-cyan-400 font-mono font-bold bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                VECTOR OVERVIEW
              </span>
            </div>

            <StylizedCrisisMap showRoutes={true} highlightRoute="both" />

            <div className="grid grid-cols-3 gap-3 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">PRIMARY INCIDENT</span>
                <span className="font-bold text-red-400">{selectedIncident.id}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">DISPATCHED UNIT</span>
                <span className="font-bold text-blue-400">Rescue Team R-12</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">DESTINATION</span>
                <span className="font-bold text-emerald-400">Kovai Medical Ctr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
