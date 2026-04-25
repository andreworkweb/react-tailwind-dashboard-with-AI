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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          🏠 HIVES REGISTRY
        </h1>
        <p className="page-title text-center text-comb-700 mb-8 font-bold">
          Total Hives: {state.hives.length} | Active: {activeHives}
        </p>

        {/* Buy New Hive Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => actions.buyHive()}
            className="bg-green-500 hover:bg-green-600 text-comb-900 font-bold py-3 px-6 rounded-lg border-4 border-green-700 transition-all transform hover:scale-105 shadow-xl"
          >
            🏠 BUY NEW HIVE (2000 💰)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.hives.map((hive) => (
            <div
              key={hive.id}
              className={`hive-card ${getStatusColor(hive.status)} rounded-lg p-6 border-4 shadow-xl transform hover:scale-105 transition-transform cursor-pointer`}
            >
              {/* Hive Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-minecraft text-comb-900 font-bold">
                  {hive.name}
                </h3>
                <span className="text-3xl">🏠</span>
              </div>

              {/* Bees Count */}
              <div className="bg-comb-900/20 rounded-lg p-3 mb-3 border-2 border-comb-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-comb-900">BEES</span>
                  <span className="text-lg font-bold text-comb-900">{hive.bees.length}/{hive.maxBees}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(hive.maxBees)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full border-2 border-comb-900 ${
                        i < hive.bees.length ? 'bg-yellow-400' : 'bg-comb-900/30'
                      }`}
                    />
                  ))}
                </div>
                {hive.bees.length < hive.maxBees && (
                  <button
                    onClick={() => actions.addBeesToHive(hive.id)}
                    className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-comb-900 text-xs font-bold py-1 px-2 rounded border-2 border-comb-900"
                  >
                    + ADD BEE (300 💰)
                  </button>
                )}
              </div>

              {/* Honey Level */}
              <div className="bg-comb-900/20 rounded-lg p-3 mb-3 border-2 border-comb-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-comb-900">HONEY</span>
                  <span className="text-lg font-bold text-comb-900">{Math.floor(hive.honeyLevel)}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full border-2 border-comb-900 ${
                        i < Math.floor(hive.honeyLevel) ? 'bg-honey-600' : 'bg-comb-900/30'
                      }`}
                    />
                  ))}
                </div>
                {hive.honeyLevel >= 1 && (
                  <button
                    onClick={() => actions.collectHoney(hive.id)}
                    className="mt-2 w-full bg-honey-500 hover:bg-honey-600 text-comb-900 text-xs font-bold py-1 px-2 rounded border-2 border-comb-900"
                  >
                    🍯 COLLECT HONEY
                  </button>
                )}
              </div>

              {/* Honeycomb Level */}
              <div className="bg-comb-900/20 rounded-lg p-3 mb-3 border-2 border-comb-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-comb-900">COMB</span>
                  <span className="text-lg font-bold text-comb-900">{Math.floor(hive.honeycombLevel)}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full border-2 border-comb-900 ${
                        i < Math.floor(hive.honeycombLevel) ? 'bg-honey-600' : 'bg-comb-900/30'
                      }`}
                    />
                  ))}
                </div>
                {hive.honeycombLevel >= 1 && (
                  <button
                    onClick={() => actions.collectHoneycomb(hive.id)}
                    className="mt-2 w-full bg-honey-500 hover:bg-honey-600 text-comb-900 text-xs font-bold py-1 px-2 rounded border-2 border-comb-900"
                  >
                    ⬡ COLLECT COMB
                  </button>
                )}
              </div>

              {/* Status Badge */}
              <div className="bg-comb-900 text-white text-center py-2 rounded-lg mb-3 font-bold text-xs">
                {getStatusText(hive.status)}
              </div>

              {/* Location */}
              <div className="text-center text-xs text-comb-900 font-bold opacity-70">
                📍 {hive.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HivesPage;
