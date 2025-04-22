import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Menu, X, Upload, Image as ImageIcon, 
  CreditCard, Users, Calendar, ChevronRight, LogOut 
} from 'lucide-react';
import StatCard from '../components/photographer/StatCard';
import UploadProgress from '../components/photographer/UploadProgress';

const PhotographerDashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setUploadingFiles(files);
      setShowUploadProgress(true);
    }
  };

  const handleUploadComplete = () => {
    setTimeout(() => {
      setShowUploadProgress(false);
      setUploadingFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">SportShot</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-700">Welcome, John Photographer</span>
              <button className="ml-4 flex items-center text-gray-600 hover:text-gray-900">
                <LogOut className="w-5 h-5 mr-1" />
                <span>Sign Out</span>
              </button>
            </div>

            <button
              className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 border-b flex justify-between items-center">
              <span className="text-gray-700">John Photographer</span>
              <button className="text-gray-600 hover:text-gray-900">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              <Link to="#" className="px-4 py-3 text-gray-700 hover:bg-gray-50 border-b">
                Dashboard
              </Link>
              <Link to="#" className="px-4 py-3 text-gray-700 hover:bg-gray-50 border-b">
                My Events
              </Link>
              <Link to="#" className="px-4 py-3 text-gray-700 hover:bg-gray-50 border-b">
                Upload Photos
              </Link>
              <Link to="#" className="px-4 py-3 text-gray-700 hover:bg-gray-50 border-b">
                Sales
              </Link>
              <Link to="#" className="px-4 py-3 text-gray-700 hover:bg-gray-50">
                Settings
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Desktop only */}
        <aside className="hidden md:block w-64 bg-white shadow-sm h-[calc(100vh-64px)] sticky top-0">
          <nav className="py-4">
            <ul>
              <li>
                <Link 
                  to="#" 
                  className="flex items-center px-6 py-3 text-blue-500 bg-blue-50 border-l-4 border-blue-500"
                >
                  <div className="w-5 h-5 mr-3">
                    <ImageIcon className="w-full h-full" />
                  </div>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                >
                  <div className="w-5 h-5 mr-3">
                    <Calendar className="w-full h-full" />
                  </div>
                  <span>My Events</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                >
                  <div className="w-5 h-5 mr-3">
                    <Upload className="w-full h-full" />
                  </div>
                  <span>Upload Photos</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                >
                  <div className="w-5 h-5 mr-3">
                    <CreditCard className="w-full h-full" />
                  </div>
                  <span>Sales & Reports</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                >
                  <div className="w-5 h-5 mr-3">
                    <Users className="w-full h-full" />
                  </div>
                  <span>Customers</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Photographer Dashboard</h1>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Sales" 
                value="$4,385" 
                icon={CreditCard} 
                change={{ value: "12%", positive: true }}
                color="blue"
              />
              <StatCard 
                title="Photos Uploaded" 
                value="1,248" 
                icon={ImageIcon} 
                change={{ value: "8%", positive: true }}
                color="green"
              />
              <StatCard 
                title="Active Events" 
                value="5" 
                icon={Calendar} 
                color="purple"
              />
              <StatCard 
                title="Unique Customers" 
                value="328" 
                icon={Users} 
                change={{ value: "5%", positive: true }}
                color="orange"
              />
            </div>
            
            {/* Upload Section */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Upload</h2>
                
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  accept="image/*"
                />
                
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Upload Event Photos</h3>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Drag and drop photos, or click to browse
                  </p>
                </div>
                
                {showUploadProgress && (
                  <div className="mt-6">
                    <UploadProgress 
                      files={uploadingFiles} 
                      onComplete={handleUploadComplete} 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Events */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Events</h2>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {[
                  { id: '1', name: 'Boston Marathon 2025', date: 'April 21, 2025', photos: 587, sales: '$1,245' },
                  { id: '2', name: 'New York City Triathlon', date: 'July 15, 2025', photos: 423, sales: '$876' },
                  { id: '3', name: 'Chicago Half Marathon', date: 'September 7, 2025', photos: 211, sales: '$542' },
                  { id: '4', name: 'Seattle Soccer Tournament', date: 'August 12-14, 2025', photos: 368, sales: '$1,122' },
                ].map((event) => (
                  <li key={event.id}>
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{event.name}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-6">
                          <p className="text-sm font-medium text-gray-900">{event.photos} photos</p>
                          <p className="text-sm text-gray-500">{event.sales}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="px-6 py-4 border-t border-gray-200">
                <Link 
                  to="#" 
                  className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
                >
                  <span>View all events</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PhotographerDashboard;