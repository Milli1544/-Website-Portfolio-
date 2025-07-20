import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Silk from "./Silk";
import Footer from "./layout/Footer";

const Layout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set initial body styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#1a1b2e";

    // Mount after a brief delay to ensure proper initialization
    const timer = setTimeout(() => setMounted(true), 100);

    return () => {
      clearTimeout(timer);
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background container */}
      {mounted && (
        <>
          {/* Gradient overlay */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/30 to-dark-900/50" />
          </div>

          {/* Silk background */}
          <Silk
            speed={0.8}
            color="#7B7481"
            noiseIntensity={1.2}
            scale={1.2}
            rotation={0}
          />
        </>
      )}

      {/* Content container */}
      <main className="relative flex-grow z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer className="relative z-10" />
    </div>
  );
};

export default Layout;
