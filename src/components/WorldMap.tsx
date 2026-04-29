import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "@vnedyalk0v/react19-simple-maps";
import { IntelReport } from "../services/intelService";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, Globe, Plus, Minus } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  reports: IntelReport[];
}

export const WorldMap: React.FC<WorldMapProps> = ({ reports }) => {
  const [selectedMarker, setSelectedMarker] = useState<IntelReport | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1 });

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-amber-500';
      default: return 'text-emerald-500';
    }
  };

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div className="w-full h-full bg-zinc-950 relative group min-h-[300px]">
      {/* HUD Elements */}
      <div className="absolute top-4 left-6 z-10 space-y-2 pointer-events-none">
        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest bg-zinc-900/90 px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          Geospatial Tactical Overlay v2.1
        </p>
        <div className="flex gap-2">
           {['SAT-LINK: ACTIVE', 'LAT/LNG: ' + position.coordinates[0].toFixed(2) + '/' + position.coordinates[1].toFixed(2)].map(t => (
             <span key={t} className="text-[8px] font-mono text-zinc-600 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800 uppercase">
               {t}
             </span>
           ))}
        </div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-zinc-400 hover:text-emerald-500 transition-all backdrop-blur-md"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-zinc-400 hover:text-emerald-500 transition-all backdrop-blur-md"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
      
      <ComposableMap
        projectionConfig={{
          scale: 200,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup 
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#09090b"
                  stroke="#18181b"
                  strokeWidth={0.5 / position.zoom}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#111114" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          
          {reports.map((report, i) => (
            <Marker key={i} coordinates={[report.lng, report.lat]}>
              <g 
                className="cursor-pointer"
                onClick={() => {
                  setSelectedMarker(report);
                  setPosition({ coordinates: [report.lng, report.lat], zoom: 4 });
                }}
              >
                <circle
                  r={selectedMarker?.title === report.title ? 12 / position.zoom : 8 / position.zoom}
                  fill={report.threatLevel === 'critical' ? '#ef4444' : '#10b981'}
                  className="animate-ping opacity-20 transition-all"
                />
                <circle
                  r={3 / position.zoom}
                  fill={report.threatLevel === 'critical' ? '#ef4444' : '#10b981'}
                />
                {position.zoom > 2 && (
                  <text
                    textAnchor="middle"
                    y={-10 / position.zoom}
                    style={{
                      fontFamily: "JetBrains Mono",
                      fontSize: `${6 / position.zoom}px`,
                      fontWeight: "bold",
                      fill: report.threatLevel === 'critical' ? '#ef4444' : '#10b981',
                      textTransform: "uppercase",
                      pointerEvents: "none",
                      filter: "drop-shadow(0 0 2px black)"
                    }}
                  >
                    {report.region}
                  </text>
                )}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 bottom-4 w-72 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl z-50 overflow-y-auto custom-scrollbar flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-1.5 rounded-lg border bg-zinc-950 ${getThreatColor(selectedMarker.threatLevel)} border-current opacity-50`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <button 
                onClick={() => setSelectedMarker(null)}
                className="p-1 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500 hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-1 block ${getThreatColor(selectedMarker.threatLevel)}`}>
                  {selectedMarker.threatLevel} PRIORITY
                </span>
                <h3 className="text-xl font-bold italic tracking-tighter text-zinc-100 uppercase uppercase-none leading-tight">
                  {selectedMarker.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                <Globe className="w-3 h-3" />
                {selectedMarker.region}
              </div>

              <p className="text-sm font-serif text-zinc-400 italic leading-relaxed border-l-2 border-zinc-800 pl-4 py-2">
                "{selectedMarker.summary}"
              </p>

              <div className="pt-4 border-t border-zinc-800">
                <p className="text-[9px] font-mono text-zinc-600 uppercase">Authenticated Source</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">{selectedMarker.source}</p>
              </div>
            </div>

            <button 
              className="w-full mt-6 py-2 bg-zinc-100 text-zinc-950 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-colors"
              onClick={() => setSelectedMarker(null)}
            >
              Acknowledge
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-6 flex items-center gap-4 text-[8px] font-mono uppercase text-zinc-500 bg-zinc-950/80 px-3 py-1.5 rounded-full border border-zinc-800 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> Safe Zone
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" /> Kinetic Event
        </div>
        <div className="w-px h-2 bg-zinc-800 mx-1" />
        <span className="animate-pulse">Live Uplink Est.</span>
      </div>
    </div>
  );
};
