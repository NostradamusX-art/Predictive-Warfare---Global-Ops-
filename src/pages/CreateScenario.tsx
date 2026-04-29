import React, { useState } from 'react';
import { Plus, Save, AlertCircle, Info, Sparkles, Send, Loader2, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { generateScenarioDraft } from '../services/geminiService';
import { Scenario } from '../types';

export const CreateScenario: React.FC = () => {
  const { language, addCustomScenario } = useAppContext();
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState<Partial<Scenario> | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<any>('kinetic');
  const [difficulty, setDifficulty] = useState(3);

  const handleBrainstorm = async () => {
    if (!idea.trim()) return;
    setIsGenerating(true);
    try {
      const generated = await generateScenarioDraft(idea, language);
      setDraft(generated);
      setTitle(generated.title?.[language] || '');
      setDescription(generated.description?.[language] || '');
      setCategory(generated.category || 'kinetic');
      setDifficulty(generated.difficulty || 3);
    } catch (error) {
      console.error(error);
      alert(language === 'pt' ? 'Falha ao conectar com o Laboratório de IA.' : 'Failed to connect to AI Lab.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!title || !description) return;
    
    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      title: { pt: title, en: title },
      description: { pt: description, en: description },
      category: category,
      difficulty: difficulty,
      steps: {}, // AI will generate steps on the fly in the simulator
      maxSteps: 10
    };

    addCustomScenario(newScenario);
    alert(language === 'pt' ? 'Cenário materializado com sucesso!' : 'Scenario materialized successfully!');
    navigate('/simulations');
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-24">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter text-zinc-100 uppercase leading-none">
            {language === 'pt' ? 'Laboratório Estratégico AI' : 'AI Strategic Lab'}
          </h2>
        </div>
        <p className="text-zinc-500 font-mono text-sm max-w-2xl italic leading-relaxed">
          {language === 'pt' 
            ? 'Use nossa inteligência avançada para conceber e simular cenários geopolíticos complexos. Descreva sua ideia e deixe a IA materializar as variáveis.' 
            : 'Use our advanced intelligence to conceive and simulate complex geopolitical scenarios. Describe your idea and let the AI materialize the variables.'}
        </p>
      </header>

      {/* Idea Input */}
      <section className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Play className="w-32 h-32" />
        </div>
        
        <div className="space-y-4 relative z-10">
          <label className="text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-500 block">
            {language === 'pt' ? 'Brainstorm de Conceito' : 'Concept Brainstorming'}
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={language === 'pt' ? 'Ex: Uma crise de recursos no cinturão de asteróides em 2085...' : 'e.g. A resource crisis in the asteroid belt in 2085...'}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-colors text-zinc-100"
              onKeyDown={(e) => e.key === 'Enter' && handleBrainstorm()}
            />
            <button 
              onClick={handleBrainstorm}
              disabled={isGenerating || !idea.trim()}
              className="px-8 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white rounded-2xl transition-all shadow-lg flex items-center gap-2 group"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              <span className="font-bold uppercase text-xs tracking-widest hidden sm:inline">
                {language === 'pt' ? 'Gerar' : 'Generate'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Draft Section */}
      <AnimatePresence>
        {(draft || title) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-8 space-y-8">
              <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">
                    {language === 'pt' ? 'Título do Cenário' : 'Scenario Title'}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xl font-bold italic outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-600">
                    {language === 'pt' ? 'Contexto de Operação' : 'Operation Context'}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-zinc-300 font-serif leading-relaxed outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>
              </div>
            </div>

            <aside className="md:col-span-4 space-y-6">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 block">
                    {language === 'pt' ? 'Classificação' : 'Classification'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['kinetic', 'cyber', 'diplomatic', 'economic'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`py-2 px-3 rounded-lg text-[10px] font-mono uppercase tracking-widest border transition-all ${
                          category === cat 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 block">
                    {language === 'pt' ? 'Nível de Complexidade' : 'Complexity Level'}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setDifficulty(lvl)}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all border ${
                          difficulty >= lvl 
                            ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                            : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex gap-3">
                  <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-mono uppercase">
                    {language === 'pt' 
                      ? 'Nossa IA adaptativa gerará passos de simulação dinâmicos baseados neste contexto.' 
                      : 'Our adaptive AI will generate dynamic simulation steps based on this context.'}
                  </p>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="w-full py-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl transition-all font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 group"
              >
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {language === 'pt' ? 'Materializar' : 'Materialize'}
              </button>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>

      {!draft && !title && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
           <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-full">
              <Plus className="w-8 h-8 text-zinc-800" />
           </div>
           <div className="space-y-2">
             <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
               {language === 'pt' ? 'Aguardando parâmetros iniciais' : 'Awaiting initial parameters'}
             </p>
             <p className="text-zinc-700 text-xs italic">
               {language === 'pt' ? 'O laboratório está em standby. Insira uma ideia para começar.' : 'The lab is on standby. Enter an idea to begin.'}
             </p>
           </div>
        </div>
      )}
    </div>
  );
};
