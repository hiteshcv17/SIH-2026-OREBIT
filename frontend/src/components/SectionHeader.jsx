import React from 'react';

export const SectionHeader = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = 'orange',
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#2C3E60]/60 ${className}`}>
      <div className="space-y-1">
        {badgeText && (
          <div className="mb-2">
            <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-md uppercase tracking-wider font-heading ${
              badgeVariant === 'orange' ? 'bg-[#F4A100]/20 text-[#F4A100]' : 'bg-[#00B4D8]/20 text-[#00B4D8]'
            }`}>
              {badgeText}
            </span>
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-[#F5F5F5] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-[#A0AEC0] font-sans max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
