import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusPill from '../StatusPill';

describe('StatusPill Component', () => {
  it('renders "Implemented" status by default', () => {
    render(<StatusPill />);
    const pill = screen.getByText('Implemented');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('text-emerald-400');
  });

  it('renders "Implemented" status explicitly', () => {
    render(<StatusPill status="Implemented" />);
    const pill = screen.getByText('Implemented');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('bg-emerald-500/20');
  });

  it('renders "Proposed" status with gold styling', () => {
    render(<StatusPill status="Proposed" />);
    const pill = screen.getByText('Proposed');
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveClass('text-[#F4A100]');
    expect(pill).toHaveClass('bg-[#F4A100]/20');
  });

  it('handles size variations correctly', () => {
    const { rerender } = render(<StatusPill size="sm" />);
    expect(screen.getByText('Implemented')).toHaveClass('px-2 py-0.5 text-[10px]');

    rerender(<StatusPill size="lg" />);
    expect(screen.getByText('Implemented')).toHaveClass('px-3 py-1.5 text-xs font-bold');
  });

  it('applies custom classNames passed via props', () => {
    render(<StatusPill className="custom-test-class" />);
    expect(screen.getByText('Implemented')).toHaveClass('custom-test-class');
  });
});
