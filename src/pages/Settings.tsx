import React from 'react';
import { Globe, Moon, Sun, Monitor, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme } = useAppContext();

  return (
    <div className="space-y-8 max-w-2xl">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 italic">
          {language === 'pt' ? 'Configurações' : 'Settings'}
        </h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">
          {language === 'pt' ? 'Personalize sua central de comando.' : 'Customize your command center.'}
        </p>
      </header>

      <section className="space-y-6">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-zinc-500" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest">{language === 'pt' ? 'Idioma' : 'Language'}</p>
                <p className="text-xs text-zinc-500">{language === 'pt' ? 'Selecione o idioma da plataforma' : 'Select platform language'}</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-800 rounded px-3 py-1 text-sm font-mono focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="pt">Português (BR)</option>
              <option value="en">English (US)</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-zinc-500" /> : <Sun className="w-5 h-5 text-zinc-500" />}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest">{language === 'pt' ? 'Tema' : 'Theme'}</p>
                <p className="text-xs text-zinc-500">{language === 'pt' ? 'Alternar entre claro e escuro' : 'Toggle between light and dark'}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-zinc-500" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest">{language === 'pt' ? 'Segurança' : 'Security'}</p>
                <p className="text-xs text-zinc-500">{language === 'pt' ? 'Sessão criptografada ativa' : 'Encrypted session active'}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">
              AES-256 SECURE
            </span>
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest">
              {language === 'pt' ? 'Status da API e Cotas' : 'API Status & Quotas'}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{language === 'pt' ? 'Uso do Gemini AI' : 'Gemini AI Usage'}</span>
                <span className="text-[10px] font-mono text-blue-500">Tier: Enterprise / Free</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {language === 'pt' 
                    ? 'Esta plataforma utiliza o modelo Gemini 3 Flash. O uso é compartilhado entre todos os usuários.' 
                    : 'This platform utilizes the Gemini 3 Flash model. Usage is shared among all users.'}
                </p>
                <ul className="text-[10px] space-y-1 text-zinc-500 font-mono list-disc list-inside">
                  <li>{language === 'pt' ? 'Limite: 15 requisições/minuto' : 'Limit: 15 requests/minute'}</li>
                  <li>{language === 'pt' ? 'Limite Diário: 1.500 requisições' : 'Daily Limit: 1,500 requests'}</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-200/70 leading-normal">
                {language === 'pt' 
                  ? 'Aviso: Caso o limite de requisições por minuto seja excedido durante picos de tráfego, as funções de Intel e Análise de IA podem ficar temporariamente indisponíveis.' 
                  : 'Notice: If the requests per minute limit is exceeded during traffic peaks, Intel and AI Analysis features may become temporarily unavailable.'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
           <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
               <Monitor className="w-5 h-5 text-emerald-500" />
             </div>
             <div>
               <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">
                 {language === 'pt' ? 'Modo de Treinamento' : 'Training Mode'}
               </h4>
               <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                 {language === 'pt' 
                   ? 'O modo de treinamento avançado permite acesso a cenários hipotéticos de nível secreto. Prossiga com cautela.' 
                   : 'Advanced training mode grants access to top-secret hypothetical scenarios. Proceed with caution.'}
               </p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};
