import React from 'react';
import { 
  Waves, 
  Flame, 
  Car, 
  CloudRain, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { SeverityBadge } from './SeverityBadge';
import type { NavigationTab } from '../../types/crisis';

interface CrisisOptionSelectorProps {
  compact?: boolean;
  className?: string;
  showTitle?: boolean;
  targetTab?: NavigationTab;
  title?: string;
  subtitle?: string;
}

export const CrisisOptionSelector: React.FC<CrisisOptionSelectorProps> = ({
  compact = false,
  className = '',
  showTitle = true,
  targetTab,
  title,
  subtitle,
}) => {
  const { incidents, selectedIncident, selectIncident, isAnalyzing, activeTab } = useCrisis();

  const effectiveTargetTab = targetTab !== undefined ? targetTab : (activeTab === 'dashboard' ? 'incidents' : undefined);

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'Flood':
        return Waves;
      case 'Road Accident':
        return Car;
      case 'Fire':
        return Flame;
      case 'Earthquake':
      case 'Landslide':
      default:
        return CloudRain;
    }
  };

  const getThemeClasses = (type: string, isSelected: boolean) => {
    if (isSelected) {
      switch (type) {
        case 'Flood':
          return 'border-cyan-500/80 bg-cyan-950/30 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/40';
        case 'Road Accident':
          return 'border-amber-500/80 bg-amber-950/30 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/40';
        case 'Fire':
          return 'border-orange-500/80 bg-orange-950/30 ring-2 ring-orange-500/40 shadow-lg shadow-orange-950/40';
        default:
          return 'border-purple-500/80 bg-purple-950/30 ring-2 ring-purple-500/40 shadow-lg shadow-purple-950/40';
      }
    }
    return 'border-slate-800/80 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900';
  };

  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {incidents.map((incident, idx) => {
          const isSelected = incident.id === selectedIncident.id;
          const Icon = getDisasterIcon(incident.type);

          return (
            <button
              key={incident.id}
              onClick={() => selectIncident(incident.id, effectiveTargetTab)}
              disabled={isAnalyzing}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/60 font-bold shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`flex h-2 w-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
              <Icon className="h-3.5 w-3.5" />
              <span>Option {idx + 1}: {incident.id}</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">({incident.location})</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs">
              <Layers className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-300">
              {title || (effectiveTargetTab === 'incidents' ? 'Select Crisis Option (Opens Incident Page)' : 'Select Crisis Option for AI Analysis')}
            </h3>
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              {subtitle || '(Single Source: crisesData.json)'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Target: <strong className="text-white">{selectedIncident.id} ({selectedIncident.title})</strong>
          </span>
        </div>
      )}

      {/* 4 Interactive Option Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {incidents.map((incident, index) => {
          const isSelected = incident.id === selectedIncident.id;
          const Icon = getDisasterIcon(incident.type);
          const themeClass = getThemeClasses(incident.type, isSelected);

          return (
            <div
              key={incident.id}
              onClick={() => selectIncident(incident.id, effectiveTargetTab)}
              className={`group relative rounded-xl border p-3.5 cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${themeClass} ${
                isAnalyzing ? 'opacity-80 pointer-events-none' : ''
              }`}
            >
              {/* Top Row: Option Pill & Severity */}
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/40'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 group-hover:text-slate-200'
                }`}>
                  Option {index + 1}
                </span>

                <SeverityBadge severity={incident.severity} size="sm" />
              </div>

              {/* Title & Type */}
              <div className="mb-2">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white mb-0.5">
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`} />
                  <span className="truncate">{incident.id}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 leading-snug line-clamp-1 group-hover:text-white">
                  {incident.title}
                </h4>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{incident.location}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span className="text-[10px] truncate max-w-[80px]">{incident.affectedPeople}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400">
                      <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                      <span>{effectiveTargetTab === 'incidents' ? 'INCIDENT LOADED' : 'ANALYSIS LOADED'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 group-hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
                      <span>{effectiveTargetTab === 'incidents' ? 'Open Incident Dossier' : 'Analyze crisis'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">{incident.reportedTime}</span>
                </div>
              </div>

              {/* Active Selection Glow Dot */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
