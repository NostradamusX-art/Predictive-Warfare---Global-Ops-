import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Simulator } from './pages/Simulator';
import { CaseStudies } from './pages/CaseStudies';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { CreateScenario } from './pages/CreateScenario';
import { Tutorial } from './pages/Tutorial';
import { IntelFeed } from './pages/IntelFeed';
import { RiskIndex } from './pages/RiskIndex';

import { CaseStudyDetail } from './pages/CaseStudyDetail';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/simulator/:id" element={<Simulator />} />
            <Route path="/simulations" element={<Dashboard />} />
            <Route path="/intel" element={<IntelFeed />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-study/:id" element={<CaseStudyDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/create" element={<CreateScenario />} />
            <Route path="/risk-index" element={<RiskIndex />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
