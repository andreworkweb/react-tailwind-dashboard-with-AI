import React from 'react';

const PollinationZone = () => {
  const flowerCoverage = 68; // percentage of flower coverage
  const isLowCoverage = flowerCoverage < 50;

  return (
    <div className={`bg-gradient-to-br ${isLowCoverage ? 'from-red-300 to-orange-400' : 'from-green-300 to-green-400'} rounded-lg p-6 border-4 border-comb-900 shadow-xl`}>
      <h2 className="text-xl font-minecraft text-comb-900 mb-4 text-center">🌸 POLLINATION ZONE</h2>

      <div className="text-center mb-6">
        <p className="text-6xl font-bold text-comb-900">{flowerCoverage}%</p>
        <p className="text-sm text-comb-900 font-bold">FLOWER COVERAGE</p>
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
            style={{ width: `${flowerCoverage}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-2xl">🌻</p>
          <p className="text-xs text-comb-900 font-bold">34</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">🌹</p>
          <p className="text-xs text-comb-900 font-bold">28</p>
        </div>
        <div className="text-center">
          <p className="text-2xl">🌷</p>
          <p className="text-xs text-comb-900 font-bold">19</p>
        </div>
      </div>
    </div>
  );
};

export default PollinationZone;
