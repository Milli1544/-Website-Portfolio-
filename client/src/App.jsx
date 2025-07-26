import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/layout/Navbar.jsx";
import Layout from "./components/Layout.jsx";
import PerformanceMonitor from "./components/PerformanceMonitor.jsx";

// Lazy load heavy pages with better chunking
const Home = lazy(() => import("./pages/Home.jsx"), {
  webpackChunkName: "home",
});
const About = lazy(() => import("./pages/About.jsx"), {
  webpackChunkName: "about",
});
const Projects = lazy(() => import("./pages/Projects.jsx"), {
  webpackChunkName: "projects",
});
const Services = lazy(() => import("./pages/Services.jsx"), {
  webpackChunkName: "services",
});
const Contact = lazy(() => import("./pages/Contact.jsx"), {
  webpackChunkName: "contact",
});
const SignIn = lazy(() => import("./pages/Signin.jsx"), {
  webpackChunkName: "auth",
});
const SignUp = lazy(() => import("./pages/Signup.jsx"), {
  webpackChunkName: "auth",
});
const EducationForm = lazy(() => import("./pages/EducationForm.jsx"), {
  webpackChunkName: "forms",
});
const ProjectForm = lazy(() => import("./pages/ProjectForm.jsx"), {
  webpackChunkName: "forms",
});
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"), {
  webpackChunkName: "admin",
});

// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-dark-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    return <SignIn />;
  }

  if (adminOnly) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "admin") {
      return <Home />;
    }
  }

  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
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

    // Add a brief delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      preloadCriticalResources();
    }, 50); // Reduced from 100ms to 50ms

    return () => clearTimeout(timer);
  }, [theme]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <PerformanceMonitor />
      <div className="flex flex-col min-h-screen bg-dark-900">
        <Navbar
          theme={theme}
          toggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative z-50"
        />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Routes */}
                <Route
                  path="/education"
                  element={
                    <ProtectedRoute>
                      <EducationForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project-form"
                  element={
                    <ProtectedRoute>
                      <ProjectForm />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Only Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
