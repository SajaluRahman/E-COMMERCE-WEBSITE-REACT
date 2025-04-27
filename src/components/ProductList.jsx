import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const prods = await getProducts();
        const cats = await getCategories();
        setProducts(prods);
        setDisplayed(prods);
        setCategories(cats);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayed(filtered);
  };

  const handleCategory = (category) => {
    if (category === 'all') {
      setDisplayed(products);
    } else {
      const filtered = products.filter((p) => p.category.name === category);
      setDisplayed(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Explore Our Products
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Discover the best selection curated just for you
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:items-center md:justify-between gap-4 mb-8">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter categories={categories} onSelect={handleCategory} isLoading={isLoading} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#81E7AF] mx-auto"></div>
            </div>
          ) : displayed.length > 0 ? (
            displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;