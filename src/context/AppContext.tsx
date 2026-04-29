import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserProgress, Scenario } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  progress: UserProgress;
  addProgress: (scenarioId: string, score: number) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  customScenarios: Scenario[];
  addCustomScenario: (scenario: Scenario) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);
  const [progress, setProgress] = useState<UserProgress>({
    scenariosCompleted: [],
    badges: [],
    leaderboardRank: 154,
    scores: {},
    results: {}
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addCustomScenario = (scenario: Scenario) => {
    setCustomScenarios(prev => [...prev, scenario]);
  };

  const addProgress = (scenarioId: string, score: number) => {
    setProgress(prev => {
      const isNew = !prev.scenariosCompleted.includes(scenarioId);
      return {
        ...prev,
        scenariosCompleted: isNew ? [...prev.scenariosCompleted, scenarioId] : prev.scenariosCompleted,
        scores: { ...prev.scores, [scenarioId]: Math.max(score, prev.scores[scenarioId] || 0) },
        badges: isNew && prev.scenariosCompleted.length + 1 >= 3 ? [...prev.badges, 'Veteran Strategist'] : prev.badges
      };
    });
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, theme, toggleTheme, progress, addProgress,
      isSidebarOpen, toggleSidebar, closeSidebar,
      customScenarios, addCustomScenario
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
