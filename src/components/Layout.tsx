import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 flex transition-colors">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        <TopBar />
        <main className="flex-1 p-4 md:p-8 bg-grid">
          {children}
        </main>
      </div>
    </div>
  );
};
