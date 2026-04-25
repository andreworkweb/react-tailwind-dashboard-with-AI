import React from 'react';

const BeePopulation = () => {
  const totalBees = 247;
  const inHives = 189;
  const collecting = 45;
  const homeless = 13;

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

        <div className="bg-red-400 rounded-lg p-3 border-2 border-comb-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">❌</span>
            <span className="text-sm font-bold text-comb-900">HOMELESS</span>
          </div>
          <span className="text-2xl font-bold text-comb-900">{homeless}</span>
        </div>
      </div>
    </div>
  );
};

export default BeePopulation;
