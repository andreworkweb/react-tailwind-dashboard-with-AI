import React from 'react';

const StatCard = ({ title, value, change, icon, color }: {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} rounded-full p-3`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
      <p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </div>
  );
};

export default StatCard;
