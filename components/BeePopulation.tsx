import React from 'react';
import { useGame } from '../context/GameContext';

const BeePopulation = () => {
  const { state } = useGame();

  // Calculate bee statistics from real game state
  const totalBees = state.hives.reduce((sum, hive) => sum + hive.bees.length, 0);
  const inHives = state.hives.reduce((sum, hive) =>
    sum + hive.bees.filter(bee => bee.state === 'in_hive').length, 0
  );
  const collecting = state.hives.reduce((sum, hive) =>
    sum + hive.bees.filter(bee => bee.state === 'collecting').length, 0
  );
  const returning = state.hives.reduce((sum, hive) =>
    sum + hive.bees.filter(bee => bee.state === 'returning').length, 0
  );

  return (
    <div className="bg-gradient-to-br from-honey-100 to-honey-200 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
      <h2 className="text-xl font-minecraft text-comb-900 mb-4 text-center">🐝 BEE DEMOGRAPHICS</h2>

      <div className="text-center mb-6">
        <p className="text-6xl font-bold text-comb-900">{totalBees}</p>
        <p className="text-sm text-comb-800 font-bold">TOTAL BEES</p>
      </div>

      <div className="space-y-3">
        <div className="bg-honey-400 rounded-lg p-3 border-2 border-comb-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏠</span>
            <span className="text-sm font-bold text-comb-900">IN HIVES</span>
          </div>
          <span className="text-2xl font-bold text-comb-900">{inHives}</span>
        </div>

        <div className="bg-green-400 rounded-lg p-3 border-2 border-comb-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <span className="text-sm font-bold text-comb-900">COLLECTING</span>
          </div>
          <span className="text-2xl font-bold text-comb-900">{collecting}</span>
        </div>

        <div className="bg-blue-400 rounded-lg p-3 border-2 border-comb-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔙</span>
            <span className="text-sm font-bold text-comb-900">RETURNING</span>
          </div>
          <span className="text-2xl font-bold text-comb-900">{returning}</span>
        </div>
      </div>
    </div>
  );
};

export default BeePopulation;
