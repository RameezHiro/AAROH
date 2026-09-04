import React from 'react';
import { Radio, Route, AlertCircle, RefreshCw } from 'lucide-react';
import { MOCK_CORRIDORS } from '../data/mockData';

export default function TelemetryRibbon({ selectedCorridor, setSelectedCorridor, onRefresh }) {
  return (
    <header className="w-full bg-[#111827]/90 border-b border-[#464555]/60 px-4 md:px-6 py-2.5 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-3 z-30">
      {/* Telemetry Live Beacon & Corridors list */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Live Beacon */}
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#171b26] border border-[#464555] rounded text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#dfe2f1] font-bold">
            SYSTEM NOMINAL
          </span>
          <span className="text-[#918fa1]">•</span>
          <span className="font-mono text-[10px] text-[#c3c0ff] font-semibold">
            42MS LATENCY
          </span>
        </div>

        {/* Monitored Corridors Segment */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <div className="flex items-center gap-1 text-[#918fa1] font-mono text-[11px] font-bold uppercase mr-1">
            <Route className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>Lifeline Corridors:</span>
          </div>

          {MOCK_CORRIDORS.map((c) => {
            const isSelected = selectedCorridor === c.id;
            let statusBadgeColor = 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40';
            if (c.status === 'critical') {
              statusBadgeColor = 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40 animate-pulse';
            } else if (c.status === 'advisory') {
              statusBadgeColor = 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40';
            }

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCorridor(isSelected ? null : c.id)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[11px] border transition-all ${
                  isSelected 
                    ? 'bg-[#4f46e5] text-white border-[#c3c0ff] shadow-[0_0_10px_rgba(79,70,229,0.4)]'
                    : 'bg-[#171b26] hover:bg-[#1f2937] text-[#dfe2f1] border-[#464555]'
                }`}
              >
                <span className="font-bold">{c.name}</span>
                <span className={`px-1 py-0.2 rounded text-[9px] border ${statusBadgeColor}`}>
                  {c.statusText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Telemetry Sync & Refresh */}
      <div className="flex items-center gap-2 self-end xl:self-auto">
        <span className="text-[10px] font-mono text-[#918fa1]">
          Last Sat-Pass: <strong className="text-[#dfe2f1]">12s ago (Sentinel-1C)</strong>
        </span>
        <button
          onClick={onRefresh}
          className="p-1.5 bg-[#171b26] hover:bg-[#262a35] text-[#918fa1] hover:text-[#dfe2f1] rounded border border-[#464555] transition-colors"
          title="Force Telemetry Sync"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
