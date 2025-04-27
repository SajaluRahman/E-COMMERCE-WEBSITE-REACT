import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate async checkout (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Checkout complete! Thank you for your order.', { position: 'top-right' });
    clearCart();
    setIsProcessing(false);
  };

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
            <li  className="hover:text-blue-600 transition-colors duration-200">
              
                Cart
             
            </li>
            <li>/</li>
            <li className="text-gray-900">Checkout</li>
          </ol>
        </nav>

        {/* Checkout Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                aria-label="Continue shopping"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 py-4"
                  >
                    {/* Item Image */}
                    <img
                      src={item.images[0] || 'https://via.placeholder.com/100'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                      loading="lazy"
                    />
                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        ₹ {item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded transition-colors duration-200"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {/* Item Total */}
                    <p className="text-teal-400 font-bold">
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-teal-400">₹ {getCartTotal()}</span>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
                aria-label="Place order"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;