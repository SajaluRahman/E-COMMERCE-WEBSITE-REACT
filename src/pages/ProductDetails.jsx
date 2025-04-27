import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const prod = await getProductById(id);
        console.log('Product data:', prod); // Debug: Log product data
        setProduct(prod);
      } catch (err) {
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log('Adding to cart:', { ...product, quantity }); // Debug: Log cart data
    addToCart({ ...product, quantity });
    setQuantity(1); // Reset quantity after adding to cart
  };

  const handleQuantityChange = (value) => {
    // Use fallback stock value (Infinity) if stock is undefined
    const maxStock = product?.stock ?? Infinity;
    // Allow quantity changes even if out of stock for flexibility
    const newQuantity = Math.max(1, Math.min(value, maxStock));
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-500 font-semibold">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500 font-semibold">Product not found.</p>
      </div>
    );
  }

  const isInStock = product.inStock !== false; 
  const stockCount = product.stock ?? Infinity; 

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-12 mt-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex space-x-2">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to={`/`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {product.category?.name || 'Category'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={product.images[0] || 'https://via.placeholder.com/400'}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-96 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h2>

              {product.rating && (
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.27 9.397c-.784-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating.toFixed(1)})</span>
                </div>
              )}

              <p className="text-2xl text-teal-400 font-bold">₹ {product.price.toFixed(2)}</p>

              <p className={`text-sm font-medium ${isInStock ? 'text-gray-600' : 'text-red-500'}`}>
                {isInStock
                  ? stockCount === Infinity
                    ? 'In Stock'
                    : `In Stock (${stockCount} available)`
                  : 'Out of Stock'}
              </p>

              <p className="text-base text-gray-600 leading-relaxed">{product.description}</p>

              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={stockCount}
                    className="w-16 text-center border-none focus:outline-none focus:ring-0 text-gray-900 text-sm"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stockCount}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={!isInStock || stockCount === 0}
                className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  isInStock && stockCount > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;