import React from 'react';
import { useGame } from '../context/GameContext';

const PollinationZone = () => {
  const { state } = useGame();

  // Calculate efficiency based on weather and time of day
  let efficiency = 100;

  if (state.weather === 'rain') efficiency = 60;
  if (state.weather === 'thunder') efficiency = 30;
  if (state.timeOfDay === 'night') efficiency *= 0.4;

  const isLowCoverage = efficiency < 50;

  // Calculate total bees working
  const workingBees = state.hives.reduce((sum, hive) =>
    sum + hive.bees.filter(bee => bee.state === 'collecting' || bee.state === 'returning').length, 0
  );

  return (
    <div className={`bg-gradient-to-br ${isLowCoverage ? 'from-red-300 to-orange-400' : 'from-green-300 to-green-400'} rounded-lg p-6 border-4 border-comb-900 shadow-xl`}>
      <h2 className="text-xl font-minecraft text-comb-900 mb-4 text-center">🌸 POLLINATION ZONE</h2>

      <div className="text-center mb-6">
        <p className="text-6xl font-bold text-comb-900">{Math.round(efficiency)}%</p>
        <p className="text-sm text-comb-900 font-bold">EFFICIENCY</p>
      </div>

      <div className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-comb-900">STATUS:</span>
          <span className={`text-sm font-bold ${isLowCoverage ? 'text-red-700' : 'text-green-700'}`}>
            {isLowCoverage ? '⚠️ LOW' : '✅ OPTIMAL'}
          </span>
        </div>
        <div className="w-full bg-comb-900/30 rounded-full h-4 border-2 border-comb-900">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isLowCoverage ? 'bg-red-600' : 'bg-green-600'}`}
            style={{ width: `${efficiency}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="bg-comb-900/20 rounded-lg p-2 border-2 border-comb-900 flex items-center justify-between">
          <span className="text-xs text-comb-900 font-bold">WEATHER:</span>
          <span className="text-sm text-comb-900 font-bold">{state.weather.toUpperCase()}</span>
        </div>
        <div className="bg-comb-900/20 rounded-lg p-2 border-2 border-comb-900 flex items-center justify-between">
          <span className="text-xs text-comb-900 font-bold">WORKING BEES:</span>
          <span className="text-sm text-comb-900 font-bold">{workingBees}</span>
        </div>
      </div>
    </div>
  );
};

export default PollinationZone;
