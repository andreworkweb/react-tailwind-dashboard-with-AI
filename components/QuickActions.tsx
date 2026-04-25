import React from 'react';

const QuickActions = () => {
  const actions = [
    { name: 'Add Product', icon: 'M12 4v16m8-8H4', color: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'New Order', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Add User', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'bg-purple-500 hover:bg-purple-600' },
    { name: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex flex-col items-center justify-center space-y-2`}
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
