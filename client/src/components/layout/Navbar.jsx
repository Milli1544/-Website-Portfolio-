import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Code } from "lucide-react";
import { motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {'light' | 'dark'} props.theme - The current theme
 * @param {() => void} props.toggleTheme - Function to toggle the theme
 */
const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Code
              size={32}
              className="text-primary-500 dark:text-primary-400"
            />
            <span className="text-xl font-heading font-bold text-dark-900 dark:text-white">
              DevPortfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(([name, path]) => (
              <Link
                key={path}
                to={path}
                className={`navbar-link ${
                  location.pathname === path ? "active" : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-dark-500" />
              )}
            </button>

            <button
              className="p-2 md:hidden rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-dark-800 dark:text-dark-200" />
              ) : (
                <Menu size={24} className="text-dark-800 dark:text-dark-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden"
      >
        <nav className="container-custom py-4 bg-white dark:bg-dark-900">
          {links.map(([name, path]) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link block py-2 text-lg ${
                location.pathname === path ? "active" : ""
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
