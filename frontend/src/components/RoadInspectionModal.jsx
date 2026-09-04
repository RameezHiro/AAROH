import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Activity, 
  Radio, 
  Droplet, 
  Mountain, 
  Clock, 
  ShieldAlert,
  Send,
  FileCheck2
} from 'lucide-react';

export default function RoadInspectionModal({ hotspot, onClose, onDispatchAction }) {
  if (!hotspot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#111827] border border-[#c3c0ff]/30 rounded shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#1c1f2a] px-4 py-3 border-b border-[#464555] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-ping"></span>
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              ROAD INSPECTION POPUP — {hotspot.chainage}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-[#918fa1] hover:text-white hover:bg-[#262a35] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {/* Coordinates & Zone Header */}
          <div className="p-2.5 bg-[#0a0e18] border border-[#464555] rounded font-mono text-[11px] text-[#918fa1] flex flex-wrap items-center justify-between gap-2">
            <span>GRID REF: <strong className="text-white">{hotspot.lat} {hotspot.lon}</strong></span>
            <span>ZONE: <strong className="text-[#c3c0ff]">4D HIGHWAY DIVISION</strong></span>
            <span className="px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#34d399] font-bold text-[10px]">
              VERIFIED INSPECTION POINT
            </span>
          </div>

          {/* Title & Corridor Block */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#8b5cf6] uppercase font-bold">
                Corridor: {hotspot.title}
              </span>
              <span className="text-[#918fa1]">•</span>
              <span className="text-xs font-mono text-[#918fa1]">
                Chainage: {hotspot.chainage}
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              Hazard Status: {hotspot.severityText}
            </h3>
            <p className="text-xs text-[#c7c4d8] mt-1 leading-relaxed">
              {hotspot.description}
            </p>
          </div>

          {/* 4 Multi-Spectral Telemetry Cards (Mirroring Stitch screen f4410ba1cc7c4fd19393d71e6b3f6b7a) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            {/* 1. Slope Stability Factor */}
            <div className="p-3 bg-[#171b26] border border-[#464555] rounded flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#918fa1] font-sans flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-[#ef4444]" /> Slope Stability Factor
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#ef4444]/20 text-[#f87171] text-[10px] font-bold">
                  Caution 1.14 FOS
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#f87171]">{hotspot.fos}</span>
                <span className="text-[10px] text-[#918fa1]">(Safe Threshold: &gt;1.50)</span>
              </div>
            </div>

            {/* 2. Moisture Index */}
            <div className="p-3 bg-[#171b26] border border-[#464555] rounded flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#918fa1] font-sans flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-[#60a5fa]" /> Soil Moisture Index
                </span>
                <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-[#60a5fa] text-[10px] font-bold">
                  Elevated Saturation
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">{hotspot.moisture}</span>
                <span className="text-[10px] text-[#918fa1]">Volumetric (VWC)</span>
              </div>
            </div>

            {/* 3. InSAR Displacement Rate */}
            <div className="p-3 bg-[#171b26] border border-[#464555] rounded flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#918fa1] font-sans flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#8b5cf6]" /> InSAR Displacement
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#8b5cf6]/20 text-[#dad7ff] text-[10px] font-bold">
                  Active Creep
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#c4abff]">{hotspot.insarRate}</span>
                <span className="text-[10px] text-[#918fa1]">Line-of-sight east rate</span>
              </div>
            </div>

            {/* 4. Historical Landslide Recurrence */}
            <div className="p-3 bg-[#171b26] border border-[#464555] rounded flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#918fa1] font-sans flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#f59e0b]" /> Historical Frequency
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[#fbbf24] text-[10px] font-bold">
                  High Recurrence
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-black text-white">{hotspot.recurrence}</span>
              </div>
            </div>
          </div>

          {/* Live Geophone & Sensor Readout */}
          <div className="p-3 bg-[#0a0e18] border border-[#464555] rounded flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#10b981] animate-pulse" />
              <div>
                <span className="text-white font-bold block">Live Geophone: {hotspot.geophone}</span>
                <span className="text-[10px] text-[#918fa1]">Clearance Agency: {hotspot.clearanceAgency}</span>
              </div>
            </div>
            <span className="text-[10px] text-[#34d399] font-bold">SYNC: 12 SEC AGO</span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-[#1c1f2a] px-5 py-3 border-t border-[#464555] flex items-center justify-between gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#171b26] hover:bg-[#262a35] text-[#dfe2f1] text-xs font-mono border border-[#464555] transition-colors"
          >
            DISMISS NOTICE
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                alert(`Immediate SITREP dispatched for ${hotspot.title} (Chainage: ${hotspot.chainage})`);
                onClose();
              }}
              className="px-4 py-2 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-mono font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISPATCH CLEARANCE CREW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
