import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Code, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

/**
 * @param {Object} props
 * @param {'light' | 'dark'} props.theme - The current theme
 * @param {() => void} props.toggleTheme - Function to toggle the theme
 */
const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const publicLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
  ];

  const userLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
    ["Add Education", "/education"],
    ["Add Project", "/project-form"],
  ];

  const adminLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Projects", "/projects"],
    ["Services", "/services"],
    ["Contact", "/contact"],
    ["Add Education", "/education"],
    ["Add Project", "/project-form"],
    ["Dashboard", "/admin/dashboard"],
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

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, navigate to home
      navigate("/");
    }
  };

  const getNavigationLinks = () => {
    if (!user) return publicLinks;
    if (user.role === "admin") return adminLinks;
    return userLinks;
  };

  const links = getNavigationLinks();

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
          <nav className="hidden md:flex items-center space-x-6">
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

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon size={20} className="text-dark-900" />
              ) : (
                <Sun size={20} className="text-white" />
              )}
            </button>

            {/* User Info / Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-indigo-200">{user.name}</span>
                  {user.role === "admin" && (
                    <span className="text-xs bg-indigo-400/20 text-indigo-300 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-400/10 text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-indigo-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-violet-400 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors"
            >
              {isMenuOpen ? (
                <X size={20} className="text-dark-900 dark:text-white" />
              ) : (
                <Menu size={20} className="text-dark-900 dark:text-white" />
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
        <nav className="container-custom py-4 bg-white dark:bg-dark-900 border-t border-dark-200 dark:border-dark-700">
          {/* Navigation Links */}
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

          {/* Mobile User Section */}
          <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20">
                  <User className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-indigo-200 font-medium">{user.name}</p>
                    <p className="text-indigo-300 text-sm">{user.email}</p>
                    {user.role === "admin" && (
                      <span className="text-xs bg-indigo-400/20 text-indigo-300 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/signin"
                  className="block w-full p-2 text-center text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full p-2 text-center bg-gradient-to-r from-indigo-400 to-violet-400 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </nav>
      </motion.div>
    </header>
  );
};

export default Navbar;
