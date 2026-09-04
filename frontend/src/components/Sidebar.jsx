import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Navigation, 
  Truck, 
  AlertOctagon, 
  BarChart3, 
  FileText, 
  Settings,
  PanelLeftClose,
  Radio
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard, title: 'Mission Command Overview' },
    { id: 'gis', label: 'GIS', icon: Map, title: 'Interactive GIS Canvas' },
    { id: 'route', label: 'Route', icon: Navigation, title: 'Safe Route Planner' },
    { id: 'fleet', label: 'Fleet', icon: Truck, title: 'Fleet Logistics & Convoys' },
    { id: 'alerts', label: 'Alerts', icon: AlertOctagon, title: 'Emergency Alerts Center' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, title: 'Regional Risk Analytics' },
    { id: 'incidents', label: 'Reports', icon: FileText, title: 'Incident Field Reports' },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[72px] bg-[#0a0e18] border-r border-[#464555]/60 z-40 flex flex-col justify-between py-4 shadow-xl select-none">
      {/* Navigation Icons */}
      <nav className="flex flex-col items-center gap-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.title}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded transition-all group relative ${
                isActive
                  ? 'bg-[#4f46e5] text-white font-bold shadow-[0_0_12px_rgba(79,70,229,0.5)] border border-[#c3c0ff]/40'
                  : 'text-[#918fa1] hover:text-[#dfe2f1] hover:bg-[#171b26]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-mono text-[9px] uppercase tracking-wider mt-1 opacity-90">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#c3c0ff] rounded-r"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Telemetry Health Status Beacon */}
      <div className="flex flex-col items-center gap-3 px-2">
        <div className="group relative flex flex-col items-center cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#171b26] border border-[#464555] hover:border-[#10b981] transition-colors">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
          </div>
          {/* Tooltip Hover Flyout */}
          <div className="absolute left-[76px] bottom-0 ml-1 hidden group-hover:flex flex-col whitespace-nowrap bg-[#171b26] border border-[#464555] px-3 py-2 rounded shadow-2xl z-50 pointer-events-none">
            <span className="font-mono text-[11px] text-[#34d399] font-bold">99.9% Telemetry Operational</span>
            <span className="text-[10px] text-[#c7c4d8]">All 8 NE States Online via SATCOM-4</span>
          </div>
        </div>

        <button 
          className="p-1.5 rounded text-[#918fa1] hover:text-[#dfe2f1] hover:bg-[#171b26] transition-colors" 
          title="Toggle Rail Expansion"
          type="button"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
