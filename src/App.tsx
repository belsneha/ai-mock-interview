import React, { useState } from 'react';
import { BrainCog } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard startInterview={() => setCurrentPage('interview')} />;
      case 'interview':
        return <Interview goToDashboard={() => setCurrentPage('dashboard')} />;
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard startInterview={() => setCurrentPage('interview')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;