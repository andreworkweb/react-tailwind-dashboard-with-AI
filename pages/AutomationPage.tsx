import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Dispenser {
  id: number;
  name: string;
  type: 'shears' | 'bottles';
  enabled: boolean;
  capacity: number;
  current: number;
  status: 'full' | 'normal' | 'low' | 'empty';
}

const AutomationPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dispensers, setDispensers] = useState<Dispenser[]>([
    { id: 1, name: 'Shears Dispenser A', type: 'shears', enabled: true, capacity: 64, current: 45, status: 'normal' },
    { id: 2, name: 'Shears Dispenser B', type: 'shears', enabled: true, capacity: 64, current: 12, status: 'low' },
    { id: 3, name: 'Bottle Dispenser A', type: 'bottles', enabled: true, capacity: 64, current: 58, status: 'full' },
    { id: 4, name: 'Bottle Dispenser B', type: 'bottles', enabled: false, capacity: 64, current: 3, status: 'empty' },
  ]);

  const [isCollecting, setIsCollecting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-title', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.control-panel', {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
        delay: 0.2,
      });

      gsap.from('.dispenser-card', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleDispenser = (id: number) => {
    setDispensers(dispensers.map(d =>
      d.id === id ? { ...d, enabled: !d.enabled } : d
    ));
  };

  const handleForceCollect = () => {
    setIsCollecting(true);
    setTimeout(() => setIsCollecting(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'full':
        return 'bg-green-500';
      case 'normal':
        return 'bg-honey-500';
      case 'low':
        return 'bg-yellow-500';
      case 'empty':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'full':
        return 'FULL';
      case 'normal':
        return 'NORMAL';
      case 'low':
        return 'LOW';
      case 'empty':
        return 'EMPTY';
      default:
        return 'UNKNOWN';
    }
  };

  const activeDispensers = dispensers.filter(d => d.enabled).length;
  const totalDispensers = dispensers.length;

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-honey-50 to-honey-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="page-title text-4xl font-minecraft text-comb-900 mb-2 text-center">
          ⚙️ REDSTONE & AUTOMATION
        </h1>
        <p className="page-title text-center text-comb-700 mb-8 font-bold">
          Collection Mechanism Control Panel
        </p>

        {/* Main Control Panel */}
        <div className="control-panel bg-gradient-to-br from-red-400 to-red-500 rounded-lg p-8 border-4 border-comb-900 shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Force Collect Button */}
            <div className="bg-comb-900/20 rounded-lg p-6 border-2 border-comb-900">
              <h3 className="text-xl font-minecraft text-comb-900 mb-4 text-center">
                🔴 FORCE COLLECTION
              </h3>
              <button
                onClick={handleForceCollect}
                disabled={isCollecting}
                className={`w-full py-4 px-6 rounded-lg border-4 font-bold text-xl transition-all transform ${
                  isCollecting
                    ? 'bg-gray-400 border-gray-600 text-gray-700 cursor-not-allowed'
                    : 'bg-honey-500 border-honey-700 text-comb-900 hover:bg-honey-600 hover:scale-105 shadow-lg'
                }`}
              >
                {isCollecting ? '⏳ COLLECTING...' : '🍯 COLLECT ALL HIVES'}
              </button>
              <p className="text-xs text-comb-900 text-center mt-3 font-bold">
                Manually trigger collection from all active hives
              </p>
            </div>

            {/* System Status */}
            <div className="bg-comb-900/20 rounded-lg p-6 border-2 border-comb-900">
              <h3 className="text-xl font-minecraft text-comb-900 mb-4 text-center">
                📊 SYSTEM STATUS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-comb-900">Active Dispensers:</span>
                  <span className="text-2xl font-bold text-comb-900">{activeDispensers}/{totalDispensers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-comb-900">Redstone Power:</span>
                  <span className="text-2xl font-bold text-green-700">ON ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-comb-900">Circuit Status:</span>
                  <span className="text-2xl font-bold text-green-700">STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispensers Grid */}
        <h2 className="text-2xl font-minecraft text-comb-900 mb-4">🔧 DISPENSER MANAGEMENT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dispensers.map((dispenser) => (
            <div
              key={dispenser.id}
              className={`dispenser-card rounded-lg p-6 border-4 shadow-xl transition-all ${
                dispenser.enabled
                  ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-700'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500 border-gray-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{dispenser.type === 'shears' ? '✂️' : '🍯'}</span>
                  <div>
                    <h3 className="text-xl font-minecraft text-comb-900 font-bold">
                      {dispenser.name}
                    </h3>
                    <p className="text-sm text-comb-800 font-bold">
                      {dispenser.type === 'shears' ? 'Honeycomb Collection' : 'Honey Bottle Collection'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="bg-comb-900/20 rounded-lg p-4 mb-4 border-2 border-comb-900">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-comb-900">POWER STATUS:</span>
                  <button
                    onClick={() => toggleDispenser(dispenser.id)}
                    className={`relative w-16 h-8 rounded-full border-2 border-comb-900 transition-all ${
                      dispenser.enabled ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full border-2 border-comb-900 transition-transform ${
                        dispenser.enabled ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="text-center mt-2">
                  <span className={`text-lg font-bold ${dispenser.enabled ? 'text-green-900' : 'text-gray-900'}`}>
                    {dispenser.enabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-comb-900/20 rounded-lg p-4 border-2 border-comb-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-comb-900">
                    {dispenser.type === 'shears' ? 'SHEARS' : 'BOTTLES'}
                  </span>
                  <span className="text-lg font-bold text-comb-900">
                    {dispenser.current}/{dispenser.capacity}
                  </span>
                </div>
                <div className="w-full bg-comb-900/30 rounded-full h-4 border-2 border-comb-900 mb-2">
                  <div
                    className={`${getStatusColor(dispenser.status)} h-full rounded-full transition-all`}
                    style={{ width: `${(dispenser.current / dispenser.capacity) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className={`text-sm font-bold px-3 py-1 rounded ${getStatusColor(dispenser.status)} text-comb-900`}>
                    {getStatusText(dispenser.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Redstone Circuit Info */}
        <div className="mt-8 bg-gradient-to-br from-red-300 to-red-400 rounded-lg p-6 border-4 border-comb-900 shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🔦</span>
            <div className="flex-1">
              <h3 className="text-2xl font-minecraft text-comb-900 mb-2">REDSTONE CIRCUIT</h3>
              <p className="text-sm text-comb-800 font-bold">
                All dispensers are connected to the main redstone circuit. Toggle individual dispensers to control which hives are being automatically harvested. Force collection will trigger all enabled dispensers simultaneously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
