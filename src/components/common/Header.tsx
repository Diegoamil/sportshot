import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Menu, X } from 'lucide-react';
import { useTheme, ThemeToggle } from './ThemeProvider';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen 
          ? isDark 
            ? 'bg-dark-card shadow-md border-b border-gray-800' 
            : 'bg-white shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-primary" />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>SportShot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <ThemeToggle />



              <Link 
                to="/login" 
                className="text-primary font-medium px-4 py-2 rounded-md hover:text-primary/80 transition-colors"
              >
                Acessar
              </Link>
              <Link 
                to="/register" 
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center"
              >
                Criar conta
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className={`rounded-md p-2 ${isDark ? 'text-gray-300 hover:bg-dark-hover' : 'text-gray-700 hover:bg-gray-100'} focus:outline-none`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-dark-card border-gray-800' : 'bg-white'} border-t`}>
          <nav className="flex flex-col">



            <Link to="/login" className={`px-4 py-3 ${isDark ? 'text-gray-300 hover:bg-dark-hover border-gray-800' : 'text-gray-700 hover:bg-gray-50 border-b'}`}>
              Acessar
            </Link>
            <Link to="/register" className={`px-4 py-3 ${isDark ? 'text-primary hover:bg-dark-hover' : 'text-primary hover:bg-gray-50'}`}>
              Criar conta
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;