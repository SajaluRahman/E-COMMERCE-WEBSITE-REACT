import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart!`, { position: 'top-right' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.images[0] || ''}
          alt={product.title}
          className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-primary hover:underline transition-colors duration-200">
            {product.title}
          </h3>
        </Link>
        <p className="text-primary font-bold mt-1">₹ {product.price.toFixed(2)}</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
          onClick={handleAddToCart}
          className="mt-3 w-full bg-primary bg-green-800 text-white text-sm font-medium py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;