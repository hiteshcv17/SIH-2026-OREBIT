import React from 'react';

export const Card = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'orange' | 'blue' | 'flat'
  hover = true,
  padding = 'p-6',
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300 relative overflow-hidden';
  
  const variantStyles = {
    default: 'bg-[#1B2A4A]/80 border border-[#2C3E60] backdrop-blur-md shadow-lg',
    orange: 'bg-[#1B2A4A]/90 border border-[#F4A100]/40 backdrop-blur-md shadow-glow-orange',
    blue: 'bg-[#1B2A4A]/90 border border-[#00B4D8]/40 backdrop-blur-md shadow-glow-blue',
    flat: 'bg-[#0D1B2A] border border-[#2C3E60]/50',
  };

  const hoverStyles = hover
    ? 'hover:-translate-y-1 hover:border-[#00B4D8]/60 hover:shadow-xl'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${hoverStyles} ${padding} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
