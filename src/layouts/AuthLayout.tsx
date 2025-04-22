import React from 'react';
import { useTheme } from '../components/common/ThemeProvider';
import Footer from '../components/common/Footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-dark-background text-dark-primary' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
