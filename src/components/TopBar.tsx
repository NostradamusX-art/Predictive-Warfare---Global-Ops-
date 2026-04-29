import React from 'react';
import { Sun, Moon, Globe, User, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, progress, toggleSidebar } = useAppContext();

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest">
            System Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-xs md:text-sm font-mono"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden xs:inline">{language.toUpperCase()}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-zinc-800">
          <div className="text-right hidden xs:block">
            <p className="text-xs font-bold text-zinc-100">Sebastian</p>
            <p className="text-[10px] text-zinc-500 font-mono">Rank #{progress.leaderboardRank}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-zinc-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
