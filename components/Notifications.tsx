import React, { useState } from 'react';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New order received', message: 'Order #12345 from John Doe', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment confirmed', message: 'Payment of $299 received', time: '15 min ago', unread: true },
    { id: 3, title: 'New user registered', message: 'Jane Smith joined', time: '1 hour ago', unread: false },
    { id: 4, title: 'Product review', message: 'New 5-star review on Product A', time: '2 hours ago', unread: false },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications.filter(n => n.unread).length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
