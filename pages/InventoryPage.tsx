import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGame } from '../context/GameContext';

const InventoryPage = () => {
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

      gsap.from('.summary-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        delay: 0.2,
      });

      gsap.from('.chest-card', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getChestStatusColor = (status: string) => {
    switch (status) {
      case 'full':
        return 'bg-red-500 border-red-700';
      case 'warning':
        return 'bg-yellow-500 border-yellow-700';
      default:
        return 'bg-green-500 border-green-700';
    }
  };

  const getChestStatusText = (status: string) => {
    switch (status) {
      case 'full':
        return 'FULL';
      case 'warning':
        return 'ALMOST FULL';
      default:
        return 'AVAILABLE';
    }
  };

  const hopperStatus = state.chests.some(c => c.status === 'full') ? 'CLOGGED' : 'WORKING';

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          📦 INVENTORY & LOGISTICS
        </h1>
        <p className="page-title text-center text-comb-700 mb-8 font-bold">
          Storage Management System
        </p>

        {/* Hopper Status Alert */}
        <div className="summary-card mb-6 flex items-center justify-center gap-4">
          <div className={`px-6 py-3 rounded-lg border-4 font-bold text-lg ${
            hopperStatus === 'CLOGGED'
              ? 'bg-yellow-400 border-yellow-600 text-comb-900'
              : 'bg-green-500 border-green-700 text-comb-900'
          }`}>
            {hopperStatus === 'CLOGGED' ? '⚠️' : '✓'} HOPPERS: {hopperStatus}
          </div>
        </div>

        {/* Total Resources Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="summary-card bg-gradient-to-br from-honey-300 to-honey-400 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">⬡</div>
              <h3 className="text-2xl font-minecraft text-comb-900 font-bold mb-2">HONEYCOMB</h3>
              <div className="text-4xl font-bold text-comb-900">{state.resources.honeycomb}</div>
              <div className="text-sm text-comb-800 font-bold">ITEMS</div>
              <button
                onClick={() => actions.sellResources('honeycomb', Math.min(10, state.resources.honeycomb))}
                disabled={state.resources.honeycomb < 1}
                className="mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs font-bold py-2 px-4 rounded border-2 border-comb-900"
              >
                SELL 10 (50 💰)
              </button>
            </div>
          </div>

          <div className="summary-card bg-gradient-to-br from-honey-400 to-honey-500 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🍯</div>
              <h3 className="text-2xl font-minecraft text-comb-900 font-bold mb-2">HONEY BOTTLE</h3>
              <div className="text-4xl font-bold text-comb-900">{state.resources.honey}</div>
              <div className="text-sm text-comb-800 font-bold">BOTTLES</div>
              <button
                onClick={() => actions.sellResources('honey', Math.min(10, state.resources.honey))}
                disabled={state.resources.honey < 1}
                className="mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs font-bold py-2 px-4 rounded border-2 border-comb-900"
              >
                SELL 10 (100 💰)
              </button>
            </div>
          </div>

          <div className="summary-card bg-gradient-to-br from-honey-500 to-honey-600 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🟧</div>
              <h3 className="text-2xl font-minecraft text-comb-900 font-bold mb-2">HONEY BLOCK</h3>
              <div className="text-4xl font-bold text-comb-900">{state.resources.honeyBlock}</div>
              <div className="text-sm text-comb-800 font-bold">BLOCKS</div>
              <button
                onClick={() => actions.sellResources('honeyBlock', Math.min(10, state.resources.honeyBlock))}
                disabled={state.resources.honeyBlock < 1}
                className="mt-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-xs font-bold py-2 px-4 rounded border-2 border-comb-900"
              >
                SELL 10 (400 💰)
              </button>
            </div>
          </div>
        </div>

        {/* Chest Details */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-minecraft text-comb-900">🗃️ STORAGE UNITS</h2>
          <button
            onClick={() => actions.expandStorage()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-comb-900"
          >
            + ADD CHEST (1500 💰)
          </button>
        </div>

        <div className="space-y-6">
          {state.chests.map((chest) => (
            <div
              key={chest.id}
              className={`chest-card ${getChestStatusColor(chest.status)} rounded-lg p-6 border-4 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">📦</span>
                  <div>
                    <h3 className="text-2xl font-minecraft text-comb-900 font-bold">
                      {chest.name}
                    </h3>
                    <p className="text-sm text-comb-800 font-bold">
                      Capacity: {chest.used}/{chest.capacity} slots
                    </p>
                  </div>
                </div>
                <div className="bg-comb-900 text-white px-4 py-2 rounded-lg font-bold">
                  {getChestStatusText(chest.status)}
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mb-4">
                <div className="w-full bg-comb-900/30 rounded-full h-4 border-2 border-comb-900">
                  <div
                    className="bg-comb-900 h-full rounded-full transition-all"
                    style={{ width: `${(chest.used / chest.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Items in Chest */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {chest.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-bold text-comb-900 text-sm">{item.name}</div>
                        <div className="text-2xl font-bold text-comb-900">
                          {item.stacks} <span className="text-sm">stacks</span>
                        </div>
                        <div className="text-xs text-comb-800">
                          ({item.stacks * item.itemsPerStack} items)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
