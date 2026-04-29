import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Shield, Share2, Printer, Globe, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CASE_STUDIES } from '../constants';

export const CaseStudyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useAppContext();
  
  const study = CASE_STUDIES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!study) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-zinc-500">
        <Shield className="w-12 h-12 mb-4 opacity-20" />
        <p>{language === 'pt' ? 'Relatório não encontrado.' : 'Report not found.'}</p>
        <button onClick={() => navigate('/case-studies')} className="mt-4 text-emerald-500 hover:underline">
          {language === 'pt' ? 'Voltar para Biblioteca' : 'Back to Library'}
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-12 pb-24"
    >
      <header className="space-y-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {language === 'pt' ? 'Voltar' : 'Back'}
        </button>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-[0.2em] rounded">
              Strategic Analysis_v4.1
            </span>
            <div className="flex items-center gap-1 text-zinc-500 text-[10px] font-mono">
              <Calendar className="w-3 h-3" />
              {study.date}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-zinc-100 uppercase leading-none">
            {study.title[language]}
          </h1>
          
          <p className="text-xl text-zinc-400 font-serif leading-relaxed italic">
            {study.summary[language]}
          </p>
        </div>

        <div className="flex gap-4 pt-4 border-b border-zinc-900 pb-8">
          <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors">
            <Printer className="w-4 h-4" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase">
             <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                Global Access
             </div>
             <div className="flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                Level 4 Clear.
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <aside className="md:col-span-3 space-y-8">
          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-4">
            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
              Metadata
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase">Classification</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">Unclassified_Public</p>
              </div>
              <div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase">Subject</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">Geopolitical History</p>
              </div>
              <div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase">Author</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">PW_INTEL_SYSTEM</p>
              </div>
            </div>
          </div>
          
          <div className="p-1 px-4 bg-red-500/10 border border-red-500/20 rounded-lg">
             <p className="text-[8px] font-bold text-red-500 uppercase py-2 leading-tight">
               Warning: This document contains analytical projections.
             </p>
          </div>
        </aside>

        <main className="md:col-span-9">
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="text-lg leading-relaxed text-zinc-300 font-serif space-y-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-emerald-500">
              {study.analysis[language].split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <footer className="mt-16 pt-8 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-700 uppercase italic">
            <span>Copyright © 2026 Predictive Warfare Systems</span>
            <span>Ref_ID: {study.id.toUpperCase()}</span>
          </footer>
        </main>
      </div>
    </motion.div>
  );
};
