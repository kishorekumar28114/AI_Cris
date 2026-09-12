import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  CloudRain, 
  Truck, 
  Navigation, 
  Hospital, 
  ShieldCheck, 
  ArrowDown, 
  Layers, 
  RefreshCw,
  Gauge,
  UserCheck,
  FileCheck2
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';

export const AIAnalysisView: React.FC = () => {
  const { 
    agents, 
    isAnalyzing, 
    currentSimulatingIndex, 
    analysisCompleted, 
    runAiAnalysis, 
    setActiveTab, 
    selectedIncident 
  } = useCrisis();

  const [expandedAgentId, setExpandedAgentId] = useState<string | null>('agent-4');

  // Helper icons for each agent
  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'agent-1':
        return Cpu;
      case 'agent-2':
        return FileCheck2;
      case 'agent-3':
        return CloudRain;
      case 'agent-4':
        return Gauge;
      case 'agent-5':
        return Truck;
      case 'agent-6':
        return Navigation;
      case 'agent-7':
      default:
        return Hospital;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Orchestrator Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                MULTI-AGENT COLLABORATION PIPELINE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Target: {selectedIncident.id} ({selectedIncident.location})
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              AI Multi-Agent Analysis
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Prototype Simulation
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Specialized agents collaboratively analyse the incident, evaluate multi-modal evidence, calculate real-time risks, and formulate unified operational advice.
            </p>
          </div>

          {/* Sequential Execution Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-lg ${
                isAnalyzing
                  ? 'bg-purple-700 text-purple-200 border border-purple-400 cursor-wait animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-purple-950/50 hover:scale-[1.02]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-purple-200" />
                  <span>Agent {currentSimulatingIndex + 1} of {agents.length} Running...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-purple-200" />
                  <span>Run AI Analysis Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Progress indicator during simulation */}
        {isAnalyzing && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-1.5">
              <span>Executing Specialized Agent Sequence...</span>
              <span>{Math.round(((currentSimulatingIndex + 1) / agents.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-300"
                style={{ width: `${((currentSimulatingIndex + 1) / agents.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* TOP PIPELINE FLOW CONNECTOR (Visual Architecture Step) */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono overflow-x-auto gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 shrink-0">
          <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
          <span>Incident Input: {selectedIncident.id}</span>
        </div>
        <ArrowDown className="h-4 w-4 text-slate-600 shrink-0 -rotate-90 md:rotate-0" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200 shrink-0 font-bold">
          <Layers className="h-3.5 w-3.5 text-purple-400" />
          <span>AI / API Orchestrator</span>
        </div>
        <ArrowDown className="h-4 w-4 text-slate-600 shrink-0 -rotate-90 md:rotate-0" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 shrink-0">
          <Cpu className="h-3.5 w-3.5 text-cyan-400" />
          <span>7 Specialized Agents Active</span>
        </div>
        <ArrowDown className="h-4 w-4 text-slate-600 shrink-0 -rotate-90 md:rotate-0" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 shrink-0 font-bold">
          <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Human-in-the-Loop Review</span>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: CONNECTED AGENTS GRID & SEVERITY ASSESSMENT ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT/CENTER: 7 CONNECTED AGENT CARDS (7 Columns) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" />
              Collaborative Agent Network
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              {analysisCompleted ? 'All Agents Synchronized' : 'Sequential Pipeline'}
            </span>
          </div>

          {agents.map((agent, index) => {
            const Icon = getAgentIcon(agent.id);
            const isCurrentlyRunning = isAnalyzing && currentSimulatingIndex === index;
            const isExpanded = expandedAgentId === agent.id;

            return (
              <div
                key={agent.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isCurrentlyRunning
                    ? 'border-purple-500/80 bg-purple-950/30 ring-2 ring-purple-500/40 shadow-lg shadow-purple-950/40 scale-[1.01]'
                    : agent.status === 'critical'
                    ? 'border-red-500/40 bg-slate-900/90 hover:border-red-500/60'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                {/* Agent Card Header */}
                <div 
                  onClick={() => setExpandedAgentId(isExpanded ? null : agent.id)}
                  className="p-4 cursor-pointer flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg border shrink-0 ${
                      isCurrentlyRunning
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse'
                        : agent.status === 'critical'
                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white leading-none">
                          {agent.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({agent.shortRole})
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {agent.summary}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-semibold ${
                      isCurrentlyRunning
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse'
                        : agent.status === 'critical'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : agent.status === 'verified'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    }`}>
                      {isCurrentlyRunning ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          <span>RUNNING...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          <span>{agent.badgeText}</span>
                        </>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Confidence: {agent.confidence}%
                    </span>
                  </div>
                </div>

                {/* Collapsible Technical Details / Agent Reasoner Logs */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 rounded-b-xl text-xs space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Agent Telemetry & Inference Trace:
                    </span>
                    <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                      {agent.technicalDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">&bull;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT: AI SEVERITY ASSESSMENT ENGINE (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Severity Assessment Panel */}
          <div className="rounded-2xl border border-red-500/30 bg-slate-900/90 p-5 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                  CLASSIFICATION ENGINE
                </span>
                <h3 className="text-base font-extrabold text-white">
                  AI Severity Assessment
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-mono font-bold">
                CRITICAL PRIORITY
              </span>
            </div>

            {/* Score & Gauge Visual */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                Composite Severity Score
              </span>
              <div className="mt-1 flex items-baseline justify-center gap-1 font-mono">
                <span className="text-5xl font-black text-red-500">92</span>
                <span className="text-xl text-slate-400 font-bold">/ 100</span>
              </div>
              <p className="text-[11px] text-red-300/80 mt-1 font-mono">
                Threshold: &gt; 80 triggers automated human-coordinator alarm
              </p>
            </div>

            {/* Multi-Factor Breakdown Progress Bars */}
            <div className="space-y-3 text-xs">
              <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider block">
                Risk Factor Analysis:
              </span>

              {/* Factor 1: Affected Population */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>Affected Population</span>
                  <span className="text-red-400 font-bold">HIGH (94%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[94%]" />
                </div>
              </div>

              {/* Factor 2: Infrastructure Damage */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>Infrastructure Damage</span>
                  <span className="text-orange-400 font-bold">HIGH (88%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[88%]" />
                </div>
              </div>

              {/* Factor 3: Weather Risk */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>Weather Risk (Rainfall)</span>
                  <span className="text-red-400 font-bold">HIGH (92%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[92%]" />
                </div>
              </div>

              {/* Factor 4: Evidence Confidence */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>Evidence Confidence</span>
                  <span className="text-emerald-400 font-bold">HIGH (98%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[98%]" />
                </div>
              </div>

              {/* Factor 5: Urgency */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>Immediate Urgency</span>
                  <span className="text-red-400 font-bold">CRITICAL (96%)</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[96%]" />
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/20 text-xs">
              <span className="font-bold text-red-300 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                AI Inference Explanation
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                "The incident is classified as <strong className="text-red-400">CRITICAL</strong> because multiple factors indicate immediate response requirements: 120+ civilians exposed to rapid flash flood waters, critical power substation near inundation threshold, and meteorological radar forecasting 48mm/hr rainfall persistence."
              </p>
            </div>

            {/* CTA to Final Response Plan */}
            <button
              onClick={() => setActiveTab('response-plans')}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-950/50 flex items-center justify-center gap-2"
            >
              <span>Review Generated AI Response Plan</span>
              <ShieldCheck className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
