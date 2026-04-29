import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Leaderboard: React.FC = () => {
  const { language } = useAppContext();

  const mockUsers = [
    { name: 'Gen. Strategos', score: 12540, missions: 45, country: 'BR' },
    { name: 'Admiral_Nelson', score: 11200, missions: 38, country: 'UK' },
    { name: 'Sun Tzu', score: 10850, missions: 42, country: 'CN' },
    { name: 'Clausewitz', score: 9900, missions: 31, country: 'DE' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 italic">
          {language === 'pt' ? 'Quadro de Honra' : 'Hall of Honor'}
        </h2>
        <p className="text-zinc-500 font-mono text-sm mt-2">
          {language === 'pt' ? 'Ranking global de estrategas e oficiais.' : 'Global ranking of strategists and officers.'}
        </p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 border-b border-zinc-800">
              <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">#</th>
              <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">User</th>
              <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-right">Missions</th>
              <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, i) => (
              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group">
                <td className="p-4 font-mono text-zinc-500">
                  {i === 0 ? <Trophy className="w-4 h-4 text-amber-500" /> : i + 1}
                </td>
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">{user.name}</p>
                    <p className="text-[10px] text-zinc-600 font-mono">{user.country}</p>
                  </div>
                </td>
                <td className="p-4 text-right font-mono text-sm text-zinc-400">{user.missions}</td>
                <td className="p-4 text-right font-mono font-bold text-emerald-500">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
