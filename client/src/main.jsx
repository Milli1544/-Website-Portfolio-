import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Performance optimization: Use createRoot with concurrent features
const root = ReactDOM.createRoot(document.getElementById("root"));

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement("link");
  fontLink.rel = "preload";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap";
  fontLink.as = "style";
  document.head.appendChild(fontLink);

  // Preload critical images
  const criticalImages = ["/logo.svg", "/images/milli.jpg"];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = src;
    link.as = "image";
    document.head.appendChild(link);
  });
};

// Execute preloading
preloadCriticalResources();

// Render with performance optimizations
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
