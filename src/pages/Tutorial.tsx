import React from 'react';
import { motion } from 'motion/react';
import { Info, Target, Cpu, Book, HelpCircle, ChevronRight, Swords } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Tutorial: React.FC = () => {
  const { language } = useAppContext();

  const sections = [
    {
      icon: Target,
      title: { pt: 'O que são Wargames?', en: 'What are Wargames?' },
      content: {
        pt: 'Originalmente desenvolvidos pela Prússia (Kriegsspiel), os jogos de guerra são simulações usadas por militares e diplomatas para testar estratégias em cenários hipotéticos sem os riscos do mundo real.',
        en: 'Originally developed by Prussia (Kriegsspiel), wargames are simulations used by military and diplomats to test strategies in hypothetical scenarios without real-world risks.'
      }
    },
    {
      icon: Cpu,
      title: { pt: 'Teoria dos Jogos', en: 'Game Theory' },
      content: {
        pt: 'É o estudo matemático da tomada de decisão estratégica. Aqui, você aprenderá a antecipar os movimentos de outros atores (nações, grupos ou corporações) e entender o equilíbrio entre cooperação e conflito.',
        en: 'It is the mathematical study of strategic decision-making. Here, you will learn to anticipate the moves of other actors (nations, groups, or corporations) and understand the balance between cooperation and conflict.'
      }
    }
  ];

  const steps = [
    {
      id: '1',
      title: { pt: 'Escolha um Cenário', en: 'Choose a Scenario' },
      desc: { pt: 'Navegue pelas simulações disponíveis e selecione uma que se alinhe aos seus objetivos de estudo.', en: 'Browse available simulations and select one that aligns with your study goals.' }
    },
    {
      id: '2',
      title: { pt: 'Analise e Decida', en: 'Analyze and Decide' },
      desc: { pt: 'Cada etapa apresenta um dilema. Use os dados de estabilidade, economia e poder militar para fundamentar sua escolha.', en: 'Each step presents a dilemma. Use stability, economy, and military power data to justify your choice.' }
    },
    {
      id: '3',
      title: { pt: 'Consulte a IA', en: 'Consult the AI' },
      desc: { pt: 'Use o botão de "Análise de IA" em cada opção para ver projeções baseadas em modelos geopolíticos reais.', en: 'Use the "AI Analysis" button on each option to see projections based on real geopolitical models.' }
    },
    {
      id: '4',
      title: { pt: 'Ranking Global', en: 'Global Ranking' },
      desc: { pt: 'Suas decisões geram pontuações. Suba no ranking ao demonstrar equilíbrio entre força e diplomacia.', en: 'Your decisions generate scores. Climb the ranking by demonstrating balance between force and diplomacy.' }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <HelpCircle className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">{language === 'pt' ? 'Manual do Estrategista' : 'Strategist Manual'}</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight italic">
          {language === 'pt' ? 'Introdução à Estratégia' : 'Introduction to Strategy'}
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, i) => (
            <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 md:p-8 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4"
          >
            <section.icon className="w-8 h-8 text-emerald-500" />
            <h3 className="text-xl font-bold uppercase tracking-tight italic">{section.title[language]}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{section.content[language]}</p>
          </motion.div>
        ))}
      </div>

      <section className="space-y-6">
        <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Book className="w-5 h-5 text-emerald-500" />
          {language === 'pt' ? 'Guia de Uso' : 'User Guide'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl relative overflow-hidden group">
              <span className="absolute -right-2 -bottom-4 text-6xl font-black text-zinc-800/20 italic group-hover:text-emerald-500/10 transition-colors">
                {step.id}
              </span>
              <h4 className="text-emerald-500 font-bold mb-2">{step.title[language]}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed relative z-10">{step.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-8 border-t border-zinc-900 flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-3 bg-zinc-100 text-zinc-950 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
        >
          {language === 'pt' ? 'Iniciar Treinamento' : 'Start Training'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
