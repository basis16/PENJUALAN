// Fix: Replaced placeholder content with a functional React component to resolve module error.
import React from 'react';
import Header from './components/Header';
import DailyDashboard from './components/DailyDashboard';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main>
        <DailyDashboard />
      </main>
    </div>
  );
};

export default App;
