import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  Sparkles
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { StylizedCrisisMap } from '../map/StylizedCrisisMap';
import { CrisisOptionSelector } from '../common/CrisisOptionSelector';

export const RoutesView: React.FC = () => {
  const { routes, selectedIncident } = useCrisis();
  const [activeRouteFilter, setActiveRouteFilter] = useState<'both' | 'A' | 'B'>('both');

  const routeA = routes.find(r => r.code === 'ROUTE_A') || routes[0];
  const routeB = routes.find(r => r.code === 'ROUTE_B') || routes[1];

  return (
    <div className="space-y-6">
      {/* CRISIS SELECTION OPTIONS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <CrisisOptionSelector />
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              TACTICAL MOBILITY & TRANSIT
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Transit Node: {selectedIncident.location} Urban Sector
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            AI Route Planning & Road Clearance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous obstacle avoidance, flood depth estimation, and elevated evacuation corridor selection.
          </p>
        </div>

        {/* Route Selector Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          <button
            onClick={() => setActiveRouteFilter('both')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRouteFilter === 'both'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Corridors
          </button>
          <button
            onClick={() => setActiveRouteFilter('A')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeRouteFilter === 'A'
                ? 'bg-cyan-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Route A (Optimal)
          </button>
          <button
            onClick={() => setActiveRouteFilter('B')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeRouteFilter === 'B'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Route B (Detour)
          </button>
        </div>
      </div>

      {/* DISPATCH FLOW INDICATOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">ORIGIN / INCIDENT</span>
            <span className="text-xs font-bold text-white">{selectedIncident.id} ({selectedIncident.location})</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Navigation className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">DISPATCH UNIT</span>
            <span className="text-xs font-bold text-white">Rescue Unit R-12 & Ambulance A-04</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 block">DESTINATION</span>
            <span className="text-xs font-bold text-white">Kovai Medical Center Emergency Hub</span>
          </div>
        </div>
      </div>

      {/* TACTICAL MAP WITH ROUTES HIGHLIGHTED */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
        <StylizedCrisisMap showRoutes={true} highlightRoute={activeRouteFilter} />
      </div>

      {/* 2-COLUMN COMPARISON CARDS: RECOMMENDED ROUTE A vs ALTERNATIVE ROUTE B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ROUTE A (RECOMMENDED) */}
        <div className="rounded-2xl border-2 border-cyan-500/50 bg-slate-900/90 p-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-blue-600 px-4 py-1 rounded-bl-xl text-[10px] font-mono font-bold text-white uppercase tracking-wider">
            ★ AI RECOMMENDED
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base font-extrabold text-white">
              {routeA.name}
            </h3>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Direct elevated flyover bypassing flooded low-lying underpass.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Total Distance</span>
              <span className="text-xl font-bold text-cyan-400">{routeA.distanceKm} km</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Estimated Travel</span>
              <span className="text-xl font-bold text-emerald-400">{routeA.etaMinutes} min</span>
            </div>
          </div>

          <div className="space-y-2 text-xs mb-4">
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Road Condition:</span>
              <span className="text-amber-300 font-medium">{routeA.roadCondition}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Clearance Type:</span>
              <span className="text-white">{routeA.clearanceLevel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Operational Status:</span>
              <span className="text-emerald-400 font-semibold">{routeA.status}</span>
            </div>
          </div>

          {/* AI RATIONALE BOX */}
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>AI Routing Justification</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              "Use <strong>Route A</strong> because it provides the shortest currently available path (4.2 km) while elevating emergency transports above the flooded Avinashi Underpass, shaving 4 minutes off patient transit time."
            </p>
          </div>
        </div>

        {/* ROUTE B (ALTERNATIVE) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <h3 className="text-base font-bold text-white">
                {routeB.name}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 text-[10px] font-mono font-semibold">
              BACKUP DETOUR
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Peripheral highway bypass via Trichy Ring Road.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Total Distance</span>
              <span className="text-xl font-bold text-slate-300">{routeB.distanceKm} km</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Estimated Travel</span>
              <span className="text-xl font-bold text-amber-400">{routeB.etaMinutes} min</span>
            </div>
          </div>

          <div className="space-y-2 text-xs mb-4">
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Road Condition:</span>
              <span className="text-slate-300">{routeB.roadCondition}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Clearance Type:</span>
              <span className="text-white">{routeB.clearanceLevel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
              <span className="text-slate-400">Operational Status:</span>
              <span className="text-cyan-400 font-semibold">{routeB.status}</span>
            </div>
          </div>

          {/* Hazard Note */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1 font-mono">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Transit Advisory</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {routeB.hazardNote}. Retained in telemetry as active fallback should heavy water inflows compromise flyover entry ramps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
