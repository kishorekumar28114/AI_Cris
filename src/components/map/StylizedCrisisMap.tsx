import React, { useState } from 'react';
import { Shield, Crosshair, AlertTriangle, Building2 } from 'lucide-react';

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
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950/90 shadow-2xl">
      {/* Map Header telemetry bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Crosshair className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-semibold text-slate-200">SITUATIONAL TACTICAL MAP</span>
          <span className="text-slate-600">|</span>
          <span>SECTOR: COIMBATORE METRO (11.0168° N, 76.9558° E)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE TELEMETRY
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
            <path d="M 160,50 L 340,160 L 500,280 L 580,450" stroke="#334155" strokeWidth="2.5" />
            <path d="M 320,310 L 420,440 L 680,430 L 760,180" stroke="#1e293b" strokeWidth="2" />
            <path d="M 500,280 L 680,240 L 780,310" stroke="#1e293b" strokeWidth="1.5" />
          </g>

          {/* Flood Inundation Zone (Polygonal overlay) */}
          <polygon
            points="430,220 560,200 610,290 580,360 480,370 420,300"
            fill="url(#floodZoneGrad)"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeDasharray="6,3"
            className="animate-pulse"
          />
          <text x="490" y="325" fill="#38bdf8" fontSize="11" fontFamily="monospace" opacity="0.85" textAnchor="middle">
            FLOOD INUNDATION ZONE (1.2m DEPTH)
          </text>

          {/* Blocked Road Marker (Avinashi Subway) */}
          <g transform="translate(415, 290)">
            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="-12" y1="-8" x2="12" y2="8" stroke="#fecaca" strokeWidth="2" />
            <line x1="12" y1="-8" x2="-12" y2="8" stroke="#fecaca" strokeWidth="2" />
            <text x="24" y="4" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
              SUBWAY BLOCKED
            </text>
          </g>

          {/* ROUTE B (Alternative / Detour) */}
          {showRoutes && (highlightRoute === 'B' || highlightRoute === 'both') && (
            <g opacity={highlightRoute === 'B' ? 1 : 0.65}>
              <path
                d="M 220,390 C 260,470 420,480 620,420 C 710,380 730,280 750,220"
                fill="none"
                stroke="url(#routeBGlow)"
                strokeWidth={highlightRoute === 'B' ? 4.5 : 3}
                strokeDasharray="8,6"
              />
              <text x="480" y="475" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle">
                ROUTE B (TRICHY BYPASS - 5.6 KM, 16 MIN)
              </text>
            </g>
          )}

          {/* ROUTE A (Recommended Primary Corridor) */}
          {showRoutes && (highlightRoute === 'A' || highlightRoute === 'both') && (
            <g opacity={highlightRoute === 'A' ? 1 : 0.95}>
              {/* Pulsing neon path */}
              <path
                d="M 220,390 C 290,340 370,250 490,240 C 600,230 680,210 750,220"
                fill="none"
                stroke="#06b6d4"
                strokeWidth={highlightRoute === 'A' ? 6 : 4}
                strokeLinecap="round"
                strokeOpacity="0.3"
              />
              <path
                d="M 220,390 C 290,340 370,250 490,240 C 600,230 680,210 750,220"
                fill="none"
                stroke="url(#routeAGlow)"
                strokeWidth={highlightRoute === 'A' ? 3.5 : 2.5}
                strokeLinecap="round"
              />
              <text x="360" y="270" fill="#22d3ee" fontSize="11" fontFamily="monospace" fontWeight="bold">
                ✓ ROUTE A (RECOMMENDED ELEVATED CORRIDOR - 4.2 KM, 12 MIN)
              </text>
            </g>
          )}

          {/* UNIT 1: Rescue Team R-12 Marker */}
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
            <rect x="-36" y="20" width="72" height="18" rx="3" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
            <text x="0" y="32" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              RESCUE R-12
            </text>
          </g>

          {/* UNIT 2: Destination Hospital Marker (Kovai Medical Center) */}
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
            <rect x="-50" y="20" width="100" height="18" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="32" fill="#6ee7b7" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              KOVAI MEDICAL CTR
            </text>
          </g>

          {/* SECONDARY HOSPITAL (Government Hospital) */}
          <g transform="translate(680, 420)" opacity="0.8">
            <circle cx="0" cy="0" r="11" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <foreignObject x="-7" y="-7" width="14" height="14">
              <Building2 className="h-3.5 w-3.5 text-emerald-300" />
            </foreignObject>
            <text x="0" y="24" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">
              GOVT HOSPITAL (ALT)
            </text>
          </g>

          {/* PRIMARY INCIDENT MARKER (INC-1024 Coimbatore Flood) */}
          <g
            transform="translate(510, 260)"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPoint('incident')}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Expanding radar rings */}
            <circle cx="0" cy="0" r="28" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4" className="animate-ping" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="#f87171" strokeWidth="2" strokeOpacity="0.6" />
            <circle cx="0" cy="0" r="14" fill="#b91c1c" stroke="#fca5a5" strokeWidth="2" />
            <foreignObject x="-8" y="-8" width="16" height="16">
              <AlertTriangle className="h-4 w-4 text-white" />
            </foreignObject>
            <rect x="-42" y="-36" width="84" height="20" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="0" y="-22" fill="#fecaca" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              INC-1024 [CRITICAL]
            </text>
          </g>

          {/* SECONDARY ACTIVE INCIDENT (INC-1021 Pollachi) */}
          <g transform="translate(240, 160)" opacity="0.75">
            <circle cx="0" cy="0" r="8" fill="#d97706" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="0" y="18" fill="#fde68a" fontSize="8" fontFamily="monospace" textAnchor="middle">
              INC-1021 (Pollachi)
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
          <div className="absolute top-3 left-3 z-10 max-w-xs rounded-lg border border-slate-700 bg-slate-900/95 p-3 text-xs text-slate-200 shadow-xl backdrop-blur-md">
            {hoveredPoint === 'incident' && (
              <div>
                <p className="font-bold text-red-400">INC-1024: Coimbatore Flash Flood</p>
                <p className="text-slate-400 mt-1">Status: AI Analysis Complete | 120+ civilians at risk</p>
                <p className="text-cyan-400 text-[10px] mt-1 font-mono">11.0168° N, 76.9558° E</p>
              </div>
            )}
            {hoveredPoint === 'rescue' && (
              <div>
                <p className="font-bold text-blue-400">Rapid Rescue Team R-12</p>
                <p className="text-slate-400 mt-1">Status: Available | Equipped with Zodiac boat | ETA 12 min</p>
              </div>
            )}
            {hoveredPoint === 'hospital' && (
              <div>
                <p className="font-bold text-emerald-400">Kovai Medical Center (BEST MATCH)</p>
                <p className="text-slate-400 mt-1">Capacity: 72% | 28 Triage beds open | 18 ICU slots</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Legend (Bottom Bar) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/95 px-4 py-2.5 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Tactical Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-400/40" />
            <span className="text-slate-200">Incident Epicenter</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-blue-500 ring-2 ring-blue-400/40" />
            <span className="text-slate-200">Rescue Team</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-400/40" />
            <span className="text-slate-200">Designated Hospital</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-red-800 border border-red-500" />
            <span className="text-red-300">Blocked Road</span>
          </span>
          {showRoutes && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-5 rounded bg-cyan-400" />
                <span className="text-cyan-300">Route A (Recommended)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-5 rounded border-b-2 border-dashed border-amber-400" />
                <span className="text-amber-300">Route B (Alternative)</span>
              </span>
            </>
          )}
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Interactive Prototype Simulation Map
        </div>
      </div>
    </div>
  );
};
