import React, { useState } from 'react';
import { Shield, Crosshair, AlertTriangle, Building2, Flame, Car, Waves } from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';

interface StylizedCrisisMapProps {
  showRoutes?: boolean;
  highlightRoute?: 'A' | 'B' | 'both';
  compact?: boolean;
}

export const StylizedCrisisMap: React.FC<StylizedCrisisMapProps> = ({
  showRoutes = true,
  highlightRoute = 'both',
  compact = false,
}) => {
  const { selectedIncident, incidents, selectIncident, routes, hospitals, resources } = useCrisis();
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const routeA = routes[0];
  const routeB = routes[1];
  const primaryHospital = hospitals[0];
  const secondaryHospital = hospitals[1];
  const primaryResource = resources[0];

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Flood':
        return Waves;
      case 'Road Accident':
        return Car;
      case 'Fire':
        return Flame;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl">
      {/* Map Header telemetry bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <Crosshair className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-semibold text-slate-200">TACTICAL SITUATIONAL GIS MAP</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-300">
            SECTOR: {selectedIncident.location.toUpperCase()} ({selectedIncident.id})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            TELEMETRY ACTIVE
          </span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">EPSG:4326 MOCK</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className={`relative w-full ${compact ? 'h-72' : 'h-96 md:h-[420px]'} bg-[#070b14]`}>
        <svg
          viewBox="0 0 900 500"
          className="h-full w-full select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeOpacity="0.45" />
            </pattern>
            {/* Secondary Dot Pattern */}
            <pattern id="dots" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#334155" fillOpacity="0.6" />
            </pattern>
            {/* Linear Glow for Route A */}
            <linearGradient id="routeAGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            {/* Linear Glow for Route B */}
            <linearGradient id="routeBGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            {/* Water hazard gradient */}
            <radialGradient id="floodZoneGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#0369a1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#075985" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Grids */}
          <rect width="100%" height="100%" fill="#070b14" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />

          {/* Regional Road Network lines */}
          <g stroke="#1e293b" strokeWidth="2" strokeOpacity="0.8" fill="none">
            {/* Outer ring road */}
            <path d="M 50,250 C 200,100 650,100 850,250 C 750,450 180,440 50,250 Z" strokeDasharray="4,4" />
            {/* Main Arterials */}
            <path d="M 120,480 L 320,310 L 500,280 L 760,180 L 880,120" stroke="#334155" strokeWidth="3" />
            <path d="M 220,100 L 340,240 L 520,380 L 780,460" stroke="#253347" strokeWidth="2" />
            <path d="M 680,80 L 640,240 L 460,340 L 320,480" stroke="#1e293b" strokeWidth="2" strokeDasharray="6,4" />
          </g>

          {/* Sector Boundary Box */}
          <rect x="80" y="60" width="740" height="380" rx="8" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="10,6" strokeOpacity="0.25" />

          {/* ROUTE B (Standby Alternative Corridor) */}
          {showRoutes && routeB && (highlightRoute === 'B' || highlightRoute === 'both') && (
            <g opacity={highlightRoute === 'B' ? 1 : 0.75}>
              <path
                d={routeB.pathD || 'M 180,420 C 220,490 400,520 620,440 C 720,380 760,280 780,210'}
                fill="none"
                stroke="#d97706"
                strokeWidth={highlightRoute === 'B' ? 4 : 2.5}
                strokeDasharray="8,5"
                strokeLinecap="round"
              />
              <text x="440" y="470" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                ROUTE B: {routeB.name} ({routeB.distanceKm} km, {routeB.etaMinutes} min)
              </text>
            </g>
          )}

          {/* ROUTE A (Recommended Primary Corridor) */}
          {showRoutes && routeA && (highlightRoute === 'A' || highlightRoute === 'both') && (
            <g opacity={highlightRoute === 'A' ? 1 : 0.95}>
              {/* Pulsing neon path */}
              <path
                d={routeA.pathD || 'M 220,390 C 290,340 370,250 490,240 C 600,230 680,210 750,220'}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={highlightRoute === 'A' ? 6 : 4}
                strokeLinecap="round"
                strokeOpacity="0.3"
              />
              <path
                d={routeA.pathD || 'M 220,390 C 290,340 370,250 490,240 C 600,230 680,210 750,220'}
                fill="none"
                stroke="url(#routeAGlow)"
                strokeWidth={highlightRoute === 'A' ? 3.5 : 2.5}
                strokeLinecap="round"
              />
              <text x="360" y="270" fill="#22d3ee" fontSize="11" fontFamily="monospace" fontWeight="bold">
                ✓ ROUTE A: {routeA.name} ({routeA.distanceKm} km, {routeA.etaMinutes} min)
              </text>
            </g>
          )}

          {/* UNIT 1: Primary Resource Marker */}
          {primaryResource && (
            <g
              transform="translate(220, 390)"
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredPoint('rescue')}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx="0" cy="0" r="16" fill="#1d4ed8" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="14" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <foreignObject x="-9" y="-9" width="18" height="18">
                <Shield className="h-4.5 w-4.5 text-white" />
              </foreignObject>
              <rect x="-42" y="20" width="84" height="18" rx="3" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
              <text x="0" y="32" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {primaryResource.callsign} ({primaryResource.type.slice(0, 6)})
              </text>
            </g>
          )}

          {/* UNIT 2: Destination Hospital Marker */}
          {primaryHospital && (
            <g
              transform="translate(750, 220)"
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredPoint('hospital')}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle cx="0" cy="0" r="16" fill="#059669" fillOpacity="0.25" className="animate-ping" />
              <circle cx="0" cy="0" r="14" fill="#065f46" stroke="#34d399" strokeWidth="2" />
              <foreignObject x="-9" y="-9" width="18" height="18">
                <Building2 className="h-4.5 w-4.5 text-emerald-100" />
              </foreignObject>
              <rect x="-60" y="20" width="120" height="18" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="0" y="32" fill="#6ee7b7" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {primaryHospital.name.slice(0, 20)}
              </text>
            </g>
          )}

          {/* SECONDARY HOSPITAL */}
          {secondaryHospital && (
            <g transform="translate(680, 420)" opacity="0.8">
              <circle cx="0" cy="0" r="11" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <foreignObject x="-7" y="-7" width="14" height="14">
                <Building2 className="h-3.5 w-3.5 text-emerald-300" />
              </foreignObject>
              <text x="0" y="24" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">
                {secondaryHospital.name.slice(0, 16)} (ALT)
              </text>
            </g>
          )}

          {/* OTHER UNSELECTED INCIDENTS AS INTERACTIVE NODES */}
          {incidents
            .filter((inc) => inc.id !== selectedIncident.id)
            .map((inc) => {
              const OtherIcon = getIncidentIcon(inc.type);
              return (
                <g
                  key={inc.id}
                  transform={`translate(${inc.coordinates.x}, ${inc.coordinates.y})`}
                  className="cursor-pointer group"
                  onClick={() => selectIncident(inc.id)}
                >
                  <circle cx="0" cy="0" r="10" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" className="group-hover:stroke-cyan-400 group-hover:scale-125 transition-transform" />
                  <foreignObject x="-6" y="-6" width="12" height="12">
                    <OtherIcon className="h-3 w-3 text-slate-300 group-hover:text-cyan-300" />
                  </foreignObject>
                  <text x="0" y="20" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" className="group-hover:fill-cyan-300 font-bold">
                    {inc.id} ({inc.location})
                  </text>
                </g>
              );
            })}

          {/* PRIMARY TARGET INCIDENT MARKER (Active Selected Incident) */}
          <g
            transform={`translate(${selectedIncident.coordinates.x}, ${selectedIncident.coordinates.y})`}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint('incident')}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Expanding radar rings */}
            <circle cx="0" cy="0" r="32" fill="none" stroke={selectedIncident.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'} strokeWidth="1.5" strokeOpacity="0.4" className="animate-ping" />
            <circle cx="0" cy="0" r="22" fill="none" stroke={selectedIncident.severity === 'CRITICAL' ? '#f87171' : '#fbbf24'} strokeWidth="2" strokeOpacity="0.6" />
            <circle cx="0" cy="0" r="15" fill={selectedIncident.severity === 'CRITICAL' ? '#b91c1c' : '#b45309'} stroke="#fef08a" strokeWidth="2" />
            <foreignObject x="-8" y="-8" width="16" height="16">
              <AlertTriangle className="h-4 w-4 text-white" />
            </foreignObject>
            <rect x="-60" y="-38" width="120" height="22" rx="4" fill="#0f172a" stroke={selectedIncident.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'} strokeWidth="1.5" />
            <text x="0" y="-23" fill="#fecaca" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              TARGET: {selectedIncident.id} [{selectedIncident.severity}]
            </text>
          </g>

          {/* Compass Rose */}
          <g transform="translate(850, 50)" opacity="0.65">
            <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <path d="M 0,-14 L 4,0 L 0,-2 L -4,0 Z" fill="#ef4444" />
            <path d="M 0,14 L 4,0 L 0,2 L -4,0 Z" fill="#94a3b8" />
            <text x="0" y="-17" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
          </g>
        </svg>

        {/* Hover info tooltip */}
        {hoveredPoint && (
          <div className="absolute top-3 left-3 z-10 max-w-xs rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-md font-mono">
            {hoveredPoint === 'incident' && (
              <div>
                <p className="font-bold text-red-400">{selectedIncident.id}: {selectedIncident.title}</p>
                <p className="text-slate-400 mt-1">Location: {selectedIncident.location} | Urgency: {selectedIncident.urgency}</p>
                <p className="text-slate-400">Casualties / Impact: {selectedIncident.affectedPeople}</p>
              </div>
            )}
            {hoveredPoint === 'hospital' && primaryHospital && (
              <div>
                <p className="font-bold text-emerald-400">{primaryHospital.name}</p>
                <p className="text-slate-400 mt-1">{primaryHospital.traumaLevel}</p>
                <p className="text-slate-400">{primaryHospital.availableBeds} beds available ({primaryHospital.distanceKm} km)</p>
              </div>
            )}
            {hoveredPoint === 'rescue' && primaryResource && (
              <div>
                <p className="font-bold text-cyan-400">{primaryResource.name}</p>
                <p className="text-slate-400 mt-1">Specialization: {primaryResource.specialization}</p>
                <p className="text-slate-400">Status: {primaryResource.status} | ETA: {primaryResource.etaMinutes} min</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
