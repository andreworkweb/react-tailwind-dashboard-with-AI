import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface StorageItem {
  id: number;
  name: string;
  icon: string;
  stacks: number;
  maxStacks: number;
  itemsPerStack: number;
}

interface Chest {
  id: number;
  name: string;
  capacity: number;
  used: number;
  status: 'normal' | 'warning' | 'full';
  items: StorageItem[];
}

const InventoryPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [chests] = useState<Chest[]>([
    {
      id: 1,
      name: 'Main Storage',
      capacity: 27,
      used: 18,
      status: 'normal',
      items: [
        { id: 1, name: 'Honeycomb', icon: '⬡', stacks: 12, maxStacks: 64, itemsPerStack: 64 },
        { id: 2, name: 'Honey Bottle', icon: '🍯', stacks: 8, maxStacks: 16, itemsPerStack: 16 },
        { id: 3, name: 'Honey Block', icon: '🟧', stacks: 6, maxStacks: 64, itemsPerStack: 64 },
      ],
    },
    {
      id: 2,
      name: 'Overflow Chest',
      capacity: 27,
      used: 24,
      status: 'warning',
      items: [
        { id: 1, name: 'Honeycomb', icon: '⬡', stacks: 15, maxStacks: 64, itemsPerStack: 64 },
        { id: 2, name: 'Honey Bottle', icon: '🍯', stacks: 9, maxStacks: 16, itemsPerStack: 16 },
      ],
    },
    {
      id: 3,
      name: 'Backup Storage',
      capacity: 27,
      used: 27,
      status: 'full',
      items: [
        { id: 1, name: 'Honeycomb', icon: '⬡', stacks: 18, maxStacks: 64, itemsPerStack: 64 },
        { id: 2, name: 'Honey Block', icon: '🟧', stacks: 9, maxStacks: 64, itemsPerStack: 64 },
      ],
    },
  ]);

  const totalResources = {
    honeycomb: chests.reduce((sum, chest) =>
      sum + (chest.items.find(i => i.name === 'Honeycomb')?.stacks || 0), 0),
    honeyBottle: chests.reduce((sum, chest) =>
      sum + (chest.items.find(i => i.name === 'Honey Bottle')?.stacks || 0), 0),
    honeyBlock: chests.reduce((sum, chest) =>
      sum + (chest.items.find(i => i.name === 'Honey Block')?.stacks || 0), 0),
  };

  const hopperStatus = chests.some(c => c.status === 'full') ? 'CLOGGED' : 'WORKING';

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
              <div className="text-4xl font-bold text-comb-900">{totalResources.honeycomb}</div>
              <div className="text-sm text-comb-800 font-bold">STACKS</div>
              <div className="text-xs text-comb-700 mt-2">
                ({totalResources.honeycomb * 64} items)
              </div>
            </div>
          </div>

          <div className="summary-card bg-gradient-to-br from-honey-400 to-honey-500 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🍯</div>
              <h3 className="text-2xl font-minecraft text-comb-900 font-bold mb-2">HONEY BOTTLE</h3>
              <div className="text-4xl font-bold text-comb-900">{totalResources.honeyBottle}</div>
              <div className="text-sm text-comb-800 font-bold">STACKS</div>
              <div className="text-xs text-comb-700 mt-2">
                ({totalResources.honeyBottle * 16} bottles)
              </div>
            </div>
          </div>

          <div className="summary-card bg-gradient-to-br from-honey-500 to-honey-600 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <div className="text-center">
              <div className="text-5xl mb-2">🟧</div>
              <h3 className="text-2xl font-minecraft text-comb-900 font-bold mb-2">HONEY BLOCK</h3>
              <div className="text-4xl font-bold text-comb-900">{totalResources.honeyBlock}</div>
              <div className="text-sm text-comb-800 font-bold">STACKS</div>
              <div className="text-xs text-comb-700 mt-2">
                ({totalResources.honeyBlock * 64} blocks)
              </div>
            </div>
          </div>
        </div>

        {/* Chest Details */}
        <h2 className="text-2xl font-minecraft text-comb-900 mb-4">🗃️ STORAGE UNITS</h2>
        <div className="space-y-6">
          {chests.map((chest) => (
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
