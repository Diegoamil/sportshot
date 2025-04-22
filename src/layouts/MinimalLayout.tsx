import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../components/common/ThemeProvider';
import Footer from '../components/common/Footer';

const MinimalLayout: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-dark text-dark-primary' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MinimalLayout;
