import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useTheme } from '../../context/ThemeContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import ThemeToggle from '../shared/ThemeToggle';
import SearchBar from '../shared/SearchBar';
import NavLinks from './NavLinks';
import Button from '../shared/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const { theme } = useTheme();
  const scrollPosition = useScrollPosition();

  const isScrolled = scrollPosition > 0;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
            DigiGurukul
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <SearchBar />
            <ThemeToggle />
            <Button href="/login" variant="primary">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4">
                <NavLinks mobile />
                <SearchBar mobile />
                <Button href="/login" variant="primary" className="w-full">
                  Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;