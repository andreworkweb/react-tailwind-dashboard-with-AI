import React from 'react';

interface HexagonCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  status?: 'active' | 'idle' | 'full';
  icon?: string;
}

const HexagonCard: React.FC<HexagonCardProps> = ({ title, value, subtitle, status = 'active', icon }) => {
  const statusColors = {
    active: 'from-honey-400 to-honey-600',
    idle: 'from-comb-400 to-comb-600',
    full: 'from-honey-700 to-honey-900',
  };

  return (
    <div className="relative w-full aspect-square">
      <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status]} clip-hexagon shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          {icon && (
            <div className="text-4xl mb-2">{icon}</div>
          )}
          <h3 className="text-comb-900 font-bold text-sm mb-2 uppercase tracking-wider">{title}</h3>
          <p className="text-comb-900 font-bold text-3xl mb-1">{value}</p>
          {subtitle && (
            <p className="text-comb-800 text-xs">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HexagonCard;
