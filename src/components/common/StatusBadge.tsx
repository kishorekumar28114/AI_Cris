import type { IncidentStatus } from '../../types/crisis';
import { Sparkles, Clock, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: IncidentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'AI Analysis':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
          AI Analysis
        </span>
      );
    case 'Awaiting Approval':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <Clock className="w-3 h-3 text-amber-400" />
          Awaiting Approval
        </span>
      );
    case 'Resources Assigned':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          Resources Assigned
        </span>
      );
    case 'Monitoring':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
          <Eye className="w-3 h-3 text-blue-400" />
          Monitoring
        </span>
      );
    case 'Resolved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/15 text-slate-300 border border-slate-500/30">
          <CheckCircle2 className="w-3 h-3 text-slate-400" />
          Resolved
        </span>
      );
    default:
      return null;
  }
};
