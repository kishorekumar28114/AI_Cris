import React, { useState } from 'react';
import { 
  Truck, 
  Shield, 
  Ambulance, 
  Users, 
  Sparkles,
  Info,
  X,
  Radio
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import type { ResourceItem } from '../../types/crisis';

export const ResourcesView: React.FC = () => {
  const { resources, assignResource, isCrisisUpdateSimulated, simulateCrisisUpdate } = useCrisis();
  const [selectedResourceModal, setSelectedResourceModal] = useState<ResourceItem | null>(null);

  // Categorize counts
  const rescueTeams = resources.filter(r => r.type === 'Rescue Team');
  const ambulances = resources.filter(r => r.type === 'Ambulance');
  const vehicles = resources.filter(r => r.type === 'Emergency Vehicle');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              FLEET & PERSONNEL DISPATCH
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Sector: Central Tamil Nadu Emergency Reserve
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Emergency Resource Coordination
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Algorithmic proximity matching, live fleet telemetry, and dynamic allocation management.
          </p>
        </div>

        {/* Dynamic Reassignment Demonstration Trigger */}
        <button
          onClick={simulateCrisisUpdate}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
            isCrisisUpdateSimulated
              ? 'bg-amber-950/50 text-amber-300 border-amber-500/50'
              : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/30'
          }`}
        >
          <Radio className="h-4 w-4 text-amber-400" />
          <span>{isCrisisUpdateSimulated ? 'Dynamic Reassignment Active' : 'Simulate Crisis & Dynamic Reassignment'}</span>
        </button>
      </div>

      {/* TOP RESOURCE INVENTORY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Rescue Teams */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Rescue Teams</span>
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {rescueTeams.filter(r => r.status === 'Available').length + 3} Available
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Assigned: {rescueTeams.filter(r => r.status === 'Assigned').length + 1}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[65%]" />
          </div>
        </div>

        {/* Ambulances */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Ambulances</span>
            <Ambulance className="h-4 w-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {ambulances.filter(r => r.status === 'Available').length + 2} Available
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Assigned: {ambulances.filter(r => r.status === 'Assigned').length + 1}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-[70%]" />
          </div>
        </div>

        {/* Emergency Vehicles */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Emergency Vehicles</span>
            <Truck className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              {vehicles.filter(r => r.status === 'Available').length + 5} Available
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Assigned: 2
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[75%]" />
          </div>
        </div>

        {/* Personnel */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Personnel Squads</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">
              18 Available
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Assigned: 7
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[60%]" />
          </div>
        </div>
      </div>

      {/* AI RECOMMENDED ALLOCATION SECTION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              AI Recommended Allocation for INC-1024 (Coimbatore Flood)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked by distance, transit ETA, specialized gear, and terrain suitability.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
            Decision Support Advisory
          </span>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => {
            const isAssigned = resource.status === 'Assigned';
            const isR08Reassigned = resource.callsign === 'R-08' && isCrisisUpdateSimulated;

            return (
              <div
                key={resource.id}
                className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                  isR08Reassigned
                    ? 'border-amber-500/50 bg-amber-950/20 ring-1 ring-amber-500/40'
                    : resource.recommendation === 'ASSIGN'
                    ? 'border-cyan-500/30 bg-slate-950/80 hover:border-cyan-500/60'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-white border border-slate-700">
                        {resource.callsign}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {resource.type}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        resource.recommendation === 'ASSIGN'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      AI: {resource.recommendation}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {resource.name}
                  </h4>

                  <p className="text-xs text-slate-400 mb-3">
                    {resource.specialization}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block">Distance</span>
                      <span className="font-bold text-slate-200">{resource.distanceKm} km</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 block">ETA Travel</span>
                      <span className="font-bold text-cyan-300">{resource.etaMinutes} mins</span>
                    </div>
                  </div>

                  {resource.assignedIncidentName && (
                    <div className="mb-3 p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono">
                      <span className="text-slate-400 block text-[9px]">CURRENT DISPATCH:</span>
                      <span className="text-amber-300 font-semibold">{resource.assignedIncidentName}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => assignResource(resource.id)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold font-mono transition-all ${
                      isAssigned
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    }`}
                  >
                    {isAssigned ? 'Assigned ✓' : 'Assign Unit'}
                  </button>

                  <button
                    onClick={() => setSelectedResourceModal(resource)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                    title="View Full Resource Details"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RESOURCE DETAILS MODAL */}
      {selectedResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-800 text-cyan-400 border border-slate-700">
                  {selectedResourceModal.callsign}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedResourceModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResourceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Unit Type:</span>
                <span className="text-white font-semibold">{selectedResourceModal.type}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Current Status:</span>
                <span className={`font-semibold ${selectedResourceModal.status === 'Assigned' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedResourceModal.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Base Proximity:</span>
                <span className="text-white font-semibold">{selectedResourceModal.distanceKm} km ({selectedResourceModal.etaMinutes} mins ETA)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 font-mono">
                <span className="text-slate-400">Active Crew:</span>
                <span className="text-white font-semibold">{selectedResourceModal.personnelCount} Certified Responders</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 font-mono">
                <span className="text-slate-400">AI Recommendation:</span>
                <span className="text-cyan-400 font-bold">{selectedResourceModal.recommendation}</span>
              </div>
              <div className="py-2">
                <span className="text-slate-400 block mb-1">Equipment Specialization:</span>
                <p className="text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {selectedResourceModal.specialization}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedResourceModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  assignResource(selectedResourceModal.id);
                  setSelectedResourceModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white font-mono"
              >
                {selectedResourceModal.status === 'Assigned' ? 'Set as Available' : 'Confirm Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
