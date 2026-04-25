import React from 'react';
import { NavLink } from 'react-router-dom';

const MinecraftSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊', emoji: '🐝' },
    { name: 'Hives Registry', path: '/hives', icon: '🏠', emoji: '🏠' },
    { name: 'Inventory', path: '/inventory', icon: '📦', emoji: '📦' },
    { name: 'Automation', path: '/automation', icon: '⚙️', emoji: '⚙️' },
    { name: 'Analytics', path: '/analytics', icon: '📈', emoji: '📈' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-comb-900/80 backdrop-blur-lg border-r-4 border-honey-500 shadow-2xl z-40">
      <div className="p-6 border-b-2 border-honey-500/30">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">🐝</div>
          <div>
            <h2 className="text-xl font-minecraft text-honey-400">BEE FARM</h2>
            <p className="text-xs text-honey-600">Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-honey-500 to-honey-600 shadow-lg border-l-4 border-honey-300'
                  : 'text-honey-200 hover:bg-honey-500/20 hover:text-honey-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-2xl">{item.emoji}</span>
                <span className={`font-bold text-sm ${isActive ? 'text-comb-900' : 'text-honey-200 group-hover:text-honey-300'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-honey-300 rounded-full animate-pulse shadow-lg shadow-honey-300/50"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-honey-500/30">
        <div className="bg-honey-500/20 rounded-lg p-3 border border-honey-500/50">
          <p className="text-xs text-honey-300 font-bold">SERVER STATUS</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-sm text-honey-200">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MinecraftSidebar;
