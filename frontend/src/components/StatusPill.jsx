import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const StatusPill = ({
  status = 'Implemented', // 'Implemented' | 'Proposed'
  size = 'md',
  className = '',
}) => {
  const isImplemented = status.toLowerCase() === 'implemented';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-xs font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-heading font-semibold tracking-wide border transition-all ${
        sizeStyles[size]
      } ${
        isImplemented
          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
          : 'bg-[#F4A100]/20 text-[#F4A100] border-[#F4A100]/40 shadow-sm'
      } ${className}`}
    >
      {isImplemented ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Sparkles className="w-3.5 h-3.5 text-[#F4A100]" />
      )}
      {isImplemented ? 'Implemented' : 'Proposed'}
    </span>
  );
};

export default StatusPill;
