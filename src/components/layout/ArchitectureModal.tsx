import React from 'react';
import { 
  X, 
  Cpu, 
  Database, 
  FileCheck2, 
  CloudRain, 
  Gauge, 
  Truck, 
  Navigation, 
  CheckSquare, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';

export const ArchitectureModal: React.FC = () => {
  const { isArchitectureModalOpen, setIsArchitectureModalOpen } = useCrisis();

  if (!isArchitectureModalOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Crisis Data Acquisition',
      desc: 'Ingests real-time inputs from citizen SOS reports, geotagged photos/videos, Doppler radar weather telemetry, road sensors, and hospital triage feeds.',
      icon: Database,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      num: '02',
      title: 'Incident Analysis Agent',
      desc: 'NLP & vision pipelines extract core entities: disaster typology, GIS coordinates, estimated civilian population at risk, and structural urgency.',
      icon: Cpu,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      num: '03',
      title: 'Evidence Verification Agent',
      desc: 'Multi-modal cross-verification checks metadata EXIF timestamps, compares imagery with municipality sensor telemetry, and filters out hallucinations or outdated media.',
      icon: FileCheck2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      num: '04',
      title: 'Severity Assessment Agent',
      desc: 'Composite classification engine evaluates affected population, critical infrastructure danger, and weather trajectories into a prioritized score (e.g. 92/100 CRITICAL).',
      icon: Gauge,
      color: 'text-red-400 bg-red-500/10 border-red-500/30',
    },
    {
      num: '05',
      title: 'Resource Coordination Agent',
      desc: 'Matches disaster requirements against regional fleets: rescue teams, specialized zodiacs, ALS ambulances, and personnel squads using proximity heuristics.',
      icon: Truck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      num: '06',
      title: 'Route & Hospital Planning',
      desc: 'Agents isolate submerged roadways (Avinashi Subway), select safe elevated corridors (Route A), and triage hospital ICU/bed capacity (Kovai Medical Center).',
      icon: Navigation,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      num: '07',
      title: 'AI Response Planning (Orchestrator)',
      desc: 'The central AI/API Orchestrator aggregates the specialized outputs into an end-to-end, multi-faceted operational recommendation.',
      icon: CloudRain,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      num: '08',
      title: 'Human-in-the-Loop Approval',
      desc: 'MANDATORY GOVERNANCE: The response NEVER executes autonomously. Designated emergency commanders review, modify parameters, or authorize the deployment.',
      icon: CheckSquare,
      color: 'text-green-400 bg-green-500/15 border-green-500/40',
      highlight: true,
    },
    {
      num: '09',
      title: 'Continuous Monitoring & Dynamic Reassignment',
      desc: 'If new higher-priority crises emerge (e.g. INC-1025 highway pileup), the multi-agent system dynamically re-evaluates and shifts available resources in real time.',
      icon: RefreshCw,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 md:p-8 text-slate-100">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
                SYSTEM ARCHITECTURE
              </span>
              <span className="text-xs font-mono text-slate-400">Academic Framework</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2">
              How The AI Crisis Command Center Operates
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              A collaborative, multi-agent decision-support pipeline with strict Human-in-the-Loop governance.
            </p>
          </div>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Academic Pipeline Diagram */}
        <div className="my-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
            Conceptual Workflow Pipeline
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              Multiple Crisis Feeds
            </span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
            <span className="px-2 py-1 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              AI / API Orchestrator
            </span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
            <span className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300">
              7 Specialized Agents
            </span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
            <span className="px-2 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
              AI Response Plan
            </span>
            <ArrowRight className="h-3 w-3 text-slate-400" />
            <span className="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
              Human-in-the-Loop Approval
            </span>
          </div>
        </div>

        {/* 9-Step Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative rounded-xl border p-4 transition-all ${
                  step.highlight
                    ? 'border-emerald-500/50 bg-emerald-950/20 shadow-md shadow-emerald-950/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`p-2 rounded-lg border ${step.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    STEP {step.num}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
                {step.highlight && (
                  <div className="mt-3 inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    CRITICAL SAFETY PRINCIPLE
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing Note */}
        <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 flex items-start gap-3">
          <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 shrink-0">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <span className="font-semibold text-white">Decision Support System Design:</span> The system does not claim full autonomy or automatic emergency vehicle dispatch. It functions strictly as an intelligent advisory system designed to reduce coordinator cognitive fatigue during high-stress disaster triage.
          </div>
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close Architecture Guide
          </button>
        </div>
      </div>
    </div>
  );
};
