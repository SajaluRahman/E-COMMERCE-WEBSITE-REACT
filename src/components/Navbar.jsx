import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLoginClick = () => {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully.', { position: 'top-right' });
      navigate('/');
    } catch (err) {
      console.error('Navbar: Logout error:', err);
      toast.error('Failed to log out. Please try again.', { position: 'top-right' });
    }
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-900">MyShop</Link>

          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/checkout" className="relative text-gray-600 hover:text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary"
                  aria-expanded={isUserMenuOpen}
                >
                  <span>Profile</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50"
                    >
                      <Link to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >View Profile</Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button onClick={handleLoginClick} className="text-primary hover:text-primary-dark">Login</button>
                <Link to="/signup" className="text-primary hover:text-primary-dark">Signup</Link>
              </>
            )}
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4 py-4 px-4">
                <Link to="/checkout" className="flex items-center space-x-2 text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Cart ({cartItemCount})</span>
                </Link>

                {user ? (
                  <>
                    <Link to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-600 hover:text-primary"
                    >Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-700 text-left"
                    >Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleLoginClick} className="text-primary hover:text-primary-dark">Login</button>
                    <Link to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-primary hover:text-primary-dark"
                    >Signup</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
