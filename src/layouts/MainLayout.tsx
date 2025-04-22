import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../components/common/ThemeProvider';

const MainLayout: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-dark text-dark-primary' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;