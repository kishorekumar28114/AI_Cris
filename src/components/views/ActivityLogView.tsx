import React, { useState } from 'react';
import { Cpu, Search } from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { CrisisOptionSelector } from '../common/CrisisOptionSelector';

export const ActivityLogView: React.FC = () => {
  const { activityLogs, selectedIncident } = useCrisis();
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'AI_AGENT' | 'HUMAN_APPROVAL' | 'CRISIS_ALERT'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = activityLogs.filter(log => {
    const matchesCategory = filterCategory === 'ALL' || log.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.agentName && log.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              AUDIT TRAIL & EVENT LOG
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Immutable Operations Timeline
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            System Activity Log
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Chronological audit of autonomous multi-agent deliberations for <strong className="text-cyan-400">{selectedIncident.id} ({selectedIncident.title})</strong> and human coordinator actions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search event logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 w-44 font-sans"
            />
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterCategory === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterCategory('AI_AGENT')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterCategory === 'AI_AGENT' ? 'bg-purple-900/60 text-purple-300 font-bold' : 'text-slate-400'
              }`}
            >
              AI Agents
            </button>
            <button
              onClick={() => setFilterCategory('HUMAN_APPROVAL')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterCategory === 'HUMAN_APPROVAL' ? 'bg-emerald-900/60 text-emerald-300 font-bold' : 'text-slate-400'
              }`}
            >
              Human
            </button>
            <button
              onClick={() => setFilterCategory('CRISIS_ALERT')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterCategory === 'CRISIS_ALERT' ? 'bg-red-900/60 text-red-300 font-bold' : 'text-slate-400'
              }`}
            >
              Alerts
            </button>
          </div>
        </div>
      </div>

      {/* TIMELINE VIEW CONTAINER */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
        <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
          {filteredLogs.map((log) => {
            const isHuman = log.category === 'HUMAN_APPROVAL';
            const isAlert = log.category === 'CRISIS_ALERT';

            return (
              <div key={log.id} className="relative group">
                {/* Timeline Bullet Node */}
                <span
                  className={`absolute -left-[30px] top-1.5 h-4 w-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${
                    isAlert
                      ? 'bg-red-500 shadow-md shadow-red-900/50'
                      : isHuman
                      ? 'bg-emerald-500 shadow-md shadow-emerald-900/50'
                      : 'bg-purple-500 shadow-md shadow-purple-900/50'
                  }`}
                />

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        {log.timestamp}
                      </span>
                      <span className="text-slate-600">&bull;</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        isAlert
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : isHuman
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {log.category.replace('_', ' ')}
                      </span>
                      {log.incidentId && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {log.incidentId}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {log.timeAgo}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    {log.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {log.description}
                  </p>

                  {log.agentName && (
                    <div className="mt-2 pt-2 border-t border-slate-900 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Cpu className="h-3 w-3 text-cyan-400" />
                      <span>Initiator: {log.agentName}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
