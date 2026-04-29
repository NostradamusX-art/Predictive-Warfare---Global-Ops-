import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Swords, ArrowLeft, BrainCircuit, Loader2, AlertCircle, TrendingUp, Shield, BarChart3, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SCENARIOS } from '../constants';
import { Choice, ScenarioStep, SimulationResult } from '../types';
import { getAIConsequenceAnalysis, generateNextWargameStep } from '../services/geminiService';

export const Simulator: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, addProgress, customScenarios } = useAppContext();
  
  const scenario = SCENARIOS.find(s => s.id === id) || customScenarios.find(s => s.id === id);
  const [currentStep, setCurrentStep] = useState<ScenarioStep | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [history, setHistory] = useState<{ description: string; choice: string }[]>([]);
  const [stats, setStats] = useState({ stability: 80, economy: 80, military: 80, diplomacy: 80 });
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [loadingStep, setLoadingStep] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const maxSteps = scenario?.maxSteps || 30;

  useEffect(() => {
    if (scenario) {
      loadInitialStep();
    }
  }, [scenario]);

  const loadInitialStep = async () => {
    if (!scenario) return;
    setLoadingStep(true);
    // For the very first step, we can either use a static one or generate it
    const firstStep = await generateNextWargameStep(scenario, [], 0, language);
    setCurrentStep(firstStep);
    setLoadingStep(false);
  };

  const handleChoice = async (choice: Choice) => {
    // Update stats
    setStats(prev => ({
      stability: Math.min(100, Math.max(0, prev.stability + (choice.impact?.stability || 0))),
      economy: Math.min(100, Math.max(0, prev.economy + (choice.impact?.economy || 0))),
      military: Math.min(100, Math.max(0, prev.military + (choice.impact?.military || 0))),
      diplomacy: Math.min(100, Math.max(0, prev.diplomacy + (choice.impact?.diplomacy || 0))),
    }));

    const newHistory = [...history, { description: currentStep?.description[language] || '', choice: choice.label[language] }];
    setHistory(newHistory);

    if (stepIndex + 1 >= maxSteps) {
      calculateFinalResult();
    } else {
      setStepIndex(prev => prev + 1);
      setLoadingStep(true);
      const nextStep = await generateNextWargameStep(scenario!, newHistory, stepIndex + 1, language);
      setCurrentStep(nextStep);
      setLoadingStep(false);
    }
  };

  const calculateFinalResult = () => {
    const avg = (stats.stability + stats.economy + stats.military + stats.diplomacy) / 4;
    let grade: SimulationResult['grade'] = 'F';
    if (avg > 90) grade = 'A+';
    else if (avg > 80) grade = 'A';
    else if (avg > 70) grade = 'B';
    else if (avg > 60) grade = 'C';
    else if (avg > 40) grade = 'D';

    const finalResult: SimulationResult = {
      score: Math.round(avg * 10),
      grade,
      impacts: stats
    };
    
    setResult(finalResult);
    addProgress(scenario!.id, finalResult.score);
  };

  const analyzeChoice = async (choice: Choice, index: number) => {
    if (!currentStep) return;
    const key = `${stepIndex}-${index}`;
    if (aiAnalysis[key]) return;

    setIsAnalyzing(key);
    const analysis = await getAIConsequenceAnalysis(
      scenario!.title[language],
      currentStep.description[language],
      choice,
      language
    );
    setAiAnalysis(prev => ({ ...prev, [key]: analysis }));
    setIsAnalyzing(null);
  };

  if (!scenario) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                Live Simulation Phase: {stepIndex + 1}/{maxSteps}
              </span>
            </div>
            <h2 className="text-2xl font-bold italic tracking-tight">{scenario.title[language]}</h2>
          </div>
        </div>
        
        <div className="w-full md:w-64 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
           <motion.div 
            className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${((stepIndex + 1) / maxSteps) * 100}%` }}
           />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 bg-zinc-900 border-2 border-red-900/30 rounded-3xl text-center space-y-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <span className="text-4xl font-black text-red-500">{result.grade}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic">
                      {language === 'pt' ? 'Missão Concluída' : 'Mission Accomplished'}
                    </h3>
                    <p className="text-zinc-500 font-mono text-sm mt-2">
                       {result.score >= 900 
                        ? (language === 'pt' ? 'Performance Excepcional! Próxima fase desbloqueada.' : 'Exceptional Performance! Next phase unlocked.')
                        : (language === 'pt' ? 'Necessário 90% de êxito para avançar na campanha.' : '90% success rate required to advance campaign.')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(result.impacts).map(([key, val]) => (
                      <div key={key} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase">{key}</p>
                        <p className={`text-xl font-bold ${(val as number) > 50 ? 'text-zinc-200' : 'text-red-400'}`}>{val}%</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <button
                      onClick={() => navigate('/')}
                      className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_5px_0_rgb(153,27,27)] active:translate-y-[2px] active:shadow-none"
                    >
                      {language === 'pt' ? 'Arquivar Relatório' : 'Archive Report'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : loadingStep ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[400px] flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-zinc-800 rounded-3xl"
              >
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                  <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20" />
                </div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-[0.3em] animate-pulse">
                  {language === 'pt' ? 'Calculando Próxima Variável...' : 'Calculating Next Variable...'}
                </p>
              </motion.div>
            ) : currentStep && (
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                     <Globe className="w-32 h-32 text-white" />
                  </div>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-100 italic relative z-10">
                    "{currentStep.description[language]}"
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentStep.choices.map((choice, i) => (
                    <div key={i} className="group relative">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleChoice(choice)}
                          className="flex-1 text-left p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-red-500/50 hover:bg-zinc-800/50 transition-all flex items-center justify-between"
                        >
                          <span className="text-lg font-semibold pr-4">{choice.label[language]}</span>
                          <Swords className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                        </button>
                        <button
                          onClick={() => analyzeChoice(choice, i)}
                          className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:text-red-400 hover:border-red-500/30 transition-all"
                          title="Predictive AI Analysis"
                        >
                          <BrainCircuit className="w-6 h-6" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {isAnalyzing === `${stepIndex}-${i}` && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 p-3 bg-red-950/20 border border-red-900/30 rounded-xl flex items-center gap-3 text-[10px] uppercase font-mono text-red-400"
                          >
                            <Loader2 className="w-3 h-3 animate-spin" />
                            {language === 'pt' ? 'ANALISANDO PROJEÇÕES...' : 'ANALYZING PROJECTIONS...'}
                          </motion.div>
                        )}

                        {aiAnalysis[`${stepIndex}-${i}`] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm italic text-zinc-400 font-serif leading-relaxed"
                          >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1 bg-red-500/20 rounded">
                                    <BrainCircuit className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">
                                    {language === 'pt' ? 'Conselhiero de IA' : 'AI Strategic Advisor'}
                                </span>
                            </div>
                            {aiAnalysis[`${stepIndex}-${i}`]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-8">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 border-b border-zinc-800 pb-2">
              National Vitals
            </h4>
            
            <div className="space-y-6">
              {[
                { label: { pt: 'Estabilização', en: 'Stability' }, value: stats.stability, icon: Shield },
                { label: { pt: 'Economia', en: 'Economy' }, value: stats.economy, icon: BarChart3 },
                { label: { pt: 'Militar', en: 'Military' }, value: stats.military, icon: Swords },
                { label: { pt: 'Diplomacia', en: 'Diplomacy' }, value: stats.diplomacy, icon: Globe },
              ].map(stat => (
                <div key={stat.label.en} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <stat.icon className="w-4 h-4 text-zinc-600" />
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">{stat.label[language]}</span>
                    </div>
                    <span className={`text-sm font-mono font-bold ${stat.value < 30 ? 'text-red-500' : 'text-zinc-200'}`}>
                      {stat.value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      className={`h-full ${stat.value < 30 ? 'bg-red-500' : 'bg-red-900/50'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
             <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 mb-4">TACTICAL_LOG</h4>
             <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
               {history.slice().reverse().map((h, i) => (
                 <div key={i} className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg space-y-1">
                   <p className="text-[9px] font-mono text-zinc-600">S_STEP_{history.length - i}</p>
                   <p className="text-[11px] text-zinc-400 italic line-clamp-2">"{h.choice}"</p>
                 </div>
               ))}
               <div className="flex items-center gap-2 text-red-500/50 text-[10px] font-mono uppercase">
                  <span className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                  Waiting_for_input...
               </div>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
