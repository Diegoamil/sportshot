import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleFileUpload = () => {
    navigate('/search?mode=facial');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center ${isMobile ? 'w-full' : 'w-[400px]'}`}
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search events or photographers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      <button
        type="button"
        onClick={handleFileUpload}
        className="flex items-center justify-center h-10 px-3 bg-gray-100 border-t border-r border-b border-gray-300 rounded-r-md hover:bg-gray-200 transition-colors"
        title="Find photos by facial recognition"
      >
        <Upload className="w-4 h-4 text-gray-700" />
      </button>
    </form>
  );
};

export default SearchBar;