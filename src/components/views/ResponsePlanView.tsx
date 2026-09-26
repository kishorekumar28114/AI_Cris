import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Clock, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ShieldAlert
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';
import { SeverityBadge } from '../common/SeverityBadge';
import { CrisisOptionSelector } from '../common/CrisisOptionSelector';

export const ResponsePlanView: React.FC = () => {
  const { responsePlan, approvePlan, modifyPlan, rejectPlan, selectedIncident, setActiveTab } = useCrisis();
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const [modifyNotes, setModifyNotes] = useState<string>(
    'Add 1 auxiliary flood barrier vehicle to support electrical substation protection.'
  );
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>(
    'Current on-ground water level reports differ from automated sensors; requesting manual reconnaissance first.'
  );

  const isApproved = responsePlan.approvalStatus === 'APPROVED';
  const isModified = responsePlan.approvalStatus === 'MODIFIED';
  const isRejected = responsePlan.approvalStatus === 'REJECTED';
  const isPending = responsePlan.approvalStatus === 'PENDING_APPROVAL';

  return (
    <div className="space-y-6">
      {/* CRISIS SELECTION OPTIONS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <CrisisOptionSelector />
      </div>

      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                SYNTHESIZED MISSION DISPATCH MANIFEST
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Manifest ID: {responsePlan.id}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              AI Response Plan &bull; {selectedIncident.id} ({selectedIncident.type})
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Consolidated tactical recommendations synthesized from all 7 specialized disaster agents.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SeverityBadge severity={responsePlan.priority} size="lg" />
          </div>
        </div>

        {/* Current Authorization Status Indicator */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Governance Status:</span>
            {isPending && (
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Awaiting Human Authorization
              </span>
            )}
            {isApproved && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                APPROVED BY EMERGENCY COORDINATOR
              </span>
            )}
            {isModified && (
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1.5">
                <Edit3 className="h-3.5 w-3.5" />
                APPROVED WITH MODIFICATIONS
              </span>
            )}
            {isRejected && (
              <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/40 font-bold flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" />
                PLAN REJECTED BY COORDINATOR
              </span>
            )}
          </div>

          {responsePlan.approvalTimestamp && (
            <span className="text-slate-400">
              Timestamp: {responsePlan.approvalTimestamp} | Authorized by: {responsePlan.approverName}
            </span>
          )}
        </div>
      </div>

      {/* 2-COLUMN SECTION: RECOMMENDED ACTIONS & "WHY THIS PLAN?" JUSTIFICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: AI RECOMMENDED ACTIONS (7 Columns) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              AI Recommended Tactical Actions
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              6 Directives
            </span>
          </div>

          <div className="space-y-3">
            {responsePlan.actions.map((action, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 font-mono font-bold text-xs border border-cyan-500/30">
                  {index + 1}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans mt-0.5">
                  {action}
                </p>
              </div>
            ))}
          </div>

          {responsePlan.modifiedNotes && (
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
              <span className="font-bold text-cyan-300 font-mono block mb-1">
                Coordinator Annotations & Overrides:
              </span>
              <p className="text-slate-300 font-sans">
                {responsePlan.modifiedNotes}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: WHY THIS PLAN? MULTI-AGENT JUSTIFICATION (5 Columns) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Why This Plan?
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-semibold">
              Cross-Agent Synthesis
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Multiple specialized agents contributed to this recommendation:
          </p>

          <div className="space-y-2.5 text-xs">
            {responsePlan.justifications.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    {item.factor}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono font-semibold">
                    {item.confidence} Conf.
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans pl-5">
                  {item.assessment}
                </p>
                <span className="text-[10px] text-slate-400 font-mono pl-5 block">
                  Agent: {item.agent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CRITICAL HUMAN-IN-THE-LOOP APPROVAL SECTION */}
      <div className="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 shadow-2xl">
        <div className="flex items-center gap-2.5 mb-2">
          <UserCheck className="h-6 w-6 text-cyan-400" />
          <h3 className="text-lg font-black text-white uppercase tracking-wider font-mono">
            Human-in-the-Loop Governance & Authorization
          </h3>
        </div>

        <p className="text-xs md:text-sm text-slate-300 max-w-3xl">
          <strong className="text-amber-400">CRITICAL SAFETY DIRECTIVE:</strong> The AI recommendation does NOT execute automatically. Emergency personnel review the recommendation and must explicitly approve, modify parameters, or reject before any physical field deployment occurs.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={approvePlan}
            disabled={isApproved}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-mono text-xs transition-all shadow-lg ${
              isApproved
                ? 'bg-emerald-700/60 text-emerald-200 border border-emerald-500/60 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-[1.02] shadow-emerald-950/50'
            }`}
          >
            <CheckCircle className="h-4 w-4" />
            <span>{isApproved ? '✓ PLAN APPROVED' : '✓ APPROVE PLAN'}</span>
          </button>

          <button
            onClick={() => setIsModifyModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold font-mono text-xs transition-all hover:scale-[1.02]"
          >
            <Edit3 className="h-4 w-4" />
            <span>✎ MODIFY PLAN</span>
          </button>

          <button
            onClick={() => setIsRejectModalOpen(true)}
            disabled={isRejected}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold font-mono text-xs transition-all ${
              isRejected
                ? 'bg-red-950/60 text-red-300 border border-red-500/60 cursor-default'
                : 'bg-slate-800 hover:bg-red-900/60 text-red-400 border border-red-500/30 hover:border-red-500/60'
            }`}
          >
            <XCircle className="h-4 w-4" />
            <span>{isRejected ? '✕ PLAN REJECTED' : '✕ REJECT PLAN'}</span>
          </button>
        </div>

        {isApproved && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-mono flex items-center justify-between">
            <span>Dispatched authorized manifest to field telemetry. All emergency units notified.</span>
            <button
              onClick={() => setActiveTab('activity-log')}
              className="text-cyan-300 underline font-bold"
            >
              View in Activity Log &rarr;
            </button>
          </div>
        )}
      </div>

      {/* MODIFY PLAN MODAL */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-cyan-400" />
                  Modify Response Plan Directives
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Coordinator override notes will be appended to field dispatch orders.
                </p>
              </div>
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                Coordinator Notes / Equipment Adjustments:
              </label>
              <textarea
                rows={4}
                value={modifyNotes}
                onChange={(e) => setModifyNotes(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white focus:outline-none focus:border-cyan-500 font-sans"
                placeholder="Enter modification rationale..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsModifyModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  modifyPlan(modifyNotes);
                  setIsModifyModalOpen(false);
                }}
                className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white font-mono"
              >
                Apply Modifications & Authorize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT PLAN MODAL */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-red-500/40 bg-slate-900 p-6 shadow-2xl text-slate-100">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Reject AI Response Plan
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Provide reason for dismissing the automated multi-agent proposal.
                </p>
              </div>
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-4 space-y-3">
              <label className="text-xs font-mono text-slate-300 block">
                Rejection Rationale:
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-xs text-white focus:outline-none focus:border-red-500 font-sans"
                placeholder="State rejection reason..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rejectPlan(rejectReason);
                  setIsRejectModalOpen(false);
                }}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white font-mono"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
