import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { useGameLoop } from './hooks/useGameLoop';
import MinecraftSidebar from './components/MinecraftSidebar';
import MinecraftHeader from './components/MinecraftHeader';
import Dashboard from './Dashboard';
import HivesPage from './pages/HivesPage';
import InventoryPage from './pages/InventoryPage';
import AutomationPage from './pages/AutomationPage';
import AnalyticsPage from './pages/AnalyticsPage';

const GameLoop = () => {
  useGameLoop();
  return null;
};

const App = () => {
  return (
    <GameProvider>
      <GameLoop />
      <Router>
        <div className="min-h-screen bg-honey-50">
          <MinecraftSidebar />
          <div className="ml-64">
            <MinecraftHeader />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/hives" element={<HivesPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/automation" element={<AutomationPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GameProvider>
  );
};

export default App;
