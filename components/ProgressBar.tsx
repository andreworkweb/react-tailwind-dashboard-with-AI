import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const ProgressBar = ({ label, value, max, color }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
