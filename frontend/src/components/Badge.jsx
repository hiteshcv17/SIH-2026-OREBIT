import React from 'react';

export const Badge = ({
  children,
  variant = 'orange', // 'orange' | 'blue' | 'green' | 'neutral'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-xs font-semibold',
    lg: 'px-4 py-1.5 text-sm font-semibold',
  };

  const variantStyles = {
    orange: 'bg-[#F4A100]/15 text-[#F4A100] border border-[#F4A100]/30 shadow-sm',
    blue: 'bg-[#00B4D8]/15 text-[#00B4D8] border border-[#00B4D8]/30 shadow-sm',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm',
    neutral: 'bg-slate-700/40 text-slate-300 border border-slate-600/40',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-heading tracking-wide ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.orange} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
};

export default Badge;
