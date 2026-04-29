import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CASE_STUDIES } from '../constants';

export const CaseStudies: React.FC = () => {
  const { language } = useAppContext();

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 italic">
          {language === 'pt' ? 'Centro de Inteligência' : 'Intelligence Center'}
        </h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">
          {language === 'pt' ? 'Análises aprofundadas de conflitos reais.' : 'In-depth analyses of real conflicts.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CASE_STUDIES.map((study) => (
          <article key={study.id} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4 hover:border-zinc-700 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{study.date}</span>
              <BookOpen className="w-5 h-5 text-zinc-700 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h3 className="text-xl font-bold">{study.title[language]}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{study.summary[language]}</p>
            <div className="pt-4 border-t border-zinc-800">
              <Link 
                to={`/case-study/${study.id}`}
                target="_blank"
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-500 hover:text-emerald-400"
              >
                {language === 'pt' ? 'Ler Análise Completa' : 'Read Full Analysis'}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
