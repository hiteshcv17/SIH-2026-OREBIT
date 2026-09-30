import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Target } from 'lucide-react';
import KPICard from '../KPICard';

describe('KPICard Component', () => {
  it('renders title and value correctly', () => {
    render(<KPICard title="FY30 Production Target" value="2.35 MT -> 3.5 MT" />);
    expect(screen.getByText('FY30 Production Target')).toBeInTheDocument();
    expect(screen.getByText('2.35 MT -> 3.5 MT')).toBeInTheDocument();
  });

  it('renders optional subtitle when provided', () => {
    render(<KPICard title="Shortfall Risk" value="HIGH" subtitle="21.5k Tons Gap" />);
    expect(screen.getByText('21.5k Tons Gap')).toBeInTheDocument();
  });

  it('renders trend badge with correct trendType styling', () => {
    const { rerender } = render(
      <KPICard title="Production YoY" value="2.35 MT" trend="+8.4% YoY" trendType="up" />
    );
    const upTrend = screen.getByText('+8.4% YoY');
    expect(upTrend).toBeInTheDocument();
    expect(upTrend).toHaveClass('text-emerald-400');

    rerender(
      <KPICard title="Shortfall Gap" value="12%" trend="-12% short" trendType="down" />
    );
    const downTrend = screen.getByText('-12% short');
    expect(downTrend).toHaveClass('text-rose-400');

    rerender(
      <KPICard title="RUL Warning" value="3 Units" trend="2 Critical" trendType="warning" />
    );
    const warningTrend = screen.getByText('2 Critical');
    expect(warningTrend).toHaveClass('text-[#F4A100]');
  });

  it('renders icon and StatusPill when provided', () => {
    render(
      <KPICard 
        title="AI Prescriptive Feed" 
        value="7 Actions" 
        icon={Target} 
        status="Implemented" 
      />
    );
    expect(screen.getByText('Implemented')).toBeInTheDocument();
  });
});
