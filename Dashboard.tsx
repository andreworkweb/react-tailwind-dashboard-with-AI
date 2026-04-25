import React from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import GoalsWidget from './components/GoalsWidget';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import Card from './components/Card';
import SalesMap from './components/SalesMap';
import RecentCustomers from './components/RecentCustomers';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      change: '+8%',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-3%',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Conversion',
      value: '3.24%',
      change: '+5%',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} {...stat} />
        ))}
      </div>

      <div className="mb-8">
        <Chart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>

        <div className="space-y-6">
          <QuickActions />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
            <div className="space-y-4">
              {[
                { name: 'Product A', sales: 234, revenue: '$12,450', trend: 'up' },
                { name: 'Product B', sales: 189, revenue: '$9,870', trend: 'up' },
                { name: 'Product C', sales: 156, revenue: '$8,340', trend: 'down' },
                { name: 'Product D', sales: 142, revenue: '$7,890', trend: 'up' },
              ].map((product, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                    <div className="flex items-center justify-end mt-1">
                      <svg className={`w-3 h-3 ${product.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={product.trend === 'up' ? 'M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z' : 'M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'} clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GoalsWidget />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesMap />
        <RecentCustomers />
      </div>

      <Table />
    </div>
  );
};

export default Dashboard;
