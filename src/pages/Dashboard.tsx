import React from 'react';
import { motion } from 'motion/react';
import { Swords, Users, TrendingUp, AlertTriangle, ChevronRight, HelpCircle, Drone, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CASE_STUDIES, SCENARIOS } from '../constants';
import { Link } from 'react-router-dom';
import { BookOpen, ExternalLink } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { language, progress, customScenarios } = useAppContext();

  const allScenarios = [...SCENARIOS, ...customScenarios];

  const stats = [
    { label: { pt: 'Estabilidade', en: 'Stability' }, value: '84%', icon: Users, color: 'text-blue-500' },
    { label: { pt: 'Economia', en: 'Economy' }, value: '-2.4%', icon: TrendingUp, color: 'text-red-500' },
    { label: { pt: 'Poder Militar', en: 'Military Power' }, value: '92/100', icon: Drone, color: 'text-red-500' },
    { label: { pt: 'Risco de Crise', en: 'Crisis Risk' }, value: 'MÉDIO', valueEn: 'MEDIUM', icon: AlertTriangle, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 italic">
          {language === 'pt' ? 'Centro de Comando' : 'Command Center'}
        </h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">
          {language === 'pt' ? 'Acompanhamento estratégico em tempo real.' : 'Real-time strategic monitoring.'}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link
            key={i}
            to="/risk-index"
            target="_blank"
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-between group hover:border-red-500/30 transition-all hover:bg-zinc-900 cursor-pointer h-full"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  {stat.label[language]}
                </p>
                <p className={stat.color + " text-2xl font-bold font-mono tracking-tighter"}>
                  {language === 'en' && stat.valueEn ? stat.valueEn : stat.value}
                </p>
              </div>
              <stat.icon className={stat.color + " w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity"} />
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <HelpCircle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h4 className="font-bold text-red-500 uppercase tracking-tight">
              {language === 'pt' ? 'Novo por aqui?' : 'New here?'}
            </h4>
            <p className="text-zinc-400 text-sm">
              {language === 'pt' ? 'Entenda os fundamentos dos Wargames e como dominamos a Geopolítica.' : 'Understand the fundamentals of Wargames and how we master Geopolitics.'}
            </p>
          </div>
        </div>
        <Link to="/tutorial" className="px-6 py-2 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-400 transition-all">
          {language === 'pt' ? 'Ver Tutorial' : 'View Tutorial'}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Scenarios */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Swords className="w-5 h-5 text-red-500" />
              {language === 'pt' ? 'Simulações Disponíveis' : 'Available Simulations'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allScenarios.map((scenario, index) => {
              // Custom scenarios are always unlocked
              const isCustom = scenario.id.startsWith('custom-');
              const prevScenario = index > 0 ? allScenarios[index - 1] : null;
              // Unlock if first scenario OR previous scenario has score >= 900 OR it's custom
              const isUnlocked = isCustom || index === 0 || (progress.scores[prevScenario?.id || ''] >= 900);
              const score = progress.scores[scenario.id];

              const content = (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className={
                      `text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ` +
                      (scenario.difficulty >= 4 || scenario.difficulty === 'hard' ? 'text-red-500 border-red-900/50' : 
                       scenario.difficulty >= 3 || scenario.difficulty === 'medium' ? 'text-amber-500 border-amber-900/50' : 
                       'text-emerald-500 border-emerald-900/50')
                    }>
                      {isCustom ? `LVL ${scenario.difficulty}` : scenario.difficulty}
                    </span>
                    <div className="flex gap-2">
                      {isCustom && (
                        <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          USER_DRAFT
                        </span>
                      )}
                      {score && (
                        <span className="text-[10px] font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                          SCORE: {score}
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors uppercase italic tracking-tighter">
                    {scenario.title[language]}
                  </h4>
                  <p className="text-zinc-500 text-xs mb-6 flex-1 line-clamp-3">
                    {scenario.description[language]}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase">
                      ID: {scenario.id.split('-').map(s => s[0]).join('')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-red-500 transition-all translate-x-0 group-hover:translate-x-1" />
                  </div>
                </div>
              );

              if (!isUnlocked) {
                return (
                  <div 
                    key={scenario.id} 
                    className="relative p-6 bg-zinc-950 border border-zinc-900 rounded-2xl opacity-40 grayscale pointer-events-none"
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg flex items-center gap-2 shadow-2xl scale-75">
                        <Lock className="w-4 h-4 text-red-500" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                          {language === 'pt' ? 'Bloqueado' : 'Locked'}
                        </span>
                      </div>
                    </div>
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={scenario.id}
                  to={`/simulator/${scenario.id}`}
                  className="group p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-red-500/50 transition-all relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-0 group-hover:opacity-5 transition-opacity">
                    <Drone className="w-24 h-24 text-white" />
                  </div>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        {/* User Badges & Progress */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-zinc-200">
            {language === 'pt' ? 'Conquistas' : 'Achievements'}
          </h3>
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-6">
            <div className="flex flex-wrap gap-4">
              {progress.badges.length > 0 ? progress.badges.map(badge => (
                <div key={badge} className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center" title={badge}>
                   <Drone className="w-6 h-6 text-red-500" />
                </div>
              )) : (
                <div className="w-full h-24 border border-dashed border-zinc-800 flex items-center justify-center">
                  <p className="text-zinc-600 text-xs text-center px-4 italic">
                    {language === 'pt' ? 'Complete simulações para ganhar medalhas.' : 'Complete simulations to earn badges.'}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
                {language === 'pt' ? 'Histórico de Treinamento' : 'Training History'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{language === 'pt' ? 'Concluídos' : 'Completed'}</span>
                  <span className="font-mono">{progress.scenariosCompleted.length} / {SCENARIOS.length}</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-1000" 
                    style={{ width: `${(progress.scenariosCompleted.length / SCENARIOS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-2xl space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookOpen className="w-16 h-16" />
            </div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-red-500 font-bold">
               {language === 'pt' ? 'Arquivos Estratégicos Recentes' : 'Recent Strategic Archives'}
            </h4>
            <div className="space-y-4">
              {CASE_STUDIES.slice(0, 3).map(study => (
                <Link 
                  key={study.id} 
                  to={`/case-study/${study.id}`}
                  target="_blank"
                  className="block p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                >
                  <p className="text-[9px] font-mono text-zinc-600 uppercase mb-1">{study.date}</p>
                  <h5 className="text-sm font-bold text-zinc-300 flex items-center justify-between">
                    {study.title[language]}
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                  </h5>
                </Link>
              ))}
            </div>
            <Link 
              to="/case-studies" 
              className="block text-center text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest pt-2"
            >
              {language === 'pt' ? 'Ver Biblioteca Completa' : 'View Full Library'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
