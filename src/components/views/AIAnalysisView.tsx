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
  FileCheck2,
  Database
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { CrisisOptionSelector } from '../common/CrisisOptionSelector';

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

  // Severity metrics calculation based on the selected incident data
  const getSeverityScore = (id: string, severity: string) => {
    switch (id) {
      case 'INC-1025':
        return 95;
      case 'INC-1024':
        return 92;
      case 'INC-1023':
        return 84;
      case 'INC-1021':
        return 81;
      case 'INC-1022':
        return 76;
      default:
        return severity === 'CRITICAL' ? 90 : severity === 'HIGH' ? 82 : 75;
    }
  };

  const severityScore = getSeverityScore(selectedIncident.id, selectedIncident.severity);

  // Dynamic risk factor breakdowns based on the selected crisis
  const getRiskBreakdown = () => {
    switch (selectedIncident.id) {
      case 'INC-1023':
        return {
          factor1: { label: 'Trapped Casualties & Injuries', value: 86, text: 'HIGH (86%)' },
          factor2: { label: 'Highway Infrastructure Impact', value: 82, text: 'HIGH (82%)' },
          factor3: { label: 'Flammable Fuel Spill Hazard', value: 88, text: 'CRITICAL (88%)' },
          factor4: { label: 'CCTV Telemetry Verification', value: 97, text: 'HIGH (97%)' },
          factor5: { label: 'Immediate Golden Hour Urgency', value: 91, text: 'CRITICAL (91%)' },
          explanation: `Incident is classified as HIGH priority (Score: ${severityScore}/100) because 14 casualties are reported with 3 pinned motorists requiring hydraulic extrication within the golden hour, accompanied by a 400-liter diesel fuel spill across both northbound lanes of NH-544.`
        };
      case 'INC-1022':
        return {
          factor1: { label: 'Worker Evacuation & Missing Staff', value: 72, text: 'MEDIUM (72%)' },
          factor2: { label: 'Industrial Complex Structural Risk', value: 78, text: 'MEDIUM (78%)' },
          factor3: { label: 'Chemical Solvent Combustion (640°C)', value: 84, text: 'HIGH (84%)' },
          factor4: { label: 'IoT Thermal Telemetry Authenticity', value: 98, text: 'HIGH (98%)' },
          factor5: { label: 'Toxic Plume Dispersion Urgency', value: 76, text: 'MEDIUM (76%)' },
          explanation: `Incident is classified as MEDIUM priority (Score: ${severityScore}/100) because Class-B flammable solvents in Bay 4 are burning at 640°C core temperature, with an 18 km/h wind pushing toxic smoke plumes toward neighboring textile facilities requiring foam suppression.`
        };
      case 'INC-1021':
        return {
          factor1: { label: 'Endangered Riverside Homesteads', value: 80, text: 'HIGH (80%)' },
          factor2: { label: 'Embankment Earthen Levee Integrity', value: 85, text: 'HIGH (85%)' },
          factor3: { label: 'Hydraulic Runoff & Dam Outflow', value: 83, text: 'HIGH (83%)' },
          factor4: { label: 'Ultrasonic Gauge Telemetry Proof', value: 99, text: 'HIGH (99%)' },
          factor5: { label: 'Levee Breach Prevention Urgency', value: 88, text: 'CRITICAL (88%)' },
          explanation: `Incident is classified as HIGH priority (Score: ${severityScore}/100) because river waters have reached 92% capacity (within 0.35m of the levee crest), threatening 12 rural dwellings with breach inundation within a 45-minute critical action window.`
        };
      case 'INC-1025':
        return {
          factor1: { label: 'Mass Casualties (22 injured)', value: 96, text: 'CRITICAL (96%)' },
          factor2: { label: 'Expressway Total Severance', value: 94, text: 'CRITICAL (94%)' },
          factor3: { label: 'Tanker Rupture & Torrential Rain', value: 91, text: 'CRITICAL (91%)' },
          factor4: { label: 'Toll Sensor & Dashcam Evidence', value: 99, text: 'HIGH (99%)' },
          factor5: { label: 'Mass Casualty Triage Urgency', value: 98, text: 'CRITICAL (98%)' },
          explanation: `Incident is classified as CRITICAL (Score: ${severityScore}/100) due to 22 mass casualties, overturned fuel tanker on the interstate corridor, and extreme hydroplaning hazards mandating adaptive resource reallocation.`
        };
      case 'INC-1024':
      default:
        return {
          factor1: { label: 'Affected Population (120+)', value: 94, text: 'HIGH (94%)' },
          factor2: { label: 'Infrastructure Inundation', value: 88, text: 'HIGH (88%)' },
          factor3: { label: 'Weather Risk (48mm/hr Rain)', value: 92, text: 'HIGH (92%)' },
          factor4: { label: 'Evidence Confidence', value: 98, text: 'HIGH (98%)' },
          factor5: { label: 'Immediate Evacuation Urgency', value: 96, text: 'CRITICAL (96%)' },
          explanation: `Incident is classified as CRITICAL (Score: ${severityScore}/100) because multiple factors indicate immediate response requirements: 120+ civilians exposed to rapid flash flood waters, critical power substation near inundation threshold, and meteorological radar forecasting 48mm/hr rainfall persistence.`
        };
    }
  };

  const riskData = getRiskBreakdown();

  return (
    <div className="space-y-6">
      {/* CRISIS SELECTION OPTIONS BAR */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <CrisisOptionSelector />
      </div>

      {/* Title & Orchestrator Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                MULTI-AGENT COLLABORATION PIPELINE
              </span>
              <span className="text-xs text-slate-300 font-mono bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                Active Target: <strong className="text-cyan-400">{selectedIncident.id}</strong> — {selectedIncident.title} ({selectedIncident.location})
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                <Database className="h-3 w-3" />
                Data Source: crisesData.json
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1.5 flex items-center gap-2">
              AI Multi-Agent Analysis
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Prototype Simulation
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              7 specialized agents collaboratively analyze <span className="text-white font-semibold">{selectedIncident.id} ({selectedIncident.type})</span>, evaluate multi-modal evidence, calculate real-time risks, and formulate unified operational advice.
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
                  <span>Run AI Pipeline for {selectedIncident.id}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Progress indicator during simulation */}
        {isAnalyzing && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-1.5">
              <span>Executing Specialized Agent Sequence for {selectedIncident.id}...</span>
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
          <span>Incident Input: {selectedIncident.id} ({selectedIncident.type})</span>
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
              Collaborative Agent Network &bull; {selectedIncident.id}
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
                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
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
          <div className={`rounded-2xl border p-5 shadow-2xl space-y-5 ${
            selectedIncident.severity === 'CRITICAL'
              ? 'border-red-500/40 bg-slate-900/90'
              : selectedIncident.severity === 'HIGH'
              ? 'border-amber-500/40 bg-slate-900/90'
              : 'border-yellow-500/40 bg-slate-900/90'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                  selectedIncident.severity === 'CRITICAL' ? 'text-red-400' : selectedIncident.severity === 'HIGH' ? 'text-amber-400' : 'text-yellow-400'
                }`}>
                  CLASSIFICATION ENGINE &bull; {selectedIncident.id}
                </span>
                <h3 className="text-base font-extrabold text-white">
                  AI Severity Assessment
                </h3>
              </div>
              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
                selectedIncident.severity === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : selectedIncident.severity === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
              }`}>
                {selectedIncident.severity} PRIORITY
              </span>
            </div>

            {/* Score & Gauge Visual */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                Composite Severity Score
              </span>
              <div className="mt-1 flex items-baseline justify-center gap-1 font-mono">
                <span className={`text-5xl font-black ${
                  severityScore >= 90 ? 'text-red-500' : severityScore >= 80 ? 'text-amber-400' : 'text-yellow-400'
                }`}>
                  {severityScore}
                </span>
                <span className="text-xl text-slate-400 font-bold">/ 100</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Threshold: &gt; 80 triggers automated human-coordinator alarm
              </p>
            </div>

            {/* Multi-Factor Breakdown Progress Bars */}
            <div className="space-y-3 text-xs">
              <span className="text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider block">
                Risk Factor Analysis:
              </span>

              {/* Factor 1 */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>{riskData.factor1.label}</span>
                  <span className="text-red-400 font-bold">{riskData.factor1.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${riskData.factor1.value}%` }} />
                </div>
              </div>

              {/* Factor 2 */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>{riskData.factor2.label}</span>
                  <span className="text-orange-400 font-bold">{riskData.factor2.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${riskData.factor2.value}%` }} />
                </div>
              </div>

              {/* Factor 3 */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>{riskData.factor3.label}</span>
                  <span className="text-amber-400 font-bold">{riskData.factor3.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${riskData.factor3.value}%` }} />
                </div>
              </div>

              {/* Factor 4 */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>{riskData.factor4.label}</span>
                  <span className="text-emerald-400 font-bold">{riskData.factor4.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${riskData.factor4.value}%` }} />
                </div>
              </div>

              {/* Factor 5 */}
              <div>
                <div className="flex justify-between text-slate-300 mb-1 font-mono">
                  <span>{riskData.factor5.label}</span>
                  <span className="text-cyan-400 font-bold">{riskData.factor5.text}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${riskData.factor5.value}%` }} />
                </div>
              </div>
            </div>

            {/* AI Explanation Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5 mb-1 font-mono">
                <AlertTriangle className="h-3.5 w-3.5 text-cyan-400" />
                AI Inference Explanation ({selectedIncident.id})
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px] font-sans">
                {riskData.explanation}
              </p>
            </div>

            {/* CTA to Final Response Plan */}
            <button
              onClick={() => setActiveTab('response-plans')}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-950/50 flex items-center justify-center gap-2"
            >
              <span>Review Generated AI Response Plan ({selectedIncident.id})</span>
              <ShieldCheck className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
