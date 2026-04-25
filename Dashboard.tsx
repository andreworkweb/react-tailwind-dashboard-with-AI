import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HexagonCard from './components/HexagonCard';
import BeePopulation from './components/BeePopulation';
import HoneyReservoir from './components/HoneyReservoir';
import PollinationZone from './components/PollinationZone';
import HiveMiniMap from './components/HiveMiniMap';

const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hexagons
      gsap.from('.hexagon-card', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      // Animate widgets
      gsap.from('.widget-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
      });

      // Animate map section
      gsap.from('.map-section', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-8">
        {/* Hexagon Grid - Main Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-minecraft text-comb-900 mb-6 text-center">⬡ HIVE STATISTICS ⬡</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="hexagon-card">
              <HexagonCard
              title="HIVES"
              value="24"
              subtitle="Active"
              status="active"
              icon="🏠"
            />
            </div>
            <div className="hexagon-card">
            <HexagonCard
              title="BEES"
              value="247"
              subtitle="Total"
              status="active"
              icon="🐝"
            />
            </div>
            <div className="hexagon-card">
            <HexagonCard
              title="HONEY"
              value="1.5K"
              subtitle="Bottles"
              status="full"
              icon="🍯"
            />
            </div>
            <div className="hexagon-card">
            <HexagonCard
              title="COMBS"
              value="456"
              subtitle="Blocks"
              status="active"
              icon="⬡"
            />
            </div>
          </div>
        </div>

        {/* Main Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="widget-card">
            <BeePopulation />
          </div>
          <div className="widget-card">
            <HoneyReservoir />
          </div>
          <div className="widget-card">
            <PollinationZone />
          </div>
        </div>

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="map-section">
            <HiveMiniMap />
          </div>

          <div className="map-section bg-gradient-to-br from-honey-100 to-honey-200 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
            <h2 className="text-xl font-minecraft text-comb-900 mb-4 text-center">📊 PRODUCTION STATS</h2>

            <div className="space-y-4">
              <div className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-comb-900">HONEY/HOUR</span>
                  <span className="text-2xl font-bold text-comb-900">18</span>
                </div>
                <div className="w-full bg-comb-900/30 rounded-full h-3 border-2 border-comb-900">
                  <div className="bg-honey-600 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-comb-900">COMBS/HOUR</span>
                  <span className="text-2xl font-bold text-comb-900">24</span>
                </div>
                <div className="w-full bg-comb-900/30 rounded-full h-3 border-2 border-comb-900">
                  <div className="bg-honey-600 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-comb-900">EFFICIENCY</span>
                  <span className="text-2xl font-bold text-comb-900">92%</span>
                </div>
                <div className="w-full bg-comb-900/30 rounded-full h-3 border-2 border-comb-900">
                  <div className="bg-green-600 h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="bg-honey-500 hover:bg-honey-600 text-comb-900 font-bold py-3 px-4 rounded-lg border-2 border-comb-900 transition-all transform hover:scale-105 shadow-lg">
                🍯 COLLECT ALL
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-comb-900 font-bold py-3 px-4 rounded-lg border-2 border-comb-900 transition-all transform hover:scale-105 shadow-lg">
                🌸 PLANT FLOWERS
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
