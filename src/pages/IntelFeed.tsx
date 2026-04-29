import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, RefreshCcw, ShieldAlert, Globe, ExternalLink, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { fetchRealTimeIntel, IntelReport } from '../services/intelService';
import { WorldMap } from '../components/WorldMap';

export const IntelFeed: React.FC = () => {
  const { language } = useAppContext();
  const [reports, setReports] = useState<IntelReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadIntel = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRealTimeIntel(language);
      if (data.length === 0) {
        setError(language === 'pt' ? 'Falha ao recuperar dados da inteligência. Verifique a conexão com o satélite.' : 'Failed to retrieve intelligence data. Check satellite connection.');
      }
      setReports(data);
    } catch (err) {
      console.error(err);
      setError(language === 'pt' ? 'Erro Crítico: Conexão com a rede Gemini falhou.' : 'Critical Error: Gemini network connection failed.');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    loadIntel();
  }, [language]);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-500 border-red-900 bg-red-950/20';
      case 'high': return 'text-orange-500 border-orange-900 bg-orange-950/20';
      case 'medium': return 'text-amber-500 border-amber-900 bg-amber-950/20';
      default: return 'text-blue-500 border-blue-900 bg-blue-950/20';
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter text-zinc-100 uppercase leading-none">
              {language === 'pt' ? 'Rede Global OSINT' : 'Global OSINT Network'}
            </h2>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-[0.2em] animate-pulse">
                Uplink: Active_0.0.0.0
              </span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                Nodes: [2,492] Online
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-mono text-zinc-600 uppercase">Packet Sync</p>
            <p className="text-xs font-mono text-zinc-400 uppercase">{lastUpdated.toLocaleTimeString()}</p>
          </div>
          <button 
            onClick={loadIntel}
            disabled={loading}
            className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-500 transition-all disabled:opacity-50 group"
          >
            <RefreshCcw className={`w-5 h-5 transition-transform group-hover:rotate-180 duration-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6">
        {/* Tactical Map Container */}
        <div className="md:w-3/5 h-full relative border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950">
          <WorldMap reports={reports} />
        </div>

        {/* Intelligence Feed Container */}
        <aside className="md:w-2/5 flex flex-col gap-4 min-h-0">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
               {language === 'pt' ? 'Fluxo de Dados' : 'Live Data Stream'}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase">Live</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin opacity-50" />
                <p className="text-[9px] font-mono text-zinc-600 animate-pulse uppercase tracking-[0.2em]">Intercepting Packets...</p>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 bg-red-500/5 border border-red-900/20 rounded-2xl p-6 text-center">
                <ShieldAlert className="w-10 h-10 text-red-500 opacity-50" />
                <p className="text-red-400 font-bold uppercase tracking-widest text-[10px]">{error}</p>
                <button onClick={loadIntel} className="text-[9px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border border-zinc-800 px-4 py-2 rounded-lg">
                  Reconnect
                </button>
              </div>
            ) : reports.length > 0 ? (
              reports.map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-emerald-500/30 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${getThreatColor(report.threatLevel)}`}>
                        {report.threatLevel}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-600 uppercase">
                        {report.region}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors leading-tight uppercase">
                      {report.title}
                    </h3>

                    <p className="text-[11px] text-zinc-500 leading-relaxed font-serif italic line-clamp-2">
                       "{report.summary}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
                      <span className="text-[8px] font-mono text-zinc-600 uppercase">SRC_AUTH: {report.source}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-700 group-hover:text-emerald-500" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
                <ShieldAlert className="w-8 h-8 text-zinc-800 mx-auto mb-2" />
                <p className="text-[10px] font-mono text-zinc-700 uppercase">Zero Threats Cataloged</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-2 shrink-0">
             <div className="flex items-center gap-2">
               <Globe className="w-3 h-3 text-zinc-600" />
               <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">System Advisory</p>
             </div>
             <p className="text-[10px] text-zinc-500 leading-tight italic">
                {language === 'pt' ? 'Use dados OSINT para antecipar crises globais.' : 'Leverage OSINT data to preempt global crises.'}
             </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
