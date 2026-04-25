import React from 'react';

interface Hive {
  id: number;
  x: number;
  y: number;
  status: 'active' | 'empty' | 'full';
}

const HiveMiniMap = () => {
  const hives: Hive[] = [
    { id: 1, x: 20, y: 30, status: 'active' },
    { id: 2, x: 50, y: 20, status: 'full' },
    { id: 3, x: 70, y: 40, status: 'active' },
    { id: 4, x: 35, y: 60, status: 'empty' },
    { id: 5, x: 65, y: 70, status: 'active' },
    { id: 6, x: 80, y: 55, status: 'full' },
  ];

  const getHiveColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-honey-500 border-honey-700';
      case 'empty':
        return 'bg-comb-600 border-comb-800';
      case 'full':
        return 'bg-honey-700 border-honey-900 animate-pulse';
      default:
        return 'bg-gray-500';
    }
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

        {hives.map((hive) => (
          <div
            key={hive.id}
            className={`absolute w-8 h-8 ${getHiveColor(hive.status)} rounded-lg border-2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-125 transition-transform cursor-pointer`}
            style={{ left: `${hive.x}%`, top: `${hive.y}%` }}
            title={`Hive ${hive.id} - ${hive.status}`}
          >
            {hive.status === 'full' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-honey-400 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-around text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-honey-500 border-2 border-honey-700 rounded"></div>
          <span className="text-white font-bold">ACTIVE</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-comb-600 border-2 border-comb-800 rounded"></div>
          <span className="text-white font-bold">EMPTY</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-honey-700 border-2 border-honey-900 rounded"></div>
          <span className="text-white font-bold">FULL</span>
        </div>
      </div>
    </div>
  );
};

export default HiveMiniMap;
