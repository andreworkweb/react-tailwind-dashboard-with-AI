import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGame } from '../context/GameContext';

const HivesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, actions } = useGame();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.hive-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'full':
        return 'bg-green-500 border-green-700';
      case 'active':
        return 'bg-honey-500 border-honey-700';
      case 'warning':
        return 'bg-yellow-500 border-yellow-700';
      case 'empty':
        return 'bg-gray-400 border-gray-600';
      default:
        return 'bg-honey-500 border-honey-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'full':
        return 'READY TO HARVEST';
      case 'active':
        return 'PRODUCING';
      case 'warning':
        return 'LOW ACTIVITY';
      case 'empty':
        return 'EMPTY';
      default:
        return 'UNKNOWN';
    }
  };

  const activeHives = state.hives.filter(h => h.status === 'active' || h.status === 'full').length;

  // Calculate production rate per hive (rough estimate)
  const calculateProductionRate = (hive: any) => {
    if (hive.bees.length === 0) return 0;
    let rate = hive.bees.length * 0.5; // Base rate
    if (state.weather === 'clear') rate *= 1.2;
    if (state.weather === 'rain') rate *= 0.6;
    if (state.weather === 'thunder') rate *= 0.3;
    if (state.timeOfDay === 'night') rate *= 0.4;
    return rate.toFixed(1);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          🏠 HIVES REGISTRY
        </h1>
        <p className="page-title text-center text-comb-700 mb-4 font-bold">
          Total Hives: {state.hives.length} | Active: {activeHives}
        </p>

        {/* Buy New Hive Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => actions.buyHive()}
            disabled={state.resources.money < 2000}
            className="bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-comb-900 font-minecraft font-bold py-4 px-8 rounded-lg border-4 border-comb-900 transition-all transform hover:scale-105 shadow-xl text-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏠</span>
              <div className="text-left">
                <div className="text-xl">BUY NEW HIVE</div>
                <div className="text-sm opacity-80">Cost: 2000 💰</div>
              </div>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.hives.map((hive) => {
            const productionRate = calculateProductionRate(hive);
            const beesInHive = hive.bees.filter(b => b.state === 'in_hive').length;
            const beesCollecting = hive.bees.filter(b => b.state === 'collecting').length;
            const beesReturning = hive.bees.filter(b => b.state === 'returning').length;

            return (
              <div
                key={hive.id}
                className={`hive-card ${getStatusColor(hive.status)} rounded-lg p-6 border-4 shadow-xl`}
              >
                {/* Hive Header */}
                <div className="bg-comb-900/30 rounded-lg p-4 mb-4 border-2 border-comb-900">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-minecraft text-comb-900 font-bold">
                      {hive.name}
                    </h3>
                    <span className="text-4xl">🏠</span>
                  </div>
                  <div className="text-center bg-comb-900 text-white py-2 rounded-lg font-bold text-sm mb-2">
                    {getStatusText(hive.status)}
                  </div>
                  {/* Production Rate */}
                  <div className="text-center bg-honey-600 text-comb-900 py-1 rounded font-bold text-xs">
                    ⚡ {productionRate} honey/hour
                  </div>
                </div>

                {/* Bees Section */}
                <div className="bg-white/50 rounded-lg p-4 mb-3 border-2 border-comb-900">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🐝</span>
                      <span className="text-lg font-bold text-comb-900">BEES</span>
                    </div>
                    <span className="text-2xl font-bold text-comb-900">{hive.bees.length}/{hive.maxBees}</span>
                  </div>

                  {/* Bee slots visual */}
                  <div className="flex gap-2 mb-3">
                    {[...Array(hive.maxBees)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-8 rounded border-2 border-comb-900 flex items-center justify-center text-xl ${
                          i < hive.bees.length ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}
                      >
                        {i < hive.bees.length ? '🐝' : ''}
                      </div>
                    ))}
                  </div>

                  {/* Bee Activity Status */}
                  {hive.bees.length > 0 && (
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-comb-900 font-bold">🏠 In Hive:</span>
                        <span className="text-comb-900 font-bold">{beesInHive}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-comb-900 font-bold">🌸 Collecting:</span>
                        <span className="text-comb-900 font-bold">{beesCollecting}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-comb-900 font-bold">🔙 Returning:</span>
                        <span className="text-comb-900 font-bold">{beesReturning}</span>
                      </div>
                    </div>
                  )}

                  {hive.bees.length < hive.maxBees && (
                    <button
                      onClick={() => actions.addBeesToHive(hive.id)}
                      disabled={state.resources.money < 300}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-comb-900 font-bold py-2 px-4 rounded-lg border-2 border-comb-900 transition-all"
                    >
                      + ADD BEE (300 💰)
                    </button>
                  )}
                </div>

                {/* Resources Section */}
                <div className="space-y-3">
                  {/* Honey */}
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-comb-900">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🍯</span>
                        <span className="text-sm font-bold text-comb-900">HONEY</span>
                      </div>
                      <span className="text-lg font-bold text-comb-900">{Math.floor(hive.honeyLevel)}/5</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-300 rounded-full h-3 border-2 border-comb-900 mb-2">
                      <div
                        className="bg-honey-600 h-full rounded-full transition-all"
                        style={{ width: `${(hive.honeyLevel / 5) * 100}%` }}
                      />
                    </div>

                    {hive.honeyLevel >= 1 && (
                      <button
                        onClick={() => actions.collectHoney(hive.id)}
                        className="w-full bg-honey-500 hover:bg-honey-600 text-comb-900 font-bold py-2 px-4 rounded-lg border-2 border-comb-900 transition-all"
                      >
                        🍯 COLLECT ({Math.floor(hive.honeyLevel)} bottles)
                      </button>
                    )}
                  </div>

                  {/* Honeycomb */}
                  <div className="bg-white/50 rounded-lg p-3 border-2 border-comb-900">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⬡</span>
                        <span className="text-sm font-bold text-comb-900">HONEYCOMB</span>
                      </div>
                      <span className="text-lg font-bold text-comb-900">{Math.floor(hive.honeycombLevel)}/5</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-300 rounded-full h-3 border-2 border-comb-900 mb-2">
                      <div
                        className="bg-honey-600 h-full rounded-full transition-all"
                        style={{ width: `${(hive.honeycombLevel / 5) * 100}%` }}
                      />
                    </div>

                    {hive.honeycombLevel >= 1 && (
                      <button
                        onClick={() => actions.collectHoneycomb(hive.id)}
                        className="w-full bg-honey-500 hover:bg-honey-600 text-comb-900 font-bold py-2 px-4 rounded-lg border-2 border-comb-900 transition-all"
                      >
                        ⬡ COLLECT ({Math.floor(hive.honeycombLevel)} items)
                      </button>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="mt-3 text-center text-xs text-comb-900 font-bold opacity-70 bg-comb-900/20 py-2 rounded">
                  📍 {hive.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HivesPage;
