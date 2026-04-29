import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Swords, BookOpen, Trophy, Settings, Share2, PlusCircle, Zap, Drone, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar: React.FC = () => {
  const { language, isSidebarOpen, closeSidebar } = useAppContext();

  const labels = {
    dashboard: { pt: 'Dashboard', en: 'Dashboard' },
    simulations: { pt: 'Simulações', en: 'Simulations' },
    caseStudies: { pt: 'Estudos de Caso', en: 'Case Studies' },
    leaderboard: { pt: 'Ranking', en: 'Leaderboard' },
    settings: { pt: 'Configurações', en: 'Settings' },
    create: { pt: 'Criar Cenário', en: 'Create Scenario' },
    tutorial: { pt: 'Introdução', en: 'Introduction' },
    intel: { pt: 'Inteligência', en: 'Intelligence' }
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: labels.dashboard[language] },
    { to: '/tutorial', icon: BookOpen, label: labels.tutorial[language] },
    { to: '/simulations', icon: Swords, label: labels.simulations[language] },
    { to: '/intel', icon: Zap, label: labels.intel[language] },
    { to: '/create', icon: PlusCircle, label: labels.create[language] },
    { to: '/case-studies', icon: BookOpen, label: labels.caseStudies[language] },
    { to: '/leaderboard', icon: Trophy, label: labels.leaderboard[language] },
    { to: '/settings', icon: Settings, label: labels.settings[language] },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" 
          onClick={closeSidebar}
        />
      )}

      <aside className={cn(
        "w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col h-screen fixed left-0 top-0 z-[70] transition-transform duration-300 lg:translate-x-0 translate-y-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tighter text-red-500 uppercase flex items-center gap-2 leading-none">
              <Drone className="w-5 h-5 shrink-0" />
              Predictive Warfare
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1 font-mono">
              Global Ops v1.0
            </p>
          </div>
          <button onClick={closeSidebar} className="lg:hidden p-2 text-zinc-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all group",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="flex items-center gap-2 w-full px-3 py-2 text-zinc-500 hover:text-zinc-300 text-xs font-mono uppercase tracking-tight">
            <Share2 className="w-4 h-4" />
            {language === 'pt' ? 'Compartilhar Cenário' : 'Share Scenario'}
          </button>
        </div>
      </aside>
    </>
  );
};
