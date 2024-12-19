import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  mobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ mobile }) => {
  const containerClasses = mobile ? "w-full" : "relative";

  return (
    <div className={containerClasses}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
      <input
        type="text"
        placeholder="Search courses..."
        className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
      />
    </div>
  );
};

export default SearchBar;