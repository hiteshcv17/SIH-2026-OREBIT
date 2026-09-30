import React from 'react';
import Card from './Card';
import Badge from './Badge';
import { WifiOff, RefreshCw, Sparkles, AlertCircle, Database } from 'lucide-react';

export const ErrorEmptyState = ({
  title = 'API Endpoint Connection Offline',
  message = 'Unable to reach the FastAPI backend stream (http://localhost:8000). The service might be initializing or offline.',
  onRetry,
  onUseFallback,
  isFallbackActive = false
}) => {
  return (
    <Card variant="orange" className="p-8 text-center max-w-2xl mx-auto border-2 border-amber-500/50 bg-[#1B2A4A]/90 shadow-2xl my-6">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-glow-orange">
        <WifiOff className="w-7 h-7" />
      </div>

      <div className="space-y-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-heading font-semibold">
          <AlertCircle className="w-3.5 h-3.5" /> Telemetry Connection Interrupted
        </span>
        <h3 className="text-xl font-bold font-heading text-[#F5F5F5]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#A0AEC0] max-w-md mx-auto leading-relaxed">
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#0096B4] text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-blue flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Backend Connection</span>
          </button>
        )}

        {onUseFallback && (
          <button
            onClick={onUseFallback}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4A100] hover:bg-[#E09400] text-[#0D1B2A] font-heading font-bold text-xs transition-all shadow-glow-orange flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFallbackActive ? 'Demo Data Active' : 'Load Offline Demo Data'}</span>
          </button>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[#2C3E60]/50 text-[11px] font-mono text-[#A0AEC0] flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Database className="w-3.5 h-3.5 text-[#00B4D8]" /> Gateway Status: Fallback Ready
        </span>
        <span>Monorepo Resiliency System</span>
      </div>
    </Card>
  );
};

export default ErrorEmptyState;
