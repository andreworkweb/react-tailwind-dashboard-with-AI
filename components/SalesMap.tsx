import React from 'react';

const SalesMap = () => {
  const regions = [
    { name: 'North America', sales: '$28,450', percentage: 45, color: 'bg-blue-500' },
    { name: 'Europe', sales: '$18,230', percentage: 30, color: 'bg-green-500' },
    { name: 'Asia', sales: '$12,340', percentage: 20, color: 'bg-purple-500' },
    { name: 'Other', sales: '$3,210', percentage: 5, color: 'bg-gray-400' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales by Region</h2>
      <div className="space-y-4">
        {regions.map((region, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{region.name}</span>
              <span className="text-sm font-semibold text-gray-900">{region.sales}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${region.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${region.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Sales</span>
          <span className="text-xl font-bold text-gray-900">$62,230</span>
        </div>
      </div>
    </div>
  );
};

export default SalesMap;
