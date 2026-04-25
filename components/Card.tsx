import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const Card: React.FC<CardProps> = ({ title, value, change, icon, iconBg, iconColor }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${iconBg} rounded-full p-3`}>
          <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Card;
