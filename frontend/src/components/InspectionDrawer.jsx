import React from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Navigation2, 
  Send, 
  Clock, 
  Activity, 
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  Layers
} from 'lucide-react';

function CircularGauge({ score, max = 10, label, subtitle, color, status }) {
  const percentage = (score / max) * 100;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 p-3 rounded bg-[#171b26] border border-[#464555]">
      <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          {/* Background circle track */}
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="transparent"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="6"
          />
          {/* Dynamic active stroke */}
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-lg font-bold text-white leading-none">
            {score.toFixed(1)}
          </span>
          <span className="font-mono text-[9px] text-[#918fa1] mt-0.5">/10</span>
        </div>
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white truncate">{label}</span>
        </div>
        <span className="text-[11px] text-[#c7c4d8] mt-0.5">{subtitle}</span>
        <span 
          className="inline-block mt-1 font-mono text-[10px] font-semibold uppercase"
          style={{ color }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default function InspectionDrawer({ onTriggerReroute, onDispatchAirborne }) {
  return (
    <aside className="w-full xl:w-[380px] 2xl:w-[416px] flex flex-col gap-4">
      {/* Risk & Resilience Score Tiers */}
      <div className="bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#464555]/60 pb-2.5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#c3c0ff]" />
            <h3 className="font-bold text-sm text-white">Cutoff Vulnerability Indices</h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-[10px] font-bold border border-[#4f46e5]/40">
            LIVE 0-10 GAUGES
          </span>
        </div>

        {/* Gauge 1: Dima Hasao (Critical) */}
        <CircularGauge 
          score={3.8} 
          label="Dima Hasao Corridor" 
          subtitle="NH-2 Mountain Sector"
          color="#ef4444"
          status="Critical Cutoff Risk (84%)"
        />

        {/* Gauge 2: Imphal - Ukhrul (Nominal) */}
        <CircularGauge 
          score={8.4} 
          label="Imphal → Ukhrul Route" 
          subtitle="NH-102 / SH-19 Spine"
          color="#10b981"
          status="Passable (92% Reliability)"
        />

        {/* Gauge 3: Kohima Ridge (Advisory) */}
        <CircularGauge 
          score={6.7} 
          label="Kohima Ridge Axis" 
          subtitle="NH-29 Barail Pass"
          color="#f59e0b"
          status="Moderate Rockfall Caution"
        />
      </div>

      {/* AI Predictive Simulation Corridor (Violet Theming from DESIGN.md) */}
      <div className="bg-gradient-to-b from-[#1c1f2a] to-[#171b26] border border-[#8b5cf6]/40 rounded p-4 shadow-xl flex flex-col gap-3 ai-halo">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#8b5cf6]/20 text-[#c3c0ff]">
              <Sparkles className="w-4 h-4 text-[#8b5cf6] animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">NESAC / AI Predictive Inference</h4>
              <span className="text-[10px] font-mono text-[#c4abff]">Synthetic InSAR Simulation</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#8b5cf6]/30 text-[#dad7ff] font-mono text-[9px] font-bold border border-[#8b5cf6]/50">
            74% PROBABILITY
          </span>
        </div>

        <p className="text-xs text-[#dfe2f1] leading-relaxed">
          Precipitation forecast exceeds <strong>45mm/hr</strong> in next 12 hours. Slope stability factor on NH-2 (KM 48.2) projected to degrade from <strong>1.14 FOS</strong> to <strong>0.92 FOS</strong> (Failure state).
        </p>

        <div className="bg-[#0f131d] border border-[#464555] rounded p-2.5 flex flex-col gap-1 text-[11px]">
          <span className="font-mono text-[#8b5cf6] font-semibold text-[10px] uppercase">
            Recommended Action:
          </span>
          <span className="text-[#c7c4d8]">
            Pre-divert all heavy supply convoys to Southern Axis (Kasom Khullen) before 16:00 IST.
          </span>
        </div>

        <button 
          onClick={onTriggerReroute}
          className="w-full flex items-center justify-center gap-2 py-2 rounded bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/35 text-[#dad7ff] text-xs font-mono font-bold border border-[#8b5cf6]/50 transition-colors"
        >
          <span>EXECUTE CONVOY REROUTE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Immediate Field Operations Triggers */}
      <div className="bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col gap-2.5">
        <h4 className="font-bold text-xs text-white uppercase font-mono tracking-wider text-[#918fa1]">
          Tactical Dispatch Verbs
        </h4>

        <button 
          onClick={onDispatchAirborne}
          className="flex items-center justify-between p-2.5 rounded bg-[#171b26] hover:bg-[#1f2937] border border-[#464555] text-left transition-colors group"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white group-hover:text-[#c3c0ff]">
              Scramble Airborne Drone LiDAR
            </span>
            <span className="text-[10px] text-[#918fa1]">
              Target: KM 48.2 Dima Hasao Slip Scarp
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#918fa1] group-hover:text-white transition-colors" />
        </button>

        <button 
          onClick={() => alert('Mobile Bailey Bridge deployment order transmitted to BRO Project Sewak Task Force!')}
          className="flex items-center justify-between p-2.5 rounded bg-[#171b26] hover:bg-[#1f2937] border border-[#464555] text-left transition-colors group"
        >
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white group-hover:text-[#c3c0ff]">
              Deploy Mobile Bailey Bridge
            </span>
            <span className="text-[10px] text-[#918fa1]">
              Stage at Finch Corner River Causeway
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#918fa1] group-hover:text-white transition-colors" />
        </button>
      </div>
    </aside>
  );
}
