import React, { useState } from 'react';
import { 
  Radar, 
  CloudRain, 
  Mountain, 
  HardHat, 
  Crosshair, 
  AlertTriangle, 
  Compass, 
  Layers, 
  Maximize2, 
  ZoomIn, 
  ZoomOut,
  Navigation,
  Info,
  Wrench,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { MOCK_HOTSPOTS, MOCK_BRO_UNITS } from '../data/mockData';

export default function GisMapCanvas({ onSelectHotspot, selectedHotspotId }) {
  const [activeLayers, setActiveLayers] = useState({
    insar: true,
    rain: true,
    slope: true,
    bro: true,
  });

  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [hoveredBro, setHoveredBro] = useState(null);

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleBroClick = (bro) => {
    alert(`Encrypted tactical comm-link connected with ${bro.name} (${bro.commander}).\nCurrent Mission: ${bro.status} at ${bro.location}.\nEquipment: ${bro.equipment}`);
  };

  return (
    <section className="flex flex-col gap-3">
      {/* Live Route Micro HUD Strip (from Stitch Screen) */}
      <div className="bg-[#171b26] border border-[#464555] p-3 rounded shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-[#4f46e5]/20 border border-[#4f46e5]/40 rounded text-[#c3c0ff]">
            <Navigation className="w-5 h-5 text-[#8b5cf6] animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-white tracking-tight">
                Imphal → Ukhrul
              </span>
              <span className="px-1.5 py-0.5 bg-[#0a0e18] border border-[#464555] text-[#918fa1] font-mono text-[10px] rounded font-semibold">
                NH-102 / SH-19
              </span>
              <span className="px-1.5 py-0.5 bg-[#10b981]/20 border border-[#10b981]/40 text-[#34d399] font-mono text-[10px] rounded font-bold uppercase">
                Corridor Passable
              </span>
            </div>
            <p className="text-xs text-[#918fa1] truncate mt-0.5">
              Relief Convoy Medic-03 In-Transit • High-Elevation Pass KM 21-39 • Clear for Medical Dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-mono text-[10px] uppercase text-[#918fa1] block">
              Estimated Arrival
            </span>
            <span className="font-mono text-sm text-[#34d399] font-bold tracking-tight">
              ETA 2h 40m
            </span>
          </div>
          <button 
            onClick={() => onSelectHotspot(MOCK_HOTSPOTS[3])}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4f46e5] text-white rounded text-xs font-mono font-medium hover:bg-[#4338ca] transition-colors shadow-sm"
            title="Focus Convoy Location"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>FOCUS</span>
          </button>
        </div>
      </div>

      {/* Primary Map Canvas Container */}
      <div className="relative w-full h-[580px] lg:h-[620px] rounded overflow-hidden bg-[#0a0e18] border border-[#464555] shadow-2xl flex flex-col justify-between select-none">
        
        {/* Synthetic Cartographic Terrain Base */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJD0p0UWs4A7_03Jm7LqJ4-lbxm09-rRxir6ucicwd8fxqNWFllet-Ihj95w8Tu0L_XOS5JULUJBurD6OCtbIY7ZgpziaeIoHOkMgH-yY_Ioxb0BlYT4zvwDm_XQraWEYJqdgF7cMCbyz_NCtQrT1pUKw9Mwh8xVW52IFESGbsOC62TdsPrpwagHjgqF1hR-8acqs2NoGkZAsuI4m--mEa_sz4nK3QZ9gKH38uSWbA7YHSpCouF6-SaQ')"
          }}
        />

        {/* Topographic Vector Matrix & Contours */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-[#0a0e18]/80 pointer-events-none">
          <svg className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tactical-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="1" fill="rgba(195, 192, 255, 0.3)" />
              </pattern>
              
              {/* Slope Hazard Hatching Pattern */}
              <pattern id="slope-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tactical-grid)" />
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="rgba(79, 70, 229, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50%" cy="50%" r="380" fill="none" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" strokeDasharray="6 6" />

            {/* InSAR Displacement Heatmap Simulation Overlay */}
            {activeLayers.insar && (
              <g className="animate-pulse" opacity="0.6">
                <ellipse cx="68%" cy="36%" rx="65" ry="45" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <ellipse cx="38%" cy="52%" rx="50" ry="35" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1" />
              </g>
            )}

            {/* Rainfall Radar Layer Simulation */}
            {activeLayers.rain && (
              <g opacity="0.45">
                <path d="M 120 180 Q 320 120 540 220 T 960 300" fill="none" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="36" strokeLinecap="round" filter="blur(8px)" />
              </g>
            )}

            {/* Slope Gradient Contour Isolines Layer */}
            {activeLayers.slope && (
              <g opacity="0.85">
                {/* Steep Escarpment Hazard Hatched Zone */}
                <polygon points="560,160 740,130 850,230 690,270" fill="url(#slope-hatch)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                <polygon points="280,310 410,270 460,360 330,390" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

                {/* 1800m AMSL (<20° Stable) */}
                <path d="M 60 220 Q 240 160 440 210 T 820 150 T 1100 120" fill="none" stroke="#10b981" strokeWidth="1.6" strokeDasharray="6 3" />
                <text x="180" y="195" fill="#34d399" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">1800m [16° STABLE]</text>

                {/* 1600m AMSL (24° Boundary) */}
                <path d="M 80 290 Q 280 230 480 270 T 860 220 T 1120 180" fill="none" stroke="#34d399" strokeWidth="1.4" />
                <text x="360" y="260" fill="#34d399" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">1600m</text>

                {/* 1400m AMSL (34° Moderate Slope Warning) */}
                <path d="M 100 360 Q 320 310 520 350 T 900 290 T 1140 250" fill="none" stroke="#f59e0b" strokeWidth="2.0" />
                <text x="590" y="325" fill="#fbbf24" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">1400m [34° CAUTION]</text>

                {/* 1200m AMSL (>45° Extreme Slope Scarp / Slip Line) */}
                <path d="M 120 440 Q 360 380 580 410 T 940 360 T 1160 320" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 2" />
                <text x="740" y="390" fill="#f87171" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">1200m [&gt;45° SHEAR SCARP]</text>
              </g>
            )}

            {/* BRO Task Force Work Perimeter Circles */}
            {activeLayers.bro && MOCK_BRO_UNITS.map((bro) => (
              <g key={`bro-circle-${bro.id}`} className="animate-pulse">
                <circle 
                  cx={`${bro.xPercent}%`} 
                  cy={`${bro.yPercent}%`} 
                  r="38" 
                  fill="rgba(245, 158, 11, 0.12)" 
                  stroke="#f59e0b" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 3" 
                />
              </g>
            ))}

            {/* Simulated Live Vector GIS Route Tracks */}
            {/* Route A: Safe Corridor (Emerald Green) */}
            <path 
              d="M 140 520 Q 280 460 420 420 T 620 340" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              strokeDasharray="4 2"
            />
            {/* Route B: AI Suggested Alternate (Violet) */}
            <path 
              d="M 420 420 Q 560 480 720 410 T 890 320" 
              fill="none" 
              stroke="#8b5cf6" 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            {/* Route C: Interdicted / Severed Section (Crimson) */}
            <path 
              d="M 620 340 Q 740 280 860 250" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
          </svg>
        </div>

        {/* Top Left Floating Layer Controls */}
        <div className="relative z-20 m-3 p-1.5 bg-[#0f131d]/90 backdrop-blur-md rounded border border-[#464555] shadow-xl flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 px-2 text-[#918fa1] font-mono text-[10px] font-bold uppercase">
            <Layers className="w-3.5 h-3.5 text-[#c3c0ff]" />
            <span>LAYERS</span>
          </div>

          <button
            onClick={() => toggleLayer('insar')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.insar 
                ? 'bg-[#8b5cf6] text-white shadow-[0_0_8px_rgba(139,92,246,0.5)] border border-[#c3c0ff]/40' 
                : 'bg-[#1c1f2a] text-[#918fa1] hover:text-[#dfe2f1] border border-[#464555]'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>InSAR (+4.2mm)</span>
          </button>

          <button
            onClick={() => toggleLayer('rain')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.rain 
                ? 'bg-[#3b82f6] text-white shadow-[0_0_8px_rgba(59,130,246,0.5)] border border-blue-300/40' 
                : 'bg-[#1c1f2a] text-[#918fa1] hover:text-[#dfe2f1] border border-[#464555]'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Rainfall Radar</span>
          </button>

          <button
            onClick={() => toggleLayer('slope')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.slope 
                ? 'bg-[#10b981] text-white shadow-[0_0_8px_rgba(16,185,129,0.5)] border border-emerald-300/40' 
                : 'bg-[#1c1f2a] text-[#918fa1] hover:text-[#dfe2f1] border border-[#464555]'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Slope Gradients</span>
          </button>

          <button
            onClick={() => toggleLayer('bro')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              activeLayers.bro 
                ? 'bg-[#f59e0b] text-[#0f131d] font-bold shadow-[0_0_8px_rgba(245,158,11,0.5)] border border-amber-300/40' 
                : 'bg-[#1c1f2a] text-[#918fa1] hover:text-[#dfe2f1] border border-[#464555]'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>BRO Task Forces</span>
          </button>
        </div>

        {/* Top Right Map Navigation Utilities */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <button className="w-8 h-8 rounded bg-[#171b26]/90 backdrop-blur-md border border-[#464555] text-[#dfe2f1] hover:text-white flex items-center justify-center hover:bg-[#262a35] transition-colors" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded bg-[#171b26]/90 backdrop-blur-md border border-[#464555] text-[#dfe2f1] hover:text-white flex items-center justify-center hover:bg-[#262a35] transition-colors" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded bg-[#171b26]/90 backdrop-blur-md border border-[#464555] text-[#dfe2f1] hover:text-white flex items-center justify-center hover:bg-[#262a35] transition-colors" title="Center Map">
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Tactical Hotspot Pins */}
        {MOCK_HOTSPOTS.map((hs) => {
          const isCritical = hs.severity === 'critical';
          const isNominal = hs.severity === 'nominal';
          const isSelected = selectedHotspotId === hs.id;

          let pinBg = isCritical ? 'bg-[#ef4444]' : isNominal ? 'bg-[#10b981]' : 'bg-[#f59e0b]';
          let pingColor = isCritical ? 'bg-red-500' : isNominal ? 'bg-emerald-400' : 'bg-amber-400';

          return (
            <div
              key={hs.id}
              style={{ top: `${hs.yPercent}%`, left: `${hs.xPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
              onClick={() => onSelectHotspot(hs)}
              onMouseEnter={() => setHoveredHotspot(hs)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              {/* Radar Ping Pulse */}
              <div className="relative flex items-center justify-center">
                <span className={`animate-ping absolute h-8 w-8 rounded-full ${pingColor} opacity-75`}></span>
                <div 
                  className={`w-7 h-7 rounded-full ${pinBg} text-white flex items-center justify-center shadow-lg border-2 border-white/60 transform group-hover:scale-125 transition-transform ${
                    isSelected ? 'ring-4 ring-[#c3c0ff]' : ''
                  }`}
                >
                  {isCritical ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  ) : isNominal ? (
                    <Navigation className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Mountain className="w-3.5 h-3.5 text-[#0f131d]" />
                  )}
                </div>
              </div>

              {/* Pin Hover Flyout Tooltip (Mirroring Stitch Popover) */}
              <div className="absolute left-9 top-0 -translate-y-1/2 w-64 p-3 bg-[#111827]/95 backdrop-blur-md rounded border border-[#464555] shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-40">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    isCritical ? 'bg-[#ef4444]/20 text-[#f87171]' : 'bg-[#10b981]/20 text-[#34d399]'
                  }`}>
                    {hs.severityText}
                  </span>
                  <span className="font-mono text-[10px] text-[#918fa1]">{hs.chainage}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-tight">
                  {hs.title}
                </h4>
                <p className="text-[11px] text-[#c7c4d8] mt-1 line-clamp-2">
                  {hs.description}
                </p>
                <div className="mt-2 pt-1.5 border-t border-[#464555]/60 flex items-center justify-between text-[9px] font-mono text-[#918fa1]">
                  <span>FOS: <strong className="text-white">{hs.fos}</strong></span>
                  <span>InSAR: <strong className="text-[#8b5cf6]">{hs.insarRate}</strong></span>
                  <span className="text-[#c3c0ff] underline">Click to inspect</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Interactive BRO Task Force Tactical Badges & Markers (Visible when activeLayers.bro is on) */}
        {activeLayers.bro && MOCK_BRO_UNITS.map((bro) => (
          <div
            key={bro.id}
            style={{ top: `${bro.yPercent}%`, left: `${bro.xPercent}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer"
            onClick={() => handleBroClick(bro)}
            onMouseEnter={() => setHoveredBro(bro)}
            onMouseLeave={() => setHoveredBro(null)}
          >
            {/* Pulsing Tactical Amber Ping */}
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute h-8 w-8 rounded-full bg-amber-400 opacity-60"></span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7c5e10] to-[#f59e0b] text-[#0a0e18] flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)] border-2 border-white/80 transform group-hover:scale-125 transition-transform">
                <HardHat className="w-4 h-4 text-[#0a0e18] font-black" />
              </div>
            </div>

            {/* Floating Unit Tag Pill */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-[#171b26]/95 border border-[#f59e0b]/50 text-[9px] font-mono font-bold text-[#fbbf24] shadow-md pointer-events-none">
              {bro.tag}
            </div>

            {/* BRO Unit Hover Dossier Flyout */}
            <div className="absolute left-10 top-0 -translate-y-1/2 w-72 p-3 bg-[#111827]/95 backdrop-blur-md rounded border border-[#f59e0b]/50 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#f59e0b]/20 text-[#fbbf24] border border-[#f59e0b]/40">
                  {bro.status}
                </span>
                <span className="font-mono text-[10px] text-[#34d399] font-bold">
                  {bro.taskProgress}% DONE
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">
                {bro.name}
              </h4>
              <p className="text-[10px] font-mono text-[#918fa1] mt-0.5">
                Commander: <strong className="text-white">{bro.commander}</strong>
              </p>
              
              <div className="mt-2 p-2 rounded bg-[#0a0e18] border border-[#464555]/60 flex flex-col gap-1 text-[10px] font-mono">
                <div className="text-[#c7c4d8] leading-tight">
                  <strong className="text-[#fbbf24]">Deployment:</strong> {bro.equipment}
                </div>
                <div className="text-[#918fa1]">
                  Personnel: <strong className="text-white">{bro.strength}</strong>
                </div>
                <div className="text-[#918fa1]">
                  Sector: <strong className="text-[#c3c0ff]">{bro.location}</strong>
                </div>
              </div>
              <div className="mt-2 text-[9px] font-mono text-[#34d399] text-right underline">
                Click to contact Task Force
              </div>
            </div>
          </div>
        ))}

        {/* Floating Active Layer Legends (Slope Gradient & BRO) */}
        <div className="absolute bottom-14 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
          {/* Slope Gradient Legend */}
          {activeLayers.slope && (
            <div className="px-2.5 py-1.5 bg-[#0f131d]/90 backdrop-blur-md rounded border border-[#10b981]/40 flex items-center gap-3 text-[10px] font-mono shadow-xl animate-fade-in pointer-events-auto">
              <span className="text-white font-bold flex items-center gap-1">
                <Mountain className="w-3 h-3 text-[#10b981]" /> SLOPE:
              </span>
              <span className="flex items-center gap-1 text-[#34d399]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> &lt;25° Stable
              </span>
              <span className="flex items-center gap-1 text-[#fbbf24]">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> 25°–45° Caution
              </span>
              <span className="flex items-center gap-1 text-[#f87171]">
                <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> &gt;45° Severe Cliff
              </span>
            </div>
          )}

          {/* BRO Task Forces Active Status */}
          {activeLayers.bro && (
            <div className="px-2.5 py-1.5 bg-[#0f131d]/90 backdrop-blur-md rounded border border-[#f59e0b]/40 flex items-center gap-2 text-[10px] font-mono shadow-xl animate-fade-in pointer-events-auto">
              <HardHat className="w-3 h-3 text-[#fbbf24]" />
              <span className="text-white font-bold">
                3 BRO Task Forces Deployed
              </span>
              <span className="text-[#918fa1]">•</span>
              <span className="text-[#fbbf24]">74 Sappers on Sector Standby</span>
            </div>
          )}
        </div>

        {/* Bottom Cartographic Coordinates & Telemetry Bar */}
        <div className="relative z-20 mx-3 mb-3 px-3 py-2 bg-[#0f131d]/90 backdrop-blur-md rounded border border-[#464555] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#918fa1]">
          <div className="flex items-center gap-4">
            <span>GRID: <strong className="text-white">25°11'08"N 93°01'34"E</strong></span>
            <span>ZONE: <strong className="text-white">4D (NER HIGHWAYS)</strong></span>
            <span>SATELLITE: <strong className="text-[#34d399]">SENTINEL-1C SYNCHRONIZED</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span>WIND: <strong className="text-white">SW 18 km/h</strong></span>
            <span>HUMIDITY: <strong className="text-white">88% VWC</strong></span>
            <span className="text-[#c3c0ff]">CLICK HOTSPOT OR BRO UNIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
