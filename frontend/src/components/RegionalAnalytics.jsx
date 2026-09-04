import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Activity, 
  ShieldCheck, 
  Droplet, 
  Layers, 
  Filter,
  Download
} from 'lucide-react';
import { MOCK_DISTRICTS } from '../data/mockData';

export default function RegionalAnalytics() {
  const [filterState, setFilterState] = useState('ALL');

  const filteredDistricts = MOCK_DISTRICTS.filter(d => {
    if (filterState === 'ALL') return true;
    return d.status.toLowerCase() === filterState.toLowerCase();
  });

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-[#0f131d] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464555]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-[10px] font-bold border border-[#4f46e5]/40 uppercase">
              NER Telemetry Analytics
            </span>
            <span className="font-mono text-xs text-[#918fa1]">8 STATES INTEGRATED</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            Regional Analytics & Risk Trends
          </h2>
          <p className="text-xs text-[#918fa1] mt-0.5">
            Predictive vulnerability scoring, multi-temporal InSAR displacement monitoring, and lifeline corridor resilience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filters */}
          <div className="flex items-center bg-[#171b26] border border-[#464555] rounded p-1 text-xs font-mono">
            {['ALL', 'CRITICAL', 'ADVISORY', 'NOMINAL'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterState(f)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterState === f 
                    ? 'bg-[#4f46e5] text-white font-bold' 
                    : 'text-[#918fa1] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button 
            onClick={() => alert('Exporting Regional Risk Trends report as PDF/CSV...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] text-xs font-mono border border-[#464555] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#c3c0ff]" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Readouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded bg-[#111827] border border-[#464555] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase text-[#918fa1]">Regional Connectivity Score</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#fbbf24]">76.4%</span>
            <span className="text-xs font-mono text-[#f87171] flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> -3.2% (24h)
            </span>
          </div>
          <span className="text-[11px] text-[#c7c4d8] mt-1">2 Lifeline corridors interdicted</span>
        </div>

        <div className="p-4 rounded bg-[#111827] border border-[#464555] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase text-[#918fa1]">Population at Cutoff Risk</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-white">418,200</span>
            <span className="text-xs font-mono text-[#f87171]">Across 3 Districts</span>
          </div>
          <span className="text-[11px] text-[#c7c4d8] mt-1">Dima Hasao, Kamjong, Finch sector</span>
        </div>

        <div className="p-4 rounded bg-[#111827] border border-[#464555] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase text-[#918fa1]">Peak 24h Rainfall Ingress</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#60a5fa]">142.6 mm</span>
            <span className="text-xs font-mono text-[#60a5fa]">Haflong Ridge</span>
          </div>
          <span className="text-[11px] text-[#c7c4d8] mt-1">Saturated soil moisture: 88% VWC</span>
        </div>

        <div className="p-4 rounded bg-[#111827] border border-[#464555] flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase text-[#918fa1]">Operational Relief Fleet</span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-[#34d399]">94.2%</span>
            <span className="text-xs font-mono text-[#34d399]">38 / 40 Active</span>
          </div>
          <span className="text-[11px] text-[#c7c4d8] mt-1">All GPS & SatCom uplinks locked</span>
        </div>
      </div>

      {/* District Health Scores Grid (Mirroring Screen 02237bddce314646a36f79d337f0ac00) */}
      <div className="bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#464555]/60 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#c3c0ff]" />
            <h3 className="font-bold text-sm text-white">
              District Health Scores (NER Multi-Sector)
            </h3>
          </div>
          <span className="text-xs font-mono text-[#918fa1]">
            THRESHOLD: NOMINAL &gt;7.5 • ADVISORY 4.0-7.4 • CRITICAL &lt;4.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDistricts.map((d) => {
            const isCritical = d.status === 'critical';
            const isNominal = d.status === 'nominal';

            let statusColor = '#f59e0b';
            let badgeBg = 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40';

            if (isCritical) {
              statusColor = '#ef4444';
              badgeBg = 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40';
            } else if (isNominal) {
              statusColor = '#10b981';
              badgeBg = 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40';
            }

            return (
              <div 
                key={d.id}
                className="p-4 rounded bg-[#171b26] border border-[#464555] hover:border-[#918fa1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#918fa1] uppercase">{d.state}</span>
                      <h4 className="font-bold text-sm text-white">{d.name}</h4>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold" style={{ color: statusColor }}>
                        {d.score}
                      </span>
                      <span className="font-mono text-[10px] text-[#918fa1]">/10</span>
                    </div>
                  </div>

                  {/* Cutoff Risk Progress Bar */}
                  <div className="mt-3 flex flex-col gap-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#918fa1]">
                      <span>Cutoff Risk:</span>
                      <strong className="text-white">{d.cutoffRisk}</strong>
                    </div>
                    <div className="w-full h-1.5 bg-[#0a0e18] rounded-full overflow-hidden border border-[#464555]/60">
                      <div 
                        className="h-full rounded-full"
                        style={{
                          width: `${(d.score / 10) * 100}%`,
                          backgroundColor: statusColor
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#464555]/60 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#918fa1]">
                  <div>
                    <span>24h Rain: </span>
                    <strong className="text-white">{d.rainfall24h}</strong>
                  </div>
                  <div>
                    <span>InSAR Slip: </span>
                    <strong className="text-[#8b5cf6]">{d.displacement}</strong>
                  </div>
                  <div>
                    <span>Open Routes: </span>
                    <strong className="text-[#34d399]">{d.activeCorridors}</strong>
                  </div>
                  <div>
                    <span>Blocked: </span>
                    <strong className={d.blockedCorridors > 0 ? "text-[#f87171]" : "text-white"}>
                      {d.blockedCorridors}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
