import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`${isDark ? 'bg-dark-card border-t border-gray-800' : 'bg-gray-100'} pt-12 pb-8 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="w-6 h-6 text-primary" />
              <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>SportShot</span>
            </Link>
            <p className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Find and purchase professional photos from your sporting events using our facial recognition technology.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'} transition-colors`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'} transition-colors`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'} transition-colors`}>
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Explore</Link></li>
              <li><Link to="/search" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Find My Photos</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>How It Works</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Pricing</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Photographers</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Dashboard</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Sell Your Photos</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Earnings</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Join Our Team</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>About Us</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Contact</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Privacy Policy</Link></li>
              <li><Link to="#" className={`${isDark ? 'text-gray-400 hover:text-primary' : 'text-gray-600 hover:text-primary'} text-sm`}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-12 pt-6`}>
          <p className={`text-center ${isDark ? 'text-gray-500' : 'text-gray-500'} text-sm`}>
            © {new Date().getFullYear()} SportShot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;