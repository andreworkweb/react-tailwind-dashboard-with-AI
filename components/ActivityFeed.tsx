import React from 'react';

const ActivityFeed = () => {
  const activities = [
    {
      user: 'John Doe',
      action: 'completed a purchase',
      time: '2 minutes ago',
      avatar: 'JD',
      color: 'bg-blue-500'
    },
    {
      user: 'Jane Smith',
      action: 'signed up',
      time: '15 minutes ago',
      avatar: 'JS',
      color: 'bg-green-500'
    },
    {
      user: 'Mike Johnson',
      action: 'left a review',
      time: '1 hour ago',
      avatar: 'MJ',
      color: 'bg-purple-500'
    },
    {
      user: 'Sarah Williams',
      action: 'updated profile',
      time: '2 hours ago',
      avatar: 'SW',
      color: 'bg-orange-500'
    },
    {
      user: 'Tom Brown',
      action: 'added to cart',
      time: '3 hours ago',
      avatar: 'TB',
      color: 'bg-pink-500'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-center space-x-3 pb-4 border-b last:border-b-0">
            <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
              <span className="text-sm font-medium text-white">{activity.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
