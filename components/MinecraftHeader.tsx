import React from 'react';

const MinecraftHeader = () => {
  const currentTime = new Date().getHours();
  const isDaytime = currentTime >= 6 && currentTime < 18;
  const weather = 'sunny'; // In production, connect to API

  return (
    <header className="bg-gradient-to-r from-honey-500 to-honey-600 shadow-lg border-b-4 border-comb-900 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🐝</div>
          <div>
            <h1 className="text-2xl font-minecraft text-comb-900">BEE FARM DASHBOARD</h1>
            <p className="text-sm text-comb-800">Minecraft Apiary Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="bg-comb-900/20 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-comb-900">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{isDaytime ? '☀️' : '🌙'}</span>
              <div>
                <p className="text-xs text-comb-900 font-bold">TIME</p>
                <p className="text-sm text-comb-900">{isDaytime ? 'Day' : 'Night'}</p>
              </div>
            </div>
          </div>

          <div className="bg-comb-900/20 backdrop-blur-sm rounded-lg px-4 py-2 border-2 border-comb-900">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{weather === 'sunny' ? '☀️' : '🌧️'}</span>
              <div>
                <p className="text-xs text-comb-900 font-bold">WEATHER</p>
                <p className="text-sm text-comb-900">{weather === 'sunny' ? 'Clear' : 'Rain'}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500 backdrop-blur-sm rounded-lg px-4 py-3 border-2 border-comb-900 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <p className="text-sm font-bold text-comb-900">FARM ACTIVE</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MinecraftHeader;
