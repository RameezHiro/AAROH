import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Filter,
  Camera,
  ExternalLink
} from 'lucide-react';
import { MOCK_HOTSPOTS } from '../data/mockData';

export default function IncidentReports({ onSelectIncident }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const incidents = [
    {
      id: 'inc-1',
      title: 'NH-2 Dima Hasao Sector (KM 48.2)',
      type: 'HILL_SLOPE_SHEAR',
      status: 'OPEN',
      priority: 'CRITICAL',
      reportedAt: 'Today 08:24 IST',
      reporter: 'BRO 43 BRTF Patrol Officer',
      coordinates: '25°11\'08.2"N 93°01\'34.4"E',
      debrisVolume: '4,200 cu.m',
      clearanceETA: '36 Hours',
      roadPassable: 'NO',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJD0p0UWs4A7_03Jm7LqJ4-lbxm09-rRxir6ucicwd8fxqNWFllet-Ihj95w8Tu0L_XOS5JULUJBurD6OCtbIY7ZgpziaeIoHOkMgH-yY_Ioxb0BlYT4zvwDm_XQraWEYJqdgF7cMCbyz_NCtQrT1pUKw9Mwh8xVW52IFESGbsOC62TdsPrpwagHjgqF1hR-8acqs2NoGkZAsuI4m--mEa_sz4nK3QZ9gKH38uSWbA7YHSpCouF6-SaQ'
    },
    {
      id: 'inc-2',
      title: 'NH-102 Finch Corner (KM 34.2)',
      type: 'CAUSEWAY_INUNDATION',
      status: 'UNDER_INVESTIGATION',
      priority: 'HIGH',
      reportedAt: 'Today 09:12 IST',
      reporter: 'SDRF River Monitoring Cell',
      coordinates: '24°49\'12.0"N 94°16\'44.1"E',
      debrisVolume: 'N/A (Water Level 0.85m)',
      clearanceETA: '18 Hours',
      roadPassable: 'RESTRICTED (Heavy Only)',
      photoUrl: null
    },
    {
      id: 'inc-3',
      title: 'NH-29 Kohima Ridge (KM 16.4)',
      type: 'SHALE_SLIDE_ROCKFALL',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      reportedAt: 'Today 06:45 IST',
      reporter: 'Nagaland Police Highway Escort',
      coordinates: '25°40\'22.5"N 94°06\'39.8"E',
      debrisVolume: '850 cu.m',
      clearanceETA: '6 Hours',
      roadPassable: 'PILOT CONVOY ONLY',
      photoUrl: null
    },
    {
      id: 'inc-4',
      title: 'SH-19 Mahur Pass (Culvert 12)',
      type: 'ABUTMENT_SCOUR',
      status: 'RESOLVED',
      priority: 'LOW',
      reportedAt: 'Yesterday 17:30 IST',
      reporter: 'State PWD Inspection Team',
      coordinates: '25°04\'18.1"N 93°12\'05.0"E',
      debrisVolume: 'Rip-rap placed',
      clearanceETA: 'Restored',
      roadPassable: 'YES',
      photoUrl: null
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6 bg-[#0f131d] min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#464555]/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#4f46e5]/20 text-[#c3c0ff] font-mono text-[10px] font-bold border border-[#4f46e5]/40 uppercase">
              Field Telemetry Reports
            </span>
            <span className="font-mono text-xs text-[#918fa1]">NER HIGHWAY CELL</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1">
            Incident Reports & Field Telemetry
          </h2>
          <p className="text-xs text-[#918fa1] mt-0.5">
            Crowdsourced verified incident dossiers, drone surveys, and engineer inspection logs.
          </p>
        </div>

        <button 
          onClick={() => alert('Opening New Incident Dossier submission form...')}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-mono font-bold transition-all shadow-md active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>REPORT NEW INCIDENT</span>
        </button>
      </div>

      {/* Grid of Incidents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidents.map((inc) => (
          <div 
            key={inc.id}
            className="p-5 rounded bg-[#111827] border border-[#464555] hover:border-[#918fa1] transition-all flex flex-col justify-between gap-4 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  inc.priority === 'CRITICAL' ? 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40' :
                  inc.priority === 'HIGH' ? 'bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/40' :
                  'bg-[#10b981]/20 text-[#34d399] border-[#10b981]/40'
                }`}>
                  {inc.priority} PRIORITY
                </span>
                <span className="font-mono text-[11px] text-[#918fa1]">{inc.reportedAt}</span>
              </div>

              <h3 className="font-bold text-base text-white mt-2">
                {inc.title}
              </h3>
              <p className="text-xs font-mono text-[#8b5cf6] mt-0.5">
                TYPE: {inc.type}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono bg-[#171b26] p-3 rounded border border-[#464555]">
                <div>
                  <span className="text-[#918fa1] text-[10px] block">Passable:</span>
                  <strong className={inc.roadPassable === 'NO' ? 'text-[#f87171]' : 'text-white'}>
                    {inc.roadPassable}
                  </strong>
                </div>
                <div>
                  <span className="text-[#918fa1] text-[10px] block">Est. Clearance:</span>
                  <strong className="text-white">{inc.clearanceETA}</strong>
                </div>
                <div>
                  <span className="text-[#918fa1] text-[10px] block">Reporter:</span>
                  <strong className="text-white truncate block">{inc.reporter}</strong>
                </div>
                <div>
                  <span className="text-[#918fa1] text-[10px] block">Coordinates:</span>
                  <strong className="text-[#c3c0ff] truncate block">{inc.coordinates}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#464555]/60 flex items-center justify-between">
              <span className="text-xs font-mono text-[#918fa1]">
                STATUS: <strong className="text-[#34d399]">{inc.status}</strong>
              </span>
              <button 
                onClick={() => onSelectIncident(MOCK_HOTSPOTS[0])}
                className="px-3 py-1.5 rounded bg-[#1c1f2a] hover:bg-[#262a35] text-[#c3c0ff] text-xs font-mono border border-[#464555] transition-colors flex items-center gap-1.5"
              >
                <span>OPEN SENSOR DOSSIER</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
