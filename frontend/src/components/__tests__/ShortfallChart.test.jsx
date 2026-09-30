import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ShortfallChart from '../ShortfallChart';

describe('ShortfallChart Component', () => {
  const mockRecords = [
    { formattedDate: '09-20', actual_tons: 14000, target_tons: 15000, gapTons: 1000 },
    { formattedDate: '09-21', actual_tons: 13700, target_tons: 15000, gapTons: 1300 },
    { formattedDate: '09-22', actual_tons: 14650, target_tons: 15000, gapTons: 350 },
  ];

  it('renders friendly empty state message when records are missing or empty', () => {
    render(<ShortfallChart records={[]} />);
    expect(screen.getByText(/No shortfall production records available for display/i)).toBeInTheDocument();
  });

  it('renders chart container when valid records are provided', () => {
    render(<ShortfallChart records={mockRecords} />);
    const chartContainer = screen.getByTestId('shortfall-chart-container');
    expect(chartContainer).toBeInTheDocument();
  });

  it('applies custom className and custom height settings', () => {
    render(<ShortfallChart records={mockRecords} height={400} className="custom-chart-wrapper" />);
    const chartContainer = screen.getByTestId('shortfall-chart-container');
    expect(chartContainer).toHaveClass('custom-chart-wrapper');
  });
});
