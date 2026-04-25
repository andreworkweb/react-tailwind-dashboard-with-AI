import React from 'react';
import { useGame } from '../context/GameContext';

const HoneyReservoir = () => {
  const { state } = useGame();

  // Calculate total honey in all hives
  const totalHoneyInHives = state.hives.reduce((sum, hive) => sum + hive.honeyLevel, 0);
  const maxHoneyCapacity = state.hives.length * 5; // Each hive can hold 5 honey
  const honeyLevel = maxHoneyCapacity > 0 ? Math.round((totalHoneyInHives / maxHoneyCapacity) * 100) : 0;

  // Calculate production rates (honey being produced right now)
  const activeHives = state.hives.filter(h => h.bees.length > 0).length;
  const honeyPerHour = Math.round(activeHives * 2); // Rough estimate
  const honeycombPerHour = Math.round(activeHives * 1.5); // Rough estimate

  return (
    <div className="bg-gradient-to-br from-honey-100 to-honey-200 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
      <h2 className="text-xl font-minecraft text-comb-900 mb-4 text-center">🍯 HONEY STORAGE</h2>

      <div className="relative w-full h-64 bg-comb-900/10 rounded-lg border-4 border-comb-900 overflow-hidden">
        <div
          className="absolute bottom-0 w-full bg-gradient-to-t from-honey-600 to-honey-400 transition-all duration-1000 ease-out"
          style={{ height: `${honeyLevel}%` }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="w-2 h-2 bg-honey-200 rounded-full absolute top-4 left-4 animate-bounce"></div>
            <div className="w-2 h-2 bg-honey-200 rounded-full absolute top-8 right-6 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-honey-200 rounded-full absolute top-12 left-8 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-comb-900/80 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-honey-400">
            <p className="text-4xl font-bold text-honey-400">{honeyLevel}%</p>
            <p className="text-sm text-honey-200">FULL</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-comb-900/20 rounded-lg p-3 border-2 border-comb-900">
          <p className="text-xs text-comb-900 font-bold">HONEYCOMB</p>
          <p className="text-2xl font-bold text-comb-900">{honeycombPerHour}/hr</p>
        </div>
        <div className="bg-comb-900/20 rounded-lg p-3 border-2 border-comb-900">
          <p className="text-xs text-comb-900 font-bold">BOTTLES</p>
          <p className="text-2xl font-bold text-comb-900">{honeyPerHour}/hr</p>
        </div>
      </div>
    </div>
  );
};

export default HoneyReservoir;
