import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './Dashboard';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
