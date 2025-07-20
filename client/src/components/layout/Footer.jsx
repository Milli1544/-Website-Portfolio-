import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Code } from "lucide-react";

const Footer = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative mt-auto py-12 ${className}`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 rounded-lg p-1.5">
                <Code size={24} className="text-white" />
              </span>
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                Milyon Kifleyesus
              </span>
            </div>
            <p className="text-indigo-200 mb-6 max-w-md">
              A passionate software developer focused on creating elegant
              solutions to complex problems. Based in Toronto, specializing in
              web development and system administration.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20 text-indigo-400 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-400 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/milyon-kifleyesus-9170b1364"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20 text-indigo-400 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-400 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:mili.kifleyesus@gmail.com"
                className="p-2 rounded-lg bg-gradient-to-r from-indigo-400/10 to-violet-400/10 border border-indigo-400/20 text-indigo-400 hover:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-violet-400 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 group-hover:scale-150 transition-transform"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 group-hover:scale-150 transition-transform"></span>
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 group-hover:scale-150 transition-transform"></span>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 group-hover:scale-150 transition-transform"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="text-indigo-200">
                <span className="block text-sm mb-1">Email:</span>
                <a
                  href="mailto:mili.kifleyesus@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  mili.kifleyesus@gmail.com
                </a>
              </li>
              <li className="text-indigo-200">
                <span className="block text-sm mb-1">LinkedIn:</span>
                <a
                  href="https://www.linkedin.com/in/milyon-kifleyesus-9170b1364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Milyon Kifleyesus
                </a>
              </li>
              <li className="text-indigo-200">
                <span className="block text-sm mb-1">Location:</span>
                <span>Toronto, ON, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-indigo-200/80 border-t border-indigo-400/20 pt-8">
          <p>&copy; {currentYear} Milyon Kifleyesus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
