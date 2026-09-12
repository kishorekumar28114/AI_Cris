import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  CloudRain, 
  ArrowRight
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import type { SeverityLevel } from '../../types/crisis';

export const IncidentsView: React.FC = () => {
  const { incidents, selectIncident, selectedIncident } = useCrisis();
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredIncidents = incidents.filter(inc => {
    const matchesSeverity = filterSeverity === 'ALL' || inc.severity === filterSeverity;
    const matchesSearch = 
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              DISASTER REGISTRY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Active Sector Emergencies
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Incidents Triage & Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Multi-modal crisis inputs ingested from citizen SOS feeds, satellite imagery, and municipal sensors.
          </p>
        </div>

        {/* Filter / Search Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 w-44 font-sans"
            />
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterSeverity('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterSeverity === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterSeverity('CRITICAL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterSeverity === 'CRITICAL' ? 'bg-red-950/60 text-red-300 font-bold border border-red-500/40' : 'text-slate-400'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterSeverity('HIGH')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterSeverity === 'HIGH' ? 'bg-orange-950/60 text-orange-300 font-bold' : 'text-slate-400'
              }`}
            >
              High
            </button>
            <button
              onClick={() => setFilterSeverity('MEDIUM')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterSeverity === 'MEDIUM' ? 'bg-yellow-950/60 text-yellow-300 font-bold' : 'text-slate-400'
              }`}
            >
              Medium
            </button>
          </div>
        </div>
      </div>

      {/* INCIDENTS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIncidents.map((incident) => {
          const isSelected = selectedIncident.id === incident.id;

          return (
            <div
              key={incident.id}
              onClick={() => selectIncident(incident.id)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-cyan-500/60 bg-slate-900 ring-1 ring-cyan-500/40 shadow-xl'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-cyan-400">
                      {incident.id}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {incident.type}
                    </span>
                  </div>

                  <SeverityBadge severity={incident.severity} size="sm" />
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {incident.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{incident.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{incident.timeAgo} ({incident.reportedTime})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-red-300 font-bold">{incident.affectedPeople}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CloudRain className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{incident.weatherCondition}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-4 line-clamp-2">
                  {incident.evidenceSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <StatusBadge status={incident.status} />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectIncident(incident.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-cyan-400 hover:text-cyan-300"
                >
                  <span>Open Command View</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
