import React from 'react';

const QuickActions = () => {
  const actions = [
    { name: 'Add Beehive', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', color: 'bg-honey-500 hover:bg-honey-600' },
    { name: 'Collect Honey', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'bg-comb-500 hover:bg-comb-600' },
    { name: 'Plant Flowers', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', color: 'bg-amber-500 hover:bg-amber-600' },
    { name: 'View Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-2 border-honey-200 p-6">
      <h2 className="text-lg font-semibold text-honey-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center space-y-2 shadow-md`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
            </svg>
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
