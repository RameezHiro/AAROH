import React, { useState } from 'react';
import { 
  Truck, 
  Radio, 
  Battery, 
  Gauge, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle2, 
  Send,
  Plane,
  HardHat
} from 'lucide-react';
import { MOCK_FLEET } from '../data/mockData';

export default function FleetMonitoring() {
  const [selectedUnit, setSelectedUnit] = useState(MOCK_FLEET[0]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-[#0f131d] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464555]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-[10px] font-bold border border-[#4f46e5]/40 uppercase">
              Tactical Fleet Dispatch
            </span>
            <span className="font-mono text-xs text-[#918fa1]">IRNSS / NAVIC TRACKING</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            Vehicle Monitoring & Relief Convoys
          </h2>
          <p className="text-xs text-[#918fa1] mt-0.5">
            Continuous real-time telemetry, SatCom health, fuel reserves, and hazardous corridor transit logging across the North East.
          </p>
        </div>

        <button 
          onClick={() => alert('Broadcasting global fleet advisory to all in-transit convoys...')}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-mono font-bold transition-all shadow-md active:scale-95"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>BROADCAST FLEET ADVISORY</span>
        </button>
      </div>

      {/* Fleet Table & Active Unit Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column */}
        <div className="lg:col-span-8 bg-[#111827] border border-[#464555] rounded shadow-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#464555]/60 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#c3c0ff]" />
              <span>Active Convoy Units (5 Online)</span>
            </h3>
            <span className="font-mono text-xs text-[#34d399]">
              All Satellite Locks Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#464555]/60 bg-[#171b26] text-[#918fa1] font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Unit Call-Sign</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Current Route</th>
                  <th className="py-3 px-4">Speed</th>
                  <th className="py-3 px-4 text-right">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#464555]/40 font-mono">
                {MOCK_FLEET.map((veh) => {
                  const isSelected = selectedUnit.id === veh.id;
                  let statusBadge = 'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40';
                  if (veh.status === 'AIRBORNE') statusBadge = 'bg-[#8b5cf6]/20 text-[#dad7ff] border-[#8b5cf6]/40';
                  if (veh.status === 'DEPLOYED') statusBadge = 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40';
                  if (veh.status === 'STAGED') statusBadge = 'bg-[#1c1f2a] text-[#dfe2f1] border-[#464555]';

                  return (
                    <tr 
                      key={veh.id}
                      onClick={() => setSelectedUnit(veh)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#1f2937] text-white' : 'hover:bg-[#171b26] text-[#dfe2f1]'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        {veh.status === 'AIRBORNE' ? (
                          <Plane className="w-3.5 h-3.5 text-[#8b5cf6]" />
                        ) : veh.status === 'DEPLOYED' ? (
                          <HardHat className="w-3.5 h-3.5 text-[#f59e0b]" />
                        ) : (
                          <Truck className="w-3.5 h-3.5 text-[#c3c0ff]" />
                        )}
                        <span>{veh.code}</span>
                      </td>
                      <td className="py-3 px-4 text-[#c7c4d8] font-sans">{veh.type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] border font-bold ${statusBadge}`}>
                          {veh.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#c7c4d8]">{veh.route}</td>
                      <td className="py-3 px-4 font-bold">{veh.speed}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#34d399]">{veh.eta}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Unit Telemetry Readout */}
        <div className="lg:col-span-4 bg-[#111827] border border-[#464555] rounded p-4 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#464555]/60 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#918fa1] uppercase">Selected Unit Telemetry</span>
                <h3 className="font-bold text-base text-white">{selectedUnit.code}</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-xs font-bold border border-[#4f46e5]/40">
                {selectedUnit.status}
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4 text-xs font-mono">
              <div className="p-3 rounded bg-[#171b26] border border-[#464555] flex items-center justify-between">
                <span className="text-[#918fa1] flex items-center gap-1.5 font-sans">
                  <Gauge className="w-3.5 h-3.5 text-[#38bdf8]" /> Current Ground Speed
                </span>
                <strong className="text-white text-sm">{selectedUnit.speed}</strong>
              </div>

              <div className="p-3 rounded bg-[#171b26] border border-[#464555] flex items-center justify-between">
                <span className="text-[#918fa1] flex items-center gap-1.5 font-sans">
                  <Battery className="w-3.5 h-3.5 text-[#10b981]" /> Fuel Reserve Level
                </span>
                <strong className="text-[#34d399] text-sm">{selectedUnit.fuel}</strong>
              </div>

              <div className="p-3 rounded bg-[#171b26] border border-[#464555] flex items-center justify-between">
                <span className="text-[#918fa1] flex items-center gap-1.5 font-sans">
                  <Radio className="w-3.5 h-3.5 text-[#8b5cf6]" /> SatCom Uplink Quality
                </span>
                <strong className="text-[#dad7ff] text-sm">{selectedUnit.satcom}</strong>
              </div>

              <div className="p-3 rounded bg-[#171b26] border border-[#464555] flex flex-col gap-1">
                <span className="text-[#918fa1] text-[10px] font-sans">Payload Manifest:</span>
                <strong className="text-white font-sans">{selectedUnit.payload}</strong>
              </div>

              <div className="p-3 rounded bg-[#171b26] border border-[#464555] flex items-center justify-between">
                <span className="text-[#918fa1] flex items-center gap-1.5 font-sans">
                  <User className="w-3.5 h-3.5 text-[#c3c0ff]" /> Commander / Pilot:
                </span>
                <strong className="text-white font-sans">{selectedUnit.driver}</strong>
              </div>
            </div>
          </div>

          <button 
            onClick={() => alert(`Direct satellite comm-link established with ${selectedUnit.code}`)}
            className="w-full py-2.5 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>CONNECT ENCRYPTED COMMS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
