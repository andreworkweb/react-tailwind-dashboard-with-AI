import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Hive {
  id: number;
  name: string;
  bees: number; // 0-3
  honeyLevel: number; // 0-5
  status: 'active' | 'full' | 'empty' | 'warning';
  location: string;
}

const HivesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data for hives
  const [hives] = useState<Hive[]>([
    { id: 1, name: 'Hive Alpha', bees: 3, honeyLevel: 5, status: 'full', location: 'X: 120, Z: 45' },
    { id: 2, name: 'Hive Beta', bees: 2, honeyLevel: 3, status: 'active', location: 'X: 135, Z: 48' },
    { id: 3, name: 'Hive Gamma', bees: 3, honeyLevel: 4, status: 'active', location: 'X: 142, Z: 52' },
    { id: 4, name: 'Hive Delta', bees: 1, honeyLevel: 1, status: 'warning', location: 'X: 128, Z: 60' },
    { id: 5, name: 'Hive Epsilon', bees: 0, honeyLevel: 0, status: 'empty', location: 'X: 150, Z: 55' },
    { id: 6, name: 'Hive Zeta', bees: 3, honeyLevel: 5, status: 'full', location: 'X: 115, Z: 70' },
    { id: 7, name: 'Hive Eta', bees: 2, honeyLevel: 2, status: 'active', location: 'X: 160, Z: 65' },
    { id: 8, name: 'Hive Theta', bees: 3, honeyLevel: 4, status: 'active', location: 'X: 145, Z: 75' },
  ]);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          🏠 HIVES REGISTRY
        </h1>
        <p className="page-title text-center text-comb-700 mb-8 font-bold">
          Total Hives: {hives.length} | Active: {hives.filter(h => h.status === 'active' || h.status === 'full').length}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hives.map((hive) => (
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
                  <span className="text-lg font-bold text-comb-900">{hive.bees}/3</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full border-2 border-comb-900 ${
                        i < hive.bees ? 'bg-yellow-400' : 'bg-comb-900/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Honey Level */}
              <div className="bg-comb-900/20 rounded-lg p-3 mb-3 border-2 border-comb-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-comb-900">HONEY</span>
                  <span className="text-lg font-bold text-comb-900">{hive.honeyLevel}/5</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-2 rounded-full border-2 border-comb-900 ${
                        i < hive.honeyLevel ? 'bg-honey-600' : 'bg-comb-900/30'
                      }`}
                    />
                  ))}
                </div>
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
