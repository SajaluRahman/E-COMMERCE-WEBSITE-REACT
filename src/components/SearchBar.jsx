import { useState } from 'react';
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleChange = (e) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value);
    };
  
    return (
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#81E7AF] focus:border-transparent"
          aria-label="Search products"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  };
  
  export default SearchBar;