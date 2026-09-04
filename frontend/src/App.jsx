import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TelemetryRibbon from './components/TelemetryRibbon';
import GisMapCanvas from './components/GisMapCanvas';
import InspectionDrawer from './components/InspectionDrawer';
import SafeRoutePlanner from './components/SafeRoutePlanner';
import RegionalAnalytics from './components/RegionalAnalytics';
import FleetMonitoring from './components/FleetMonitoring';
import AlertsCenter from './components/AlertsCenter';
import IncidentReports from './components/IncidentReports';
import RoadInspectionModal from './components/RoadInspectionModal';
import { MOCK_HOTSPOTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [inspectingHotspot, setInspectingHotspot] = useState(null);
  const [notificationBanner, setNotificationBanner] = useState(null);

  const showNotification = (msg) => {
    setNotificationBanner(msg);
    setTimeout(() => setNotificationBanner(null), 4500);
  };

  const handleDeploySitrep = () => {
    showNotification('Tactical SITREP broadcasted to all 8 NE State Disaster Management Authorities!');
  };

  const handleExportGis = () => {
    showNotification('Exporting geospatial vector layers and InSAR interferograms as GeoJSON package...');
  };

  const handleTriggerReroute = () => {
    setActiveTab('route');
    showNotification('Opening Safe Route Planner with AI recommended Southern Axis alternative.');
  };

  const handleDispatchAirborne = () => {
    showNotification('Airborne Drone LiDAR (DRONE-NER-09) scrambled to KM 48.2 Dima Hasao airspace!');
  };

  const handleDeployConvoy = (route) => {
    showNotification(`Convoy dispatch order certified for: ${route.name} (${route.distance})`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#dfe2f1] font-['Manrope'] antialiased flex flex-col selection:bg-[#4f46e5] selection:text-white">
      {/* Top Mission Command Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onDeploySitrep={handleDeploySitrep}
        onExportGis={handleExportGis}
        activeAlertCount={6}
        onOpenAlerts={() => setActiveTab('alerts')}
      />

      {/* Left Tactical Navigation Rail (72px) */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Notification Toast */}
      {notificationBanner && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171b26] border border-[#10b981] text-white px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in font-mono text-xs max-w-md">
          <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping"></span>
          <span>{notificationBanner}</span>
        </div>
      )}

      {/* Main Operational Stage */}
      <div className="pl-0 md:pl-[72px] pt-16 min-h-screen flex flex-col flex-1">
        {/* Top Telemetry Corridors Ribbon */}
        <TelemetryRibbon 
          selectedCorridor={selectedCorridor}
          setSelectedCorridor={setSelectedCorridor}
          onRefresh={() => showNotification('Live satellite telemetry re-synchronized with Sentinel-1C & NavIC.')}
        />

        {/* Dynamic View Routing */}
        <main className="flex-1 w-full p-3 sm:p-4 lg:p-6">
          {activeTab === 'dashboard' && (
            <div className="w-full flex flex-col xl:flex-row gap-4 lg:gap-6">
              {/* Left / Center: Interactive GIS Map Canvas Engine */}
              <div className="flex-1 min-w-0">
                <GisMapCanvas 
                  onSelectHotspot={(hs) => setInspectingHotspot(hs)}
                  selectedHotspotId={inspectingHotspot?.id}
                />
              </div>

              {/* Right: Inspection & Vulnerability Telemetry Drawer */}
              <InspectionDrawer 
                onTriggerReroute={handleTriggerReroute}
                onDispatchAirborne={handleDispatchAirborne}
              />
            </div>
          )}

          {activeTab === 'gis' && (
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#464555]/60 pb-3">
                <h2 className="text-xl font-bold text-white">Full-Screen Tactical GIS Engine</h2>
                <span className="text-xs font-mono text-[#918fa1]">DECK.GL / MAPBOX VECTOR STACK</span>
              </div>
              <GisMapCanvas 
                onSelectHotspot={(hs) => setInspectingHotspot(hs)}
                selectedHotspotId={inspectingHotspot?.id}
              />
            </div>
          )}

          {activeTab === 'route' && (
            <SafeRoutePlanner onDeployConvoy={handleDeployConvoy} />
          )}

          {activeTab === 'analytics' && (
            <RegionalAnalytics />
          )}

          {activeTab === 'fleet' && (
            <FleetMonitoring />
          )}

          {activeTab === 'alerts' && (
            <AlertsCenter onInspectAlert={(hs) => setInspectingHotspot(hs)} />
          )}

          {activeTab === 'incidents' && (
            <IncidentReports onSelectIncident={(hs) => setInspectingHotspot(hs)} />
          )}
        </main>
      </div>

      {/* Road Inspection Popup Modal (Stitch screen f4410ba1cc7c4fd19393d71e6b3f6b7a) */}
      <RoadInspectionModal 
        hotspot={inspectingHotspot}
        onClose={() => setInspectingHotspot(null)}
        onDispatchAction={handleDeploySitrep}
      />
    </div>
  );
}
