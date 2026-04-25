import React from 'react';
import ProgressBar from './ProgressBar';

const GoalsWidget = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Goals</h2>
      <ProgressBar label="Sales Target" value={7850} max={10000} color="bg-blue-500" />
      <ProgressBar label="New Customers" value={234} max={300} color="bg-green-500" />
      <ProgressBar label="Revenue Goal" value={45231} max={50000} color="bg-purple-500" />
      <ProgressBar label="Product Reviews" value={156} max={200} color="bg-yellow-500" />
    </div>
  );
};

export default GoalsWidget;
