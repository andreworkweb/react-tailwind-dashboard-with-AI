import React from 'react';

const Chart = () => {
  const data = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 52 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 72 },
    { month: 'Jun', value: 90 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-2 border-honey-200 p-6">
      <h2 className="text-lg font-semibold text-honey-900 mb-6">🍯 Honey Production Overview</h2>
      <div className="flex items-end justify-between h-64 space-x-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-honey-100 rounded-t relative" style={{ height: '100%' }}>
              <div
                className="w-full bg-gradient-to-t from-honey-500 to-comb-400 rounded-t absolute bottom-0 transition-all duration-500 hover:from-honey-600 hover:to-comb-500"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-honey-900">
                  {item.value}
                </span>
              </div>
            </div>
            <span className="mt-2 text-sm text-honey-700 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
