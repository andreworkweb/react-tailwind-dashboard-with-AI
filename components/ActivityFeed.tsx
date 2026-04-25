import React from 'react';

const ActivityFeed = () => {
  const activities = [
    {
      user: 'Steve',
      action: 'collected 12 honey bottles',
      time: '2 minutes ago',
      avatar: 'S',
      color: 'bg-honey-500'
    },
    {
      user: 'Alex',
      action: 'added new beehive',
      time: '15 minutes ago',
      avatar: 'A',
      color: 'bg-comb-500'
    },
    {
      user: 'Creeper',
      action: 'destroyed a beehive',
      time: '1 hour ago',
      avatar: 'C',
      color: 'bg-green-600'
    },
    {
      user: 'Enderman',
      action: 'planted flowers nearby',
      time: '2 hours ago',
      avatar: 'E',
      color: 'bg-purple-600'
    },
    {
      user: 'Villager',
      action: 'traded honeycomb blocks',
      time: '3 hours ago',
      avatar: 'V',
      color: 'bg-amber-600'
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border-2 border-honey-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-honey-900">Recent Activity</h2>
        <button className="text-sm text-honey-600 hover:text-honey-800 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-center space-x-3 pb-4 border-b last:border-b-0 border-honey-100">
            <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center shadow-md`}>
              <span className="text-sm font-medium text-white">{activity.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium text-honey-900">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-honey-600">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
