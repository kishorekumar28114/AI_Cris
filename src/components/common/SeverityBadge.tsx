import type { SeverityLevel } from '../../types/crisis';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ 
  severity, 
  size = 'md',
  showPulse = true 
}) => {
  const getStyles = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/15',
          text: 'text-red-400',
          border: 'border-red-500/40',
          dot: 'bg-red-500',
          pulse: 'bg-red-400',
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/15',
          text: 'text-orange-400',
          border: 'border-orange-500/40',
          dot: 'bg-orange-500',
          pulse: 'bg-orange-400',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-500/15',
          text: 'text-yellow-400',
          border: 'border-yellow-500/40',
          dot: 'bg-yellow-500',
          pulse: 'bg-yellow-400',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-emerald-500/15',
          text: 'text-emerald-400',
          border: 'border-emerald-500/40',
          dot: 'bg-emerald-500',
          pulse: 'bg-emerald-400',
        };
    }
  };

  const styles = getStyles();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs tracking-wide',
    md: 'px-2.5 py-1 text-xs tracking-wider font-semibold',
    lg: 'px-3 py-1.5 text-sm tracking-wider font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses} uppercase font-mono`}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && (severity === 'CRITICAL' || severity === 'HIGH') && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${styles.pulse} opacity-75`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot}`} />
      </span>
      {severity}
    </span>
  );
};
