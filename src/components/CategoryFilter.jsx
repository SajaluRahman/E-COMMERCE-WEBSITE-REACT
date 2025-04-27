import { useState } from 'react';

const CategoryFilter = ({ categories, onSelect, isLoading }) => {
  const [selected, setSelected] = useState('all');

  const handleSelect = (category) => {
    setSelected(category);
    onSelect(category);
  };

  return (
    <div className="flex max-w-xl flex-wrap gap-2">
      <button
        onClick={() => handleSelect('all')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
          selected === 'all'
            ? 'bg-primary text-green-800'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        disabled={isLoading}
        aria-label="All categories"
      >
        All
      </button>
      {isLoading ? (
        <div className="animate-pulse flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      ) : (
        categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSelect(category.name)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              selected === category.name
                ? 'bg-primary text-green-800'
                : 'bg-gray-200 text-gray-00 hover:bg-gray-300'
            }`}
            aria-label={`Filter by ${category.name}`}
          >
            {category.name}
          </button>
        ))
      )}
    </div>
  );
};

export default CategoryFilter;