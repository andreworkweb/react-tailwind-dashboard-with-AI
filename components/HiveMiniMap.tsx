import React from 'react';
import { useGame } from '../context/GameContext';

const HiveMiniMap = () => {
  const { state } = useGame();

  const getHiveColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-honey-500 border-honey-700';
      case 'empty':
        return 'bg-gray-500 border-gray-700';
      case 'full':
        return 'bg-green-500 border-green-700 animate-pulse';
      case 'warning':
        return 'bg-yellow-500 border-yellow-700';
      default:
        return 'bg-gray-500';
    }
  };

  // Generate positions for hives based on their ID
  const getHivePosition = (id: number, total: number) => {
    const angle = (id / total) * Math.PI * 2;
    const radius = 35;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
      <h2 className="text-xl font-minecraft text-white mb-4 text-center">🗺️ FARM MAP</h2>

      <div className="relative w-full h-64 bg-green-700 rounded-lg border-4 border-comb-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-green-600"></div>
            ))}
          </div>
        </div>

        {state.hives.map((hive) => {
          const pos = getHivePosition(hive.id, state.hives.length);
          return (
            <div
              key={hive.id}
              className={`absolute w-8 h-8 ${getHiveColor(hive.status)} rounded-lg border-2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-125 transition-transform cursor-pointer`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              title={`${hive.name} - ${hive.status} - ${hive.bees.length} bees`}
            >
              {hive.status === 'full' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-honey-400 rounded-full"></div>
              )}
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {hive.bees.length}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-around text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-honey-500 border-2 border-honey-700 rounded"></div>
          <span className="text-white font-bold">ACTIVE</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-500 border-2 border-gray-700 rounded"></div>
          <span className="text-white font-bold">EMPTY</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 border-2 border-green-700 rounded"></div>
          <span className="text-white font-bold">FULL</span>
        </div>
      </div>
    </div>
  );
};

export default HiveMiniMap;
