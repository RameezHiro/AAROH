import React, { useState } from 'react';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Filter,
  Send
} from 'lucide-react';
import { MOCK_ALERTS, MOCK_HOTSPOTS } from '../data/mockData';

export default function AlertsCenter({ onInspectAlert }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = MOCK_ALERTS.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-[#0f131d] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464555]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#ef4444]/20 text-[#f87171] font-mono text-[10px] font-bold border border-[#ef4444]/40 uppercase animate-pulse">
              DEFCON 4 WATCH
            </span>
            <span className="font-mono text-xs text-[#918fa1]">MONSOON SURGE INGRESS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            Alerts & Notifications Center
          </h2>
          <p className="text-xs text-[#918fa1] mt-0.5">
            Real-time geofenced incident feeds, automated early-warning telemetry, and inter-agency disaster escalations.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center bg-[#171b26] border border-[#464555] rounded p-1 text-xs font-mono">
          {['ALL', 'CRITICAL', 'ADVISORY', 'NOMINAL'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded transition-colors ${
                filterSeverity === sev 
                  ? 'bg-[#4f46e5] text-white font-bold' 
                  : 'text-[#918fa1] hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Timeline List */}
      <div className="flex flex-col gap-3">
        {filteredAlerts.map((alertItem) => {
          const isCritical = alertItem.severity === 'critical';
          const isNominal = alertItem.severity === 'nominal';

          let borderLeftColor = 'border-l-[#f59e0b]';
          let badgeClass = 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40';

          if (isCritical) {
            borderLeftColor = 'border-l-[#ef4444]';
            badgeClass = 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40';
          } else if (isNominal) {
            borderLeftColor = 'border-l-[#10b981]';
            badgeClass = 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40';
          }

          return (
            <div
              key={alertItem.id}
              className={`p-4 rounded bg-[#111827] border border-[#464555] border-l-4 ${borderLeftColor} shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#171b26] transition-all`}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${badgeClass}`}>
                    {alertItem.code}
                  </span>
                  <span className="text-[11px] font-mono text-[#918fa1] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {alertItem.timestamp}
                  </span>
                  <span className="text-[#918fa1]">•</span>
                  <span className="text-xs font-mono text-[#c3c0ff]">{alertItem.district}</span>
                </div>

                <h3 className="font-bold text-sm text-white mt-1">
                  {alertItem.title}
                </h3>
                <p className="text-xs text-[#c7c4d8] leading-relaxed max-w-4xl">
                  {alertItem.summary}
                </p>

                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#918fa1]">
                  <span>Agency: <strong className="text-white">{alertItem.agency}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <button
                  onClick={() => onInspectAlert(MOCK_HOTSPOTS[0])}
                  className="px-3 py-2 rounded bg-[#1c1f2a] hover:bg-[#262a35] text-[#c3c0ff] font-mono text-xs border border-[#464555] transition-colors"
                >
                  INSPECT SENSOR
                </button>
                <button
                  onClick={() => alert(`Action "${alertItem.action}" executed for ${alertItem.title}`)}
                  className="px-4 py-2 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <span>{alertItem.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
