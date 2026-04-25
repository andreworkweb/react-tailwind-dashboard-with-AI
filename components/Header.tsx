import React from 'react';
import Notifications from './Notifications';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b-2 border-honey-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border-2 border-honey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-honey-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Notifications />

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-honey-900">Beekeeper</p>
              <p className="text-xs text-honey-600">admin@beefarm.mc</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-honey-400 to-honey-600 rounded-full flex items-center justify-center cursor-pointer hover:from-honey-500 hover:to-honey-700 transition-all shadow-md">
              <span className="text-white font-medium">🐝</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
