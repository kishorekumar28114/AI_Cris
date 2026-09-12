import React from 'react';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  Phone, 
  HeartPulse
} from 'lucide-react';
import { useCrisis } from '../../context/CrisisContext';

export const HospitalsView: React.FC = () => {
  const { hospitals } = useCrisis();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              HEALTHCARE TRIAGE ADVISORY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Regional Trauma & ICU Capacity Engine
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
            Hospital Recommendation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time emergency bed telemetry, hypothermia treatment readiness, and transit time optimization.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Hospital Beds Telemetry Live</span>
        </div>
      </div>

      {/* HOSPITAL COMPARISON CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hospitals.map((hospital) => {
          const isBestMatch = hospital.recommendation === 'BEST MATCH';

          return (
            <div
              key={hospital.id}
              className={`rounded-2xl p-6 transition-all relative overflow-hidden flex flex-col justify-between ${
                isBestMatch
                  ? 'border-2 border-emerald-500/60 bg-slate-900/95 shadow-2xl shadow-emerald-950/20'
                  : 'border border-slate-800 bg-slate-900/70 shadow-xl'
              }`}
            >
              {/* Highlight badge for Best Match */}
              {isBestMatch && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-600 px-4 py-1 rounded-bl-xl text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>AI BEST MATCH</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className={`h-5 w-5 ${isBestMatch ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <h3 className="text-lg font-extrabold text-white">
                    {hospital.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 mb-4 flex items-center gap-1.5 font-mono">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{hospital.locationArea}</span>
                </p>

                {/* Capacity Progress Bar */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-5">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-slate-400">Total Bed Occupancy:</span>
                    <span className={`font-bold ${hospital.capacityPercent > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {hospital.capacityPercent}% ({hospital.availableBeds} Available)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        hospital.capacityPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${hospital.capacityPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                    <span>{hospital.totalBeds - hospital.availableBeds} Occupied</span>
                    <span>{hospital.totalBeds} Capacity Limit</span>
                  </div>
                </div>

                {/* Telemetry Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs mb-5">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Emergency</span>
                    <span className={`font-bold ${hospital.emergency === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {hospital.emergency}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">ICU Bay</span>
                    <span className={`font-bold ${hospital.icu === 'Available' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {hospital.icu}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Distance</span>
                    <span className="font-bold text-slate-200">{hospital.distanceKm} km</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Transit ETA</span>
                    <span className="font-bold text-cyan-400">{hospital.travelMinutes} min</span>
                  </div>
                </div>

                {/* Facility attributes */}
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
                    <span className="text-slate-400">Trauma Classification:</span>
                    <span className="text-slate-200 font-semibold">{hospital.traumaLevel}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800 font-mono">
                    <span className="text-slate-400">Emergency Desk Line:</span>
                    <span className="text-cyan-400 flex items-center gap-1 font-mono">
                      <Phone className="h-3 w-3" />
                      {hospital.contact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation Justification Box */}
              <div className={`p-3.5 rounded-xl border text-xs mt-2 ${
                isBestMatch
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-center gap-1.5 font-bold font-mono mb-1">
                  <HeartPulse className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Agent Triage Recommendation</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  {isBestMatch
                    ? 'Selected as primary triage destination due to 28 open emergency beds, unconstrained Level 1 trauma facilities, and 14-minute direct transit via Route A.'
                    : 'Designated secondary reserve hospital. Current occupancy at 88% and ICU beds restricted to extreme priority triage only.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
