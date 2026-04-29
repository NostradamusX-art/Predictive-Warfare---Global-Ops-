export type Language = 'pt' | 'en';

export interface ScenarioStep {
  id: string;
  description: Record<Language, string>;
  image?: string;
  choices: Choice[];
}

export interface Choice {
  label: Record<Language, string>;
  consequence: Record<Language, string>;
  nextStepId?: string; // If null, scenario ends
  impact: {
    stability: number;
    economy: number;
    military: number;
    diplomacy: number;
  };
}

export interface Scenario {
  id: string;
  title: Record<Language, string>;
  category: string;
  difficulty: string | number;
  description: Record<Language, string>;
  steps?: Record<string, ScenarioStep>;
  initialStepId?: string;
  maxSteps?: number;
}

export interface CaseStudy {
  id: string;
  title: Record<Language, string>;
  summary: Record<Language, string>;
  analysis: Record<Language, string>;
  date: string;
}

export interface SimulationResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  impacts: {
    stability: number;
    economy: number;
    military: number;
    diplomacy: number;
  };
}

export interface UserProgress {
  scenariosCompleted: string[];
  badges: string[];
  leaderboardRank: number;
  scores: Record<string, number>;
  results: Record<string, SimulationResult>;
}
