import React, { useState } from 'react';
import { 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Mountain, 
  Droplets,
  Share2,
  Printer
} from 'lucide-react';
import { MOCK_ROUTES } from '../data/mockData';

export default function SafeRoutePlanner({ onDeployConvoy }) {
  const [selectedRouteId, setSelectedRouteId] = useState('route-a');
  const selectedRoute = MOCK_ROUTES.find(r => r.id === selectedRouteId) || MOCK_ROUTES[0];

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-[#0f131d] min-h-[calc(100vh-4rem)]">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464555]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-[10px] font-bold border border-[#4f46e5]/40 uppercase">
              AI Dynamic Routing
            </span>
            <span className="font-mono text-xs text-[#918fa1]">ZONE 4D NER DISPATCH</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            Safe Route Planner: Imphal → Ukhrul
          </h2>
          <p className="text-xs text-[#918fa1] mt-0.5">
            Real-time multi-modal logistics corridor triage based on live satellite InSAR, slope moisture, and BRO field obstruction telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#171b26] hover:bg-[#262a35] text-[#dfe2f1] text-xs font-mono border border-[#464555] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT MANIFEST</span>
          </button>
          <button 
            onClick={() => onDeployConvoy(selectedRoute)}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#10b981] hover:bg-[#059669] text-white text-xs font-mono font-bold transition-all shadow-lg active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>CONFIRM & DISPATCH CONVOY</span>
          </button>
        </div>
      </div>

      {/* Corridor Selector Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {MOCK_ROUTES.map((route) => {
          const isSelected = selectedRouteId === route.id;
          const isRecommended = route.type === 'RECOMMENDED';
          const isInterdicted = route.type === 'INTERDICTED';

          let borderClass = 'border-[#464555]';
          let badgeBg = 'bg-[#8b5cf6]/20 text-[#c4abff] border-[#8b5cf6]/40';
          let StatusIcon = AlertTriangle;

          if (isRecommended) {
            borderClass = isSelected ? 'border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-[#10b981]' : 'border-[#464555]';
            badgeBg = 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40';
            StatusIcon = CheckCircle2;
          } else if (isInterdicted) {
            borderClass = isSelected ? 'border-[#ef4444] shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-[#464555]';
            badgeBg = 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40';
            StatusIcon = XCircle;
          } else if (isSelected) {
            borderClass = 'border-[#8b5cf6] shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-[#8b5cf6]';
          }

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 rounded bg-[#111827] border ${borderClass} cursor-pointer transition-all flex flex-col justify-between hover:bg-[#171b26]`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${badgeBg}`}>
                    {route.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-right font-mono text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#918fa1]" />
                    <span className="font-bold text-white">{route.duration}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white mt-1 leading-snug">
                  {route.name}
                </h3>
                <p className="text-xs text-[#918fa1] mt-1 line-clamp-2">
                  {route.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#464555]/60 flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[#918fa1]">Distance:</span>
                  <strong className="text-white">{route.distance}</strong>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[#918fa1]">Clearance Index:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-[#171b26] rounded-full overflow-hidden border border-[#464555]">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${route.clearanceRate}%`, 
                          backgroundColor: route.color 
                        }}
                      />
                    </div>
                    <span className="font-bold text-white">{route.clearanceRate}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#918fa1]">
                  <span>Weather:</span>
                  <span className="text-white">{route.weather}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Elevation & Waypoints Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Elevation Cross-Section Chart */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#464555]/60 pb-3">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-[#c3c0ff]" />
              <h3 className="font-bold text-sm text-white">
                Terrain Elevation & High-Pass Gradient Profile
              </h3>
            </div>
            <span className="font-mono text-xs text-[#918fa1]">
              Max Crest: <strong className="text-[#34d399]">1,940m AMSL</strong>
            </span>
          </div>

          {/* SVG Elevation Profile Curve */}
          <div className="relative w-full h-56 bg-[#0a0e18] border border-[#464555] rounded p-3 flex flex-col justify-between">
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#918fa1]">
              Elevation (Meters AMSL)
            </div>
            <svg className="w-full h-40 mt-4 overflow-visible" viewBox="0 0 700 160">
              <defs>
                <linearGradient id="elev-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(79, 70, 229, 0.4)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0.0)" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 3" />

              {/* Dynamic Path based on elevations */}
              <path 
                d={`M 0 130 Q 100 110 200 80 T 400 30 T 600 50 L 700 20 L 700 160 L 0 160 Z`} 
                fill="url(#elev-gradient)" 
              />
              <path 
                d={`M 0 130 Q 100 110 200 80 T 400 30 T 600 50 L 700 20`} 
                fill="none" 
                stroke="#c3c0ff" 
                strokeWidth="3" 
              />

              {/* Waypoint Markers on Curve */}
              <circle cx="0" cy="130" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="5" y="125" fill="#918fa1" fontSize="10" fontFamily="JetBrains Mono">Imphal (780m)</text>

              <circle cx="350" cy="50" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <text x="355" y="45" fill="#fbbf24" fontSize="10" fontFamily="JetBrains Mono">Mahur Pass (1,680m)</text>

              <circle cx="700" cy="20" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="610" y="20" fill="#34d399" fontSize="10" fontFamily="JetBrains Mono">Ukhrul (1,940m)</text>
            </svg>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#918fa1] pt-2 border-t border-[#464555]/40">
              <span>KM 0 (Imphal Staging)</span>
              <span>KM 24 (Yaingangpokpi)</span>
              <span>KM 48 (Finch Corner Junction)</span>
              <span>KM 84.6 (Ukhrul Civil Hosp.)</span>
            </div>
          </div>
        </div>

        {/* Selected Route Tactical Telemetry & Bridge Specs */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-white border-b border-[#464555]/60 pb-2">
              Route Technical Verification
            </h3>
            
            <div className="flex flex-col gap-3 mt-3 text-xs">
              <div className="p-2.5 rounded bg-[#171b26] border border-[#464555]">
                <span className="text-[#918fa1] text-[10px] uppercase font-mono block">Bridge Certifications:</span>
                <span className="font-bold text-white mt-0.5 block">{selectedRoute.bridges}</span>
              </div>

              <div className="p-2.5 rounded bg-[#171b26] border border-[#464555]">
                <span className="text-[#918fa1] text-[10px] uppercase font-mono block">Predicted Bottleneck:</span>
                <span className="font-bold text-[#fbbf24] mt-0.5 block">{selectedRoute.bottlenecks}</span>
              </div>

              <div className="p-2.5 rounded bg-[#171b26] border border-[#464555]">
                <span className="text-[#918fa1] text-[10px] uppercase font-mono block">Fuel Consumption Estimate:</span>
                <span className="font-bold text-white mt-0.5 block">24.2 Litres (Heavy 6x4 Axle)</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onDeployConvoy(selectedRoute)}
            className="w-full py-2.5 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>TRANSMIT DISPATCH ORDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
