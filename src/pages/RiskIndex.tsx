import React, { useState } from 'react';
import { ShieldAlert, TrendingUp, TrendingDown, Search, Filter, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

interface CountryRisk {
  name: { pt: string, en: string };
  code: string;
  riskScore: number; // 0-100
  trend: 'stable' | 'rising' | 'falling';
  stability: number;
  economy: number;
  military: number;
  diplomacy: number;
}

const COUNTRY_DATA: CountryRisk[] = [
  { name: { pt: 'Ucrânia', en: 'Ukraine' }, code: 'UA', riskScore: 94, trend: 'stable', stability: 12, economy: 20, military: 98, diplomacy: 45 },
  { name: { pt: 'Taiwan', en: 'Taiwan' }, code: 'TW', riskScore: 82, trend: 'rising', stability: 85, economy: 92, military: 88, diplomacy: 30 },
  { name: { pt: 'Israel', en: 'Israel' }, code: 'IL', riskScore: 88, trend: 'stable', stability: 40, economy: 75, military: 95, diplomacy: 50 },
  { name: { pt: 'Coreia do Norte', en: 'North Korea' }, code: 'KP', riskScore: 78, trend: 'rising', stability: 90, economy: 15, military: 92, diplomacy: 5 },
  { name: { pt: 'Irã', en: 'Iran' }, code: 'IR', riskScore: 75, trend: 'stable', stability: 65, economy: 40, military: 80, diplomacy: 25 },
  { name: { pt: 'Venezuela', en: 'Venezuela' }, code: 'VE', riskScore: 68, trend: 'falling', stability: 30, economy: 10, military: 40, diplomacy: 20 },
  { name: { pt: 'Sérvia', en: 'Serbia' }, code: 'RS', riskScore: 55, trend: 'rising', stability: 70, economy: 55, military: 50, diplomacy: 60 },
  { name: { pt: 'Sudão', en: 'Sudan' }, code: 'SD', riskScore: 92, trend: 'rising', stability: 5, economy: 8, military: 85, diplomacy: 10 },
];

export const RiskIndex: React.FC = () => {
  const { language } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = COUNTRY_DATA
    .filter(c => c.name[language].toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.riskScore - a.riskScore);

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 70) return 'text-orange-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getRiskBg = (score: number) => {
    if (score >= 90) return 'bg-red-500/10 border-red-500/20';
    if (score >= 70) return 'bg-orange-500/10 border-orange-500/20';
    if (score >= 50) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold">
              Global Risk Assessment Registry
            </span>
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter text-zinc-100 uppercase leading-none">
            {language === 'pt' ? 'Índice de Risco Soberano' : 'Sovereign Risk Index'}
          </h2>
          <p className="text-zinc-500 font-mono text-xs mt-2 max-w-xl italic">
            {language === 'pt' 
              ? 'Classificação dinâmica de ameaças baseada em variáveis militares, econômicas e estabilidade social.' 
              : 'Dynamic threat classification based on military, economic, and social stability variables.'}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text"
            placeholder={language === 'pt' ? 'Filtrar por país...' : 'Filter by country...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-red-500/50 outline-none transition-all placeholder:text-zinc-700 font-mono"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {filteredCountries.map((country, i) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col md:flex-row items-center gap-6 p-6 border rounded-2xl transition-all hover:translate-x-1 group ${getRiskBg(country.riskScore)}`}
          >
            <div className="flex items-center gap-6 md:w-1/4 shrink-0">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center font-mono font-bold text-zinc-500 group-hover:text-zinc-200 transition-colors">
                {country.code}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 uppercase italic tracking-tighter leading-tight">
                  {country.name[language]}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {country.trend === 'rising' ? (
                    <TrendingUp className="w-3 h-3 text-red-500" />
                  ) : country.trend === 'falling' ? (
                    <TrendingDown className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Globe className="w-3 h-3 text-zinc-500" />
                  )}
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{country.trend}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { label: 'Stability', val: country.stability },
                { label: 'Economy', val: country.economy },
                { label: 'Military', val: country.military },
                { label: 'Diplomacy', val: country.diplomacy },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1">{stat.label}</p>
                  <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                    <div 
                      className={`h-full transition-all duration-1000 ${stat.val < 30 ? 'bg-red-500' : stat.val < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${stat.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="md:w-32 text-center md:text-right shrink-0">
               <p className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Index Core</p>
               <p className={`text-3xl font-black italic italic tracking-tighter ${getRiskColor(country.riskScore)}`}>
                 {country.riskScore}.0
               </p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-12 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5 text-red-500" />
        </div>
        <div>
           <h4 className="text-sm font-bold uppercase tracking-tight text-zinc-300">
             {language === 'pt' ? 'Metodologia de Risco' : 'Risk Methodology'}
           </h4>
           <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-4xl">
             {language === 'pt' 
               ? 'O Índice de Risco é calculado através da análise de fluxo de dados OSINT em tempo real, considerando a concentração de eventos cinéticos, disparidade econômica e instabilidade do regime. Níveis acima de 80.0 indicam "Ponto de Ruptura Crítico".' 
               : 'The Risk Index is calculated by analyzing real-time OSINT data flows, considering kinetic event concentration, economic disparity, and regime instability. Levels above 80.0 indicate a "Critical Breaking Point".'}
           </p>
        </div>
      </footer>
    </div>
  );
};
