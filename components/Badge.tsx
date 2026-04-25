import React from 'react';

interface BadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {children}
    </span>
  );
};

export default Badge;
