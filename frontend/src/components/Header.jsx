import React from 'react';
import { 
  Radar, 
  Search, 
  Bell, 
  Send, 
  Download, 
  AlertTriangle, 
  User, 
  ShieldCheck,
  Radio,
  Layers
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onDeploySitrep, 
  onExportGis,
  activeAlertCount = 12,
  onOpenAlerts
}) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f131d]/95 backdrop-blur-md text-[#dfe2f1] z-50 px-4 md:px-6 flex items-center justify-between border-b border-[#918fa1]/20 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      {/* Brand & Live System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] flex items-center justify-center text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] border border-[#c3c0ff]/30">
            <Radar className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-['Manrope'] text-lg font-black tracking-tight text-white">
                AAROH
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#4f46e5]/30 text-[#c3c0ff] border border-[#4f46e5]/50 uppercase tracking-wide">
                NE Ops
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#918fa1]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span className="text-[#34d399] font-medium uppercase">SYSTEM LIVE • NE REGION RADAR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Quick Search (Stitch Screen Header) */}
      <div className="hidden lg:flex flex-1 max-w-xl mx-6">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-4 h-4 text-[#918fa1] pointer-events-none" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search district, road, or village (e.g. NH-29, Kamjong, Kohima)..."
            className="w-full bg-[#171b26] text-[#dfe2f1] pl-9 pr-14 py-2 rounded text-xs border border-[#464555] placeholder:text-[#918fa1]/70 focus:outline-none focus:border-[#c3c0ff] focus:ring-1 focus:ring-[#4f46e5] transition-all"
          />
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <kbd className="px-1.5 py-0.5 bg-[#0a0e18] text-[#918fa1] font-mono text-[10px] rounded border border-[#464555]">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Alert Warning, Actions & Officer Profile */}
      <div className="flex items-center gap-3">
        {/* Monsoon Watch Badge */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#93000a]/30 text-[#ffb4ab] border border-[#ef4444]/40 text-xs font-mono font-semibold shadow-sm">
          <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444] animate-pulse" />
          <span>MONSOON WATCH LVL 3: DIMA HASAO</span>
        </div>

        {/* Deploy Sitrep Button */}
        <button 
          onClick={onDeploySitrep}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-mono font-bold tracking-wider transition-colors shadow-md border border-[#c3c0ff]/30 active:scale-95"
          title="Deploy Situation Report to Field Cells"
        >
          <Send className="w-3.5 h-3.5" />
          <span>DEPLOY SITREP</span>
        </button>

        {/* Export GIS Data */}
        <button 
          onClick={onExportGis}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1f2a] hover:bg-[#262a35] text-[#dfe2f1] text-xs font-mono font-medium border border-[#464555] transition-colors active:scale-95"
          title="Export GeoJSON & InSAR Telemetry"
        >
          <Download className="w-3.5 h-3.5 text-[#c3c0ff]" />
          <span>EXPORT GIS</span>
        </button>

        {/* Notifications Icon with Counter */}
        <button 
          onClick={onOpenAlerts}
          className="relative p-2 rounded hover:bg-[#1c1f2a] text-[#c7c4d8] hover:text-white transition-colors"
          title="Open Alerts Center"
        >
          <Bell className="w-4 h-4" />
          {activeAlertCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#ef4444] text-white text-[9px] font-mono font-bold">
              {activeAlertCount}
            </span>
          )}
        </button>

        {/* Officer Profile Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-[#464555]/60">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#313540] to-[#4f46e5] flex items-center justify-center text-white border border-[#c3c0ff]/40 overflow-hidden">
              <span className="font-mono text-xs font-bold text-[#dad7ff]">PS</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] ring-2 ring-[#0f131d]"></span>
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">Dr. P. Sharma</span>
            <div className="flex items-center gap-1 text-[10px] text-[#918fa1]">
              <span className="text-[#8b5cf6] font-medium font-mono">NDMA Cell</span>
              <span>•</span>
              <span>Director</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
