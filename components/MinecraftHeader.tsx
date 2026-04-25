import React from 'react';
import { useGame } from '../context/GameContext';

const MinecraftHeader = () => {
  const { state } = useGame();

  const getWeatherIcon = () => {
    switch (state.weather) {
      case 'clear': return '☀️';
      case 'rain': return '🌧️';
      case 'thunder': return '⛈️';
      default: return '☀️';
    }
  };

  const getWeatherText = () => {
    switch (state.weather) {
      case 'clear': return 'Clear';
      case 'rain': return 'Rain';
      case 'thunder': return 'Thunder';
      default: return 'Clear';
    }
  };

  const formatGameTime = () => {
    const hours = Math.floor((state.gameTime / 60) % 24);
    const minutes = state.gameTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-honey-500 shadow-lg border-b-4 border-comb-900 sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🐝</div>
          <div>
            <h1 className="text-2xl font-minecraft text-comb-900">BEE FARM DASHBOARD</h1>
            <p className="text-sm text-comb-800">Minecraft Apiary Management System</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="bg-honey-300 rounded-lg px-4 py-2 border-2 border-comb-900">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{state.timeOfDay === 'day' ? '☀️' : '🌙'}</span>
              <div>
                <p className="text-xs text-comb-900 font-bold">TIME</p>
                <p className="text-sm text-comb-900">{formatGameTime()}</p>
              </div>
            </div>
          </div>

          <div className="bg-honey-300 rounded-lg px-4 py-2 border-2 border-comb-900">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getWeatherIcon()}</span>
              <div>
                <p className="text-xs text-comb-900 font-bold">WEATHER</p>
                <p className="text-sm text-comb-900">{getWeatherText()}</p>
              </div>
            </div>
          </div>

          <div className="bg-honey-300 rounded-lg px-4 py-2 border-2 border-comb-900">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-xs text-comb-900 font-bold">MONEY</p>
                <p className="text-sm text-comb-900">{state.resources.money}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500 rounded-lg px-4 py-3 border-2 border-comb-900 shadow-lg">
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
