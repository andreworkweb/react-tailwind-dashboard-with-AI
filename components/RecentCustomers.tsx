import React from 'react';

const RecentCustomers = () => {
  const customers = [
    { name: 'Alice Johnson', email: 'alice@example.com', amount: '$1,234', status: 'Active', avatar: 'AJ', color: 'bg-pink-500' },
    { name: 'Bob Smith', email: 'bob@example.com', amount: '$987', status: 'Active', avatar: 'BS', color: 'bg-indigo-500' },
    { name: 'Carol White', email: 'carol@example.com', amount: '$756', status: 'Inactive', avatar: 'CW', color: 'bg-teal-500' },
    { name: 'David Lee', email: 'david@example.com', amount: '$543', status: 'Active', avatar: 'DL', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Customers</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {customers.map((customer, idx) => (
          <div key={idx} className="flex items-center justify-between pb-4 border-b last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${customer.color} rounded-full flex items-center justify-center`}>
                <span className="text-sm font-medium text-white">{customer.avatar}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{customer.amount}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCustomers;
